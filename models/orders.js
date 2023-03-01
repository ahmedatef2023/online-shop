const mongoose = require("mongoose");

const cartModel = require("./cart");

const orderSchema = mongoose.Schema({
    name: String,
    price: Number,
    amount: Number,
    userId: String,
    productId: String,
    timestamp: Number,
    address: String,
    email: String,
    status: {
        type: String,
        default: "pending"
    },
    timestamp: Number
});

const Order = mongoose.model("order", orderSchema);

exports.addNewOrder =async data =>{
       await cartModel
            .deleteItem(data.cartId)
            
                data.timestamp = Date.now();
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

