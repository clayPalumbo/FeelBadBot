var mysql = require('mysql');
require('dotenv').config()

var connection = mysql.createConnection({
    host     : process.env.MYSQL_HOST,
    user     : process.env.MYSQL_USER,
    password : process.env.MYSQL_PASS,
    database : 'josh_bot'
  });

connection.connect();
const sql = `SELECT * FROM josh_images`
let allPics = []
connection.query(
    sql, function (error, res) {
        if (error) throw error;
        console.log(res.length);
        allPics.push(...res);
        connection.end();
    }
)
setTimeout(() => {
    console.log(allPics);
}, 1000)
