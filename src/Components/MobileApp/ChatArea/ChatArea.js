/* eslint-disable no-unused-vars */
/* eslint-disable react-hooks/exhaustive-deps */
import { Avatar, IconButton } from "@material-ui/core";
import "./ChatArea.css";
import { useEffect, useState, Fragment, useRef } from "react";
import ArrowBackIcon from "@material-ui/icons/ArrowBack";
import { Link } from "react-router-dom";
import { axiosFun } from "../../../CRUD/axios.config";
import { getMessages, sendMessage } from "../../../CRUD/queries";
import ChatBubble from "./ChatBubble";
import { API, graphqlOperation } from "aws-amplify";

const ChatArea = ({ match, auth }) => {
  const [message, setMessage] = useState("");
  const [error, setError] = useState("");
  const [data, setData] = useState(null);
  const scrollref = useRef();
  useEffect(() => {
    getChats();
  }, [match.params.roomId]);

  useEffect(() => {
    scrollref.current?.scrollIntoView({ behaviour: "smooth" });
  });

  const getChats = async () => {
    const res = await axiosFun(getMessages(match.params.roomId));
    setData(res.data.listMessagess.items);
    auth.currentConversationMessages = {
      conversationId: match.params.roomId,
      ...res.data.listMessagess,
    };
    auth.setCurrentConversationMessages({
      conversationId: match.params.roomId,
      ...res.data.listMessagess,
    });
  };

  // Validation
  const validateFields = () => {
    setError("");
    if (message === null || message === "") {
      setError("You can't send a blank message");
      return false;
    }
    return true;
  };

  const sendMessageFun = async (e) => {
    e.preventDefault();
    if (!validateFields()) return;
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

  const updateSubscriptionArray = (subscriptionDetails) => {
    auth.subscriptionArray.forEach((data) => {
      if (data.conversationId === subscriptionDetails.conversationId) {
        data.lastMessage = subscriptionDetails.message;
        data.lastMessageAt = subscriptionDetails.sentAt;
        if (
          subscriptionDetails.conversationId !==
          auth.currentConversationMessages.conversationId
        )
          data.newMessages =
            "newMessages" in data ? (data.newMessages += 1) : 1;
      }
    });
  };

  const updateCurrentConversations = (subscriptionDetails) => {
    if (
      subscriptionDetails.conversationId ===
      auth.currentConversationMessages.conversationId
    ) {
      auth.currentConversationMessages.items.push(subscriptionDetails);
      const temp = auth.currentConversationMessages;
      auth.setCurrentConversationMessages(temp);
    }
  };

  const subscriptionRequest = `
  subscription MySubscription {
    subscribeToNewMessage(conversationId: "${match.params.roomId}") {
        authorId
        authorName
        message
        sentAt
        conversationId
    }
  }
`;

  let subscriptionOnCreate;
  const subscription = () => {
    subscriptionOnCreate = API.graphql(
      graphqlOperation(subscriptionRequest)
    ).subscribe({
      next: (res) => {
        updateCurrentConversations(res.value.data.subscribeToNewMessage);
        updateSubscriptionArray(res.value.data.subscribeToNewMessage);
        auth.setSubscriptionArray(auth.subscriptionArray);
      },
    });
  };

  useEffect(() => {
    subscription();
    return () => {
      subscriptionOnCreate.unsubscribe();
    };
  }, []);

  return (
    <>
      {data && data.length > 0 && (
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
            <div ref={scrollref}></div>
          </div>
          <div className="mobile_chat_footer">
            <form onSubmit={(e) => sendMessageFun(e)}>
              <input
                type="text"
                placeholder="Type a message"
                value={message}
                onChange={(e) => setMessage(e.target.value)}
                onBlur={validateFields}
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
