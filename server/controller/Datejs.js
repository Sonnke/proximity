const Models = require('../models/models');

class Datejs{
    //Dates
    async GetByDate(table,date,limit){
        const data = new Models();
        return await data.getByDate(table,date,limit); 
    }

    async GetDateByRange(table,from,to){
        const dates = new Models();
        return await dates.getDateByRange(table,from,to);
    }

    async GetDateBefore(table,date){
        const dates = new Models();
        return await dates.getDateBefore(table,date);
    }

    async GetDateAfter(table,date){
        const dates = new Models();
        return await dates.getDateAfter(table,date);
    }

}

module.exports = Datejs;