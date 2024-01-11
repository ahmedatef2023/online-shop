const mongoose = require("mongoose")

const cartSchema = mongoose.Schema({
    name: {type: String,
        required: true,},
    price: {type: Number,
        required: true,},
    amount: {type: Number,
        required: true,
         },
    userId: {type:String,
        required: true,},
    email: {type:String,
            required: true,},
    productId: {type:String,
        required: true,},
    timestamp: {type:Number,
        required: true,}
});

const CartItem = mongoose.model("cart", cartSchema);


exports.addNewItem =async data => {
  
                let item = new CartItem(data);
                 await item.save();
           
    }

exports.getItemsByUser = async userId => {
    
                return await CartItem.find(
                    { userId: userId },
                    {},
                    { sort: { timestamp: 1 } }
                )
            }

 exports.getItemsByProduct = async (productId,userId )=> {
    
                return await CartItem.findOne(
                    { productId: productId ,
                    userId: userId}
                )
            }
   
            

exports.editItem = async(id, newData) => {
   await CartItem.updateOne({ _id: id }, newData)
           
}

exports.editItemByProduct = async(productId,userId, newData) => {
    await CartItem.updateOne({ productId: productId ,
        userId: userId }, newData)
            
 }
 

exports.deleteItem =async id => {
   await CartItem.findByIdAndDelete(id)
}
      

exports.getItemById = id => {
    return CartItem.findById(id)
      
}