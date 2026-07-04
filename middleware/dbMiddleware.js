function db (req, res, next) {
    req.dbtype = req.headers["x-db-type"] || process.env.DB_TYPE;
    next();
}

module.exports = db;