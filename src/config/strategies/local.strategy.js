var passport = require("passport"),
    LocalStrategy = require("passport-local").Strategy;
var mongodb = require("mongodb").MongoClient;

module.exports = function(){
    passport.use(new LocalStrategy({
        usernameField:"username",
        passwordField:"password"
    },function(username,password,done){
            mongodb.connect("mongodb://karthik:password@ds145828.mlab.com:45828/inventory",function(err,db){
                var collection = db.collection("users");
                collection.findOne({username:username},function(err,results){
                    if( results.password === password ){
                        var user = username;
                         done(null,user)
                    }else{
                        done(null,false,{
                            message:"Wrong password"
                        })
                    }
                })
            })
           
    }));
}