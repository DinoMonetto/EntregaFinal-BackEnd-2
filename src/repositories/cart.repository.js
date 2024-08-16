// src/repositories/cart.repository.js
import CartDAO from '../dao/cart.dao.js';
import ProductDAO from '../dao/product.dao.js';
import CartDTO from '../dto/cart.dto.js';
import Cart from '../models/cart.model.js';

class CartRepository {
    async createCart() {
        const newCart = new Cart();
        await newCart.save();
        return newCart;
    }
    
    async getCartById(cartId) {
        return await CartDAO.getById(cartId);
    }

    async addProductToCart(cartId, productId) {
        const cart = await CartDAO.getById(cartId);
        if (!cart) throw new Error('Carrito no encontrado');
        
        const product = await ProductDAO.getById(productId);
        if (!product) throw new Error('Producto no encontrado');

        cart.products.push({ product: productId, quantity: 1 });
        return await CartDAO.update(cartId, cart);
    }

    async deleteProductFromCart(cartId, productId) {
        const cart = await CartDAO.getById(cartId);
        if (!cart) throw new Error('Carrito no encontrado');

        cart.products = cart.products.filter(p => p.product.toString() !== productId);
        return await CartDAO.update(cartId, cart);
    }

    async updateCart(cartId, products) {
        const cart = await CartDAO.getById(cartId);
        if (!cart) throw new Error('Carrito no encontrado');

        cart.products = products;
        return await CartDAO.update(cartId, cart);
    }

    async updateProductQuantity(cartId, productId, quantity) {
        const cart = await CartDAO.getById(cartId);
        if (!cart) throw new Error('Carrito no encontrado');

        const product = cart.products.find(p => p.product.toString() === productId);
        if (!product) throw new Error('Producto no encontrado en el carrito');

        product.quantity = quantity;
        return await CartDAO.update(cartId, cart);
    }

    async deleteAllProductsFromCart(cartId) {
        const cart = await CartDAO.getById(cartId);
        if (!cart) throw new Error('Carrito no encontrado');

        cart.products = [];
        return await CartDAO.update(cartId, cart);
    }

    async getCartWithProducts(cartId) {
        const cart = await CartDAO.getById(cartId);
        if (!cart) throw new Error('Carrito no encontrado');

        return new CartDTO(cart);
    }
}

export default new CartRepository();
