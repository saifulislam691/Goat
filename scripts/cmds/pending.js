module.exports = {
  config: {
    name: "pending",
    version: "1.0",
    author: "ArYan 🐔",
    countDown: 5,
    role: 2,
    shortDescription: {
      vi: "",
      en: ""
    },
    longDescription: {
      vi: "",
      en: ""
    },
    category: "ArYan"
  },

langs: {
    en: {
        invaildNumber: "%1 is not an invalid number",
        cancelSuccess: "Refused %1 thread!",
        approveSuccess: "Approved successfully %1 threads!",

        cantGetPendingList: "Can't get the pending list!",
        returnListPending: "»「PENDING」«❮ The whole number of threads to approve is: %1 thread ❯\n\n%2",
        returnListClean: "「PENDING」There is no thread in the pending list"
    }
  },

onReply: async function({ api, event, Reply, getLang, commandName, prefix }) {
    if (String(event.senderID) !== String(Reply.author)) return;
    const { body, threadID, messageID } = event;
    var count = 0;

    if (isNaN(body) && body.indexOf("c") == 0 || body.indexOf("cancel") == 0) {
        const index = (body.slice(1, body.length)).split(/\s+/);
        for (const ArYanIndex of index) {
            console.log(ArYanIndex);
            if (isNaN(ArYanIndex) || ArYanIndex <= 0 || ArYanIndex > Reply.pending.length) return api.sendMessage(getLang("invaildNumber", ArYanIndex), threadID, messageID);
            api.removeUserFromGroup(api.getCurrentUserID(), Reply.pending[ArYanIndex - 1].threadID);
            count+=1;
        }
        return api.sendMessage(getLang("cancelSuccess", count), threadID, messageID);
    }
    else {
        const index = body.split(/\s+/);
        for (const ArYanIndex of index) {
            if (isNaN(ArYanIndex) || ArYanIndex <= 0 || ArYanIndex > Reply.pending.length) return api.sendMessage(getLang("invaildNumber", ArYanIndex), threadID, messageID);
            api.sendMessage(`𝗕𝗢𝗧 𝗔𝗣𝗣𝗥𝗢𝗩𝗘 𝗦𝗨𝗖𝗖𝗘𝗦\n\n𝗕𝗼𝘁 𝗔𝗱𝗺𝗶𝗻: 𝗝𝗼𝘆 𝗔𝗵𝗺𝗲𝗱\n\n𝗙𝗮𝗰𝗲𝗯𝗼𝗼𝗸:https://www.facebook.com/profile.php?id=100000121528628`, Reply.pending[ArYanIndex - 1].threadID);
            count+=1;
        }
        return api.sendMessage(getLang("approveSuccess", count), threadID, messageID);
    }
},

onStart: async function({ api, event, getLang, commandName }) {
  const { threadID, messageID } = event;

    var msg = "", index = 1;

    try {
    var spam = await api.getThreadList(100, null, ["OTHER"]) || [];
