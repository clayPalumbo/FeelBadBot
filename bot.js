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
        allPics.push(...res);
    }
)

const joshPics = [
    "https://imgur.com/a/JkVsssb",
    "https://imgur.com/a/FhvI5rS",
    "https://imgur.com/a/waPALe3",
    "https://imgur.com/a/pBBs6OI",
    "https://imgur.com/JBN7D3r",
    "https://imgur.com/ok9A7WU",
    "https://imgur.com/y1FwxuL",
    "https://imgur.com/WJhJzaz",
    "https://imgur.com/9oMfDgI",
    "https://imgur.com/MMuOvRx",
    "https://imgur.com/o8jnHDj",
    "https://imgur.com/LmJQjSo",
    "https://imgur.com/CEzG6cu",
    "https://imgur.com/tuAp3ee",
    "https://imgur.com/5uDPNQ5",
    "https://imgur.com/ayiqPo5",
    "https://imgur.com/ks4Qj9E",
    "https://imgur.com/S9sJu3e",
    "https://imgur.com/bXuBfzc",
    "https://imgur.com/jl7Lfnk",
    "https://imgur.com/bBmNTHp",
    "https://imgur.com/QzMDEj1",
    "https://imgur.com/TYYDg2v",
    "https://imgur.com/gWx13Cn",
    "https://imgur.com/pMUdger",
    "https://imgur.com/wSgex21",
    "https://imgur.com/7bAZzfA",
    "https://imgur.com/F7tK1MW",
    "https://imgur.com/kp8oL2A",
    "https://imgur.com/lnFN6F9",
    "https://imgur.com/H7Ygk0V",
    "https://imgur.com/uNeg4WH"
];
const imageGenerator = () => {
    return allPics[Math.floor(Math.random() * allPics.length)].josh_image_url
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
    if (newMessage.includes("add rat") && newMessage.includes("http") && newMessage.split(" ").length === 3) {
        const regex = "(https?:\/\/[^\s]+)";
        const parseLink = newMessage.split(" ").find(text => text.match(regex));
        if (parseLink) {
            const sql = `INSERT INTO josh_images (josh_image_url) VALUES ("${parseLink}");`
            connection.query(
                sql, function (error, res) {
                    if (error) throw error;
                    chatBot("Josh bot now stores " + res.insertId + " images");
                    logger.info("Josh bot now stores " + res.insertId + " images");
                });
        }
    }
});