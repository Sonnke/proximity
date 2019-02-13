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

                    console.log(vendor);
                }
              if (--i) {          // If i > 0, keep going
                theLoop(i);       // Call the loop again, and pass it the current value of i
              }
            },20);
          })(clean.length);
    }

}

module.exports = MacToVendor;