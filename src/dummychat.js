export const subscriptionArray = [
    {
        "conversationId": "a37395f8-3129-4b8f-be6a-3eabe604dc67",
        "conversationName":"KonfHub Team",
        "description":"Lorem ipsum dolor sit amet, consectetur adipiscing elit. Etiam vitae pretium sapien. Proin facilisis lacus sit amet",
        "lastMessage":"Lorem ipsum dolor sit amet, consectetur adipiscing elit. Etiam vitae pretium sapien. Proin facilisis lacus sit amet",
        "lastMessageAt":"2021-05-06T19:36:04Z"
    },
    {
        "conversationId": "600ebd95-cde4-47a8-85e6-2c820776ac12",
        "conversationName":"GirlScript BLR",
        "description":"Lorem ipsum dolor sit amet, consectetur adipiscing elit. Etiam vitae pretium sapien. Proin facilisis lacus sit amet",
        "lastMessage":"Lorem ipsum dolor sit amet, consectetur adipiscing elit. Etiam vitae pretium sapien. Proin facilisis lacus sit amet",
        "lastMessageAt":"2021-05-06T19:37:04Z"
    },
    {
        "conversationId": "5e981744-43e8-4f94-bff4-f9c6dabf71ee",
        "conversationName":"Team Tanay",
        "description":"Lorem ipsum dolor sit amet, consectetur adipiscing elit. Etiam vitae pretium sapien. Proin facilisis lacus sit amet",
        "lastMessage":"Lorem ipsum dolor sit amet, consectetur adipiscing elit. Etiam vitae pretium sapien. Proin facilisis lacus sit amet",
        "lastMessageAt":"2021-05-06T19:26:04Z"
    },
    {
        "conversationId": "1a9f79b3-d357-4f4d-b4ee-856dc02ced08",
        "conversationName":"2 Nerds In Love",
        "description":"Lorem ipsum dolor sit amet, consectetur adipiscing elit. Etiam vitae pretium sapien. Proin facilisis lacus sit amet",
        "lastMessage":"Lorem ipsum dolor sit amet, consectetur adipiscing elit. Etiam vitae pretium sapien. Proin facilisis lacus sit amet",
        "lastMessageAt":"2021-05-06T19:33:04Z"
    }
]


const subscriptionDetails = {
    "authorId": "72c700a3-d5d7-4a7c-b8ae-40631c8cfc92",
    "authorName": "Smile Gupta",
    "conversationId": "1998bd49-9af3-4745-a037-d670a0757ea3",
    "message": "hi",
    "sentAt": "2021-05-07T18:06:23Z"
}

export const updateSubscriptionArray = subscriptionDetails => {
    subscriptionArray.forEach(data => {
      if (data.conversationId === subscriptionDetails.conversationId) {
        data.lastMessage = subscriptionDetails.message;
        data.lastMessageAt = subscriptionDetails.sentAt;
      }
    })
  };