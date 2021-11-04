const express = require('express');
const router = express.Router();
router.use(express.json());
const fs = require('fs');
const port = 3000;

router.post('/', (req, res, next)=>{
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
    res.json(urlData.shortUrl);
    res.end();
    }
});

class Db {
    constructor(prevUrl, shortUrl){
        this.prevUrl = prevUrl,
        this.shortUrl = shortUrl,
        this.sumReq = 0;
        this.lastReq = undefined;
    }
    linkRequested() {
        this.sumReq++;
        this.lastReq = Date.now();
    }
}

module.exports = router;