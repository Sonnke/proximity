//create database tables if not exist

class Proximity{
    constructor(db){
        this.db = db;
        this.Init();
    }


    //Create Raw table
    Init(){
        this.RawTable();
        this.ProcessedTable();
        
    }


    //create raw table
    RawTable(){
        const sql = `CREATE TABLE IF NOT EXISTS 
            raw_data (raw_data_id INT AUTO_INCREMENT PRIMARY KEY,
             device_mac VARCHAR(255),date DATE, time_in_venue VARCHAR(255))`;
        this.db.query(sql,(err,res)=>{
            if(err) throw err;
            console.log("Table: raw_data Created...\n");
        });
    }


    //Processed Table
    ProcessedTable(){
        const sql = `CREATE TABLE IF NOT EXISTS processed (processed_id INT AUTO_INCREMENT PRIMARY KEY,
                    vendor VARCHAR(255),raw_data_id INT, INDEX raw_ind(raw_data_id)
                    ,FOREIGN KEY (raw_data_id) REFERENCES raw_data(raw_data_id) ON DELETE CASCADE)`;

        this.db.query(sql,(err,res)=>{
            if(err) throw err;
            console.log("Table: processed Created...\n");
        });
    }


}

module.exports = Proximity;