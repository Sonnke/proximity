const csv = require('fast-csv');
const fs = require('fs');
const progress = require('progress-stream');

class csvHandler{


    ReadScv(file,callback){

        
        let count = 0;
        let progres = this.FileProgress(file);
        let fsStream = fs.createReadStream(file).pipe(progres);
        let chunks = [];
        const options = {delimiter:";",headers:true,}

        csv.fromStream(fsStream,options)
        .on('data',function(data){
            try{
                if(count==1000){
                    this.pause();
                    //console.log('Importing into database');
                    callback(chunks);
                    //empty our array after chucnk
                        chunks = [];
                        count = 0;
                        this.resume();
                }else{
                    let arr = [
                        data.device_mac.trim(),
                        data.date.trim(),
                        data.time_in_venue.trim()
                    ];

                    chunks.push(arr);
                }
                //console.log(data);
                count = count + 1;
            }catch(err){
                console.log(err);
            }

        }).on('end',()=>{
            callback(chunks);
            //empty our array after chucnk
            chunks = [];
            console.log('Reading done!');
        })

    }

    //Progress
    FileProgress(file){
        let stat = fs.statSync(file);
        let str = progress({length: stat.size,time: 100});

        str.on('progress',(progress)=>{
            //console.log(progress.percentage);
            global.io.emit('file-upload-stats',{stats:progress.percentage});
        });
        return str;
    }




}

module.exports = csvHandler;