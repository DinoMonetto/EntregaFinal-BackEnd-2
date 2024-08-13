// src/repositories/product.repository.js
import ProductDAO from '../dao/product.dao.js';
import ProductDTO from '../dto/product.dto.js';

class ProductRepository {
    async getAllProducts() {
        const products = await ProductDAO.getAll();
        return products.map(product => new ProductDTO(product));
    }

    async getProductById(id) {
        const product = await ProductDAO.getById(id);
        return new ProductDTO(product);
    }

    async createProduct(productData) {
        const newProduct = await ProductDAO.create(productData);
        return new ProductDTO(newProduct);
    }

    async updateProduct(id, productData) {
        const updatedProduct = await ProductDAO.update(id, productData);
        return new ProductDTO(updatedProduct);
    }

    async deleteProduct(id) {
        const deletedProduct = await ProductDAO.delete(id);
        return new ProductDTO(deletedProduct);
    }
}

export default new ProductRepository();
