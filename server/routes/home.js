const  router  = require("express").Router()


const homeController=require('../controllers/home')

router.post('/',homeController.gethome)


module.exports=router