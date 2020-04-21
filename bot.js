var Discord = require('discord.io');
var logger = require('winston');
require('dotenv').config()
// Configure logger settings
logger.remove(logger.transports.Console);
logger.add(new logger.transports.Console, {
    colorize: true
});
logger.level = 'debug';
// Initialize Discord Bot
var bot = new Discord.Client({
   token: process.env.BOT_TOKEN,
   autorun: true
});
console.log(bot);
console.log("Bot is running!");
const insultArray = ['Lmao, literally all your friends have jobs. PATHETIC', 'Well if it makes you feel better I have 2 degrees', "Wow, I really don't have time for this due to the job I have"]
const joshPics = ["https://imgur.com/a/JkVsssb","https://imgur.com/a/FhvI5rS","https://imgur.com/a/waPALe3","https://imgur.com/a/pBBs6OI","https://imgur.com/JBN7D3r","https://imgur.com/ok9A7WU","https://imgur.com/y1FwxuL","https://imgur.com/WJhJzaz","https://imgur.com/9oMfDgI","https://imgur.com/MMuOvRx","https://imgur.com/o8jnHDj","https://imgur.com/LmJQjSo","https://imgur.com/CEzG6cu","https://imgur.com/tuAp3ee","https://imgur.com/5uDPNQ5","https://imgur.com/ayiqPo5","https://imgur.com/ks4Qj9E","https://imgur.com/S9sJu3e","https://imgur.com/bXuBfzc","https://imgur.com/jl7Lfnk","https://imgur.com/bBmNTHp","https://imgur.com/QzMDEj1","https://imgur.com/TYYDg2v","https://imgur.com/gWx13Cn","https://imgur.com/pMUdger","https://imgur.com/wSgex21","https://imgur.com/7bAZzfA","https://imgur.com/F7tK1MW","https://imgur.com/kp8oL2A","https://imgur.com/lnFN6F9","https://imgur.com/H7Ygk0V","https://imgur.com/uNeg4WH"];
const allPics = ["https://i.imgur.com/ljkeubG.jpg","https://i.imgur.com/dHEZNQW.jpg","https://i.imgur.com/zrdmo12.jpg","https://i.imgur.com/yRUxCoB.jpg","https://i.imgur.com/31GbIGk.jpg","https://i.imgur.com/4fLx5kb.jpg","https://cdn.discordapp.com/attachments/535290786619719683/701981503026102292/image0.png","https://cdn.discordapp.com/attachments/535290786619719683/701981213400760410/image0.jpg","https://cdn.discordapp.com/attachments/535290786619719683/701979496022016061/image0.png","https://cdn.discordapp.com/attachments/535290786619719683/701977512414150656/image0.jpg","https://cdn.discordapp.com/attachments/535290786619719683/701977342339317799/image0.png","https://cdn.discordapp.com/attachments/535290786619719683/701951638491103324/image0.png","https://media.discordapp.net/attachments/535290786619719683/701964810392305674/IMG_0273.JPG?width=579&height=1139","https://cdn.discordapp.com/attachments/535290786619719683/701951638491103324/image0.png","https://cdn.discordapp.com/attachments/535290786619719683/701954393548914778/image0.png","https://cdn.discordapp.com/attachments/535290786619719683/701951840035536936/image0.png","https://i.imgur.com/HaiccB0.jpg", "https://i.imgur.com/raw2Dl2.jpg", "https://i.imgur.com/nSmPgF7.jpg", "https://i.imgur.com/sV3Mdh9.jpg","https://i.imgur.com/WZ3ZzFJ.jpg", "https://i.imgur.com/dVqoGu5.jpg", "https://i.imgur.com/N0HFGfy.jpg", "https://i.imgur.com/rdE5XBT.png", "https://i.imgur.com/C7lguoN.jpg", "https://i.imgur.com/pfRlAWc.jpg","https://i.imgur.com/VqO0thH.jpg", "https://i.imgur.com/3CFEM8O.jpg", "https://i.imgur.com/daHJUe1.jpg", "https://i.imgur.com/1Cst8Pp.jpg", "https://i.imgur.com/Pq6qyoq.jpg", "https://i.imgur.com/Y9BLmEk.jpg"]
const gayArray = ["yes", "no"];

// const now = new Date();
// let millisTill10 = new Date(now.getFullYear(), now.getMonth(), now.getDate(), 18, 54, 0, 0) - now;
// console.log(millisTill10);
// if (millisTill10 < 0) {
//      millisTill10 += 86400000; // it's after 10am, try 10am tomorrow.
// }
const insultGenerator = () => {
    return insultArray[Math.floor(Math.random() * insultArray.length)]
}
const imageGenerator = () => {
    return allPics[Math.floor(Math.random() * allPics.length)]
}

const diceGenerator = (num) => {
    const amount = Number(num);
    const number = Math.floor(Math.random() * amount);
    return "```# " + number + "\n" + "Details: d" + amount + " (" + number + ")" + "```";
}

bot.on('ready', function (evt) {
    const channelId = "535290786619719683"
    logger.info('Connected');
    logger.info('Logged in as: ');
    logger.info(bot.username + ' - (' + bot.id + ')');
});
bot.on('message', function (user, userID, channelID, message, evt) {
    const chatBot = (message) => {
        bot.sendMessage({
            to: channelID,
            message: message
        }); 
    }

    let newMessage = message.toLowerCase();

    if (newMessage.substring(0, 2) == '$d' ) {
       const response = diceGenerator(newMessage.substring(2));
       chatBot(response);
    }

    if (newMessage.substring(0, 1) == '$') {
        let insult = insultGenerator();

        if (newMessage.substring(1) === "help") {
            const message = `Talk to me, I am Joshua Altier:\n
            - Say rat`
            chatBot(message);
        }

        if (newMessage.includes("gay") && (newMessage.includes("is") || newMessage.includes("am"))) {
            const message = gayArray[Math.floor(Math.random() * 2)]
            chatBot(message);
        }
     }
     if (newMessage.includes("rat")) {
        const image = imageGenerator();
        chatBot(image);
     }

     if (newMessage.includes("swag")) {
        const message = `${user} spank me`;
        chatBot(message);
     }
});