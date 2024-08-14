import Ticket from '../models/ticket.model.js';
import Cart from '../models/cart.model.js';

export const createTicket = async (req, res) => {
    try {
        const { cartId } = req.params;
        const userId = req.user._id;  
        const cart = await Cart.findById(cartId).populate('products.productId');

        if (!cart) {
            return res.status(404).json({ message: 'Carrito no encontrado' });
        }

        const totalAmount = cart.products.reduce((acc, item) => acc + item.quantity * item.productId.price, 0);

        const newTicket = new Ticket({
            cartId: cart._id,
            userId,
            totalAmount
        });

        await newTicket.save();

        // Después de generar el ticket, puedes limpiar el carrito
        cart.products = [];
        await cart.save();

        res.status(201).json({ message: 'Compra realizada con éxito', ticketId: newTicket._id });
    } catch (error) {
        res.status(500).json({ message: 'Error al generar el ticket', error: error.message });
    }
};
