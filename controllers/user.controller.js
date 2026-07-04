const UserService = require('../services/user.service');
const RoleService = require('../services/role.service');
const { getDB } = require('../db');

exports.getUsers = async (req, res) => {
    const db = getDB(req);
    const service = new UserService(db);

    const users = await service.getUsers();

    res.render('users', { users });
}

exports.getUserById = async (req, res) => {
    const db = getDB(req);
    const service = new UserService(db);

    const id = req.params.id;

    const user = await service.getUserById(id);

    res.render('user', { user });
}

exports.createUser = async (req, res) => {
    try {
        const db = getDB(req);
        const service = new UserService(db);

        const user = await service.createUser(req.body);

        res.status(201).redirect('/users');
    } catch (error) {
        res.status(500).send(error);
    }
}

exports.getCreateUserForm = async (req, res) => {
    try {
        const db = getDB(req);
        const service = new RoleService(db);

        const roles = await service.getRoles();

        res.render('newUser', { roles, user: {} });
    } catch (error) {
        res.status(500).send(error);
    }
}

exports.getEditUserForm = async (req, res) => {
    try {
        const db = getDB(req);
        const id = req.params.id;

        const userservice = new UserService(db);
        const roleservice = new RoleService(db);

        const user = await userservice.getUserById(id);
        const roles = await roleservice.getRoles();

        res.render('editUser', { user, roles });
    } catch (error) {
        res.status(500).send(error);
    }
}

exports.editUser = async (req, res) => {
    try {
        const db = getDB(req);
        const service = new UserService(db);

        const user = {
            id: req.params.id,
            ...req.body
        };

        if (user.password && user.password.trim() !== "") {
            await service.editUser(user);
        } else {
            await service.editUserWithoutPassword(user);
        }

        res.status(200).redirect('/users');
    } catch (error) {
        res.status(500).send(error);
    }
}

exports.deleteUser = async (req, res) => {
    try {
        const db = getDB(req);
        const service = new UserService(db);

        const id = req.params.id;

        const user = await service.deleteUser(id);

        res.status(200).redirect('/users');
    } catch (error) {
        res.status(500).send(error);
    }
}