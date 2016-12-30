var LocalStrategy = require("passport-local").Strategy;
var passport = require("passport");
var mongodb = require("mongodb").MongoClient;

module.exports = function(){
    passport.use(new LocalStrategy({
        usernameField:"email",
        passwordField:"password"
    },function(username,password,done){
      
        mongodb.connect("mongodb://karthik:password@ds145828.mlab.com:45828/inventory",function(err,db){
            var collection = db.collection("users");
            collection.findOne({_id:username},function(err,results){
                if(results.password === password){
                    done(null,username);
                }
                else{
                    done(null,false,{
                        message:"Wrong Password"
                    })
                }
            });
        })
    }));
}