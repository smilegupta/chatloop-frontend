import { Avatar } from "@material-ui/core";
import React from "react";
import { useEffect, useState } from "react";
import { Link } from "react-router-dom";

const SidebarChat = ({
  selected,
  chatRoomId,
  name,
  description,
  lastMessage,
}) => {
  // State Variables
  const [seed, setSeed] = useState("");

  // Random Seed
  useEffect(() => {
    setSeed(Math.floor(Math.random() * 50));
  }, []);

  return (
    <Link to={`/rooms/${chatRoomId}`}>
      <div
        className={`mobile_sidebar_chat ${
          selected ? "mobile_sidebar_chat_selected" : ""
        }`}
      >
        <Avatar src={`https://avatars.dicebear.com/api/jdenticon/${seed}.svg`} />
        <div className="mobile_sidebar_chat_info">
          <h2> {name} </h2>
          <p className="mobile_sidebar_chat_elipse"> {lastMessage} </p>
        </div>
      </div>
    </Link>
  );
};

export default SidebarChat;
