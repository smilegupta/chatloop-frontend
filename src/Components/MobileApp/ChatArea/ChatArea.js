import { Avatar, IconButton } from "@material-ui/core";
import "./ChatArea.css";
import { useEffect, useState, Fragment } from "react";
import MoreVertIcon from "@material-ui/icons/MoreVert";
import { useParams } from "react-router-dom";
import { chatroom } from "../../../dummychat";
import ArrowBackIcon from "@material-ui/icons/ArrowBack";
import { Link } from "react-router-dom";
const ChatArea = () => {
  const [seed, setSeed] = useState("");
  const { roomId } = useParams();

  const data = chatroom.find((p) => p.chatRoomId === roomId);

  // Random Seed
  useEffect(() => {
    setSeed(Math.floor(Math.random() * 50));
  }, []);

  return (
    <>
      {data && (
        <div className="mobile_chat">
          <div className="mobile_chat_header">
            <IconButton>
              <Link to="/">
                <ArrowBackIcon />
              </Link>
            </IconButton>
            <Avatar
              src={`https://avatars.dicebear.com/api/jdenticon/${seed}.svg`}
            />
            <div className="mobile_chat_header_info">
              <h3>{data.name}</h3>
            </div>
            <div className="mobile_chat_header_right">
              <IconButton>
                <MoreVertIcon />
              </IconButton>
            </div>
          </div>
          <div className="mobile_chat_body">
            <p className="mobile_chat_message">
              <span className="mobile_chat_name">Srushith Repakula</span>
              <span>
                lacus vel facilisis volutpat est velit egestas dui id ornare
                arcu odio ut sem nulla pharetra diam sit amet nisl suscipit
                adipiscing bibendum est ultricies integer quis auctor elit sed
                vulputate mi sit amet mauris commodo quis imperdiet massa
                tincidunt nunc pulvinar sapien et ligula ullamcorper malesuada
                proin libero nunc{" "}
              </span>
              <span className="mobile_chat_timestamp">12:13am</span>
            </p>
            <p className="mobile_chat_message mobile_chat_reciever mobile_chat_reciever_arrow">
              <span> Hey </span>
              <br />
              <span className="mobile_chat_reciever_timestamp">12:14am</span>
            </p>
          </div>
          <div className="mobile_chat_footer">
            <form>
              <input type="text" placeholder="Type a message" />
              <button> Send a message</button>
            </form>
          </div>
        </div>
      )}
    </>
  );
};

export default ChatArea;
