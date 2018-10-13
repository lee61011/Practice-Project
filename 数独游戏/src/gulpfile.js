/*const gulp = require("gulp");

//  转译 JavaScript
gulp.task("webpack", () => {
    const webpack = require("webpack-stream");
    const config = require("./webpack.config.js")
    gulp.src("./js/!**!/!*.js")
        .pipe(webpack(config))
        .pipe(gulp.dest("../www/js"));
});

//  编译 less --> css
gulp.task("less", () => {
    const less = require("gulp-less");
    gulp.src("./less/!*.less")
        .pipe(less())
        .pipe(gulp.dest("../www/css"));
});

gulp.task("default", ["webpack", "less"])*/


const gulp = require("gulp");
const gutil = require("gulp-util");

const {PluginError} = gutil;

gulp.task("webpack", () => {
    const gulpWebpack = require("webpack-stream");
    const config = require("./webpack.config.js");
    const webpack = require("webpack");
    delete config.output.path;
    return gulp.src("./js/index")
        .pipe(gulpWebpack(config, webpack))
        .on("error", function (err) {
            gutil.log(err);
            this.emit("end");
        })
        .pipe(gulp.dest("../www/js"));
});

gulp.task("less", () => {
    const less = require("gulp-less");
    return gulp.src("./less/*.less")
        .pipe(less({
            compress: false
        }))
        .on("error", err => {
            throw new PluginError("less", err);
        })
        .pipe(gulp.dest("../www/css/"));
});

gulp.task("default", gulp.parallel("webpack", "less"));

gulp.task("watch", () => {
    gulp.watch("less/!**!/!*.less", ["less"]);
    gulp.watch(["ts/!**!/!*.js", "ts/!**/!*.ts"], ["webpack"]);
});



/*
const gulp = require("gulp");

// 编译JavaScript
gulp.task("webpack", () => {
    const webpack = require("webpack-stream");
    const config = require("./webpack.config.js");
    gulp.src("./js/!**!/!*.js")
        .pipe(webpack(config))
        .pipe(gulp.dest("../www/js"));
});

// 编译less -> css
gulp.task("less", () => {
    const less = require("gulp-less");
    gulp.src("./less/!*.less")
        .pipe(less())
        .pipe(gulp.dest("../www/css/"));
});

gulp.task("default", ["webpack", "less"]);

gulp.task("watch", () => {
    gulp.watch("less/!**!/!*.less", ["less"]);
    gulp.watch("js/!**!/!*.js", ["webpack"]);
})*/
