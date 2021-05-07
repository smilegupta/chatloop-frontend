import { v4 as uuidv4 } from "uuid";
import moment from "moment";

export const GetUserDetails = {
  query: `query GetUserDetails {
        listUserss(userId: "86de105c-2c17-41ef-8b90-a4c1871999cb") {
          items {
            userId
            name
            profileImage
            theme
            createdAt
            conversations {
              items {
                conversationId
                conversationName
                conversationImage
                conversationType
                lastMessage
                lastMessageAt
              }
              nextToken
            }
          }
        }
      }`,
};

export const listAllChatRooms = {
  query: `query ListChatRooms {
        listChatRoomss {
          items {
            chatRoomId
            chatRoomImage
            name
          }
        }
      }
      `,
};

export const createUser = (userId, name, profileImage) => {
  const query = {
    query: `mutation create {
      createUsers(input : {
        name: "${name}",
        userId: "${userId}",
        profileImage: "${profileImage}"
      })
      {
        userId
        }
      }
		  `,
  };
  return query;
};

export const listUserDetails = (userId) => {
  const query = {
    query: `query listUserDetails {
      listUserss(userId: "${userId}") {
        items {
          name
          profileImage
          userId
          conversations {
            items {
              conversationId
              conversationImage
              conversationName
              conversationType
              lastMessage
              lastMessageAt
              description
            }
          }
        }
      }
    }`,
  };
  return query;
};

export const createChatRoom = (userId, chatName, description) => {
  const chatId = uuidv4();
  const query = {
    query: `mutation MyMutation {
      createChatRooms(
        input: {chatRoomId: "${chatId}", createdBy: "${userId}", description: "${description}", name: "${chatName}", chatRoomImage: "https://avatars.dicebear.com/api/jdenticon/${Math.floor(
      Math.random() * 5000
    )}.svg"}
      ) {
        chatRoomId
        chatRoomImage
      }
    }`,
  };
  return query;
};

export const sendMessage = (
  name,
  chatId,
  chatName,
  userId,
  chatRoomImage,
  message,
  description,
  conversationType
) => {
  const query = {
    query: `mutation sendMessage {
      sendMessage(
        authorName: "${name}"
        conversationId: "${chatId}"
        conversationImage: "${chatRoomImage}"
        conversationType: ${conversationType}
        authorId: "${userId}"
        message: "${message}"
        description: "${description}"
        sentAt: "${moment.utc(new Date()).format()}"
        conversationName: "${chatName}"
      ) {
        authorId
        authorName
        conversationId
        conversationName
        message
        messageId
        sentAt
      }
    }`,
  };
  return query;
};

export const getMessages = (chatId) => {
  const query = {
    query: `query getmessages {
      listMessagess(conversationId: "${chatId}") {
        items {
          authorId
          authorName
          message
          messageId
          sentAt
        }
      }
    }
    `,
  };
  return query;
};
