const express=require('express')
const productsModel=require('../models/products')



exports.getproduct=async(req,res,next)=>{
   try{
   let id =req.params.id
  
   const product=await productsModel.findOne({_id:id})
      res.render('product',{
      product: product,
      title: 'details of product',
    
   })}
   catch(err){
      next(err)
   }
     
      
   }
  
 
   


