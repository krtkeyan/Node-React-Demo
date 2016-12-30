var express = require("express");
var bodyParser = require("body-parser");
var mongodb = require("mongodb").MongoClient;
var authRoutes = express.Router();
var passport = require("passport");


authRoutes.route("/signup").post(function(req,res){

   
    mongodb.connect("mongodb://karthik:password@ds145828.mlab.com:45828/inventory",function(err,db){
        var collection = db.collection("users");
        
        var userRecord = {
            username:req.body.name,
            _id:req.body.email,
            password:req.body.password
        };

        collection.insert(userRecord,function(err,results){
            if(err){ 
                res.json({error:"record exists"});
            }
            else{
                 res.json(results.ops[0]);
            }
        });    
    });
});


module.exports = authRoutes;