const jwt = require('jsonwebtoken')
const bcrypt = require('bcrypt')
const check = require("express-validator").check
const validationResult = require("express-validator").validationResult
const usersModel = require('../models/users')
const {verifyToken}=require('../middleware/auth')








exports.postSignup = async (req, res, next) => {
   try{
      
   let email = req.body.email
  
//   console.log(req.body)
   const User = await usersModel.findOne({ email: email })
// console.log(User)
   if ((!User) && (req.body.password === req.body.confirmPassword)) {
      
      var user = new usersModel(

         {
            username: req.body.username,
            email: req.body.email,
            password: req.body.password,

         }
      )
      await user.save()
      const token = jwt.sign({ user }, process.env.jwt_secret)
      res.send(token)
      
   }
   else if (req.body.password !== req.body.confirmPassword) {
      throw new Error('no match password')
     
   }
   else {

      throw new Error('enter another email')
      
   }
   }
   catch(errr){
      res.status(422).send(errr.message)
      
     
     
   
   }
}



exports.postlogin = [check("email").not()
        .isEmpty().isEmail()
        .withMessage("email is required"),
   check("password").not()
        .isEmpty()
        .withMessage("password is required"),async (req, res, next) => {
   try{

   

       
   let email = req.body.email
   const user = await usersModel.findOne({ email: email })
   if(!(validationResult(req).isEmpty()))
      {
         validationResult(req).errors.map(err=>{throw new Error(err.msg)})
         
         
      }
    
      
   else if (!user) {
      
      throw new Error('you are not user , please signup')
      
   }
   else {
     const   same =await bcrypt.compare(req.body.password, user.password)
      if (!same) {

         throw new Error('password is incorrect')
         
      }

      else {

         const token = await jwt.sign({ user }, process.env.jwt_secret)
         
         res.send(token)

         


      }

   }
   }
   catch(errr){
      res.status(422).send(errr.message)
      
   
     
   
   }
}]

