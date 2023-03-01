const productsModel=require('../models/products')
const path=require('path')
const {verifyToken}=require('../middleware/auth')

   

exports.gethome=async(req,res,next)=>{
   const token=req.cookies.access_token
   const name= verifyToken(req).username
   const admin= verifyToken(req).isAdmin

   let category =req.query.category
   let validCategories = ["clothes", "phones", "computers"]
   
   
   if(category && validCategories.includes(category)){
   const products=await productsModel.find({category:category})
      res.render('index',
      {products,name,token,admin,
      title:'home'})
     
      
   }
   else{
      const products=await productsModel.find({})
      res.render('index',
      {products,name,token,admin,
      title:'home'})
      
   }
}

   


