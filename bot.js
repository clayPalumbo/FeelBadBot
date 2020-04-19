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
console.log("Bot is running!");
const insultArray = ['Lmao, literally all your friends have jobs. PATHETIC', 'Well if it makes you feel better I have 2 degrees', "Wow, I really don't have time for this due to the job I have"]
const joshPics = ["https://imgur.com/a/JkVsssb","https://imgur.com/a/FhvI5rS","https://imgur.com/a/waPALe3","https://imgur.com/a/pBBs6OI","https://imgur.com/JBN7D3r","https://imgur.com/ok9A7WU","https://imgur.com/y1FwxuL","https://imgur.com/WJhJzaz","https://imgur.com/9oMfDgI","https://imgur.com/MMuOvRx","https://imgur.com/o8jnHDj","https://imgur.com/LmJQjSo","https://imgur.com/CEzG6cu","https://imgur.com/tuAp3ee","https://imgur.com/5uDPNQ5","https://imgur.com/ayiqPo5","https://imgur.com/ks4Qj9E","https://imgur.com/S9sJu3e","https://imgur.com/bXuBfzc","https://imgur.com/jl7Lfnk","https://imgur.com/bBmNTHp","https://imgur.com/QzMDEj1","https://imgur.com/TYYDg2v","https://imgur.com/gWx13Cn","https://imgur.com/pMUdger","https://imgur.com/wSgex21","https://imgur.com/7bAZzfA","https://imgur.com/F7tK1MW","https://imgur.com/kp8oL2A","https://imgur.com/lnFN6F9","https://imgur.com/H7Ygk0V","https://imgur.com/uNeg4WH"]
const gayArray = ["yes", "no"]
const insultGenerator = () => {
    return insultArray[Math.floor(Math.random() * insultArray.length)]
}
const imageGenerator = () => {
    return joshPics[Math.floor(Math.random() * joshPics.length)]
}

bot.on('ready', function (evt) {
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
    if (newMessage.substring(0, 1) == '$') {
        let insult = insultGenerator();

        if (newMessage.substring(1) === "help") {
            const message = `Talk to me, I am Joshua Altier:\n 
            - $ Ask me if I am bad at cod\n 
            - $ Let me know you lost your job\n 
            - Say my name\n 
            - P.S. make sure to add a '$' before your message so I can see it\n
            Example: $ Bad news, I lost my job `

            chatBot(message);
        }

        if (newMessage.includes("gay") && (newMessage.includes("is" || newMessage.includes("am")))) {
            const message = gayArray[Math.floor(Math.random() * 2)]
            chatBot(message);
        }

        if (newMessage.includes("bad") && (newMessage.includes("call of duty") || newMessage.includes("cod"))) {
            const message = `Listen here ${user}, I am a true gamer`;
            chatBot(message);
        }

        if (newMessage.includes("lost") && newMessage.includes("job")) {
            chatBot(insult);
        }

        if (newMessage.includes("nipple")) {
            const message = `${user} suck me`;
            chatBot(message);
         }
         if (newMessage.includes("josh") && newMessage.includes("racist")) {
            const message = `Nope I will not answer that`;
            chatBot(message);
         }
     }
     if (newMessage.includes("josh")) {
        const image = imageGenerator();
        chatBot(image);
     }

     if (newMessage.includes("swag")) {
        const message = `${user} grow up dude...`;
        chatBot(message);
     }
});