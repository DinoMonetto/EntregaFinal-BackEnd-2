// src/controllers/product.controller.js
import ProductRepository from '../repositories/product.repository.js';

export const getProducts = async (req, res) => {
  try {
    const { page = 1, limit = 10, ...query } = req.query;
    const options = {
      page: parseInt(page, 10),
      limit: parseInt(limit, 10)
    };
    const products = await ProductRepository.getAllProducts(query, options);
    res.status(200).json({ status: 'success', payload: products });
  } catch (error) {
    console.error('Error al obtener los productos:', error.message);
    res.status(500).json({ status: 'error', message: 'Error al obtener los productos' });
  }
};

export const getProductById = async (req, res) => {
  try {
    const { id } = req.params;
    const product = await ProductRepository.getProductById(id);
    res.status(200).json({ status: 'success', payload: product });
  } catch (error) {
    console.error('Error al obtener el producto:', error.message);
    res.status(500).json({ status: 'error', message: 'Error al obtener el producto' });
  }
};

export const addProduct = async (req, res) => {
  try {
    const productData = req.body;
    const newProduct = await ProductRepository.createProduct(productData);
    res.status(201).json({ status: 'success', payload: newProduct });
  } catch (error) {
    console.error('Error al agregar producto:', error.message);
    res.status(500).json({ status: 'error', message: 'Error al agregar producto' });
  }
};

export const updateProduct = async (req, res) => {
  try {
    const { id } = req.params;
    const productData = req.body;
    const updatedProduct = await ProductRepository.updateProduct(id, productData);
    res.status(200).json({ status: 'success', payload: updatedProduct });
  } catch (error) {
    console.error('Error al actualizar el producto:', error.message);
    res.status(500).json({ status: 'error', message: 'Error al actualizar el producto' });
  }
};

export const deleteProduct = async (req, res) => {
  try {
    const { id } = req.params;
    const deletedProduct = await ProductRepository.deleteProduct(id);
    res.status(200).json({ status: 'success', payload: deletedProduct });
  } catch (error) {
    console.error('Error al eliminar el producto:', error.message);
    res.status(500).json({ status: 'error', message: 'Error al eliminar el producto' });
  }
};
