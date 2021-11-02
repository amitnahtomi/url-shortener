const express = require('express');
const app = express();
const port = 3000;
const cors = require('cors');
app.use(express.json());
app.use(cors());
const validUrl = require('./validUrl.js');
const errorHandler = require('./errorHandler');

app.use('/', validUrl);
app.use('/', errorHandler);

app.listen(port, () => {
    console.log(`app listening at http://localhost:${port}`)
  })