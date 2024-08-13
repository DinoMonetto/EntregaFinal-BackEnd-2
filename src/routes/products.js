import express from 'express';
import Product from '../models/product.model.js';
import { authorizeRole } from '../middlewares/auth.middleware.js';

const router = express.Router();

// Obtener productos con paginación y filtrado
router.get('/', async (req, res) => {
    try {
        const { limit = 10, page = 1, sort, query } = req.query;
        const options = {
            limit: parseInt(limit),
            page: parseInt(page),
            sort: sort ? { price: sort === 'asc' ? 1 : -1 } : {}
        };

        const filter = query ? { category: query } : {};

        const products = await Product.paginate(filter, options);

        res.json({
            status: 'success',
            payload: products.docs,
            totalPages: products.totalPages,
            prevPage: products.hasPrevPage ? products.page - 1 : null,
            nextPage: products.hasNextPage ? products.page + 1 : null,
            page: products.page,
            hasPrevPage: products.hasPrevPage,
            hasNextPage: products.hasNextPage,
            prevLink: products.hasPrevPage ? `/api/products?limit=${limit}&page=${products.page - 1}&sort=${sort}&query=${query}` : null,
            nextLink: products.hasNextPage ? `/api/products?limit=${limit}&page=${products.page + 1}&sort=${sort}&query=${query}` : null
        });
    } catch (error) {
        res.status(500).json({ status: 'error', message: error.message });
    }
});

// Añadir, actualizar y eliminar productos solo puede ser realizado por un administrador
router.post('/', authorizeRole(['admin']), async (req, res) => {
    // Lógica para añadir un producto
});

router.put('/:id', authorizeRole(['admin']), async (req, res) => {
    // Lógica para actualizar un producto
});

router.delete('/:id', authorizeRole(['admin']), async (req, res) => {
    // Lógica para eliminar un producto
});

export default router;
