import express from 'express';
import { createTicket } from '../controllers/ticketController.js';

const router = express.Router();

// Crear ticket después de una compra 
router.post('/purchase/:cartId', createTicket);

export default router;
