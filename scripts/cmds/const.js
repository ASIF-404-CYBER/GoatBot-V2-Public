axios = require("axios");

module.exports = {
  config: {
    name: "bby2",
    version: "1.2",
    author: "Samuel",
    countDown: 5,
    role: 0,
    shortDescription: "simsimi",
    longDescription: {
      vi: "Chat với simsimi",
      en: "Chat with simsimi",
    },
    category: "funny",
    guide: {
      vi: "{pn} [on | off]: bật/tắt simsimi\ord>: chat nhanh với simsimi\hi",
      en: "{pn} <word>: chat with Alfred\t with a mple: hi",
    },
  },

  langs: {
    vi: {
      turnedOn: "Bật simsimi thành công!",
      turnedOff: "Tắt simsimi thành công!",
      chatting: "Đang chat với Alfred...",
      error: "Alfred đang bận, bạn hãy thử lại sau",
    },
    en: {
      turnedOn: "Turned on Chat successfully!",
      turnedOff: "Turned off Chat successfully!",
      chatting: "Already Chatting with Alfred... :) ",
      error: "You Suck Your Daddy's Saggy Balls Dumbass?🙂",
    },
  },

  onStart: async function ({ args, threadsData, message, event, getLang }) {
    if (args[0] == "on" || args[0] == "off") {
      await threadsData.set(event.threadID, args[0] == "on", "settings.simsimi");
      return message.reply(args[0] == "on" ? getLang("turnedOn") : getLang("turnedOff"));
    } else if (args[0]) {
      const yourMessage = args.join(" ");
      try {
        const responseMessage = await getMessage(yourMessage);
        return message.reply(`${responseMessage}`);
      } catch (err) {
        console.log(err);
        return message.reply(getLang("error"));
      }
    }
  },

  onChat: async function ({ args, message, threadsData, event, isUserCallCommand, getLang }) {
    if (args.length > 1 && !isUserCallCommand && (await threadsData.get(event.threadID, "settings.simsimi"))) {
      try {
        const langCode =(await threadsData.get(event.threadID, "settings.lang")) || global.GoatBot.config.language;
        const responseMessage = await getMessage(args.join(" "), langCode);
        return message.reply(`${responseMessage}`);
      } catch (err) {
        return message.reply(getLang("error"));
      }
    }
  },
};

async function getMessage(yourMessage, langCode) {
  const res = await axios.post(
    "https://api.simsimi.vn/v1/simtalk",
    new URLSearchParams({
      text: yourMessage,
      lc: langCode,
    })
  );

  if (res.status >= 200 && res.status < 300) {
    return res.data.message;
  } else {
    throw new Error(res.data.success);
  }
  }