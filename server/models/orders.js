const mongoose = require("mongoose");

const cartModel = require("./cart");

const orderSchema = mongoose.Schema({
    name: {type: String, required : true},
    price: {type: Number, required : true},
    amount: {type: Number, required : true},
    userId: {type: String, required : true},
    productId: {type: String, required : true},
    address: {type: String, required : true},
    email: {type: String, required : true},
    status: {
        type: String,
        default: "pending"
    },
    timestamp:{type:Number ,
         default: Date.now()}
});

const Order = mongoose.model("order", orderSchema);

exports.addNewOrder =async data =>{
       await cartModel
            .deleteItem(data._id)
            
                
                let order =await new Order(data);
                await order.save();
      
}

exports.getOrdersByUser = async userId => {
   
                return await Order.find(
                    { userId: userId },
                    {},
                    { sort: { timestamp: 1 } }
                )
          
}

exports.cancelOrder = async id => {
   await Order.findByIdAndDelete(id)
           
}

exports.getAllOrders = async() => {
    return await Order.find({}, {}, { sort: { timestamp: 1 } })
          
}

exports.editOrder =async (id, newStatus) => {
   
                await Order.updateOne({ _id: id }, { status: newStatus })
           
}

