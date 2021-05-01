import { Avatar, IconButton } from "@material-ui/core";
import "./ChatArea.css";
import { useEffect, useState } from "react";
import MoreVertIcon from "@material-ui/icons/MoreVert";
import InsertEmoticonIcon from "@material-ui/icons/InsertEmoticon";
const ChatArea = () => {
  const [seed, setSeed] = useState("");

  // Random Seed
  useEffect(() => {
    setSeed(Math.floor(Math.random() * 5000));
  }, []);

  return (
    <div className="chat">

      <div className="chat_header">
        <Avatar src={`https://avatars.dicebear.com/api/human/${seed}.svg`} />
        <div className="chat_header_info">
          <h3>Room Name</h3>
          <p>
            lacus vel facilisis volutpat est velit egestas dui id ornare arcu
            odio ut sem nulla pharetra diam sil pharetra diam sil pharetra{" "}
          </p>
        </div>
        <div className="chat_header_right">
          <IconButton>
            <MoreVertIcon />
          </IconButton>
        </div>
      </div>

      <div className="chat_body">
        <p className="chat_message chat_sender_arrow">
          <span className="chat_name">Srushith Repakula</span>
          <span>
            lacus vel facilisis volutpat est velit egestas dui id ornare arcu
            odio ut sem nulla pharetra diam sit amet nisl suscipit adipiscing
            bibendum est ultricies integer quis auctor elit sed vulputate mi sit
            amet mauris commodo quis imperdiet massa tincidunt nunc pulvinar
            sapien et ligula ullamcorper malesuada proin libero nunc{" "}
          </span>
          <span className="chat_timestamp">12:13am</span>
        </p>
        <p className="chat_message chat_reciever chat_reciever_arrow">
          <span> Hey </span>
          <br />
          <span className="chat_timestamp">12:14am</span>
        </p>
      </div>

      <div className="chat_footer">
        <InsertEmoticonIcon />
        <form>
          <input type="text" placeholder="Type a message" />
          <button> Send a message</button>
        </form>
      </div>

    </div>
  );
};

export default ChatArea;
