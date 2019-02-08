const router = require('express').Router();
const Models = require('../models/models');
//const db = require('../../index');

const model = new Models();
//Home or Dashbord
router.get('/',(req,res)=>{
    res.send("Welcome Home");
});

//Let's begin the api
router.get('/api',(req,res)=>{
    res.json({Welcome:"MOFO"})
});


//Add to raw data table
router.get('/api/raw/add', async (req,res,next)=>{

    const raw = [["D3:G3:W2:","2019/02/08",654],["K8:L2:X5:","2019/02/08",325]];
    const result = await model.addRowData(raw);
    console.log(result);
    res.send("Somthing happened");
});





module.exports = router;