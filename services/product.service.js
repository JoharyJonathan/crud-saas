const ProductRepository = require('../repositories/product.repo');

class ProductService {
    constructor(db) {
        this.productRepo = new ProductRepository(db);
    }

    getProducts() {
        return this.productRepo.findAll();
    }

    getProductById(id) {
        return this.productRepo.findById(id);
    }

    createProduct(product) {
        return this.productRepo.create(product);
    }

    editProductImage(product) {
        return this.productRepo.update_image(product);
    }

    editProduct(product) {
        return this.productRepo.update(product);
    }

    deleteProduct(id) {
        return this.productRepo.delete_product(id);
    }
}

module.exports = ProductService;