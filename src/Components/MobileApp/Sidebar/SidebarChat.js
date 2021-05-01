import { Avatar } from "@material-ui/core";
import React from "react";
import { useEffect, useState } from "react";

const SidebarChat = ({selected}) => {
  // State Variables
  const [seed, setSeed] = useState("");

  // Random Seed
  useEffect(() => {
    setSeed(Math.floor(Math.random() * 5000));
  }, []);

  return (
    <div className={`mobile_sidebar_chat ${selected ? "mobile_sidebar_chat_selected" : ""}`} >
      <Avatar src={`https://avatars.dicebear.com/api/human/${seed}.svg`} />
      <div className="mobile_sidebar_chat_info">
        <h2> Room Name </h2>
        <p> Last Message ....</p>
      </div>
    </div>
  );
};

export default SidebarChat;
