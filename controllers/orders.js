const cartModel = require("../models/cart")
const orderModel = require("../models/orders")
const { verifyToken } = require('../middleware/auth')

const validationResult = require("express-validator").validationResult;

exports.getOrderVerify = async (req, res, next) => {
    try {
        const token=req.cookies.access_token
   const name= verifyToken(req).username
   const admin= verifyToken(req).isAdmin
        const cartItem = await cartModel
            .getItemById(req.query.order)

        res.render("verify-order", {
            cart: cartItem,
            isUser: true,
            isAdmin: verifyToken(req).isAdmin,
            title: "Verify Order",
            name,token,admin,
            validationError: req.flash("validationErrors")[0]
        })
    }
    catch (err) { res.redirect("/error") }
};

exports.getOrder = async (req, res, next) => {
    try {
        const items = await orderModel
            .getOrdersByUser(verifyToken(req)._id)

            const token=req.cookies.access_token
            const name= verifyToken(req).username
            const admin= verifyToken(req).isAdmin
        res.render("orders", {
            title: "Orders",
            isUser: true,
            isAdmin: verifyToken(req).isAdmin,
            items: items
            ,name,token,admin
        })
    }

    catch (err) { res.redirect("/error") }
};

exports.postOrder = async (req, res, next) => {
    if (validationResult(req).isEmpty()) {
        try {
            await orderModel
                .addNewOrder(req.body)
            res.redirect("/orders")
        }
        catch (err) {
            res.redirect("/error");
        }
    }
    else {
        req.flash("validationErrors", validationResult(req).array());
        res.redirect("/verify-order?order=" + req.body.cartId);
    }
}

exports.postCancel = async (req, res, next) => {
    try {
        await orderModel
            .cancelOrder(req.body.orderId)
        res.redirect("/orders")
    }
    catch (err) {
        res.redirect("/error")
    }
}
