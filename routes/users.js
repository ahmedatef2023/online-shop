const  router  = require("express").Router()
const auth=require('../middleware/auth')

const usersController=require('../controllers/users')

router.get('/signup',auth.validateTokenToHide,usersController.getSignup)
router.post('/signup',usersController.postSignup)

router.get('/login',auth.validateTokenToHide,usersController.getlogin)
router.post('/login',usersController.postlogin)

router.get('/profile',auth.validateToken,usersController.getProfile)

router.all('/logout',usersController.logout)




module.exports=router