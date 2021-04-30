import { Avatar } from "@material-ui/core";
import React from "react";
import "./SidebarChat.css";
import { useEffect, useState } from "react";

const SidebarChat = ({ addNewChat }) => {
  const [seed, setSeed] = useState("");

  // Create new chat function
  const createChat = () => {
    console.log("Create new chat");
  };

  // Random Seed
  useEffect(() => {
    setSeed(Math.floor(Math.random() * 5000));
  }, []);
  return !addNewChat ? (
    <div className="sidebar_chat">
      <Avatar src={`https://avatars.dicebear.com/api/human/${seed}.svg`} />
      <div className="sidebar_chat_info">
        <h2> Room Name </h2>
        <p> Last Message ....</p>
      </div>
    </div>
  ) : (
    <div className="sidebar_chat" onClick={() => createChat()}>
      <h2>Add New Chat</h2>
    </div>
  );
};

export default SidebarChat;
