var Discord = require('discord.io');
var logger = require('winston');
var mysql = require('mysql');
var {arraysEqual, diceGenerator, imageGenerator } = require("./bot.service.ts");

require('dotenv').config()
// Configure logger settings
logger.remove(logger.transports.Console);
logger.level = 'debug';
// Initialize Discord Bot
var bot = new Discord.Client({
    token: process.env.BOT_TOKEN,
    autorun: true
});

const channelId = "535290786619719683"

var connection = mysql.createConnection({
    host: process.env.MYSQL_HOST,
    user: process.env.MYSQL_USER,
    password: process.env.MYSQL_PASS,
    database: 'josh_bot'
});

connection.connect();

let allPics = [];

let wordCount = 0;
let firstTime = true;

const selectAll = `SELECT * FROM josh_images`;

connection.query(
    selectAll, function (error, res) {
        if (error) throw error;
        const newData = res.map(result => result.josh_image_url)
        allPics.push(...newData);
        connection.end();
    }
)

const resetWordCount = () => {
    wordCount = 0;
    firstTime = true;
    console.log("Reset timer")
};

setInterval(resetWordCount, 1000 * 60)

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
    wordCount++


    if (newMessage.substring(0, 2) == '$d') {
        const response = diceGenerator(newMessage.substring(2));
        chatBot(response);
    }

    if (wordCount >= 10 && firstTime) {
        chatBot("Hey " + user + " how was your day?");
        firstTime = false;
    }

    if (newMessage.substring(0, 1) == '$') {
        if (newMessage.substring(1) === "help") {
            const message = "```" + `Talk to me, I am Joshua Altier:\n
            * Say ape\n
            * To use the dice feature use $d and then the number next to it\n
            * Example: $d20\n
            * Say two words after joshbot\n
              Example: joshbot ebitda diddy \n` + "```";
            chatBot(message);
        }
    }
    if(newMessage.includes("joshbot")) {
        const messageArr = newMessage.split("joshbot").pop().trim().split(" ");
        const vowelRegex = /[aeiouy]/gi;
        const startOfMessage = "Don't you mean "
        const bothConstFirstLetter = [1,1];
        const constFirstLetter = [1,0];
        const vowelFirstLetter = [0,1];
        let newMessageArr = [];

        if (messageArr.length === 2) {
            const vowelIndex = messageArr.map(word => {
                return word.split("").findIndex(element => element.match(vowelRegex));
            })
            logger.info(messageArr, vowelIndex);
            if (arraysEqual(vowelIndex, [0,0])) {
                newMessageArr.push(messageArr[1][0] + messageArr[0].substring(1));
                newMessageArr.push(messageArr[1] = messageArr[0][0] + messageArr[1].substring(1));
                chatBot("Dude words like this don't work");
            }
            if (arraysEqual(vowelIndex, bothConstFirstLetter)) {
                newMessageArr.push(messageArr[1][0] + messageArr[0].substring(1));
                newMessageArr.push(messageArr[1] = messageArr[0][0] + messageArr[1].substring(1));
                chatBot(startOfMessage + newMessageArr.join(" "));
            }
            if (arraysEqual(vowelIndex, constFirstLetter)) {
                newMessageArr.push(messageArr[0].substring(1));
                newMessageArr.push(messageArr[0][0] + messageArr[1]);
                chatBot(startOfMessage + newMessageArr.join(" "));
            }
            if (arraysEqual(vowelIndex, vowelFirstLetter)) {
                newMessageArr.push(messageArr[1][0] + messageArr[0]);
                newMessageArr.push(messageArr[1].substring(1));
                chatBot(startOfMessage + newMessageArr.join(" "));
            }     
            if (arraysEqual(vowelIndex, [0,2])) {
                newMessageArr.push(messageArr[1].slice(0,2) + messageArr[0]);
                newMessageArr.push(messageArr[1].slice(2));
                chatBot(startOfMessage + newMessageArr.join(" "));
            }   
            if (arraysEqual(vowelIndex, [1,2])) {
                newMessageArr.push(messageArr[1].slice(0,2) + messageArr[0].slice(1));
                newMessageArr.push(messageArr[0].slice(0,1) + messageArr[1].slice(2));
                chatBot(startOfMessage + newMessageArr.join(" "));
            }
            if (arraysEqual(vowelIndex, [2,1])) {
                newMessageArr.push(messageArr[1].slice(0,1) + messageArr[0].slice(2));
                newMessageArr.push(messageArr[0].slice(0,2) + messageArr[1].slice(1));
                chatBot(startOfMessage + newMessageArr.join(" "));
            }
            if (arraysEqual(vowelIndex, [2,0])) {
                newMessageArr.push(messageArr[0].slice(2));
                newMessageArr.push(messageArr[0].slice(0,2) + messageArr[1]);
                chatBot(startOfMessage + newMessageArr.join(" "));
            } 
            if (arraysEqual(vowelIndex, [2,2])) {
                newMessageArr.push(messageArr[1].slice(0,2) + messageArr[0].slice(2));
                newMessageArr.push(messageArr[0].slice(0,2) + messageArr[1].slice(2));
                chatBot(startOfMessage + newMessageArr.join(" "));
            } 
            if (arraysEqual(vowelIndex, [0,3])) {
                newMessageArr.push(messageArr[1].slice(0,3) + messageArr[0]);
                newMessageArr.push(messageArr[1].slice(3));
                chatBot(startOfMessage + newMessageArr.join(" "));
            }
            if (arraysEqual(vowelIndex, [1,3])) {
                newMessageArr.push(messageArr[1].slice(0,3) + messageArr[0].slice(1));
                newMessageArr.push(messageArr[0].slice(0, 1) + messageArr[1].slice(3));
                chatBot(startOfMessage + newMessageArr.join(" "));
            }    
            if (arraysEqual(vowelIndex, [2,3])) {
                newMessageArr.push(messageArr[1].slice(0,3) + messageArr[0].slice(2));
                newMessageArr.push(messageArr[0].slice(0,2) + messageArr[1].slice(3));
                chatBot(startOfMessage + newMessageArr.join(" "));
            }    
            if (arraysEqual(vowelIndex, [3,3])) {
                newMessageArr.push(messageArr[1].slice(0,3) + messageArr[0].slice(3));
                newMessageArr.push(messageArr[0].slice(0,3) + messageArr[1].slice(3));
                chatBot(startOfMessage + newMessageArr.join(" "));
            }    
            if (arraysEqual(vowelIndex, [3,2])) {
                newMessageArr.push(messageArr[1].slice(0,2) + messageArr[0].slice(3));
                newMessageArr.push(messageArr[0].slice(0,3) + messageArr[1].slice(2));
                chatBot(startOfMessage + newMessageArr.join(" "));
            }    
            if (arraysEqual(vowelIndex, [3,1])) {
                newMessageArr.push(messageArr[1].slice(0,1) + messageArr[0].slice(3));
                newMessageArr.push(messageArr[0].slice(0,3) + messageArr[1].slice(1));
                chatBot(startOfMessage + newMessageArr.join(" "));
            }    
            if (arraysEqual(vowelIndex, [3,0])) {
                newMessageArr.push(messageArr[0].slice(3));
                newMessageArr.push(messageArr[0].slice(0,3) + messageArr[1]);
                chatBot(startOfMessage + newMessageArr.join(" "));
            }             
        } 
        else {
            chatBot("Only can handle two words right now")
        }
    }
    if (newMessage.includes("ape") && !newMessage.includes("add rat")) {
        const image = imageGenerator(allPics);
        setTimeout(() => {
            chatBot(image);
        }, 3000);
    }
    // if (newMessage.includes("add rat") && newMessage.includes("http") && newMessage.split(" ").length === 3) {
    //     const regex = "(https?:\/\/[^\s]+)";
    //     const parseLink = newMessage.split(" ").find(text => text.match(regex));
    //     if (parseLink) {
    //         const sql = `INSERT INTO josh_images (josh_image_url) VALUES ("${parseLink}");`
    //         connection.query(
    //             sql, function (error, res) {
    //                 if (error) throw error;
    //                 chatBot("Josh bot now stores " + res.insertId + " images");
    //                 if (res.insertId === 125) {
    //                     chatBot(`Dude really 125 images ${user}, go outside and get a life`)
    //                 }
    //                 if (res.insertId === 150) {
    //                     chatBot(`Are you guys serious, 150 images? ${user}, you are paying for my cloud fees`)
    //                 }
    //                 logger.info("Josh bot now stores " + res.insertId + " images");
    //                 connection.end();
    //             });
    //     }
    // }
});