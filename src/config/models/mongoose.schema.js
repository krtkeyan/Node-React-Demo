var mongoose = require("mongoose");
var schema = mongoose.Schema({
            username:{
                type:String,
                required:true
            },
            _id:{
                type:String,
                required:true,
                match: /.+@.+\..+/,
                lowercase: true
            },
            password:{
                type:String,
                required:true
            }
});

module.exports = mongoose.model("Users",schema,"users");