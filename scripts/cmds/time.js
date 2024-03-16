const axios = require('axios');
module.exports = {
  config: {
    name: "time",
    alliases: ["date", "day"],
    version: "1.0",
    author: "𝐀𝐒𝐈𝐅 𝐱𝟔𝟗",
    countDown: 30,
    role: 0,
    shortDescription: "See Zambia's Current Time",
    longDescription: "See Zambia's Current Time",
    category: "General",
    guide: "{pn}"
  },
  
  onStart: async function ({ api, event, args }) {
  const res = await axios.get(`https://api-timezone.samirbadaila24.repl.co/timezone`);
  var year = res.data.year;
  var month = res.data.month;
  var day = res.data.day;
  var rank = res.data.rank;
  var time = res.data.time;
  return api.sendMessage(`Today's Date: ${year}-${month}-${day} \y: ${rank} \me: ${time}`, event.threadID, event.messageID);
}
};