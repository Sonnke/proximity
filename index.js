const server = require('./server/app');
const Proximity = require('./server/models/index');
const db = require("./server/config/connection");


//make a connection 
db.connect(function(err){
    if(err){throw err};
    console.log("connected to database...");
    //create tables
    new Proximity(db);
    
});

global.io.on('connection',function(soc){
    console.log('Socket.IO is ready');
});

server.listen(8080,()=>{console.log("Listening to 8080");});

//module.exports = db;