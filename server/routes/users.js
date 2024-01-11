const  router  = require("express").Router()
const auth=require('../middleware/auth')

const usersController=require('../controllers/users')


router.post('/signup',usersController.postSignup)
router.post('/login',usersController.postlogin)


module.exports=router