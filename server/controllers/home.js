const productsModel = require('../models/products')
const path = require('path')
const { verifyToken } = require('../middleware/auth')



exports.gethome = async (req, res, next) => {
 

   let category = req.body.category
   let validCategories = ["clothes", "phones", "computers"]


   if (category && validCategories.includes(category)) {
      const products = await productsModel.find({ category: category })
      res.send(products)


   }
   else {
      const products = await productsModel.find({})
      res.send(products)

   }
}




