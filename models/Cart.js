const mongoose = require("mongoose")
const cartSchema = mongoose.Schema({
userId:{
    type:String
},
items:[{
    productId:{
        type:String
    },
    name:String,
    quantity:{
        type:Number,
        required:true,
        min:[1,"Quantity should not be less than 1 "],
        default:1
    }
}],
bill:{
    type:Number,
    required:true,
    default:0
}



})

const cartData = mongoose.model('Cart',cartSchema)
module.exports = cartData