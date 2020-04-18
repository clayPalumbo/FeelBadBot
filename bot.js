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
const insultGenerator = () => {
    return insultArray[Math.floor(Math.random() * insultArray.length)]
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
    if (message.substring(0, 1) == '!') {
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

        if (wordCount >= 2) {
            bot.sendMessage({
                to: channelID,
                message: insult
            }); 
        }
     }
});