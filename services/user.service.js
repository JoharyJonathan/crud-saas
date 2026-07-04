const UserRepository = require('../repositories/user.repo');
var bcrypt = require('bcrypt');

class UserService {
    constructor(db) {
        this.userRepo = new UserRepository(db);
    }

    getUsers() {
        return this.userRepo.findAll();
    }

    getUserById(id) {
        return this.userRepo.findById(id);
    }

    async createUser(user) {
        user.password = await bcrypt.hash(user.password, 10);
        return this.userRepo.create(user);
    }

    async editUser(user) {
        user.password = await bcrypt.hash(user.password, 10);
        return this.userRepo.update_with_password(user);
    }

    editUserWithoutPassword(user) {
        return this.userRepo.update_without_password(user);
    }

    deleteUser(id) {
        return this.userRepo.delete_user(id);
    }
}

module.exports = UserService;