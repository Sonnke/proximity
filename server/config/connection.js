const mysql = require('mysql');
const util = require('util');
require('dotenv').config();


const db = mysql.createConnection({
    host: process.env.DB_HOST,
    user: process.env.DB_USER,
    password: process.env.DB_PASSWORD,
    database: process.env.DB_NAME
});


//make a connection 
// db.connect(function(err){
//     if(err){throw err};
//     console.log("connected to database...");
//     //create tables
//     //new Proximity(db);
    
// });

//wrap into a promise
db.query = util.promisify(db.query).bind(db);

module.exports = db;