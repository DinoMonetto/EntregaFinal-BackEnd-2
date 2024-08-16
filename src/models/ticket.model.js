import mongoose from 'mongoose';

const { Schema, model } = mongoose;


const ticketSchema = new Schema({
    cartId: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Cart',
        required: true
    },
    userId: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'User',
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
