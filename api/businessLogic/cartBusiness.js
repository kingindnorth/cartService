const cartService = require("../serviceLogic/cartService")

const addProductToCart = async (body) => cartService.addProductToCart(body)
const getMyCart = async (params) => cartService.getMyCart(params)
const updateProductQuantity = async (params,body) => cartService.updateProductQuantity(params,body)
const deleteCartProduct = async (params) => cartService.deleteCartProduct(params)
const checkoutAndPay = async (params) => cartService.checkoutAndPay(params)

module.exports = {
    addProductToCart,
    getMyCart,
    updateProductQuantity,
    deleteCartProduct,
    checkoutAndPay
  };