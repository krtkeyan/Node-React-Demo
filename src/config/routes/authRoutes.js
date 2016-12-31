var express = require("express");
var bodyParser = require("body-parser");
var mongodb = require("mongodb").MongoClient;
var authRoutes = express.Router();
var passport = require("passport");
var mongoose = require("mongoose");
var bcrypt =  require("bcrypt");
var redis = require("redis");
var redisClient = redis.createClient();
/**mongooese schema */
var User = require("../models/mongoose.schema");

authRoutes.route("/signup").post(function(req,res){
     mongoose.connect("mongodb://karthik:password@ds145828.mlab.com:45828/inventory",function(err,db){
        var hash = bcrypt.hashSync(req.body.password,10);        
       
        var userRecord = {
            username:req.body.name,
            _id:req.body.email,
            password:hash
        };

        var user = new User(userRecord);

        user.save(function(err){
            if(err){ 
                res.json({error:"record exists"});
            }
            else{
                 redisClient.hset(userRecord._id,"password",userRecord.password,redis.print);
                 res.json("saved");
            }
        });    
    });
});


module.exports = authRoutes;