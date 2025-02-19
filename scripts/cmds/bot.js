const fs = require("fs-extra");
module.exports = {
config: {
		name: "bot",
    version: "1.0",
		author: "Joy-Ahmed",
		countDown: 5,
		role: 0,
		shortDescription: "Joy",
		longDescription: "Bot Will Reply You In Engish/Bangla Language",
		category: "no prefix",
		guide: {
      en: "{p}{n}",
    }
	},

 onStart: async function ({  }) { },
  onChat: async function ({ api, event, args, Threads, userData }) {
  
  var { threadID, messageID, senderID } = event;
  const moment = require("moment-timezone");
  const time = moment.tz("Asia/Dhaka").format("HH:MM:ss L");
  var idgr = `${event.threadID}`;
  var id = event.senderID;

  var Messages = ["Hey You, Yes You, You Are So Beautiful", "i Love You🙂", "Yes Dear, I Am Here...😗", "I Love you", "Miss YoU Beppy", "😁Smile I am Taking Selfy✌️🤳", "Block Your Babe And Purpose me 🙂💔", "Block Kardo Mujhe Warna Pyaar Hojayega💋", "I See You Inside Everyone", "That's Why I Love Everyone As More As You🤭", "Nope But, My Heart Is Falling For You My Preety Boyyy🙌✨", "Everybody Wanna Steal My Boyy😫", "আমি আপনাকে কিভাবে সাহায্য করতে পারি...? 🤔", "আদেশ করুন বস...🙂", "হুম শুনছি আমি আপনি বলুন 😐", "আমার সব কমান্ড দেখতে *help টাইপ করুন ✅", "Ji bolen ki korte pari ami apnar jonno...?", "আদেশ করুন যাহাপানা 😎", "আবার যদি আমারে বট কইয়া ডাক দেছ তাইলে তোর বিয়ে হবে না 🫤😏", "I am your personal assistant", "তুই বট তোর নানি বট 😤 তোর কত বড় সাহস তুই আমারে বট কস 😤 তোর টা খাই নাকি পড়ি যে তুই আমারে বট কস 😤", "আপনার কি চরিত্রে সমস্যা যে এতো বার আমাকে ডাকতেছেন 🤨", "ডাকছোত কেন ফাস্ট কো 😒", "তুমি কি আমাকে ডেকেছো...? 😇"];

    var JOY = Messages[Math.floor(Math.random() * Messages.length)]
  
  if (event.body.indexOf("Bot") == 0 || (event.body.toLowerCase() == "বট") || (event.body.indexOf("bot") == 0)) {
    var msg = {
      body: ` ${JOY}`
    }
    return api.sendMessage(msg, threadID, messageID);
  }
}
};
