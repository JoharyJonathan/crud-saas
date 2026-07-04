var express = require('express');
var router = express.Router();

var authenticateToken = require('../middleware/authMiddleware');
var authorizeRoles = require('../middleware/roleMiddleware');

var rolecontroller = require('../controllers/role.controller');

/* GET roles list */
router.get('/', authenticateToken, authorizeRoles('admin'), rolecontroller.getRoles);

/* GET create role form */
router.get('/new', authenticateToken, authorizeRoles('admin'), rolecontroller.getCreateRoleForm);

/* POST create new role */
router.post('/create', authenticateToken, authorizeRoles('admin'), rolecontroller.createRole);

/* GET edit role form */
router.get('/edit/:id', authenticateToken, authorizeRoles('admin'), rolecontroller.getEditRoleForm);

/* PUT role by id */
router.put('/put/:id', authenticateToken, authorizeRoles('admin'), rolecontroller.editRole);

/* DELETE role by id */
router.delete('/delete/:id', authenticateToken, authorizeRoles('admin'), rolecontroller.deleteRole);

/* GET role by id */
router.get('/:id', authenticateToken, authorizeRoles('admin'), rolecontroller.getRoleById);

module.exports = router;