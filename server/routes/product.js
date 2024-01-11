const  router  = require("express").Router()
const productController=require('../controllers/product')
const auth=require('../middleware/auth')

router.get('/:id',auth.validateToken,productController.getproduct)


module.exports=router