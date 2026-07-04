class AuthRepository {
    constructor(db) {
        this.db = db;
    }

    register(user) {
        return this.db.query('INSERT INTO users (name, firstname, password, role_id) VALUES (?, ?, ?, ?)', [user.name, user.firstname, user.password, user.role_id]);
    }

    verify(user) {
        return this.db.query('SELECT id FROM users WHERE name = ? AND firstname = ?', [user.name, user.firstname]);
    }

    login(user) {
        return this.db.query('SELECT users.*, roles.name AS role FROM users JOIN roles ON users.role_id = roles.id WHERE users.name = ?', [user.name]);
    }

    profile(id) {
        return this.db.query('SELECT users.*, roles.name AS role FROM users JOIN roles ON users.role_id = roles.id WHERE users.id = ?', [id]);
    }
}

module.exports = AuthRepository;