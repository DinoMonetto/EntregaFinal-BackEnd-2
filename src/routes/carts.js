import express from 'express';
import Cart from '../models/cart.model.js';
import Product from '../models/product.model.js';
import { addProductToCart, deleteProductFromCart, updateCart, updateProductQuantity, deleteAllProductsFromCart, getCartWithProducts } from '../controllers/cartController.js';
import { authorizeRole } from '../middlewares/auth.middleware.js';

const router = express.Router();

// Añadir producto al carrito (solo usuarios)
router.post('/:cid/products/:pid', authorizeRole(['user']), addProductToCart);

// Eliminar producto del carrito (solo usuarios)
router.delete('/:cid/products/:pid', authorizeRole(['user']), deleteProductFromCart);

// Actualizar carrito con un arreglo de productos (solo usuarios)
router.put('/:cid', authorizeRole(['user']), updateCart);

// Actualizar cantidad de un producto en el carrito (solo usuarios)
router.put('/:cid/products/:pid', authorizeRole(['user']), updateProductQuantity);

// Eliminar todos los productos del carrito (solo usuarios)
router.delete('/:cid', authorizeRole(['user']), deleteAllProductsFromCart);

// Obtener carrito con productos completos (populate) (solo usuarios)
router.get('/:cid', authorizeRole(['user']), getCartWithProducts);

// Listado de carritos (solo usuarios)
router.get('/', authorizeRole(['user']), (req, res) => {
    res.send('Listado de carritos');
});

export default router;
