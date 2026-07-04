const RoleService = require('../services/role.service');
const { getDB } = require('../db');

exports.getRoles = async (req, res) => {
    const db = getDB(req);
    const service = new RoleService(db);

    const roles = await service.getRoles();

    res.render('roles', { roles });
}

exports.getRoleById = async (req, res) => {
    const db = getDB(req);
    const service = new RoleService(db);

    const id = req.params.id;

    const role = await service.getRoleById(id);

    res.render('role', { role: role[0], id });
}

exports.getCreateRoleForm = async (req, res) => {
    res.render('newRole');
}

exports.createRole = async (req, res) => {
    try {
        const db = getDB(req);
        const service = new RoleService(db);

        await service.createRole(req.body);

        res.status(201).redirect('/roles');
    } catch (error) {
        res.status(500).send(error);
    }
}

exports.getEditRoleForm = async (req, res) => {
    try {
        const db = getDB(req);
        const service = new RoleService(db);

        const id = req.params.id;

        const rol = await service.getRoleById(id);

        res.render('editRole', { role: rol[0] });
    } catch (error) {
        res.status(500).send(error);
    }
}

exports.editRole = async (req, res) => {
    try {
        const db = getDB(req);
        const service = new RoleService(db);

        const role = {
            id: req.params.id,
            ...req.body
        };

        await service.editRole(role);

        res.status(200).redirect('/roles');
    } catch (error) {
        res.status(500).send(error);
    }
}

exports.deleteRole = async (req, res) => {
    try {
        const db = getDB(req);
        const service = new RoleService(db);

        const id = req.params.id;

        await service.deleteRole(id);

        res.status(204).redirect('/roles');
    } catch (error) {
        res.status(500).send(error);
    }
}