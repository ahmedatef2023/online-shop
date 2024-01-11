const cartModel = require("../models/cart")
const orderModel = require("../models/orders")
const { verifyToken } = require('../middleware/auth')

const validationResult = require("express-validator").validationResult;

exports.getOrderVerify = async (req, res, next) => {
    try {
        // console.log(req.body)
   const name= verifyToken(req).username
   const admin= verifyToken(req).isAdmin
        const cartItem = await cartModel
            .getItemById(req.body.idItem)

        res.send(cartItem)
    }
    catch (err) { res.send(err) }
};

exports.getOrder = async (req, res, next) => {
    
    try {
        const items = await orderModel
            .getOrdersByUser(verifyToken(req)._id)

            
            
        res.send(items)
    }

    catch (err) { res.redirect("/error") }
};

exports.postOrder = async (req, res, next) => {
    if (validationResult(req).isEmpty()) {
        try {
            await orderModel
                .addNewOrder(req.body)
            res.send("done post order")
        }
        catch (err) {
            res.send(err);
        }
    }
    else {
        res.send(validationResult(req).array());
        
    }
}

exports.postCancel = async (req, res, next) => {
    try {
        await orderModel
            .cancelOrder(req.body._id)
        res.redirect("/orders")
    }
    catch (err) {
        res.redirect("/error")
    }
}
