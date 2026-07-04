var express = require('express');
var router = express.Router();

var authenticateToken = require('../middleware/authMiddleware');
var authorizeRoles = require('../middleware/roleMiddleware');

var usercontroller = require('../controllers/user.controller');

/* GET users listing. */
router.get('/', authenticateToken, authorizeRoles('admin'), usercontroller.getUsers);

/* CREATE a new user*/
router.post('/create', authenticateToken, authorizeRoles('admin'), usercontroller.createUser);

/* GET create user form */
router.get('/new', authenticateToken, authorizeRoles('admin'), usercontroller.getCreateUserForm);

/* GET user edit form */
router.get('/edit/:id', authenticateToken, authorizeRoles('admin'), usercontroller.getEditUserForm);

/* PUT user by id*/
router.put('/put/:id', authenticateToken, authorizeRoles('admin'), usercontroller.editUser);

/* DELETE user by id*/
router.delete('/delete/:id', authenticateToken, authorizeRoles('admin'), usercontroller.deleteUser);

/* GET user by id */
router.get('/:id', authenticateToken, authorizeRoles('admin'), usercontroller.getUserById);

module.exports = router;