const express = require('express');
const app = express();
const port = 3000;
const cors = require('cors');
const { v4: uuidv4 } = require('uuid');
const fs = require('fs');
app.use(express.json());
app.use(cors());
//const validUrl = require('./validUrl.js');
const errorHandler = require('./errorHandler');

//app.use('/', validUrl);
app.post('/', (req, res, next)=>{
    let fileId = "1";//uuidv4();
    let prevUrl = req.body.url;
    let urlData = {prevUrl: prevUrl, shortUrl: `http://localhost:${port}/${fileId}`};
    fs.writeFileSync(`C:/Users/amitn/cyber4s/url-shortener/back/db/${fileId}.json`, JSON.stringify(urlData));
    console.log(prevUrl);
    res.json(urlData.shortUrl);
    res.end();
});
app.get('/:id', (req, res, next)=>{
    let id = req.params.id;
    let db = fs.readdirSync("C:/Users/amitn/cyber4s/url-shortener/back/db");
    let target;
    for(let i = 0; i<db.length; i++){
        if(db[i] === `${id}.json`){
            target = JSON.parse(fs.readFileSync(`C:/Users/amitn/cyber4s/url-shortener/back/db/${id}.json`)).prevUrl;
            break;
        }
    }
    console.log(target);
    res.redirect(target);
    res.end();
})
app.use('/', errorHandler);

app.listen(port, () => {
    console.log(`app listening at http://localhost:${port}`)
  })