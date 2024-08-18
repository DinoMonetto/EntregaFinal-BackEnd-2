import Ticket from '../models/ticket.model.js';
import Cart from '../models/cart.model.js';
import nodemailer from 'nodemailer';

 
const sendEmail = async (recipient, subject, text) => {
    const transporter = nodemailer.createTransport({
        service: 'Gmail',  
        auth: {
            user: 'tuemail@gmail.com',  
            pass: 'tucontraseña'        
        }
    });

    const mailOptions = {
        from: 'tuemail@gmail.com',
        to: recipient,
        subject: subject,
        text: text
    };

    try {
        await transporter.sendMail(mailOptions);
        console.log('Correo enviado');
    } catch (error) {
        console.error('Error al enviar correo:', error);
    }
};

export const createTicket = async (req, res) => {
    try {
        const { cartId } = req.params;
        const userId = '64ba5f05edb3bfa7a8e02f3e'; // ID de usuario fijo

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

         
        cart.products = [];
        await cart.save();
 
        const recipientEmail = 'cliente@ejemplo.com'; 
        const subject = 'Tu ticket está listo';
        const text = `Hola, tu ticket ha sido generado con éxito. El ID de tu ticket es: ${newTicket._id}. Gracias por tu compra.`;

        await sendEmail(recipientEmail, subject, text);

        res.status(201).json({ message: 'Compra realizada con éxito, correo enviado', ticketId: newTicket._id });
    } catch (error) {
        res.status(500).json({ message: 'Error al generar el ticket', error: error.message });
    }
};
