// src/dao/cart.dao.js
import Cart from '../models/cart.model.js';

class CartDAO {
    async getById(cartId) {
        return await Cart.findById(cartId).populate('products.productId');
    }

    async create(cartData) {
        const newCart = new Cart(cartData);
        return await newCart.save();
    }

    async update(cartId, cartData) {
        return await Cart.findByIdAndUpdate(cartId, cartData, { new: true });
    }

    async delete(cartId) {
        return await Cart.findByIdAndDelete(cartId);
    }

    async getAll() {
        return await Cart.find().populate('products.productId');
    }
}

export default new CartDAO();
