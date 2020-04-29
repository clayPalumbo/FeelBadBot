var mysql = require('mysql');
require('dotenv').config()

// const allPics = [
//     ["https://media.discordapp.net/attachments/535290786619719683/703075183216427098/image0.jpg?width=855&height=1139"],[
//     "https://cdn.discordapp.com/attachments/535290786619719683/701989092929568808/image0.png"],[
//     "https://cdn.discordapp.com/attachments/535290786619719683/701989052962045972/4606967047991.jpg"],[
//     "https://cdn.discordapp.com/attachments/535290786619719683/701988887932698675/10200851049774334.jpg"],[
//     "https://cdn.discordapp.com/attachments/535290786619719683/701988073470165043/1689952164442.jpg"],[
//     "https://cdn.discordapp.com/attachments/535290786619719683/701988111881732166/1700258942105.jpg"],[
//     "https://cdn.discordapp.com/attachments/535290786619719683/701987777775927366/1402874907690.jpg"],[
//     "https://cdn.discordapp.com/attachments/535290786619719683/701987347025362979/image1.jpg"],[
//     "https://cdn.discordapp.com/attachments/535290786619719683/703066874015121508/image0.jpg"],[
//     "https://media.discordapp.net/attachments/535290786619719683/703066829328875520/image0.jpg"],[
//     "https://cdn.discordapp.com/attachments/535290786619719683/703069441415577681/image0.jpg"],[
//     "https://cdn.discordapp.com/attachments/535290786619719683/703070440276361288/Screen_Shot_2020-04-23_at_10.30.49_PM.png"],[
//     "https://cdn.discordapp.com/attachments/535290786619719683/703070682501873795/image0.png"],[
//     "https://media.discordapp.net/attachments/535290786619719683/703071167543508992/image0.jpg?width=855&height=1139"],[
//     "https://cdn.discordapp.com/attachments/535290786619719683/701987351311941652/1159178375429.jpg"],[
//     "https://cdn.discordapp.com/attachments/535290786619719683/701987347683737600/image3.png"],[
//     "https://cdn.discordapp.com/attachments/535290786619719683/701986727627063366/3826692381612.jpg"],[
//     "https://cdn.discordapp.com/attachments/535290786619719683/701986911127863356/1046874047891.jpg"],[
//     "https://cdn.discordapp.com/attachments/535290786619719683/701986840982585384/4179493081409.jpg"],[
//     "https://cdn.discordapp.com/attachments/535290786619719683/701986761345335416/1266731824198.jpg"],[
//     "https://cdn.discordapp.com/attachments/535290786619719683/701986662338789416/1468020336285.jpg"],[
//     "https://cdn.discordapp.com/attachments/535290786619719683/701986372122181632/1285007081068.jpg"],[
//     "https://cdn.discordapp.com/attachments/535290786619719683/701986333606019142/image0.png"],[
//     "https://media.discordapp.net/attachments/535290786619719683/703071820101845062/image0.png?width=526&height=1139"],[
//     "https://cdn.discordapp.com/attachments/535290786619719683/701986327360569414/1242525499055.jpg"],[
//     "https://cdn.discordapp.com/attachments/535290786619719683/701986245944803409/10201003155056871.jpg"],[
//     "https://i.imgur.com/ljkeubG.jpg"],["https://i.imgur.com/dHEZNQW.jpg"],["https://i.imgur.com/zrdmo12.jpg"],[
//     "https://i.imgur.com/yRUxCoB.jpg"],["https://i.imgur.com/31GbIGk.jpg"],["https://i.imgur.com/4fLx5kb.jpg"],[
//     "https://cdn.discordapp.com/attachments/535290786619719683/701981503026102292/image0.png"],[
//     "https://cdn.discordapp.com/attachments/535290786619719683/701981213400760410/image0.jpg"],[
//     "https://cdn.discordapp.com/attachments/535290786619719683/701979496022016061/image0.png"],[
//     "https://cdn.discordapp.com/attachments/535290786619719683/701977512414150656/image0.jpg"],[
//     "https://cdn.discordapp.com/attachments/535290786619719683/701977342339317799/image0.png"],[
//     "https://cdn.discordapp.com/attachments/535290786619719683/701951638491103324/image0.png"],[
//     "https://media.discordapp.net/attachments/535290786619719683/701964810392305674/IMG_0273.JPG?width=579&height=1139"],[
//     "https://cdn.discordapp.com/attachments/535290786619719683/701951638491103324/image0.png"],[
//     "https://cdn.discordapp.com/attachments/535290786619719683/701954393548914778/image0.png"],[
//     "https://cdn.discordapp.com/attachments/535290786619719683/701951840035536936/image0.png"],[
//     "https://cdn.discordapp.com/attachments/535290786619719683/703074084858363914/image0.jpg"],[
//     "https://i.imgur.com/HaiccB0.jpg"],[ "https://i.imgur.com/raw2Dl2.jpg"],[ "https://i.imgur.com/nSmPgF7.jpg"],[ 
//     "https://i.imgur.com/sV3Mdh9.jpg"],["https://i.imgur.com/WZ3ZzFJ.jpg"],[ "https://i.imgur.com/dVqoGu5.jpg"],[ 
//     "https://i.imgur.com/N0HFGfy.jpg"],[ "https://i.imgur.com/rdE5XBT.png"],[ "https://i.imgur.com/C7lguoN.jpg"],[ 
//     "https://i.imgur.com/pfRlAWc.jpg"],["https://i.imgur.com/VqO0thH.jpg"],[ "https://i.imgur.com/3CFEM8O.jpg"],[ 
//     "https://i.imgur.com/daHJUe1.jpg"],[ "https://i.imgur.com/1Cst8Pp.jpg"],[ "https://i.imgur.com/Pq6qyoq.jpg"],[ 
//     "https://i.imgur.com/Y9BLmEk.jpg"],[ "https://cdn.discordapp.com/attachments/535290786619719683/703064832735314012/IMG_0018.JPG"],[
//     "https://cdn.discordapp.com/attachments/535290786619719683/703064242097750057/image0.png"],["https://cdn.discordapp.com/attachments/535290786619719683/703063609428672512/image0.jpg"],[
//     "https://cdn.discordapp.com/attachments/535290786619719683/703063814115164302/image0.jpg"],["https://cdn.discordapp.com/attachments/535290786619719683/703063689720234064/image0.jpg"],[
//     "https://cdn.discordapp.com/attachments/535290786619719683/703063518198497280/image0.jpg"],[
//     "https://cdn.discordapp.com/attachments/535290786619719683/703075672435851264/image0.jpg"],[
//     "https://cdn.discordapp.com/attachments/535290786619719683/703078286028177408/IMG_2956.JPG"],[
//     "https://cdn.discordapp.com/attachments/535290786619719683/703078349114703922/IMG_2876.JPG"],
// ];
var connection = mysql.createConnection({
    host     : process.env.MYSQL_HOST,
    user     : process.env.MYSQL_USER,
    password : process.env.MYSQL_PASS,
    database : 'josh_bot'
  });

connection.connect();
// const test = "https://cdn.discordapp.com/attachments/535290786619719683/704487088308879380/image0.png";
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
