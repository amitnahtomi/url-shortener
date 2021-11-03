async function validUrl(req, res, next) {
    try {
        
        next();
    }
    catch {
        next(401);
    }
}

module.exports = validUrl;