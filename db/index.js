const createDB = require('./factory');

function getDB(req) {
    const type = req.dbtype || process.env.DB_TYPE;
    return createDB(type);
}

module.exports = { getDB };