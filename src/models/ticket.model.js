import mongoose from 'mongoose';

const { Schema, model } = mongoose;

// Definimos el esquema para el ticket
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

// Creamos el modelo a partir del esquema
const Ticket = model('Ticket', ticketSchema);

export default Ticket;
