const valid = require('valid-url');
function validUrl(req, res, next) {
    if(valid.isUri(`${req.body.url}`)){
        next();
    }
        next(401);
}
module.exports = validUrl;