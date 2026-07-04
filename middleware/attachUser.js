const jwt = require('jsonwebtoken');
const JWT_SECRET = process.env.JWT_SECRET;

function attachUser(req, res, next) {
    const token = req.cookies.token;

    if (!token) {
        res.locals.user = null;
        return next();
    }

    jwt.verify(token, JWT_SECRET, (err, user) => {
        if (err) {
            res.locals.user = null;
        } else {
            res.locals.user = user;
        }
        next();
    });
}

module.exports = attachUser;