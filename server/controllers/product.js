const express=require('express')
const productsModel=require('../models/products')
const { verifyToken } = require('../middleware/auth')



exports.getproduct=async(req,res,next)=>{
   try{
      
   let id =req.params.id
  
   const product=await productsModel.findOne({_id:id})
      res.send(
      product)
   }
   catch(err){
      next(err)
   }
     
      
   }
  
 
   


