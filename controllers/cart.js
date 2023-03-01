const cartModel = require("../models/cart")
const {verifyToken}=require('../middleware/auth')



exports.getCart = async(req, res, next) => {
    const userId=await verifyToken(req)._id
    const token=req.cookies.access_token
    const name= await verifyToken(req).username
    const admin=await verifyToken(req).isAdmin
    const errr=req.flash("validationErrors");
    const items=await cartModel
        .getItemsByUser(userId)
      
    res.render("cart", {
                items: items,
                isUser: true,
                // isAdmin: req.session.isAdmin,
                title: "Cart",
            
                errr,name,token,admin
                
            })
        
       
}

exports.postCart = async(req, res, next) => {
    try{
        const userId=await verifyToken(req)._id
        const email=await verifyToken(req).email
        const productId=req.body.productId
        const match=await cartModel.getItemsByProduct(productId)
        // console.log(match)
        if(!match){  
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
          
        res.redirect("/cart")}
        else{
            await cartModel.editItemByProduct(productId, {
                amount:match.amount+1,
                timestamp: Date.now()
            })
            
            res.redirect("/cart")
        }
        }
    catch(err){
        
             req.flash("validationErrors", err)
             res.redirect(req.body.redirectTo)  
              }
   
        
    }


exports.postSave = (req, res, next) => {
   try {
 
    // console.log(req.body.amount)
        cartModel
            .editItem(req.body.cartId,
                 {
                amount: req.body.amount,
                timestamp: Date.now()
            })
        res.redirect("/cart")
    } catch(errr) {
           console.log(errr.message)
        req.flash("validationErrors",errr.message)
        res.redirect("/cart");
    }
}

exports.postDelete = (req, res, next) => {
   try{ cartModel
        .deleteItem(req.body.cartId)
    res.redirect("/cart")}
        catch(errr) {
             res.redirect("/error")}
}