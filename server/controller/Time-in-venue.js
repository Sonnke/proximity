const Models = require('../models/models');

class TimeInVenue{

    //TIME
    async GetByTime(table,time){
        const timeModel = new Models();
        return await timeModel.getByTime(table,time);
    }

    async GetTimeBetween(table,from,to){
        const timeModel = new Models();
        return await timeModel.getTimeBetween(table,from,to);
    }

    async GetTimeBefore(table,before){
        const timeModel = new Models();
        return await timeModel.getDateBefore(table,before);
    }

    async GetTimeAfter(table,after){
        const timeModel = new Models();
        return await timeModel.getTimeAfter(table,after);
    }

    //get by vendor
    async GetByVendor(table,vendor){
        const vendorModel = new Models();
        return await vendorModel.getByVendor(table,vendor);
    }
}

module.exports = TimeInVenue;