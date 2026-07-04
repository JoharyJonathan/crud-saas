class RoleRepository {
    constructor(db) {
        this.db = db;
    }

    findAll() {
        return this.db.query('SELECT * FROM roles');
    }

    findById(id) {
        return this.db.query('SELECT * FROM roles WHERE id = ?', [id]);
    }

    create(role) {
        return this.db.query('INSERT INTO roles (name, description) VALUES (?, ?)', [role.name, role.description]);
    }

    update(role) {
        return this.db.query('UPDATE roles SET name = ?, description = ? WHERE id = ?', [role.name, role.description, role.id]);
    }

    delete_role(id) {
        return this.db.query('DELETE FROM roles WHERE id = ?', [id]);
    }
}

module.exports = RoleRepository;