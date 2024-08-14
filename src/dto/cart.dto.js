class CartDTO {
    constructor(cart) {
        this.id = cart._id;
        this.products = cart.products.map(productItem => ({
            productId: productItem.product._id,
            productName: productItem.product.name,
            quantity: productItem.quantity,
            price: productItem.product.price,
            total: productItem.quantity * productItem.product.price
        }));
        this.totalAmount = this.calculateTotalAmount(cart.products);
        this.userId = cart.userId; // Asumiendo que tienes un userId en tu modelo de carrito
    }

    // Método para calcular el monto total del carrito
    calculateTotalAmount(products) {
        return products.reduce((acc, productItem) => {
            return acc + (productItem.quantity * productItem.product.price);
        }, 0);
    }
}

export default CartDTO;
