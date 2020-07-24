var Discord = require('discord.io');
var logger = require('winston');
var mysql = require('mysql');

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
    return "```# " + selectedNumber + "\n" + "Details: d" + num + " (" + selectedNumber + ")" + "```";
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
            const message = `Talk to me, I am Joshua Altier:\n
            - Say rat`
            chatBot(message);
        }
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