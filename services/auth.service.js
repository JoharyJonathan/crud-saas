const AuthRepository = require('../repositories/auth.repo');

class AuthService {
    constructor(db) {
        this.authRepo = new AuthRepository(db);
    }

    signup(user) {
        return this.authRepo.register(user);
    }

    signin(user) {
        return this.authRepo.login(user);
    }

    verify(user) {
        return this.authRepo.verify(user);
    }

    profile(id) {
        return this.authRepo.profile(id);
    }
}

module.exports = AuthService;