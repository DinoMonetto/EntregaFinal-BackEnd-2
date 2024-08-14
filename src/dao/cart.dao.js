import Cart from '../models/cart.model.js';

class CartDAO {
    // Obtener un carrito por su ID
    async getById(cartId) {
        return await Cart.findById(cartId).populate('products.product');
    }

    // Crear un nuevo carrito
    async create(cartData) {
        const newCart = new Cart(cartData);
        return await newCart.save();
    }

    // Actualizar un carrito existente
    async update(cartId, cartData) {
        return await Cart.findByIdAndUpdate(cartId, cartData, { new: true });
    }

    // Eliminar un carrito por su ID
    async delete(cartId) {
        return await Cart.findByIdAndDelete(cartId);
    }

    // Obtener todos los carritos (puede ser útil para administración)
    async getAll() {
        return await Cart.find().populate('products.product');
    }
}

export default new CartDAO();
