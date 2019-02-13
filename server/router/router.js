const router = require('express').Router();
const Models = require('../models/models');
const Controller = require('../controller/Indexjs');
const Datejs = require('../controller/Datejs');
const TimeInVenue = require('../controller/Time-in-venue');
const MacToVendor = require('../controller/Mac-vendor');

const IndexCtr = new Controller();
const DatejsCtr = new Datejs();
const TimeCtr = new TimeInVenue(); 
const Mac = new MacToVendor();




//Home or Dashbord
router.get('/',(req,res)=>{
    res.send("Welcome Home");
});

//Let's begin the api
router.get('/api',async (req,res)=>{

    await Mac.SaveToDb()
    res.json({Very:"Busy"})
});

//file upload
router.post('/api/raw/upload',(req,res)=>{
    if (Object.keys(req.files).length == 0){
        return res.status(400).send('No files were uploaded.');
    }

    const file = req.files.csv.tempFilePath;
    IndexCtr.UploadFile(file);

    res.json({Welcome:"MOFO"})
});

//get data by date
router.post('/api/raw/bydate/',async (req,res)=>{
    const date = req.body.date;
    const table = "raw_data";
    const info = await DatejsCtr.GetByDate(table,date);
    res.json(info);
});

router.post('/api/raw/date/between',async (req,res)=>{
    const from  = req.body.from;
    const to = req.body.to;
    const table = 'raw_data';

    const info = await DatejsCtr.GetDateByRange(table,from,to);
    res.json(info);
});

router.post('/api/raw/date/before',async (req,res)=>{
    const before  = req.body.before;
    const table = 'raw_data';

    const info = await DatejsCtr.GetDateBefore(table,before);
    res.json(info);
});

router.post('/api/raw/date/after',async (req,res)=>{
    const after  = req.body.after;
    const table = 'raw_data';

    const info = await DatejsCtr.GetDateAfter(table,after);
    res.json(info);
});

//TIME
router.post('/api/raw/bytime',async (req,res)=>{
    const time = req.body.time;
    const table = "raw_data";
    const info = await TimeCtr.GetByTime(table,time);
    res.json(info);
});

router.post('/api/raw/time/between',async (req,res)=>{
    const from = req.body.from;
    const to = req.body.to;
    const table = "raw_data";
    const info = await TimeCtr.GetTimeBetween(table,from,to);
    res.json(info);
});

router.post('/api/raw/time/before',async (req,res)=>{
    const before = req.body.before;
    const table = "raw_data";
    const info = await TimeCtr.GetTimeBefore(table,before);
    res.json(info);
});

router.post('/api/raw/time/after',async (req,res)=>{
    const after = req.body.after;
    const table = "raw_data";
    const info = await TimeCtr.GetTimeBefore(table,after);
    res.json(info);
});

//Get Data bY vendor
router.post('/api/raw/byvendor/',async(req, res)=>{
    const vendor = req.body.vendor;
    const table = "raw_data";
    const info = await Ctr.GetByVendor(table,vendor);
    res.json(info);
});


module.exports = router;