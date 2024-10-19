const cartBusiness = require('../businessLogic/cartBusiness');

const addProductToCart = (req, res) => {
  cartBusiness.addProductToCart(req.body).then(async (response) => {
    res.status(200).send(response)
  }).catch(async (error) => {
    res.status(error.status).send(response)
  });
};

const getMyCart = (req, res) => {
  cartBusiness.getMyCart(req.params).then(async (response) => {
    res.status(200).send(response)
  }).catch(async (error) => {
    res.status(error.status).send(response)
  });
};

const updateProductQuantity = (req, res) => {
  cartBusiness.updateProductQuantity(req.params, req.body).then(async (response) => {
    res.status(200).send(response)
  }).catch(async (error) => {
    res.status(error.status).send(response)
  });
};

const deleteCartProduct = (req, res) => {
  cartBusiness.deleteCartProduct(req.params).then(async (response) => {
    res.status(200).send(response)
  }).catch(async (error) => {
    res.status(error.status).send(response)
  });
};

const checkoutAndPay = (req, res) => {
  cartBusiness.checkoutAndPay(req.params).then(async (response) => {
    res.status(200).send(response)
  }).catch(async (error) => {
    res.status(error.status).send(response)
  });
};

module.exports = {
  addProductToCart,
  getMyCart,
  updateProductQuantity,
  deleteCartProduct,
  checkoutAndPay
};