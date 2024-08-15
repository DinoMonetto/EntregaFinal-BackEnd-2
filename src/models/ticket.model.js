import mongoose from 'mongoose';

const { Schema, model } = mongoose;

// esquema del ticket
const ticketSchema = new Schema({
    cartId: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Cart', // Referencia al carrito relacionado
        required: true
    },
    userId: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'User', // Referencia al usuario que realizó la compra
        required: true
    },
    totalAmount: {
        type: Number,
        required: true
    },
    createdAt: {
        type: Date,
        default: Date.now
    }
});

const Ticket = model('Ticket', ticketSchema);

export default Ticket;
