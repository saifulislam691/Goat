const axios = require("axios");
const fs = require("fs-extra");
const request = require("request");

module.exports = {
  config: {
    name: "allgroup",
    version: "3.0", 
    author: "Joy-Ahmed",
    countDown: 5,
    role: 2,
    shortDescription: "Join the group that bot is in",
    longDescription: "",
    category: "user",
    guide: {
      en: "{p}{n}",
    },
  },

  onStart: async function ({ api, event }) {
    try {
      const groupList = await api.getThreadList(300, null, ['INBOX']); 

      const filteredList = groupList.filter(group => group.threadName !== null);

      if (filteredList.length === 0) {
        api.sendMessage('No group chats found.', event.threadID);
      } else {
        const formattedList = filteredList.map((group, index) =>
          `╰➤${index + 1}. ${group.threadName}\n╰➤𝐓𝐈𝐃: ${group.threadID}`
        );

  
        const start = 0;
        const currentList = formattedList.slice(start, start + 50);

        const message = `╔╝𝐀𝐥𝐥-𝐠𝐫𝐨𝐮𝐩-𝐥𝐢𝐬𝐭╚╗\n━━━━━━━━━━━━━━━━━━━━━━\n\n${currentList.join("\n\n")}\n\n━━━━━━━━━━━━━━━━━━━━━`;

        const sentMessage = await api.sendMessage(message, event.threadID);
        global.GoatBot.onReply.set(sentMessage.messageID, {
          commandName: 'join',
          messageID: sentMessage.messageID,
          author: event.senderID,
          start,
        });
      }
    } catch (error) {
      console.error("Error listing group chats", error);
    }
  },

  onReply: async function ({ api, event, Reply, args }) {
    const { author, commandName, start } = Reply;

    if (event.senderID !== author) {
      return;
    }

    const userInput = args.join(" ").trim().toLowerCase();

    if (userInput === 'next') {
    
      const nextPageStart = start + 50;
      const nextPageEnd = nextPageStart + 50;

      try {
        const groupList = await api.getThreadList(300, null, ['INBOX']);
        const filteredList = groupList.filter(group => group.threadName !== null);

        if (nextPageStart >= filteredList.length) {
          api.sendMessage('End of list reached.', event.threadID, event.messageID);
          return;
        }

        const currentList = filteredList.slice(nextPageStart, nextPageEnd).map((group, index) =>
          `${nextPageStart + index + 1}. ${group.threadName}\n𝐓𝐈𝐃: ${group.threadID}`
        );

        const message = `╔╝𝐀𝐥𝐥-𝐠𝐫𝐨𝐮𝐩-𝐥𝐢𝐬𝐭╚╗\n━━━━━━━━━━━━━━━━━━━━━━\n\n${currentList.join("\n\n")}\n\n━━━━━━━━━━━━━━━━━━━━━`;

        const sentMessage = await api.sendMessage(message, event.threadID);
        global.GoatBot.onReply.set(sentMessage.messageID, {
          commandName: 'join',
          messageID: sentMessage.messageID,
          author: event.senderID,
          start: nextPageStart,
        });

      } catch (error) {
        console.error("Error listing group chats", error);
        api.sendMessage('An error occurred while listing group chats.', event.threadID, event.messageID);
      }

    } else if (userInput === 'previous') {
     
      const prevPageStart = Math.max(start - 50, 0);
      const prevPageEnd = prevPageStart + 50;

      try {
        const groupList = await api.getThreadList(300, null, ['INBOX']);
        const filteredList = groupList.filter(group => group.threadName !== null);

        if (prevPageStart < 0) {
          api.sendMessage('Already at the beginning of the list.', event.threadID, event.messageID);
          return;
        }

        const currentList = filteredList.slice(prevPageStart, prevPageEnd).map((group, index) =>
          `${prevPageStart + index + 1}. ${group.threadName}\n𝐓𝐈𝐃: ${group.threadID}`
        );

        const message = `╔╝𝐀𝐥𝐥-𝐠𝐫𝐨𝐮𝐩-𝐥𝐢𝐬𝐭╚╗\n━━━━━━━━━━━━━━━━━━━━━━\n\n${currentList.join("\n\n")}\n\n━━━━━━━━━━━━━━━━━━━━━`;

        const sentMessage = await api.sendMessage(message, event.threadID);
        global.GoatBot.onReply.set(sentMessage.messageID, {
          commandName: 'join',
          messageID: sentMessage.messageID,
          author: event.senderID,
          start: prevPageStart,
        });

      } catch (error) {
        console.error("Error listing group chats", error);
        api.sendMessage('An error occurred while listing group chats.', event.threadID, event.messageID);
      }

    } else if (!isNaN(userInput)) {
     
      const groupIndex = parseInt(userInput, 10);

      try {
        const groupList = await api.getThreadList(300, null, ['INBOX']);
        const filteredList = groupList.filter(group => group.threadName !== null);

        if (groupIndex <= 0 || groupIndex > filteredList.length) {
          api.sendMessage('Invalid group number.\nPlease choose a number within the range.', event.threadID, event.messageID);
          return;
        }

        const selectedGroup = filteredList[groupIndex - 1];
        const groupID = selectedGroup.threadID;

        await api.addUserToGroup(event.senderID, groupID);
        api.sendMessage(`You have joined the group chat: ${selectedGroup.threadName}`, event.threadID, event.messageID);

      } catch (error) {
        console.error("Error joining group chat", error);
        api.sendMessage('An error occurred while joining the group chat.\nPlease try again later.', event.threadID, event.messageID);
      }

    } else {
      api.sendMessage('Invalid input.\nPlease provide a valid number or reply with "next" or "previous".', event.threadID, event.messageID);
    }

    
    global.GoatBot.onReply.delete(event.messageID);
  },
};
