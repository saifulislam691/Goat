const axios = require('axios');

module.exports = {
  config: {
    name: "dance",
    version: "1.0",
    author: "Joy-Ahmed",
    countDown: 5,
    role: 0,
    shortDescription: "Dance",
    longDescription: "Anime Dance",
    category: "anime",
    guide: "{pn}"
  },

  onStart: async function ({ message, args }) {
      const BASE_URL = `https://joyapi.onrender.com/random`;
 message.reply(" "); 
      try {
        let res = await axios.get(BASE_URL)
        let dance = res.data.url;
        const form = {
          body: `𝐋𝐞𝐭𝐬 𝐃𝐚𝐧𝐜𝐞 𝐊𝐨𝐫𝐨\n𝐀𝐩𝐢 𝐁𝐲 𝐉𝐨𝐲 𝐀𝐡𝐦𝐞𝐝`
        };
     if (dance)
          form.attachment = await global.utils.getStreamFromURL(dance);
        message.reply(form); 
      } catch (e) { message.reply(`An Error Occured While Processing Your Request.`)
 console.log(e);
 }

    }
  };
