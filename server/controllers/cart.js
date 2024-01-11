const cartModel = require("../models/cart")
const { verifyToken } = require('../middleware/auth')



exports.getCart = async (req, res, next) => {
    const userId = await verifyToken(req)._id


    const errr = req.flash("validationErrors");
    const items = await cartModel
        .getItemsByUser(userId)

    res.send(items)


}

exports.postCart = async (req, res, next) => {
    try {


        const userId = await verifyToken(req)._id
        const email = await verifyToken(req).email
        const productId = req.body._id

        const match = await cartModel.getItemsByProduct(productId, userId)
        // console.log(match)
        if (!match) {
            cartModel
                .addNewItem({
                    name: req.body.name,
                    price: req.body.price,
                    amount: '1',
                    email: email,
                    productId: productId,
                    userId: userId,
                    timestamp: Date.now()
                })

            res.send("done")
        }
        else {
            await cartModel.editItemByProduct(productId, userId, {
                amount: match.amount + 1,
                timestamp: Date.now()
            })

            res.redirect("+- done")
        }
    }
    catch (err) {

        req.flash("validationErrors", err)
        res.redirect(req.body.redirectTo)
    }


}


exports.postSave = (req, res, next) => {
    try {
        //  console.log(req.body)
        // console.log(req.body.amount)
        cartModel
            .editItem(req.body.cartId,
                {
                    amount: req.body.amount,
                    timestamp: Date.now()
                })
        res.send('done')

    } catch (errr) {

        res.send(errr.message)

    }
}

exports.postDelete = (req, res, next) => {
    try {
        cartModel
            .deleteItem(req.body._id)
        res.redirect("/cart")
    }
    catch (errr) {
        res.redirect("/error")
    }
}