const mongoose = require("mongoose")
const validator = require("validator")

const userSchema = new mongoose.Schema({
    name:{
        type:String,
        require:true
    },
    email:{
        require:true,
        unique:[true,"Email already exists"],
        type:String,
        validate(value){
if(!validator.isEmail(value)){
    console.error('INvalid email')
}
        }
    },
    password:{
        require:true,
        type:String,
        minlength:[6,'Minimum password length must be 6']
    },
    isAdmin:{
        require:true,
        type:Boolean,
        default:false
    },
    register_date:{
        type:Date,
        default:Date.now
    }
})


const userData = mongoose.model('User',userSchema)

module.exports = userData