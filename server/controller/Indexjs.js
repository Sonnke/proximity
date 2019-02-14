const csvHandler = require('../helpers/file-uploader');
const Models = require('../models/models');
const MacTovendor = require('./Mac-vendor');

class Indexjs{
    
    UploadFile(file){
        //get file upload helper
        const csvHelper = new csvHandler();
        const SaveData = new Models();
        csvHelper.ReadScv(file, async (data)=>{
            //save data to databse
            await SaveData.addRowData(data);
            //console.log(res);
        });

    }

    async Add(mac,date,minutes){

        const MacObj = new MacTovendor();
        const Model = new Models();
        const vendor = await MacObj.GetVendorByMac(mac);

        const raw = [[mac,date,minutes]];

        const raw_id = await Model.addRowData(raw);
        if(vendor){
            await Model.addProcessedData([[vendor,raw_id.insertId]]);

            global.io.emit('new-mac-address',{action:'refresh'});
            return raw_id;
        }else{
            return null;
        }
        


    }

    async GetPie(){
        const Model = new Models();

        const raw =  await Model.countRaw();
        const processed = await Model.countProcessed();

        return {raw_data: raw,processed:processed}
    }


    //Tables

    async GetRaw(limit){
        const Model = new Models();
        return await Model.getRaw(limit);
    }

    async GetProcessed(limit){
        const Model = new Models();
        return await Model.getPro(limit);
    }

}



module.exports = Indexjs;