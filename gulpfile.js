var gulp = require("gulp");
var inject = require("gulp-inject");
var wiredep = require("wiredep").stream;
var nodemon = require("gulp-nodemon");

/**inject assests*/
gulp.task("inject",function(){
    var injectOptions = {
        ignorePath:"/public"
    };
    var injectSrc = gulp.src(["./public/assets/css/*.css","./public/assets/js/*.js"],{read:false});
    var options = {
        bowerJson: require("./bower.json"),
        directory: "./public/vendor",
        ignorePath: "../../public"
    }
    gulp.src("./src/views/*.html")
        .pipe(wiredep(options))
        .pipe(inject(injectSrc,injectOptions))
        .pipe(gulp.dest("./src/views"));
});
/** nodemon */
gulp.task("default",["inject"],function(){
    var options = {
        script:"App.js",
        delayTime:3,
        env:{
            port:process.env.port
        },
        watch:["*.js"]


    }
    return nodemon(options)
            .on("restart",function(){
                console.log("Restarting server on PORT:"+process.env.port)
            });
})