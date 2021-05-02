import { Avatar } from "@material-ui/core";
import React from "react";
import { useEffect, useState } from "react";
import { Link } from "react-router-dom"

const SidebarChat = ({selected, chatRoomId, name, description, lastMessage}) => {
  // State Variables
  const [seed, setSeed] = useState("");

  // Random Seed
  useEffect(() => {
    setSeed(Math.floor(Math.random() * 5000));
  }, []);

  return (
    
      <Link to={`/rooms/${chatRoomId}`} >
        <div className={`sidebar_chat ${selected ? "sidebar_chat_selected" : ""}`} >
      <Avatar src={`https://avatars.dicebear.com/api/human/${seed}.svg`} />
      <div className="sidebar_chat_info">
        <h2> {name} </h2>
        <p className="sidebar_chat_elipse"> {lastMessage} </p>
      </div>
      </div>
      </Link>
      
  
  );
};

export default SidebarChat;
