/* eslint-disable react-hooks/exhaustive-deps */
import { Avatar, Chip } from "@material-ui/core";
import moment from "moment";
import { Link } from "react-router-dom";
import { API, graphqlOperation } from "aws-amplify";
import { useEffect } from "react";

const SidebarChat = ({
  lastMessageAt,
  conversationImage,
  chatRoomId,
  name,
  lastMessage,
  description,
  auth,
  newMessages,
}) => {
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
    subscribeToNewMessage(conversationId: "${chatRoomId}") {
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
        auth.setSubscriptionArray([]);
        auth.setSubscriptionArray(auth.subscriptionArray);
      },
    });
  };

  const resetNewMessages = (conversationId) => {
    const temp = auth.subscriptionArray.map((data) => {
      if (data.conversationId === conversationId) data.newMessages = 0;
      return data;
    });
    auth.setSubscriptionArray([]);
    auth.setSubscriptionArray(temp);
  };

  useEffect(() => {
    subscription();
    return () => {
      subscriptionOnCreate.unsubscribe();
    };
  }, []);

  useEffect(() => {
    auth.setSubscriptionArray(auth.subscriptionArray);
  }, [auth.subscriptionArray]);
  
  return (
    <Link
      to={`/rooms/${chatRoomId}/${name}/${description}/${conversationImage.substring(
        conversationImage.lastIndexOf("/") + 1,
        conversationImage.length - 4
      )}`}
    >
      <div
        className="mobile_sidebar_chat"
        onClick={() => resetNewMessages(chatRoomId)}
      >
        <Avatar src={conversationImage} />
        <div className="mobile_sidebar_chat_info">
          <h2>
            {" "}
            {name} &nbsp;{" "}
            {newMessages > 0 && (
              <Chip
                size="small"
                label={newMessages}
                color="primary"
                style={{ height: "14px", fontSize: "12px" }}
              />
            )}{" "}
          </h2>
          <p className="mobile_sidebar_chat_elipse"> {lastMessage} </p>
          <p style={{ marginTop: "5px" }}>
            {" "}
            Last Active: {moment(lastMessageAt).format("lll")}{" "}
          </p>
        </div>
      </div>
    </Link>
  );
};

export default SidebarChat;
