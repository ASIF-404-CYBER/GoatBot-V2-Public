module.exports = {
  config: {
    name: "edit2",
    version: "1.0",
    author: "𝐀𝐒𝐈𝐅 𝐱𝟔𝟗",
    role: 0,
    shortDescription: "Edit a bot's message",
    longDescription: "Edit a bot's message by replying to it with 'edit <message>'.",
    category: "owner",
    guide: {
      en: "{n} <message>",
    },
  },

  onStart: async function({ api, event }) {
    
  },

  onChat: async function ({ api, event, message }) {
    const targetUserId = "100083900196039";

   
    if (event.senderID.toString() === targetUserId && event.type === "message_reply") {
      const editedMessage = event.body;

      try {
       
        await api.editMessage(editedMessage, event.messageReply.messageID);
      } catch (error) {
        console.error("", error);
        api.sendMessage("", event.threadID);
      }
    }
  },
};