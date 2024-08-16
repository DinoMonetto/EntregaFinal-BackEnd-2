// src/controllers/cart.controller.js
import CartDAO from '../dao/cart.dao.js';
import Product from '../models/product.model.js'; 

export const addProductToCart = async (req, res) => {
  try {
    const { cid, pid } = req.params;
    const { quantity } = req.body;

    // Verificar que la cantidad sea válida
    if (quantity <= 0) {
      return res.status(400).send('La cantidad debe ser mayor que cero');
    }

    // Verificar que el carrito existe
    const cart = await CartDAO.getById(cid);
    if (!cart) {
      return res.status(404).send('Carrito no encontrado');
    }

    // Verificar que el producto existe
    const product = await Product.findById(pid);
    if (!product) {
      return res.status(404).send('Producto no encontrado');
    }

    // Agregar o actualizar producto en el carrito
    const existingProductIndex = cart.products.findIndex(item => item.productId.equals(pid));

    if (existingProductIndex > -1) {
      // Si el producto ya está en el carrito, actualizar la cantidad
      cart.products[existingProductIndex].quantity += quantity;
    } else {
      // Si el producto no está en el carrito, agregarlo
      cart.products.push({ productId: pid, quantity });
    }

    // Recalcular el total del carrito
    cart.total = cart.products.reduce((acc, item) => acc + (item.quantity * product.price), 0);

    // Guardar el carrito actualizado
    await CartDAO.update(cid, cart);

    res.status(200).send('Producto agregado al carrito');
  } catch (error) {
    console.error('Error al agregar producto al carrito:', error.message);
    res.status(500).send(error.message || 'Error interno');
  }
};

export const createCart = async (req, res) => {
  try {
    const newCart = await CartDAO.create({ products: [] }); 
    res.status(201).json(newCart);
  } catch (error) {
    console.error('Error al crear el carrito:', error.message);
    res.status(500).send(error.message || 'Error interno');
  }
};

export const deleteProductFromCart = async (req, res) => {
  try {
    const { cid, pid } = req.params;
    const cart = await CartDAO.getById(cid);

    if (!cart) {
      return res.status(404).send('Carrito no encontrado');
    }

    cart.products = cart.products.filter(item => !item.productId.equals(pid));
    cart.total = cart.products.reduce((acc, item) => acc + (item.quantity * item.productId.price), 0);

    await CartDAO.update(cid, cart);
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



    await CartDAO.update(cid, { products });
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

    const cart = await CartDAO.getById(cid);

    if (!cart) {
      return res.status(404).send('Carrito no encontrado');
    }

    const product = cart.products.find(item => item.productId.equals(pid));
    if (!product) {
      return res.status(404).send('Producto no encontrado en el carrito');
    }

    product.quantity = quantity;

    // Recalcular el total del carrito
    cart.total = cart.products.reduce((acc, item) => acc + (item.quantity * item.productId.price), 0);

    await CartDAO.update(cid, cart);
    res.status(200).send('Cantidad de producto actualizada');
  } catch (error) {
    console.error('Error al actualizar cantidad de producto:', error.message);
    res.status(500).send(error.message || 'Error interno');
  }
};

export const deleteAllProductsFromCart = async (req, res) => {
  try {
    const { cid } = req.params;
    const cart = await CartDAO.getById(cid);

    if (!cart) {
      return res.status(404).send('Carrito no encontrado');
    }

    cart.products = [];
    cart.total = 0;

    await CartDAO.update(cid, cart);
    res.status(200).send('Todos los productos eliminados del carrito');
  } catch (error) {
    console.error('Error al eliminar todos los productos del carrito:', error.message);
    res.status(500).send(error.message || 'Error interno');
  }
};

export const getCartWithProducts = async (req, res) => {
  try {
    const { cid } = req.params;
    const cart = await CartDAO.getById(cid);
    res.status(200).json(cart);
  } catch (error) {
    console.error('Error al obtener carrito con productos:', error.message);
    res.status(500).send(error.message || 'Error interno');
  }
};
