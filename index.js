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

const port = 8080;

server.listen(port,()=>{console.log("Listening to ",port);});

//module.exports = db;