//Creat
const db = require("../config/connection");

class Models{
    
    //Insert into raw_data table
    async addRowData(values){
        const sql = "INSERT INTO raw_data (device_mac,date,time_in_venue) VALUES ?";
        try{
            return await db.query(sql,[values]);
        }catch(err){
            return err;
        }
        
    }


}

module.exports = Models;