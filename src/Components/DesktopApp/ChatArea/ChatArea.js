/* eslint-disable react-hooks/exhaustive-deps */
import { Avatar, Grid } from "@material-ui/core";
import "./ChatArea.css";
import { Fragment, useEffect, useState } from "react";
import chatImage from "../../../Images/chat3.svg";
import { axiosFun } from "../../../CRUD/axios.config";
import { getMessages, sendMessage } from "../../../CRUD/queries";
import ChatBubble from "./ChatBubble";

const ChatArea = ({ match, auth }) => {
  const [message, setMessage] = useState("");
  const [data, setData] = useState(null);
  useEffect(() => {
    getChats();
  }, [match.params.roomId]);

  const getChats = async () => {
    const res = await axiosFun(getMessages(match.params.roomId));
    setData(res.data.listMessagess.items);
    auth.setCurrentConversationMessages({
      conversationId: match.params.roomId,
      ...res.data.listMessagess,
    });
    console.log("Right side data", auth.currentConversationMessages);
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
    <div className="chat">
      {data && data.length > 0 ? (
        <Fragment>
          <div className="chat_header">
            <Avatar
              src={`https://avatars.dicebear.com/api/jdenticon/${match.params.img}.svg`}
            />
            <div className="chat_header_info">
              <h3>{match.params.name}</h3>
              <p>{match.params.description}</p>
            </div>
          </div>
          <div className="chat_body">
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
        </Fragment>
      ) : (
        <Grid
          container
          direction="column"
          justify="center"
          alignItems="center"
          style={{ height: "100%" }}
        >
          <img
            alt="Portal Logo"
            src={chatImage}
            align="center"
            style={{ width: "30vw" }}
          />
          <h3 className="chat_no_room_selected">
            Choose a conversation/chatroom to see your chats
          </h3>
        </Grid>
      )}
    </div>
  );
};

export default ChatArea;
