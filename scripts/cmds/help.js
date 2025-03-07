const fs = require('fs');
const path = require('path');
const { getPrefix } = global.utils;

module.exports = {
  config: {
    name: "help",
    version: "1.0",
    author: "Joy-Ahmed",
    role: 0,
    category: "help",
			shortDescription: "see the available commands",
    guide: {
      en: "{pn} [empty | <page number>]"
    }
  },

  onStart: async function ({ api, message, args, event, threadsData, getLang }) {
    const langCode = await threadsData.get(event.threadID, "data.lang") || global.GoatBot.config.language;
    const { threadID } = event;
    const threadData = await threadsData.get(threadID);
    const prefix = getPrefix(threadID);

    const page = parseInt(args[0]) || 1;
    const commandsPerPage = 10; // Adjust as needed

    const commands = await getCommandsFromDir(path.join(__dirname, '..', 'cmds'));
    const commandNames = Object.keys(commands);
    const totalPages = Math.ceil(commandNames.length / commandsPerPage);

    if (page < 1 || page > totalPages) {
      return message.reply(getLang("pageNotFound", page));
    }

    let JOY = `━━━━━━━━━━━━━━━━━━━━━━\n╔╝❮❮𝐉𝐎𝐘-𝐁𝐎𝐓❯❯╚╗\n\n ╔═════•| 💛 |•═════╗\n★𝐉𝐎𝐘-𝐁𝐎𝐓-𝐂𝐌𝐃-𝐋𝐈𝐒𝐓★\n ╚═════•| 💛 |•═════╝\n━━━━━━━━━━━━━━━━━━━━━━\n\n`;
    let currentCategory = "";
    let commandIndex = (page - 1) * commandsPerPage;
    let commandNumber = (page - 1) * commandsPerPage + 1;

    for (let i = 0; i < commandsPerPage && commandIndex < commandNames.length; i++) {
      const commandName = commandNames[commandIndex];
      const command = commands[commandName];

      if (command.config.category !== currentCategory) {
        currentCategory = command.config.category;
        JOY += `━❮●❯━━━━━❪❤️💙💚❫━━━━━❮●❯━\n\n`;
      }

      JOY += `【•${commandNumber}${commandNumber < 10 ? " " : ""} ★𝐂𝐌𝐃-𝐍𝐀𝐌𝐄★【•${command.config.name}•】\n\n`;
      commandIndex++;
      commandNumber++;
    }
   
    JOY += `\n\n━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━\n\n╭━─━──━─━≪✠≫━──━─━─━╮\n│\n│🔐𝐓𝐎𝐓𝐀𝐋- 【•${global.GoatBot.commands.size}•】 𝐂𝐎𝐌𝐌𝐀𝐍𝐃𝐒🔐\n│\n│🔐𝐁𝐎𝐓 𝐎𝐖𝐍𝐄𝐑: 𝐉𝐎𝐘 𝐀𝐇𝐌𝐄𝐃\n│\n│https://m.me/100000121528628\n│\n│m.me/100000121528628\n│\n╰━─━──━─━━──━─━─━❯❯\n\n━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━\n\n`;

    message.reply({body:JOY,attachment: await global.utils.getStreamFromURL("https://i.imgur.com/AP0ppm0.jpeg")})
  }
};

async function getCommandsFromDir(dir) {
  const commands = {};
  const files = await fs.promises.readdir(dir);

  for (const file of files) {
    if (file.endsWith('.js') && file !== 'help.js') {
      const filePath = path.join(dir, file);
      const command = require(filePath);
      commands[command.config.name] = command;
    }
  }

  return commands;
}
