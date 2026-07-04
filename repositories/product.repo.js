class ProductRepository {
    constructor(db) {
        this.db = db;
    }

    findAll() {
        return this.db.query('SELECT * FROM products');
    }

    findById(id) {
        return this.db.query('SELECT * FROM products WHERE id = ?', [id]);
    }

    create(product) {
        return this.db.query('INSERT INTO products (name, description, stock, price, image) VALUES (?, ?, ?, ?, ?)', [product.name, product.description, product.stock, product.price, product.image]);
    }

    update_image(product) {
        return this.db.query('UPDATE products SET image = ? WHERE id = ?', [product.image, product.id]);
    }

    update(product) {
        return this.db.query('UPDATE products SET name = ?, description = ?, stock = ?, price = ? WHERE id = ?', [product.name, product.description, product.stock, product.price, product.id]);
    }

    delete_product(id) {
        return this.db.query('DELETE FROM products WHERE id = ?', [id]);
    }
}

module.exports = ProductRepository;