const  router  = require("express").Router()
const productController=require('../controllers/add_product')
const auth=require('../middleware/auth')


router.post("/add",auth.validateAdmin,productController.postProduct)



router.get("/orders", auth.validateAdmin, productController.getOrders)

router.post(
    "/orders",
    auth.validateAdmin,
    productController.postOrders
)

module.exports=router