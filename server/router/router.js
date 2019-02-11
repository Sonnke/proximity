const router = require('express').Router();
const Models = require('../models/models');
const Controller = require('../controller/ProcessData');

//Home or Dashbord
router.get('/',(req,res)=>{
    res.send("Welcome Home");
});

//Let's begin the api
router.get('/api',(req,res)=>{

    global.io.emit('file-upload-stats',{ hello: 'world' });
    res.json({Welcome:"MOFO"})
});

//file upload
router.post('/api/upload',(req,res)=>{
    if (Object.keys(req.files).length == 0){
        return res.status(400).send('No files were uploaded.');
    }

    const file = req.files.csv.tempFilePath;

    const Api = new Controller();
    Api.UploadFile(file);

    res.json({Welcome:"MOFO"})
});


module.exports = router;