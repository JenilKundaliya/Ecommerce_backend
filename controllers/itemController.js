const Item = require('../models/products')


const getAllProducts = async(req,res)=>{
    try{
const products = await Item.find({})
res.json(products)
console.log('hii')
    }
    catch(e){
        console.log("couldn\'t get data")
    }
}
module.exports = getAllProducts;


module.exports.post_item = (req,res)=>{
    const newItem = new Item(req.body);
    newItem.save().then(item=> res.json(item))
}


module.exports.update_item = (req,res)=>{
    Item.findByIdAndUpdate({_id:req.params.id},req.body).then(function(item){
        Item.findOne({_id:req.params.id}).then(function(item){
            res.json(item);
        })
    })
}
module.exports.delete_item = (req,res) => {
    Item.findByIdAndDelete({_id: req.params.id}).then(function(item){
        res.json({success: true});
    });
}