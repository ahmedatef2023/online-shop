const router = require("express").Router()
const check = require("express-validator").check

const orderController = require("../controllers/orders")
const auth=require('../middleware/auth')

router.post("/verify-order", auth.validateToken, orderController.getOrderVerify);

router.get("/orders", auth.validateToken, orderController.getOrder);

router.post(
    "/orders",
    auth.validateToken,
   check("address")
        .not()
        .isEmpty()
        .withMessage("address is required"),
    orderController.postOrder
)

router.post(
    "/orders/cancel",
    auth.validateToken,
    orderController.postCancel
)

module.exports = router;
