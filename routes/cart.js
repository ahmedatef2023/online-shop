const  router  = require("express").Router()
const cartController=require('../controllers/cart')
const auth=require('../middleware/auth')


router.get("/", auth.validateToken, cartController.getCart);

router.post(
    "/",
    auth.validateToken,
    cartController.postCart
)

router.post(
    "/save",
    auth.validateToken,
    cartController.postSave
);

router.post(
    "/delete",
    auth.validateToken,
    cartController.postDelete
);

module.exports = router;