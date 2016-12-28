var express = require("express");
var app=express();

const MongoClient = require('mongodb').MongoClient;
var handlebars = require("express-handlebars");
var bodyParser = require("body-parser");
var cookieParser = require("cookie-parser");
var session = require("express-session");

var listContact = express.Router();
var db;
var contacts;

app.engine(".hbs",handlebars({extname: ".hbs"}));
app.set("views","./src/views");
app.set("view engine",".hbs");
app.use(cookieParser());
app.use(session({secret:"password"}));

require("./src/config/passport")(app);

listContact.get("/",function(req,res){
    MongoClient.connect("mongodb://karthik:password@ds145828.mlab.com:45828/inventory",function(err,database){
        var collection = database.collection("contact");
        collection.find({}).toArray(function(err,result){
              res.render("index",{contact:result});
        })
    });
  
})
app.use("/handlebars",listContact);

app.use(bodyParser.urlencoded({extended: true}))
app.use(express.static("public"))

MongoClient.connect("mongodb://karthik:password@ds145828.mlab.com:45828/inventory",function(err,database){
  if (err) return console.log(err)
  db = database;
  app.listen(3000, () => {
    console.log('listening on 3000')
  })
});

app.get("/",function(req,res){
    res.sendFile(__dirname+"/src/views/index.html")
})

app.post("/",(req,res)=>{
           db.collection('contact').save(req.body,(err,result)=>{
               if (err) return console.log(err)
               console.log("Saved");
               res.redirect("/");
           });
});

app.post("/auth",function(req,res){
  req.login(req.body,function(){
      res.redirect("/profile")
  })
});

app.get("/profile",function(req,res){
  res.json(req.user);
})


