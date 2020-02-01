const mongoose =require("mongoose");

var productschema=mongoose.Schema({
    image:String,
    name:String,
    description:String,
    price:Number
})

const Product =mongoose.model("product",productschema);

module.exports = Product;