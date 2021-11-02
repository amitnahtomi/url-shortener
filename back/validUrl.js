async function validUrl(req, res, next) {
    console.log(req.body.url);
    try {
        const res = await fetch(`${req.body.url}`, {method: "GET"})
    }
    catch {
        next(401);
    }
}

module.exports = validUrl;