const productsModel = require('../models/products')
const path = require('path')
const ordersModel = require('../models/orders')


const multer = require('multer')

const storage = multer.diskStorage({
    destination: (req, file, cb) => {
        cb(null, './upload')
    },
    filename: (req, file, cb) => {
        const fileName = Date.now() + '_' + file.originalname.replace(/\s+/, '-')
        cb(null, fileName)
    }
})
const upload = multer({ storage: storage }).single('file')






exports.postProduct = [upload, async (req, res, next) => {
    try {

        // console.log(req.file)
        var product = new productsModel(

            {
                name: req.body.name,
                imgUrl: req.file.path,
                price: req.body.price,
                category: req.body.category,
                description: req.body.description
            }
        )
        await product.save()


        res.send({ added: true })
    }
    catch (errr) {

        res.status(422).send(errr.message)



    }
}]




exports.getOrders = async (req, res, next) => {
    try {

        const items = await ordersModel
            .getAllOrders()

        res.send(items)
    }
    catch (err) { res.send(err) }
}

exports.postOrders = async (req, res, next) => {
    try {
        await ordersModel
            .editOrder(req.body.productId, req.body.status)
        res.redirect("/admin/orders")
    }
    catch (err) {
        res.redirect("/error");
    }
};




