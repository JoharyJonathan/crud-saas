class DBAdapter {
    constructor(client, type) {
        this.client = client;
        this.type = type;
    }

    buildQuery(sql, params) {
        if (this.type === "postgres") {
            let i = 1;
            const converted = sql.replace(/\?/g, () => `$${i++}`);
            return { sql: converted, params };
        }

        return { sql, params };
    }

    async query(sql, params = []) {
        const { sql: finalSQL, params: finalParams } = this.buildQuery(sql, params);
 
        if (this.type === "mysql") {
            const [rows] = await this.client.query(finalSQL, finalParams);
            return rows;
        }

        const result = await this.client.query(finalSQL, finalParams);
        return result;
    }

    async findOne(sql, params) {
        const rows = await this.query(sql, params);
        return rows[0] || null;
    }
}

module.exports = DBAdapter;