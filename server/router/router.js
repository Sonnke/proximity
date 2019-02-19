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
    res.sendFile('index.html');
});

//Let's begin the api
router.get('/api/process/data',async (req,res)=>{

    await Mac.SaveToDb()
    res.json("Please check your terminal.....")
});

//file upload
router.post('/api/raw/upload',(req,res)=>{
    if (Object.keys(req.files).length == 0){
        return res.status(400).send('No files were uploaded.');
    }

    const file = req.files.csv.tempFilePath;
    IndexCtr.UploadFile(file);

    res.json({Please:"wait...."})
});

//Realtime 
router.post('/api/raw/add',async (req,res)=>{
    const mac = req.body.mac_address;
    const date = req.body.date;
    const duration = req.body.minutes;

    rez = await IndexCtr.Add(mac,date,duration);

    res.json(rez);
})



//get data by date
router.get('/api/raw/bydate/:date/:limit',async (req,res)=>{
    const date = req.params.date;
    const limit = req.params.limit;
    const table = "raw_data";
    const info = await DatejsCtr.GetByDate(table,date,limit);
    res.json(info);
});

router.get('/api/raw/date/between/:from/:to',async (req,res)=>{
    const from  = req.params.from;
    const to = req.params.to;
    const table = 'raw_data';

    const info = await DatejsCtr.GetDateByRange(table,from,to);
    res.json(info);
});

router.get('/api/raw/date/before/:before',async (req,res)=>{
    const before  = req.params.before;
    const table = 'raw_data';

    const info = await DatejsCtr.GetDateBefore(table,before);
    res.json(info);
});

router.get('/api/raw/date/after/:after',async (req,res)=>{
    const after  = req.params.after;
    const table = 'raw_data';

    const info = await DatejsCtr.GetDateAfter(table,after);
    res.json(info);
});

//TIME
router.get('/api/raw/bytime/:time',async (req,res)=>{
    const time = req.params.time;
    const table = "raw_data";
    const info = await TimeCtr.GetByTime(table,time);
    res.json(info);
});

router.get('/api/raw/time/between/:from/:to',async (req,res)=>{
    const from = req.params.from;
    const to = req.params.to;
    const table = "raw_data";
    const info = await TimeCtr.GetTimeBetween(table,from,to);
    res.json(info);
});

router.get('/api/raw/time/before/:before',async (req,res)=>{
    const before = req.params.before;
    const table = "raw_data";
    const info = await TimeCtr.GetTimeBefore(table,before);
    res.json(info);
});

router.get('/api/raw/time/after/:after',async (req,res)=>{
    const after = req.params.after;
    const table = "raw_data";
    const info = await TimeCtr.GetTimeBefore(table,after);
    res.json(info);
});

//Get Data bY vendor
router.get('/api/raw/byvendor/:vendor',async(req, res)=>{
    const vendor = req.params.vendor;
    const table = "processed";
    const info = await Mac.GetByVendor(table,vendor);
    res.json(info);
});



//GRAPHS AND TABLES

//get dashboard pie data
router.get('/api/pie/',async (req,res)=>{
    const info = await IndexCtr.GetPie();
    res.json(info);
});



//get processed data
router.get('/api/processed/:limit',async (req,res)=>{
    const limit = req.params.limit;
    const info = await IndexCtr.GetProcessed(limit);
    res.json(info);
});

//Get Raw table
router.get('/api/raw/:limit',async (req,res)=>{
    const limit = req.params.limit;
    const info = await IndexCtr.GetRaw(limit);
    res.json(info);
});



module.exports = router;