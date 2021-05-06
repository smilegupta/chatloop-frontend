/* eslint-disable react-hooks/exhaustive-deps */
import { Avatar, IconButton } from "@material-ui/core";
import "./ChatArea.css";
import { useEffect, useState, Fragment } from "react";
import ArrowBackIcon from "@material-ui/icons/ArrowBack";
import { Link } from "react-router-dom";
import { axiosFun } from "../../../CRUD/axios.config";
import { getMessages } from "../../../CRUD/queries";
import ChatBubble from "./ChatBubble";
const ChatArea = ({ match, auth }) => {
  const userId = auth.conversations.userId;
  const [data, setData] = useState(null);

  useEffect(() => {
    getChats();
  }, [match.params.roomId]);

  const getChats = async () => {
    const res = await axiosFun(getMessages(match.params.roomId));
    setData(res.data.listMessagess.items);
  };

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
              src={`https://avatars.dicebear.com/api/jdenticon/${match.params.img}.svg`}
            />
            <div className="mobile_chat_header_info">
              <h3>{match.params.name}</h3>
              <p>{match.params.description}</p>
            </div>
          </div>
          <div className="mobile_chat_body">
            {data.map((chat, idx) => (
              <ChatBubble
                key={idx}
                authorName={chat.authorName}
                message={chat.message}
                sentAt={chat.sentAt}
                sender={chat.authorId === userId ? true : false}
              />
            ))}
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
