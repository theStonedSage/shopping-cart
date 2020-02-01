const mongoose=require("mongoose");
const Product=require("../models/product");

mongoose.connect("mongodb://localhost:27017/productsDB",{useNewUrlParser: true,useUnifiedTopology: true,useFindAndModify: false});

const products=[
    new Product({
    image:"https://www.gamecash.fr/thumbnail-600/medal-of-honor-ps3-e14779.jpg",
    name:"Medal of Honor",
    description:"Some quick example text to build on the card title and make up the bulk of the card's content.<",
    price:20
    }),
    new Product({
    image:"https://www.gamecash.fr/thumbnail-600/medal-of-honor-ps3-e14779.jpg",
    name:"Medal of Honor2",
    description:"Some quick example text to build on the card title and make up the bulk of the card's content.<",
    price:20
    }),
    new Product({
    image:"https://www.gamecash.fr/thumbnail-600/medal-of-honor-ps3-e14779.jpg",
    name:"Medal of Honor3",
    description:"Some quick example text to build on the card title and make up the bulk of the card's content.<",
    price:20
    }),
    new Product({
    image:"https://www.gamecash.fr/thumbnail-600/medal-of-honor-ps3-e14779.jpg",
    name:"Medal of Honor4",
    description:"Some quick example text to build on the card title and make up the bulk of the card's content.<",
    price:20
    }),
    new Product({
    image:"https://www.gamecash.fr/thumbnail-600/medal-of-honor-ps3-e14779.jpg",
    name:"Medal of Honor5",
    description:"Some quick example text to build on the card title and make up the bulk of the card's content.<",
    price:20
    }),
    new Product({
    image:"https://www.gamecash.fr/thumbnail-600/medal-of-honor-ps3-e14779.jpg",
    name:"Medal of Honor6",
    description:"Some quick example text to build on the card title and make up the bulk of the card's content.<",
    price:20
    }),
];

for(var i=0;i<products.length;i++){
    products[i].save();
}