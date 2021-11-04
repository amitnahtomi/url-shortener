const express = require('express');
const app = express();
const port = 3000;
const cors = require('cors');
const fs = require('fs');
app.use(express.json());
app.use(cors());
const shortRouter = require('./shortRouter');
const validUrl = require('./validUrl.js');
const statisticRouter = require('./statisticRouter');
const errorHandler = require('./errorHandler');

app.use('/short', validUrl);
app.use('/short', shortRouter);
app.use('/api', statisticRouter);
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
    target.lastReq = (new Date).toString();
    fs.writeFileSync(`C:/Users/amitn/cyber4s/url-shortener/back/db/${id}.json`, JSON.stringify(target));
    try {
    res.redirect(target.prevUrl);
    }
    catch {
        next(404);
    }
    res.end();
})
app.use('/', errorHandler);

app.listen(port, () => {
    console.log(`app listening at http://localhost:${port}`)
  });