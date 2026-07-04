const RoleRepository = require('../repositories/role.repo');

class RoleService {
    constructor(db) {
        this.roleRepo = new RoleRepository(db);
    }

    getRoles() {
        return this.roleRepo.findAll();
    }

    getRoleById(id) {
        return this.roleRepo.findById(id);
    }

    createRole(role) {
        return this.roleRepo.create(role);
    }

    editRole(role) {
        return this.roleRepo.update(role);
    }

    deleteRole(id) {
        return this.roleRepo.delete_role(id);
    }
}

module.exports = RoleService;