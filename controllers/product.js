const express=require('express')
const productsModel=require('../models/products')
const { verifyToken } = require('../middleware/auth')



exports.getproduct=async(req,res,next)=>{
   try{
      const token=req.cookies.access_token
      const name= verifyToken(req).username
      const admin= verifyToken(req).isAdmin
   let id =req.params.id
  
   const product=await productsModel.findOne({_id:id})
      res.render('product',{
      product: product,
      name,token,admin,
      title: 'details of product',
    
   })}
   catch(err){
      next(err)
   }
     
      
   }
  
 
   


