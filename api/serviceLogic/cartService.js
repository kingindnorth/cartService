// Add product to cart
const addProductToCart = async (body) => {
    const { customerId, productId, name, price, quantity } = body;

    let cart = await Cart.findOne({ customerId });

    if (!cart) {
        // Create a new cart if none exists
        cart = new Cart({
            customerId,
            items: [{ productId, name, quantity, price, totalPrice: price * quantity }],
            totalAmount: price * quantity
        });
    } else {
        // If the cart exists, check if the product is already in the cart
        const productIndex = cart.items.findIndex(item => item.productId === productId);
        
        if (productIndex >= 0) {
            // If the product exists in the cart, update its quantity
            const existingItem = cart.items[productIndex];
            cart.items[productIndex].quantity += quantity;
            cart.items[productIndex].totalPrice = cart.items[productIndex].quantity * price;
        } else {
            // If the product doesn't exist in the cart, add it
            cart.items.push({ productId, name, quantity, price, totalPrice: price * quantity });
        }

        // Update the total amount
        cart.totalAmount = cart.items.reduce((sum, item) => sum + item.totalPrice, 0);
    }

    await cart.save();
    return cart
};

// Get cart for a specific customer
const getMyCart = async (params) => {
    const { customerId } = params;
    const cart = await Cart.findOne({ customerId });

    if (!cart) {
        return { status: 404, message: 'Cart not found' }
    }
    return cart
};

// Update product quantity in the cart
const updateProductQuantity = async (params,body) => {
    const { customerId } = params;
    const { productId, quantity, price } = body;

    let cart = await Cart.findOne({ customerId });
    if (!cart) {
        return {status: 404, message: 'Cart not found'};
    }

    const productIndex = cart.items.findIndex(item => item.productId === productId);
    if (productIndex >= 0) {
        // Update the quantity and total price of the product
        cart.items[productIndex].quantity = quantity;
        cart.items[productIndex].totalPrice = quantity * price;

        // Update the total cart amount
        cart.totalAmount = cart.items.reduce((sum, item) => sum + item.totalPrice, 0);

        await cart.save();
        return cart;
    }

    return {status: 404, message: 'Product not found in the cart'};
};

// Remove a product from the cart
const deleteCartProduct = async (params) => {
    const { customerId, productId } = params;

    let cart = await Cart.findOne({ customerId });
    if (!cart) {
        return {status:404, message: 'Cart not found'};
    }

    cart.items = cart.items.filter(item => item.productId !== productId);
    cart.totalAmount = cart.items.reduce((sum, item) => sum + item.totalPrice, 0);

    await cart.save();
    return 1;
};

// Checkout and prepare for payment
const checkoutAndPay = async (params) => {
    const { customerId } = params;

    let cart = await Cart.findOne({ customerId });
    if (!cart) {
        return {status:404, message: 'Cart not found'};
    }

    // Here you would trigger the payment process and forward the cart to the Order Service
    return cart
};

module.exports = {
    addProductToCart,
    getMyCart,
    updateProductQuantity,
    deleteCartProduct,
    checkoutAndPay
};
