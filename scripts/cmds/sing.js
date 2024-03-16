module.exports = {
  config: {
    name: "sing",
    aliases: ['music', 'sing', 'play'],
    version: "1.0",
    role: 0,
    author: "AceGun",
    cooldowns: 5,
    shortdescription: "download music from YouTube",
    longdescription: "",
    category: "music",
    usages: "{pn} <MusicName>",
    dependencies: {
      "fs-extra": "",
      "request": "",
      "axios": "",
      "ytdl-core": "",
      "yt-search": ""
    }
  },

  onStart: async ({ api, event }) => {
    const axios = require("axios");
    const fs = require("fs-extra");
    const ytdl = require("ytdl-core");
    const request = require("request");
    const yts = require("yt-search");

    const input = event.body;
    const text = input.substring(12);
    const data = input.split(" ");

    if (data.length < 2) {
      return api.sendMessage("Please specify a music name.", event.threadID);
    }

    data.shift();
    const musicName = data.join(" ");

    try {
      const searchMessage = await api.sendMessage(`✅ | Searching music for "${musicName}".\⏳ | Please wait...`, event.threadID);

      const searchResults = await yts(musicName);
      if (!searchResults.videos.length) {
        api.unsendMessage(searchMessage.messageID); // Unsend the searching message
        return api.sendMessage("No music found.", event.threadID, event.messageID);
      }

      const music = searchResults.videos[0];
      const musicUrl = music.url;

      const stream = ytdl(musicUrl, { filter: "audioonly" });

      const fileName = `${event.senderID}.mp3`;
      const filePath = __dirname + `/cache/${fileName}`;

      stream.pipe(fs.createWriteStream(filePath));

      stream.on('response', () => {
        console.info('[DOWNLOADER]', 'Starting download now!');
      });

      stream.on('info', (info) => {
        console.info('[DOWNLOADER]', `Downloading music: ${info.videoDetails.title}`);
      });

      stream.on('end', () => {
        console.info('[DOWNLOADER] Downloaded');

        if (fs.statSync(filePath).size > 104857600) {
          fs.unlinkSync(filePath);
          return api.sendMessage('❌ | The file could not be sent because it is larger than 100MB.', event.threadID);
        }

        const message = {
          body: `💁‍♀️ | Here's your music\n\n🔮 | Title: ${music.title}\n⏰ | Duration: ${music.duration.timestamp}`,
          attachment: fs.createReadStream(filePath)
        };

        api.sendMessage(message, event.threadID, () => {
          fs.unlinkSync(filePath);
          api.unsendMessage(searchMessage.messageID); // Unsend the searching message
        });
      });
    } catch (error) {
      console.error('[ERROR]', error);
      api.sendMessage('🥺 | An error occurred while processing the command.', event.threadID);
    }
  }
};