var LocalStrategy = require("passport-local").Strategy;
var mongodb = require("mongodb").MongoClient;
var bcrypt = require("bcrypt");
var redis = require("redis");
var redisClient = redis.createClient();
module.exports = function(passport){
    passport.use(new LocalStrategy({
        usernameField:"email",
        passwordField:"password"    
    },function(username,password,done){
        redisClient.hget(username,"password",(err,pass)=>{
            if(bcrypt.compareSync(password,pass)){
                done(null,username);
            }          
            else{
                mongodb.connect("mongodb://karthik:password@ds145828.mlab.com:45828/inventory",function(err,db){
                var collection = db.collection("users");
                collection.findOne({_id:username},function(err,results){
                    if(results&&bcrypt.compareSync(password,results.password)){
                        console.log("Mongo");
                        done(null,username);
                    }
                    done(null,false,{
                            message:"Wrong Password"
                        })
                    
                });
        })
        }
        })
       
    }));
} 