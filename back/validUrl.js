async function validUrl(req, res, next) {
    try {
        const res = await fetch(`${req.body}`, {method: "GET"})
    }
    catch {
        next(401);
    }
}

module.exports = validUrl;