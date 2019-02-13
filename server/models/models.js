//Creat
const mysql = require('mysql');
const db = require("../config/connection");

class Models{
    
    //Insert into raw_data table
    async addRowData(values){
        const sql = "INSERT INTO raw_data (device_mac,date,time_in_venue) VALUES ?";
        try{
            return await db.query(sql,[values]);
        }catch(err){
            console.log(err);
            return err;
        }
        
    }

    //Insert into processed table
    async addProcessedData(values){
        const sql = "INSERT INTO processed (vendor,raw_data_id) VALUES ?";
        try{
            return await db.query(sql,[values]);
        }catch(err){
            console.log(err);
            return err;
        }
        
    }



    //get by date
    async getByDate(table,date){
        const sql = "SELECT device_mac,DATE_FORMAT(date, '%Y-%m-%d') as date, time_in_venue FROM "+table+" WHERE date="+mysql.escape(date);
        try{
            return await db.query(sql);
        }catch(err){
            console.log(err);
            return err;
        }
    }

    //get by date range
    async getDateByRange(table,from,to){
        const sql = "SELECT device_mac,DATE_FORMAT(date, '%Y-%m-%d') as date, time_in_venue FROM "+table+" WHERE date BETWEEN ? AND ?";
        try{
            return await db.query(sql,[from,to]);
        }catch(err){
            console.log(err);
            return err;
        }
    }

    
    async getDateBefore(table,date){
        const sql = "SELECT device_mac,DATE_FORMAT(date, '%Y-%m-%d') as date, time_in_venue FROM "+table+" WHERE date <= ?";
        try{
            return await db.query(sql,[date]);
        }catch(err){
            console.log(err);
            return err;
        }
    }

    
    async getDateAfter(table,date){
        const sql = "SELECT device_mac,DATE_FORMAT(date, '%Y-%m-%d') as date, time_in_venue FROM "+table+" WHERE date >= ?";
        try{
            return await db.query(sql,[date]);
        }catch(err){
            console.log(err);
            return err;
        }
    }

    //TIME
    async getByTime(table,time){
        const sql ="SELECT * FROM "+table+" WHERE time_in_venue="+mysql.escape(time);
        try{
            return await db.query(sql);
        }catch(err){
            return err;
        }
    }

    async getTimeByNot(table,not1,not2){
        const sql ="SELECT * FROM "+table+" WHERE time_in_venue <> ? AND time_in_venue <> ?";
        try{
            return await db.query(sql,[not1,not2]);
        }catch(err){
            return err;
        }
    }

    async getTimeBetween(table,from,to){
        const sql = "SELECT * FROM "+table+" WHERE time_in_venue BETWEEN ? AND ?";
        try{
            return await db.query(sql,[from,to]);
        }catch(err){
            return err;
        }
    }

    async getTimeBefore(table,before){
        const sql = "SELECT * FROM "+table+" WHERE time_in_venue <=";
        try{
            return await db.query(sql,[before]);
        }catch(err){
            return err;
        }
    }

    async getTimeAfter(table,after){
        const sql = "SELECT * FROM "+table+"WHERE time_in_venue >=?";
        try{
            return await db.query(sql,[after]);
        }catch(err){
            return err;
        }
    }

    //get by vendor
    async getByVendor(vendor){
        const sql = "SELECT * FROM raw_data WHERE vendor LIKE "+mysql.escape(vendor);

        try{
            return await db.query(sql);
        }catch(err){
            return err;
        }
    }


}

module.exports = Models;