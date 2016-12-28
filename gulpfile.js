var gulp = require("gulp");
var nodemon = require("gulp-nodemon");
gulp.task("inject",function(){
    var wiredep = require("wiredep").stream;
    var inject = require("gulp-inject");
    var injectSrc = gulp.src(["./public/assets/css/*.css","./public/assets/js/*.js"],{read:false});
    var injectOptions = {
        ignorePath:"/public"
    }
    var options = {
        bowerJson: require("./bower.json"),
        directory: "./public/vendor",
        ignorePath: "../../public"
    }
    return gulp.src("./src/views/*.html")
            .pipe(wiredep(options))
            .pipe(inject(injectSrc,injectOptions))
            .pipe(gulp.dest("./src/views"))

})
gulp.task("nodemon",["inject"],function(){
    var options = {
        script: "App.js",
        delayTime: 1,
        env:{
            "PORT":process.env.PORT
        },
        watch:["*.js"]
    }
    return nodemon(options)
            .on("restart",function(err){
                console.log("Restarting.....")
            })
})