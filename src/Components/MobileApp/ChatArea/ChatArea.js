/* eslint-disable react-hooks/exhaustive-deps */
import { Avatar, IconButton } from "@material-ui/core";
import "./ChatArea.css";
import { useEffect, useState, Fragment } from "react";
import ArrowBackIcon from "@material-ui/icons/ArrowBack";
import { Link } from "react-router-dom";
import { axiosFun } from "../../../CRUD/axios.config";
import { getMessages, sendMessage } from "../../../CRUD/queries";
import ChatBubble from "./ChatBubble";

const ChatArea = ({ match, auth }) => {
  const [data, setData] = useState(null);
  const [message, setMessage] = useState("");

  useEffect(() => {
    getChats();
  }, [match.params.roomId]);

  const getChats = async () => {
    const res = await axiosFun(getMessages(match.params.roomId));
    setData(res.data.listMessagess.items);
  };

  const sendMessageFun = async (e) => {
    e.preventDefault();
    try {
      await axiosFun(
        sendMessage(
          auth.conversations.name,
          match.params.roomId,
          match.params.name,
          auth.conversations.userId,
          `https://avatars.dicebear.com/api/jdenticon/${match.params.img}.svg`,
          message,
          match.params.description,
          "chatRoom"
        )
      );
      setMessage("");
    } catch (err) {
      console.error(err);
    }
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
                sender={
                  chat.authorId === auth.conversations.userId ? true : false
                }
              />
            ))}
          </div>
          <div className="mobile_chat_footer">
            {auth.currentConversationMessages !== undefined &&
              auth.currentConversationMessages &&
              auth.currentConversationMessages.items.map((chat, idx) => (
                <ChatBubble
                  key={idx}
                  authorName={chat.authorName}
                  message={chat.message}
                  sentAt={chat.sentAt}
                  sender={
                    chat.authorId === auth.conversations.userId ? true : false
                  }
                />
              ))}
          </div>
          <div className="chat_footer">
            <form onSubmit={(e) => sendMessageFun(e)}>
              <input
                type="text"
                placeholder="Type a message"
                value={message}
                onChange={(e) => setMessage(e.target.value)}
              />
              <button> Send a message</button>
            </form>
          </div>
        </div>
      )}
    </>
  );
};

export default ChatArea;
