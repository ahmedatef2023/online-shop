const jwt = require('jsonwebtoken')
const bcrypt = require('bcrypt')
const check = require("express-validator").check
const validationResult = require("express-validator").validationResult
const usersModel = require('../models/users')
const {verifyToken}=require('../middleware/auth')


exports.getProfile = async (req, res, next) => {
   try {
      const token=req.cookies.access_token
           const name= verifyToken(req).username
           const admin= verifyToken(req).isAdmin
       const user = await usersModel
           .findOne({_id: verifyToken(req)._id})

           
       res.render("profile", {
           title: "profile",
           isUser: true,
           isAdmin: verifyToken(req).isAdmin,
           user: user
           ,name,token,admin
       })
   }

   catch (err) { res.redirect("/error") }
}

exports.getSignup = (req, res, next) => {

      const errr = req.flash('err')
      res.render('signup', { errr ,
      title:'signup'})
  



}

exports.postSignup = async (req, res, next) => {
   try{
   let email = req.body.email
  

   const User = await usersModel.findOne({ email: email })

   if ((!User) && (req.body.password === req.body.confirmPassword)) {
      var user = new usersModel(

         {
            username: req.body.username,
            email: req.body.email,
            password: req.body.password,

         }
      )
      await user.save()
      const token = jwt.sign({ user }, 'ahmed12')
      res.cookie('access_token', token)
      res.redirect('/')
   }
   else if (req.body.password !== req.body.confirmPassword) {
      throw new Error('no match password')
     
   }
   else {

      throw new Error('enter another email')
      
   }
   }
   catch(errr){
      req.flash('err',errr.message)
      
     res.redirect('/signup')
     
   
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
         req.flash('errr',validationResult(req).array())
         res.redirect('/login')
         
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
         const token =  jwt.sign({ user }, 'ahmed12')
         res.cookie('access_token', token)

         res.redirect('/')


      }

   }
   }
   catch(errr){
      req.flash('err',errr.message)
      
     res.redirect('/login')
     
   
   }
}]

exports.getlogin = (req, res, next) => {
   
      const errr = req.flash('err')
      const errrr = req.flash('errr')
      
      res.render('login', { errr ,errrr,
      title:'login'})
   


}



exports.logout = (req, res, next) => {

   res.clearCookie('access_token');
   res.clearCookie('username');
   res.redirect('/')


}
