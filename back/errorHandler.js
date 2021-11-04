const express = require('express');
const router = express.Router();
router.use(express.json());

function errorHandler(err, req, res, next) {
    if(err === 401){
        res.status(401).json("url not valid");
        res.end();
    }
    if(err === 404) {
        res.status(404).json("page not exist");
    }
}

module.exports = errorHandler;