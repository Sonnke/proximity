const Models = require('../models/models');
const axios = require('axios');
const {parse} = require('node-html-parser');


class MacToVendor{
    //process mac into vendor


    async GetVendorByMac(mac){
        const form = x =>Object.keys(x).reduce((p, c) => p + `&${c}=${encodeURIComponent(x[c])}`, '')


        try{

            const res = await axios({
                method:'POST',
                url: 'http://www.whatsmyip.org/data/mac-address-lookup.php',
                data: form({q:mac}),
                headers:{
                    'Accept':'*/*',
                    'Content-TYpe': 'application/x-www-form-urlencoded',
                    'Host': 'www.whatsmyip.org',
                    'Origin': 'http://www.whatsmyip.org',
                    'Referer': 'http://www.whatsmyip.org/mac-address-lookup/',
                    'Connection': 'keep-alive',
                    'User-Agent':'Mozilla/5.0 (X11; Linux x86_64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/71.0.3578.98 Safari/537.36',
                    'X-Requested-With': 'XMLHttpRequest'
                }
    
            })
            
            //parse html response and extract text
            return parse(res.data).querySelector('ul').lastChild.lastChild.innerHTML;

            //console.log(vendor);

        }catch(err){
            console.log(err);
        }

    }


    async SaveToDb(){
        const timeModel = new Models();
        const clean = await timeModel.getTimeByNot("raw_data","0","\\N");
        const this_ = this;
        (async function theLoop(i){
            setTimeout(async()=>{
                if(clean[i]){
                    const vendor = await this_.GetVendorByMac(clean[i].device_mac);

                    //Add processed data to the table vendor
                    await timeModel.addProcessedData([[vendor,clean[i].raw_data_id]]);

                    console.log(vendor);
                }
              if (--i) {         
                theLoop(i);
              }
            },10);
          })(clean.length);
    }





    //Get data by vendor
    async GetByVendor(table,vendor){
        const model = new Models()
        return await model.getByVendor(table,vendor);
    }

}

module.exports = MacToVendor;