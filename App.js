/**import modules */
var express = require("express");
var handlebars = require("express-handlebars");
var bodyParser = require("body-parser");
var passport = require("passport");
var session = require("express-session");
/**initialize app */
var app = express();
/** set handlebars */
app.engine(".hbs",handlebars({extname:".hbs"}));
app.set("views","./src/views");
app.set("view engine",".hbs");
/** setup **/
app.use(express.static("./public"));
var RedisStore = require("connect-redis")(session);
app.use(bodyParser.urlencoded({extended:true}));
var authRoutes = require("./src/config/routes/authRoutes");
app.use("/",authRoutes);
/**Setup initialize */
app.use(session({store:new RedisStore({host:"localhost",port:"6379",db:2}),secret:"password",resave: false,
  saveUninitialized: true,cookie:{secure:true}}));

/** index route */
app.get("/",function(req,res){
    res.sendFile(__dirname+"/src/views/index.html");
}).listen(3000,function(err){
    console.log("Server running on port:3000")
});
/** passport setup*/
require("./src/config/passport")(app);

app.post("/signin",passport.authenticate("local",{
    failureRedirect:"/",
    successRedirect:"/profile"
}));

app.get("/profile",function(req,res){
    res.json(req.user)
})





