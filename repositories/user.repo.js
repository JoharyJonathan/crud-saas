class UserRepository {
    constructor(db) {
        this.db = db;
    }

    findAll() {
        return this.db.query('SELECT u.*, r.name AS role_name FROM users u LEFT JOIN roles r ON u.role_id = r.id');
    }

    findById(id) {
        return this.db.findOne('SELECT u.*, r.name AS role_name FROM users u LEFT JOIN roles r ON u.role_id = r.id WHERE u.id = ?', [id]);
    }

    create(user) {
        return this.db.query('INSERT INTO users (name, firstname, password, role_id) VALUES (?, ?, ?, ?)', [user.name, user.firstname, user.password, user.role_id]);
    }

    update_with_password(user) {
        return this.db.query('UPDATE users SET name = ?, firstname = ?, password = ?, role_id = ? WHERE id = ?', [user.name, user.firstname, user.password, user.role_id, user.id]);
    }

    update_without_password(user) {
        return this.db.query('UPDATE users SET name = ?, firstname = ?, role_id = ? WHERE id = ?', [user.name, user.firstname, user.role_id, user.id]);
    }

    delete_user(id) {
        return this.db.query('DELETE FROM users WHERE id = ?', [id]);
    }
}

module.exports = UserRepository;