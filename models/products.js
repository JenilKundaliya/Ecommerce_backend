const mongoose = require("mongoose")

const itemSchema = new mongoose.Schema({
    title:{
        type:String,
        required:true,
    },price:{
        type:Number,
        required:true
    },
    description:{
        type:String,
        required:true
    },
    category:{
        type:String,
        required:true
    },
    review:{
        type:Number,
        required:true
    },
    
    countInStock:{
        type:Number,
        default:10
    },
    date_added:{
        type:Date,
        default:Date.now
    }
})

const itemData = mongoose.model('Item',itemSchema)
module.exports = itemData