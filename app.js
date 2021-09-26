const express = require("express")
const app = express();


const path = require("path")
const PORT = process.env.PORT || 5000;
require('./db/conn')
const products = require('./data/data')
const userData = require('./models/user')
const productsData = require('./models/products')
const cartData = require('./models/Cart')
const orderData = require('./models/Order')
const productRoute = require('./router/item')
const dotenv = require('dotenv')
const kuch = require('./controllers/itemController')
const data = require('./data/data.js')

dotenv.config()
const generateToken = require('./utils.js')
// const isAuth = require('./utils.js')

app.use(express.json())
app.use(express.urlencoded({extended:true}))


app.get('/seed',async(req,res)=>{
    try{
        await userData.deleteMany({})
        const createUsers = await userData.insertMany(data.users)
    res.send({createUsers})
    }
    catch(err){
res.send(err.message)
    }
  
})

app.get('/addProducts',async(req,res)=>{
    const products = await productsData.insertMany(data.products)
    res.send(products)
})
app.get('/api/products',async(req,res)=>{
    const products = await productsData.find({})
    res.send(products)
})
app.get('/api/products/:id',async(req,res)=>{
const product = await productsData.findById(req.params.id);
   if(product){
       res.send(product)
      
   }
   else{
       console.log("error")
       res.send("product not found")
   }
})

app.post('/api/users/signin',async(req,res)=>{
    const {email,password} = req.body
    
    const user = await userData.findOne({email})
    if(user.password === password){
        res.send({
            id:user._id,
            name:user.name,
            email:user.email,
            isAdmin:user.isAdmin,
            token:generateToken(user)  
        })
    
    return;
        
    } 
    else{
        res.send('user doesnt exists')
    }
})

app.post('/api/users/register',async(req,res)=>{
    const user = new userData(req.body)
    const createdUser = await user.save();
    res.send({ id:createdUser._id,
        name:createdUser.name,
        email:createdUser.email,
        isAdmin:createdUser.isAdmin,
        token:generateToken(createdUser) })
})

app.post('/api/orders',async(req,res)=>{
    if(req.body.orderItems.length === 0){
        res.status(400).send('Cart is Empty')
    }
    else{
    
        const order = new orderData({
            orderItems:req.body.orderItems,
            shippingAddress:req.body.shippingAddress,
            paymentMethod:req.body.paymentMethod,
            itemsPrice:req.body.itemsPrice,
            shippingPrice:req.body.shippingPrice,
            totalPrice:req.body.totalPrice,
           
        })
        const createdOrder = await order.save();
        console.log('order created')
        res.status(201).send({message:'New Order Created',createdOrder:createdOrder})
    }
})
app.get(
    '/api/orders/:id',

   async (req, res) => {
      const order = await orderData.findById(req.params.id);
      if (order) {
          console.log('order found')
        res.send(order);
      } else {
        res.status(404).send({ message: 'Order Not Found' });
      }
    })


    app.get('/api/mine',async(req,res)=>{
        const order = await orderData.find();
        console.log(order)
        res.send(order)
    })



app.listen(PORT,()=>{
    console.log(`server is running at ${PORT}`)
})