module.exports = {
  config: {
    name: 'uptime',
    aliases: ['upt'],
    role: 0,
    category: 'uptime',
    guide: {
      en: '{pn}'
    },
    author: 'UPoL🐔'
  },
  onStart: async function ({ api, event }) {
      const moment = require('moment-timezone');
      const getTime = moment.tz('Asia/Dhaka').format('hh:mm:ss A');
      const dayName = moment().format('dddd');
      
      const currentDate = new Date();
      const day = currentDate.getDate();
      const mon = currentDate.getMonth() + 1;
      const yr = currentDate.getFullYear();
      
      const uptime = process.uptime();
      const days = Math.floor(uptime / (60 * 60 * 24));
      const hours = Math.floor((uptime % (60 * 60 * 24)) / (60 * 60));
      const minutes = Math.floor((uptime % (60 * 60)) / 60);
      const seconds = Math.floor(uptime % 60); 
      const freeMemory = (process.memoryUsage().heapUsed / 1024 / 1024).toFixed(2);
      const totalMemory = (process.memoryUsage().heapTotal / 1024 / 1024).toFixed(2);
      
      // Measure ping by making an API call
      const timeStart = Date.now();
      await api.getUserInfo(event.senderID); // Making an API call to get the user info
      const ping = Date.now() - timeStart;

      // Combined response
      api.sendMessage(
        `⏳ Bot running time: ${days} days ${hours} hours ${minutes} minutes ${seconds} seconds\n🌐 Ping ${ping} ms\n💾 Memory Used: ${freeMemory} MB out of ${totalMemory} MB\n\n✨ Other Information ✨\n🕛 Time: ${getTime}\n📅 Date: ${day} - ${mon} - ${yr}\n📝 Day Name: ${dayName}`, 
        event.threadID
      );
  }
};
