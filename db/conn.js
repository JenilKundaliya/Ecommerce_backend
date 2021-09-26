const mongoose = require("mongoose")
mongoose.connect("mongodb+srv://jenil_kundaliya:ecommerce_data@cluster0.hkeqn.mongodb.net/myFirstDatabase?retryWrites=true&w=majority",{
    useCreateIndex:true,
    useNewUrlParser:true,
    useUnifiedTopology:true
}).then(()=>{
    console.log("db connected")
}).catch((e)=>{
    console.log(e)
})
