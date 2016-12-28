var express = require("express");
var app=express();
const MongoClient = require('mongodb').MongoClient;
var bodyParser = require("body-parser");
var db;

MongoClient.connect("mongodb://karthik:password@ds145828.mlab.com:45828/inventory",function(err,database){
  if (err) return console.log(err)
  db = database;
  app.listen(3000, () => {
    console.log('listening on 3000')
  })
});
app.use(bodyParser.urlencoded({extended: true}))
app.use(express.static("public"))
app.get("/",function(req,res){
    res.sendFile(__dirname+"/src/views/index.html")
})
app.post("/",(req,res)=>{
           db.collection('contact').save(req.body,(err,result)=>{
               if (err) return console.log(err)
               console.log("Saved");
               res.redirect("/");
           });
})

