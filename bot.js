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
console.log(bot);
const insultArray = ['Lmao, literally all your friends have jobs. PATHETIC', 'Well if it makes you feel better I have 2 degrees', "Wow, I really don't have time for this due to the job I have"]
const joshPics = ["https://imgur.com/a/pBBs6OI","https://imgur.com/JBN7D3r","https://imgur.com/ok9A7WU","https://imgur.com/y1FwxuL","https://imgur.com/WJhJzaz","https://imgur.com/9oMfDgI","https://imgur.com/MMuOvRx","https://imgur.com/o8jnHDj","https://imgur.com/LmJQjSo","https://imgur.com/CEzG6cu","https://imgur.com/tuAp3ee","https://imgur.com/5uDPNQ5","https://imgur.com/ayiqPo5","https://imgur.com/ks4Qj9E","https://imgur.com/S9sJu3e","https://imgur.com/bXuBfzc","https://imgur.com/jl7Lfnk","https://imgur.com/bBmNTHp","https://imgur.com/QzMDEj1","https://imgur.com/TYYDg2v","https://imgur.com/gWx13Cn","https://imgur.com/pMUdger","https://imgur.com/wSgex21","https://imgur.com/7bAZzfA","https://imgur.com/F7tK1MW","https://imgur.com/kp8oL2A","https://imgur.com/lnFN6F9","https://imgur.com/H7Ygk0V","https://imgur.com/uNeg4WH"]
const insultGenerator = () => {
    return insultArray[Math.floor(Math.random() * insultArray.length)]
}
const imageGenerator = () => {
    return joshPics[Math.floor(Math.random() * joshPics.length)]
}
bot.on('ready', function (evt) {
    console.log("Connected");
    logger.info('Connected');
    logger.info('Logged in as: ');
    logger.info(bot.username + ' - (' + bot.id + ')');
});
bot.on('message', function (user, userID, channelID, message, evt) {
    // Our bot needs to know if it will execute a command
    // It will listen for messages that will start with `!`
    if (message.substring(0, 1) == '$') {
        var args = message.substring(1).split(' ');
        let wordCount = 0;
        let insult = insultGenerator();
        args.forEach(arg => {
            if (arg == "lost") {
                wordCount++
            }
            if (arg == "job") {
                wordCount++
            }
        })
        if (message.substring(1) === "help") {
            bot.sendMessage({
                to: channelID,
                message: "Talk to me, I am Joshua Altier:\n - is josh bad at cod? \n - Let me know you lost your job\n - Mention my name at anytime\n - P.S. make sure to add a '$' before your message\n\n Example: $ Bad news, I lost my job "
            }); 
        }


        if (message.substring(1) === "is josh bad at cod?") {
            bot.sendMessage({
                to: channelID,
                message: "How dare you say that, I am a true gamer"
            }); 
        }

        if (wordCount >= 2) {
            bot.sendMessage({
                to: channelID,
                message: insult
            }); 
        }
     }
     if (message.substring(0, 1) !== '$' && message.includes("josh")) {
        let image = imageGenerator();

        bot.sendMessage({
            to: channelID,
            message: image
        }); 
     }
});