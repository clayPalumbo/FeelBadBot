var Discord = require('discord.io');
var logger = require('winston');
var mysql = require('mysql');
var checkWord = require('check-word');

const isItReal = checkWord('en');

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

const channelId = "535290786619719683"

var connection = mysql.createConnection({
    host: process.env.MYSQL_HOST,
    user: process.env.MYSQL_USER,
    password: process.env.MYSQL_PASS,
    database: 'josh_bot'
});

connection.connect();

let allPics = [];

const selectAll = `SELECT * FROM josh_images`;

connection.query(
    selectAll, function (error, res) {
        if (error) throw error;
        const newData = res.map(result => result.josh_image_url)
        allPics.push(...newData);
        connection.end();
    }
)

const imageGenerator = () => {
    console.log(allPics.length);
    return allPics[Math.floor(Math.random() * allPics.length)];
}

const diceGenerator = (num) => {
    let newNum = 0;
    const numArr = num.split(" ");
    numArr.map(num => {
        if (Number.isInteger(Number(num))) {
            newNum += Number(num);
        }
    })
    const selectedNumber = Math.floor(Math.random() * newNum);
    return "```# " + (selectedNumber + 1) + "\n" + "Details: d" + num + " (" + (selectedNumber + 1) + ")" + "```";
}

const arraysEqual = (a,b) => {
    if (a.length === b.length) {
        return a.filter((val, i) => val === b[i]).length === a.length;
    } else {
        return false;
    }
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

    if (newMessage.substring(0, 2) == '$d') {
        const response = diceGenerator(newMessage.substring(2));
        chatBot(response);
    }

    if (newMessage.substring(0, 1) == '$') {
        if (newMessage.substring(1) === "help") {
            const message = "```" + `Talk to me, I am Joshua Altier:\n
            * Say rat\n
            * Say two words after joshbot\n
              Example: joshbot ebitda diddy \n` + "```"
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
        // find vowel in first 3 letters
        // depending on vowel placement and whether or not both words start with consonant will decide how this is handled
        if (messageArr.length === 2) {
            const vowelIndex = messageArr.map(word => {
                return word.split("").findIndex(element => element.match(vowelRegex));
            })
            logger.info(messageArr, vowelIndex);

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
        } 
        // else if (!messageArr.every(word => {
        //     isItReal.check(word)
        //     //add list of peoples names in discord
        // })) {
        //     chatBot("learn to spell idiot")
        // } 
        else {
            chatBot("Only can handle two words right now")
        }

        // if word starts with vowel take other word starting with consonant
        
        // if more than 3 words starting with consonant randomize

        // 
    }
    if (newMessage.includes("rat") && !newMessage.includes("add rat")) {
        const image = imageGenerator();
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