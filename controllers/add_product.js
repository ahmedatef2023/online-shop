const productsModel=require('../models/products')
const path=require('path')
const ordersModel=require('../models/orders')
const {verifyToken}=require('../middleware/auth')

const multer =require('multer')

const storage =multer.diskStorage({
    destination: (req,file,cb)=>{
        cb(null,'./tmp')
    },
    filename: (req,file,cb)=>{
        const fileName=Date.now()+'_'+file.originalname.replace(/\s+/,'-')
        cb(null,fileName)
    }
})
   const upload = multer({storage: storage}).single('file')
   

   



   exports.postProduct=[upload,async(req,res,next)=>{
    try{
    const token=req.cookies.access_token
    const name= verifyToken(req).username

     var product =new productsModel(
       
       {
       name:req.body.name,
      img :req.file.filename,
      price : req.body.price,
      category :req.body.category,
      description :req.body.description
     }
     )
   await product.save()
   req.flash("added", true)
   
   res.redirect('/admin/add')
    }
    catch(errr){
       req.flash('errr',errr.message)
       console.log(errr.message)
      res.redirect('/')
      
    
    }
 }]

 exports.getProduct=(req,res,next)=>{
    const token=req.cookies.access_token
   const name= verifyToken(req).username
   const admin= verifyToken(req).isAdmin

        res.render('add_product',{
            title: 'add product',
            productAdded: req.flash("added")[0],
            name,token,admin
        })
 }


 
exports.getOrders =async (req, res, next) => {
    try{
        const token=req.cookies.access_token
        const name= verifyToken(req).username
        const admin= verifyToken(req).isAdmin
   const items=await ordersModel
        .getAllOrders()
        
            res.render("manage-orders", {
                title: "Manage Orders",
                isUser: true,
                isAdmin: true,
                items: items
                ,name,token,admin
            })
        }
        catch(err) { res.redirect("/error")}
}

exports.postOrders =async (req, res, next) => {
    try{
   await ordersModel
        .editOrder(req.body.orderId, req.body.status)
       res.redirect("/admin/orders")
    }
        catch(err) {
            res.redirect("/error");
        }
};


   

