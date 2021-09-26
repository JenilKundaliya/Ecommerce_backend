//We have created all the Restapi's in our router files 
//now once the api reaches an end point we have passed an function for each api calls
//now here in controller files we will define those funcitons
const User = require('../models/user')
const bcrypt = require("bcryptjs")
const jwt = require('jsonwebtoken')
const config = require('config')


module.exports.signup = (req,res)=>{
const {name,email,password} = req.body;
if(!name || !email || !password){
return res.status(400).json({msg:'please enter all fields'})
}
User.findOne({email})
 .then((user)=> {

    if(user){
       return res.status(400).json({msg:'User already exists'})
    }})

const newUser = new User({name,email,password});

//We have created our new user
//now we will encrypt our password using bcryptjs
bcrypt.genSalt(12,(err,salt)=>{
    bcrypt.hash(password,salt,(err,hash)=>{

    
    if(err) throw err;
    newUser.password = hash;
    newUser.save()
    .then(user => {
        jwt.sign({id:user._id},config.get('jwtsecret'),{expiresIn:3600},(err,token)=>{
            if(err) throw err;
            res.json({
                token, user:{
                    id:user._id,
                    name:user.name,
                    email:user.email
                }
            })
        })
    })
})
})
 


}


module.exports.login = async(req,res)=>{
const {email,password} = req.body;
if(!email || !password){
    res.status(400).json({msg:'Enter all the fields'})
}
User.findOne({email})
.then(user => {
    if(!user) return res.status(400).json({msg:'user not found'});

    bcrypt.compare(password,User.password)
    .then(isMatch=>{
        if(!isMatch) return res.status(400).json({msg:"Invalid credintials"});

        jwt.sign({id:user._id},config.get('jwtsecret'),{expiresIn:3600},(err,token)=>{
            if(err) throw err;
            res.json({token,
            user:{
                id:user._id,
                name:user.name,
                email:user.email
            }
        });
        }
        )
    })
})


}


module.exports.get_user = (req,res) => {
    User.findById(req.user.id)
        .select('-password')
        .then(user => res.json(user));
}