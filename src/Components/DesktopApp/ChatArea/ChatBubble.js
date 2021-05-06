import { Fragment } from "react";
import moment from "moment";

const ChatBubble = ({ authorName, message, sentAt, sender }) => {
  return (
    <Fragment>
      {!sender ? (
        <p className="chat_message">
          <span className="chat_name">{authorName}</span>
          <span>{message}</span>
          <span className="chat_timestamp">
            {" "}
            {moment(sentAt).format("lll")}{" "}
          </span>
        </p>
      ) : (
        <p className="chat_message chat_reciever">
          <span> {message} </span>
          <br />
          <span className="chat_reciever_timestamp">
            {" "}
            {moment(sentAt).format("lll")}{" "}
          </span>
        </p>
      )}
    </Fragment>
  );
};

export default ChatBubble;
