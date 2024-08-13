// src/controllers/cart.controller.js
import CartRepository from '../repositories/cart.repository.js';

export const addProductToCart = async (req, res) => {
  try {
    const { cid, pid } = req.params;
    await CartRepository.addProductToCart(cid, pid);
    res.status(200).send('Producto agregado al carrito');
  } catch (error) {
    console.error('Error al agregar producto al carrito:', error.message);
    res.status(500).send(error.message || 'Error interno');
  }
};

export const deleteProductFromCart = async (req, res) => {
  try {
    const { cid, pid } = req.params;
    await CartRepository.deleteProductFromCart(cid, pid);
    res.status(200).send('Producto eliminado del carrito');
  } catch (error) {
    console.error('Error al eliminar producto del carrito:', error.message);
    res.status(500).send(error.message || 'Error interno');
  }
};

export const updateCart = async (req, res) => {
  try {
    const { cid } = req.params;
    const { products } = req.body;
    await CartRepository.updateCart(cid, products);
    res.status(200).send('Carrito actualizado');
  } catch (error) {
    console.error('Error al actualizar carrito:', error.message);
    res.status(500).send(error.message || 'Error interno');
  }
};

export const updateProductQuantity = async (req, res) => {
  try {
    const { cid, pid } = req.params;
    const { quantity } = req.body;
    await CartRepository.updateProductQuantity(cid, pid, quantity);
    res.status(200).send('Cantidad de producto actualizada');
  } catch (error) {
    console.error('Error al actualizar cantidad de producto:', error.message);
    res.status(500).send(error.message || 'Error interno');
  }
};

export const deleteAllProductsFromCart = async (req, res) => {
  try {
    const { cid } = req.params;
    await CartRepository.deleteAllProductsFromCart(cid);
    res.status(200).send('Todos los productos eliminados del carrito');
  } catch (error) {
    console.error('Error al eliminar todos los productos del carrito:', error.message);
    res.status(500).send(error.message || 'Error interno');
  }
};

export const getCartWithProducts = async (req, res) => {
  try {
    const { cid } = req.params;
    const cart = await CartRepository.getCartWithProducts(cid);
    res.status(200).json(cart);
  } catch (error) {
    console.error('Error al obtener carrito con productos:', error.message);
    res.status(500).send(error.message || 'Error interno');
  }
};
