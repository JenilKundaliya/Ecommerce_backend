const express = require("express")
const router = express.Router()
const itemController = require("../controllers/itemController")
const Item = require('../models/products')
router.get('/',async(req,res)=>{
    try{
const products = await Item.find({})
res.json(products)
console.log('hii')
    }
    catch(e){
        console.log("couldn\'t get data")
    }
})
// router.post('/items',itemController.post_items)
// router.put('/items/:id',itemController.update_item)
// router.delete('/items/:id',itemController.delete_item)

module.exports = router;