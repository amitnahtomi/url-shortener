const express = require('express');
const router = express.Router();
router.use(express.json());

function errorHandler(err, req, res, next) {
    if(err === 401){
        res.status(401).json("url not valid");
        res.end();
    }
}

module.exports = errorHandler;