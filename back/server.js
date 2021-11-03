const express = require('express');
const app = express();
const port = 3000;
const cors = require('cors');
const fs = require('fs');
app.use(express.json());
app.use(cors());
//const validUrl = require('./validUrl.js');
const errorHandler = require('./errorHandler');

//app.use('/', validUrl);
app.post('/', (req, res, next)=>{
    let fileId = fs.readdirSync("C:/Users/amitn/cyber4s/url-shortener/back/db").length;
    let prevUrl = req.body.url;
    let db = fs.readdirSync("C:/Users/amitn/cyber4s/url-shortener/back/db");
    let target;
    for(let i = 0; i<db.length; i++){
        if(JSON.parse(fs.readFileSync(`C:/Users/amitn/cyber4s/url-shortener/back/db/${db[i]}`)).prevUrl === req.body.url){
            target = JSON.parse(fs.readFileSync(`C:/Users/amitn/cyber4s/url-shortener/back/db/${db[i]}`)).shortUrl;
            break;
        }
    }
    if(target !== undefined){
        res.json(target);
        res.end();
    }
    else {
    let urlData = new Db(prevUrl, `http://localhost:${port}/${fileId}`);
    fs.writeFileSync(`C:/Users/amitn/cyber4s/url-shortener/back/db/${fileId}.json`, JSON.stringify(urlData));
    console.log(prevUrl);
    res.json(urlData.shortUrl);
    res.end();
    }
});
app.use('/:id', (req, res, next)=>{
    let id = req.params.id;
    let db = fs.readdirSync("C:/Users/amitn/cyber4s/url-shortener/back/db");
    let target;
    for(let i = 0; i<db.length; i++){
        if(db[i] === `${id}.json`){
            target = JSON.parse(fs.readFileSync(`C:/Users/amitn/cyber4s/url-shortener/back/db/${id}.json`));
            break;
        }
    }
    target.sumReq++;
    target.lastReq = Date.now();
    fs.writeFileSync(`C:/Users/amitn/cyber4s/url-shortener/back/db/${id}.json`, JSON.stringify(target));
    console.log(target);
    res.redirect(target.prevUrl);
    res.end();
})
app.use('/', errorHandler);

app.listen(port, () => {
    console.log(`app listening at http://localhost:${port}`)
  });


  class Db {
      constructor(prevUrl, shortUrl){
          this.prevUrl = prevUrl,
          this.shortUrl = shortUrl,
          this.sumReq = 0;
          this.lastReq = Date.now();
      }
      linkRequested() {
          this.sumReq++;
          this.lastReq = Date.now();
      }
  }