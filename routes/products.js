var express = require('express');
var router = express.Router();

var upload = require('../uploads/uploadProduct');
var authenticateToken = require('../middleware/authMiddleware');
var authorizeRoles = require('../middleware/roleMiddleware');

var productcontroller = require('../controllers/product.controller');

/* GET All products */
router.get('/', authenticateToken, authorizeRoles('admin', 'user'), productcontroller.getProducts);

/* GET New Product form */
router.get('/new', authenticateToken, authorizeRoles('admin', 'user'), productcontroller.getCreateProductForm);

/* POST Create new product */
router.post('/create', authenticateToken, upload.single("image"), authorizeRoles('admin', 'role'), productcontroller.createProduct);

/* DELETE product by id */
router.delete('/delete/:id', authenticateToken, authorizeRoles('admin', 'user'), productcontroller.deleteProduct);

/* GET edit product form */
router.get('/edit/:id', authenticateToken, authorizeRoles('admin', 'user'), productcontroller.getEditProductForm);

/* POST update product image by id */
router.post('/put-image/:id', authenticateToken, upload.single("image"), authorizeRoles('admin', 'user'), productcontroller.editProductImage);

/* PUT update product by id */
router.put('/put/:id', authenticateToken, authorizeRoles('admin', 'user'), productcontroller.editProduct);

/* GET product by id */
router.get('/:id', authenticateToken, authorizeRoles('admin', 'user'), productcontroller.getProductById);

module.exports = router;