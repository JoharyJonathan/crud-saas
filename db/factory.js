const mysql = require('./MySQL');
const pg = require('./PostgreSQL');
const DBAdapter = require('./adapter');

function createDB(type) {
    if (type === "mysql") {
        return new DBAdapter(mysql, "mysql");
    }

    if (type === "postgres") {
        return new DBAdapter(pg, "postgres");
    }

    throw new Error("Unsupported DB Type");
}

module.exports = createDB;