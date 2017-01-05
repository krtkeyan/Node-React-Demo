/**import modules */
var express = require("express");
var app = express();
var handlebars = require("express-handlebars");
var bodyParser = require("body-parser");
var session = require("express-session");
var passport = require("passport");
var Currentuser;
var mongoose = require("mongoose");
var compression = require("compression");
app.use(compression())
app.use(express.static("./public"));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({extended:true}));
/** set handlebars */
app.engine(".hbs",handlebars({extname:".hbs"}));
app.set("views","./src/views");
app.set("view engine",".hbs");
/** setup **/
var RedisStore = require("connect-redis")(session);
var authRoutes = require("./src/config/routes/authRoutes");
var store = new RedisStore({host:"localhost",port:"6379"});

/**Setup initialize */
app.use(session({saveUninitialized: true,resave: false,secret:"password",cookie:{secure:true}}));
/** passport setup*/
require("./src/config/passport")(app);
app.use("/",authRoutes);
/** index route */
app.get("/",function(req,res){
    res.sendFile(__dirname+"/src/views/index.html");
}).listen(process.env.PORT||8080,function(err){
    console.log("Server running on port:3000")
});


app.post('/signin', function(req, res, next) {
  passport.authenticate('local', function(err, user, info) {
    if (err) { return next(err); }
    if (!user) { return res.redirect('/'); }
    req.logIn(user, function(err) {
      if (err) { return next(err); }
      Currentuser=req.user;
      return res.redirect('/profile');
    });
  })(req, res, next);
});
app.get("/profile",function(req,res){
    console.log(Currentuser);
    res.render("profile");
})

var User = require("./src/config/models/mongoose.schema")
app.put("/update",function(req,res){
    mongoose.connect("mongodb://karthik:password@ds145828.mlab.com:45828/inventory",function(err,db){
        if(err){
            res.json("error");
        }
        var obj={}
        obj[req.body.update[0]]=req.body.update[1];
        User.update({_id:Currentuser},obj,function(err,user){
            if(err){
                console.log("error");
                res.json("Error");
            }
            res.json(user);
        });
    })
}) 




