const express = require('express');
const router = express.Router();
router.use(express.json());
const fs = require('fs');

router.get('/:id', (req, res, next)=>{
    let id = req.params.id;
    let db = fs.readdirSync("C:/Users/amitn/cyber4s/url-shortener/back/db");
    let target;
    for(let i = 0; i<db.length; i++){
        if(db[i] === `${id}.json`){
            target = JSON.parse(fs.readFileSync(`C:/Users/amitn/cyber4s/url-shortener/back/db/${id}.json`));
            break;
        }
    }
    res.json({timesVisited: target.sumReq, lastVisited: target.lastReq});
    res.end();
})

module.exports = router;