import { Fragment } from "react";
import moment from "moment";

const ChatBubble = ({ authorName, message, sentAt, sender }) => {
  return (
    <Fragment>
      {!sender ? (
        <p className="mobile_chat_message">
          <span className="mobile_chat_name">{authorName}</span>
          <span>{message}</span>
          <span className="mobile_chat_timestamp">
            {" "}
            {moment(sentAt).format("lll")}{" "}
          </span>
        </p>
      ) : (
        <p className="mobile_chat_message mobile_chat_reciever">
          <span> {message} </span>
          <br />
          <span className="mobile_chat_reciever_timestamp">
            {" "}
            {moment(sentAt).format("lll")}{" "}
          </span>
        </p>
      )}
    </Fragment>
  );
};

export default ChatBubble;
