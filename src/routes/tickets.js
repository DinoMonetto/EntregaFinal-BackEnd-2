import express from 'express';
import { createTicket } from '../controllers/ticketController.js';
import { authorizeRole } from '../middlewares/auth.middleware.js';

const router = express.Router();

// Crear ticket después de una compra (solo usuarios)
router.post('/purchase/:cartId', authorizeRole(['user']), createTicket);

export default router;
