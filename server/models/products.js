const mongoose=require('mongoose')
mongoose.set('strictQuery', true)


const productSchema=new mongoose.Schema({
    name:{
        type: String,
    required: true},
    imgUrl :{
        type: String,
        required: true},
    price :{
        type:Number,
        required: true} ,
    category :{
        type:String,
        required: true},
    description :{
        type: String,
        required: true}
})

const product=mongoose.model('product',productSchema)
module.exports=product