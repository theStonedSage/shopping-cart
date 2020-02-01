const mongoose=require("mongoose");
const passport=require('passport');
const passportLocalMongoose = require('passport-local-mongoose');

const userschema=new mongoose.Schema({
    username:String,
    password:String
});

userschema.plugin(passportLocalMongoose);


module.exports = mongoose.model('user',userschema);