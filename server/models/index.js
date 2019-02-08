//create database tables if not exist

class Proximity{
    constructor(db){
        this.db = db;
        this.Init();
    }


    //Create Raw table
    Init(){
        this.RawTable();
    }


    //create raw table
    RawTable(){
        const sql = "CREATE TABLE IF NOT EXISTS raw_data (id INT AUTO_INCREMENT PRIMARY KEY, device_mac VARCHAR(255),date DATE, time_in_venue INT(6))";
        this.db.query(sql,(err,res)=>{
            if(err) throw err;
            console.log("Table: raw_data Created...\n");
        });
    }


}

module.exports = Proximity;