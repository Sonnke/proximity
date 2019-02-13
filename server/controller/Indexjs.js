const csvHandler = require('../helpers/file-uploader');
const Models = require('../models/models');

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

}



module.exports = Indexjs;