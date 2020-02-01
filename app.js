const express=require("express");
const bodyParser=require("body-parser");
const ejs=require('ejs');
const mongoose = require("mongoose");
const Product=require(__dirname+"/models/product");
const session=require('express-session');
const csrf=require("csurf");
const passport=require('passport');
const passportLocalMongoose = require('passport-local-mongoose');
const User=require("./models/user");
const MongoStore = require('connect-mongo')(session);
const Cart=require("./models/cart");


// var csrfProtection = csrf({ cookie: false });

mongoose.connect("mongodb://localhost:27017/productsDB",{useNewUrlParser: true,useUnifiedTopology: true,useFindAndModify: false});
mongoose.set('useCreateIndex', true);
const app=express();
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({extended:true}));
app.use(express.static(__dirname + '/public'));
app.set('view engine','ejs');

app.use(session({secret:"amitbh123",
saveUninitialized:false,
resave:false,
store:new MongoStore({mongooseConnection:mongoose.connection}),
cookie: { maxAge:180*60*1000, secure: false }
}));

app.use(csrf());
app.use(passport.initialize());
app.use(passport.session());
require('./config/passport');

app.use(function(req,res,next){
    res.locals.login =req.isAuthenticated();
    res.locals.session=req.session;
    next();
});


//routes

app.get('/',function(req,res){
    Product.find({},function(err,docs){
       
        res.render("home",{productlist:docs});
    });
    
});

app.get('/user/signup',function(req,res){
    
    // res.render("user/signup");
    res.render("user/signup",{csrfToken:req.csrfToken()});
});

app.post('/user/signup',function(req,res){
    User.register({username:req.body.username},req.body.password,function(err,user){
        if(err){
            console.log(err);
            res.redirect("/user/signup");
        }
        else{
            //user has been saved to database
        passport.authenticate("local")(req, res, function() {
            //its also checked whether the user is present in DB or not
            //user has been authenticated
            //a session has been created and authenticated with cookies storing the data
              res.redirect("/profile")
          })
        }
    });

});

app.get("/user/signin",function(req,res){
    res.render("user/signin",{csrfToken:req.csrfToken()});
});

app.post("/user/signin",function(req,res){
    const user=new User({
        username:req.body.username,
        password:req.body.password
    })

    req.login(user,function(err){
        if(err){
            console.log("user not registered");
            res.redirect("/user/signup");
        }
        else{
            
            passport.authenticate("local",function(err,usr,info){
                // console.log(usr);
                if (err) {
                    console.log(err); // will generate a 500 error
                  }
                if (! usr) {
                    //user not present
                    res.redirect("/user/signup");
                    return usr;
                }

                //user has been authenticated
                //a session has been created and authenticated with cookies storing the data
                res.redirect("/profile")
                return usr;
                
            })(req, res, function() {
                
                  console.log("auth");
                
              })
        }
    });

})
   
app.get("/profile",(req,res)=>{
    if(req.isAuthenticated()){
        res.render("user/profile");
    }
    else{
        res.redirect("/user/signup");
    }    
    
});

app.get("/logout",function(req,res){
    req.logout();
    res.redirect("/");
});

app.get("/buy-item/:id",function(req,res){
    const pid=req.params.id;
    var cart=new Cart(req.session.cart ? req.session.cart:{});

    Product.findById(pid.trim(),function(err,product){
        if(err){
            res.redirect("/");
        }
        else{
            cart.add(product,product.name);
            req.session.cart=cart;
            res.redirect("/");
        }
    });

});

app.get("/shopping",function(req,res){
    if(!req.session.cart){
        res.render("shopping-cart",{products:{}});
    }
    else{
        var cart=new Cart(req.session.cart);
        
        res.render("shopping-cart",{products:cart.toArray(),totalcost:cart.totalPrice});
    }
});

app.get('/checkout',function(req,res){
    if(!req.session.cart){
        res.redirect('/shopping');
    }
    var cart=new Cart(req.session.cart);
    res.render('checkout',{total:cart.totalPrice});
})

app.listen(3000,function(){
    console.log("server is running on port 3000");
});

