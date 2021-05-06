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

export const createUser = (userId, name) => {
  const query = {
    query: `mutation create {
      createUsers(input : {
        name: "${name}",
        userId: "${userId}"
      })
      {
        userId
        }
      }
		  `,
  };
  return query;
};

