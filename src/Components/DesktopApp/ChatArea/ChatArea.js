/* eslint-disable react-hooks/exhaustive-deps */
import { Avatar, Grid } from "@material-ui/core";
import "./ChatArea.css";
import { Fragment, useEffect, useState } from "react";
import chatImage from "../../../Images/chat3.svg";
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
          <div className="chat_footer">
            <form>
              <input type="text" placeholder="Type a message" />
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
