import React, { useRef, useEffect } from "react";
import { canUseDOM } from "vtex.render-runtime";
// import { Link, canUseDOM, useRuntime } from "vtex.render-runtime";

// import { default as s } from "./styles.css";

type RebateChatProps = {

}

const sectionStyles: React.CSSProperties = {
  textAlign: "center",
  fontSize: "2rem",
  margin: "1rem auto",
  height: "120vh"
}

const mitelChatId = "iframemaindiv";

const RebateChat = ({ }: RebateChatProps) => {
  if (!canUseDOM) return <></>;

  const bodyElement = document.querySelector("body.bg-base") as HTMLBodyElement | Node;
  if (!bodyElement) return <></>

  const targetElement = useRef<HTMLBodyElement | Node>(bodyElement);
  const defaultFlag = useRef(false);

  const config = { attributes: false, childList: true, subtree: false };

  const callBack = (mutationList: Array<any>) => {
    if (defaultFlag.current) return;

    for (const mutation of mutationList) {
      const addedNode: HTMLElement = mutation.addedNodes[0];
      if (!addedNode) return;

      const addedNodeInnerId = addedNode.id;
      const nodeIsDefaultChat = addedNodeInnerId.toLowerCase() === mitelChatId;

      if (nodeIsDefaultChat) {
        addedNode.remove();
        defaultFlag.current = true;

        createRebateChatWindow();
      }
    }
  }

  const createRebateChatWindow = () => {
    // Code from Mitel
    var script = document.createElement('script');
    script.type = 'text/javascript';
    script.src = "https://webchat.mitel.io/bootstrapper.js?accountid%3DYjZmMzgzOGYtMjRkZS00NGFhLWI3YTgtYzRiOTlmOWNiZDUw%26chatname%3DTU4gRWJpa2UgUmViYXRlIEludGVybmFs";
    document.head.appendChild(script);
  }

  // Create / Destroy Mutation Observer
  useEffect(() => {
    const observer = new MutationObserver(callBack);
    observer.observe(targetElement.current, config);

    return () => observer.disconnect();
  }, []);

  return (
    <>
      <style>{`
      #${mitelChatId} { inset: 0 !important; display: flex !important; justify-content: center !important; align-items: center !important; }
      #cloudlink-chat-overlay-buttons { position: static !important; }
      #cloudlink-chat-overlay-iframe { position: static !important; min-width: 25rem; width: 50% !important; height: 90% !important;}
      `}</style>
      <div style={sectionStyles}>
        E-Bike Rebate Widget
      </div>
    </>
  )
}


RebateChat.schema = {
  title: "RebateChat",
  description: "",
  type: "object",
  properties: {

  }
};

export default RebateChat
