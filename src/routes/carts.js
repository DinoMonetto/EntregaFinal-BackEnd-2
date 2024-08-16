import express from 'express';
import { 
    addProductToCart, 
    deleteProductFromCart, 
    updateCart, 
    updateProductQuantity, 
    deleteAllProductsFromCart, 
    getCartWithProducts, 
    createCart 
} from '../controllers/cartController.js';

const router = express.Router();

// Crear el carrito
router.post('/', createCart);

// Añadir producto al carrito
router.post('/:cid/products/:pid', addProductToCart);

// Eliminar producto del carrito
router.delete('/:cid/products/:pid', deleteProductFromCart);

// Actualizar carrito con un arreglo de productos
router.put('/:cid', updateCart);

// Actualizar cantidad de un producto en el carrito
router.put('/:cid/products/:pid', updateProductQuantity);

// Eliminar todos los productos del carrito
router.delete('/:cid', deleteAllProductsFromCart);

// Obtener carrito con productos completos (populate)
router.get('/:cid', getCartWithProducts);

// Listado de carritos
router.get('/', async (req, res) => {
    try {
        const carts = await CartManager.getCarts(); 
        res.status(200).json(carts);
    } catch (error) {
        console.error('Error al obtener los carritos:', error);
        res.status(500).send('Error interno');
    }
});

export default router;
