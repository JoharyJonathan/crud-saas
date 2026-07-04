const AuthService = require('../services/auth.service');
const { getDB } = require('../db');

const dotenv = require('dotenv');
var jwt = require('jsonwebtoken');
var bcrypt = require('bcrypt');

dotenv.config();

const JWT_SECRET = process.env.JWT_SECRET;

exports.signUpPage = async (req, res) => {
    res.render('signup');
}

exports.register = async (req, res) => {
    try {
        const db = getDB(req);
        const service = new AuthService(db);

        if (!req.body.name || !req.body.firstname || !req.body.password) {
            return res.status(400).json({ error: 'name, firstname, password are required' });
        }

        const user = {
            ...req.body,
            password: await bcrypt.hash(req.body.password, 10),
            role_id: 2
        };

        const existing = await service.verify(user);

        if (existing.length > 0) {
            return res.status(409).json({
                error: 'User already exists'
            });
        }

        await service.signup(user);

        res.status(201).redirect('/auth/signin');
    } catch (error) {
        res.status(500).send(error);
    }
}

exports.signInPage = async (req, res) => {
    res.render('signin');
}

exports.login = async (req, res) => {
    try {
        const db = getDB(req);
        const service = new AuthService(db);

        if (!req.body.name || !req.body.password) {
            return res.status(400).json({
                error: 'name and password are required'
            });
        }

        const user = {
            name: req.body.name,
            password: req.body.password
        }

        const result = await service.signin(user);

        if (result.length === 0) {
            return res.status(400).json({
                error: 'User not found'
            });
        }

        const dbUser = result[0];

        const validPassword = await bcrypt.compare(user.password, dbUser.password);

        if (!validPassword) {
                return res.status(401).json({
                error: 'Invalid password'
            });
        }

        const token = jwt.sign(
            {
                id: dbUser.id,
                name: dbUser.name,
                role: dbUser.role
            },
            JWT_SECRET,
            { expiresIn: '1h' }
        );
        
        res.cookie("token", token, {
            httpOnly: true,
            sameSite: "lax"
        });

        res.status(200).redirect('/auth/profile');
    } catch (error) {
        res.status(500).send(error);
    }
}

exports.verify = async (req, res) => {
    const db = getDB(req);
    const service = new AuthService(db);

    const ver = await service.verify();

    res.json(ver);
}

exports.profile = async (req, res) => {
    try {
        const db = getDB(req);
        const service = new AuthService(db);

        const user = await service.profile(req.user.id);

        res.render('profile', { name: user[0].name, firstname: user[0].firstname, role: user[0].role });   
    } catch (error) {
        res.status(500).send(error);
    }
}

exports.logOut = async (req, res) => {
    res.clearCookie('token');
    res.redirect('/auth/signin');
}