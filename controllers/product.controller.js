const ProductService = require('../services/product.service');
const { getDB } = require('../db');

exports.getProducts = async (req, res) => {
    const db = getDB(req);
    const service = new ProductService(db);

    const products = await service.getProducts();

    res.render('products', { products });
}

exports.getProductById = async (req, res) => {
    const db = getDB(req);
    const service = new ProductService(db);

    const id = req.params.id;

    const product = await service.getProductById(id);

    res.render('product', { product: product[0] });
}

exports.getCreateProductForm = async (req, res) => {
    res.render('newProduct');
}

exports.createProduct = async (req, res) => {
    try {
        const db = getDB(req);
        const service = new ProductService(db);

        if (!req.file) {
            return res.status(400).send('Please select an image');
        }

        const product = {
            ...req.body,
            image: req.file.filename
        };

        await service.createProduct(product);

        res.status(201).redirect('/products');
    } catch (error) {
        res.status(500).send(error);
    }
}

exports.getEditProductForm = async (req, res) => {
    try {
        const db = getDB(req);
        const service = new ProductService(db);

        const id = req.params.id;

        const prod = await service.getProductById(id);

        res.render('editProduct', { product: prod[0] });
    } catch (error) {
        res.status(500).send(error);
    }
}

exports.editProduct = async (req, res) => {
    try {
        const db = getDB(req);
        const service = new ProductService(db);

        const product = {
            id: req.params.id,
            ...req.body
        };

        await service.editProduct(product);

        res.status(200).redirect('/products');
    } catch (error) {
        res.status(500).send(error);
    }
}

exports.editProductImage = async (req, res) => {
    try {
        const db = getDB(req);
        const service = new ProductService(db);

        const product = {
            id: req.params.id,
            image: req.file.filename
        }

        await service.editProductImage(product);

        res.status(200).redirect('/products');
    } catch (error) {
        res.status(500).send(error);
    }
}

exports.deleteProduct = async (req, res) => {
    try {
        const db = getDB(req);
        const service = new ProductService(db);

        const id = req.params.id;

        const product = await service.deleteProduct(id);

        res.status(204).redirect('/products');
    } catch (error) {
        res.status(500).send(error);
    }
}