import { Avatar } from "@material-ui/core";
import React from "react";
import { useEffect, useState } from "react";

const SidebarChat = () => {
  // State Variables
  const [seed, setSeed] = useState("");

  // Random Seed
  useEffect(() => {
    setSeed(Math.floor(Math.random() * 5000));
  }, []);

  return (
    <div className="sidebar_chat">
      <Avatar src={`https://avatars.dicebear.com/api/human/${seed}.svg`} />
      <div className="sidebar_chat_info">
        <h2> Room Name </h2>
        <p> Last Message ....</p>
      </div>
    </div>
  );
};

export default SidebarChat;
