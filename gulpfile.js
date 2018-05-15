"use strict";

var gulp = require("gulp");
var less = require("gulp-less");
var plumber = require("gulp-plumber");
var postcss = require("gulp-postcss");
var autoprefixer = require("autoprefixer");
var server = require("browser-sync").create();
var minify = require("gulp-csso");
var rename = require("gulp-rename");
var imagemin = require("gulp-imagemin");
var webp = require("gulp-webp");
var svgstore = require("gulp-svgstore");
var include = require("posthtml-include");
var del = require("del");
var run = require("run-sequence");
var posthtml = require("gulp-posthtml");
var uglify = require("gulp-uglify");
var htmlmin = require("gulp-htmlmin");

gulp.task("uglify", function () {
  gulp.src("source/js/*.js")
    .pipe(uglify())
    .pipe(gulp.dest("build/js"))
});

gulp.task("style", function() {
  gulp.src("source/less/style.less")
    .pipe(plumber())
    .pipe(less())
    .pipe(postcss([
      autoprefixer()
    ]))
    .pipe(gulp.dest("build/css"))
    .pipe(minify())
    .pipe(rename("style.min.css"))
    .pipe(gulp.dest("build/css"))
    .pipe(server.stream());
});

gulp.task("serve", function() {
  server.init({
    server: "build/",
    notify: false,
    open: true,
    cors: true,
    ui: false
  });

  gulp.watch("source/js/*.js", ["uglify"]).on("change", server.reload);
  gulp.watch("source/less/**/*.less", ["style"]);
  gulp.watch("source/*.html", ["html"]).on("change", server.reload);
});

gulp.task("images", function() {
  return gulp.src(["source/img/**/*.{png,jpg,svg}", "!source/img/icon-*.svg"])
    .pipe(imagemin([
      imagemin.optipng({optimizationlevel: 3}),
      imagemin({progressive: true}),
      imagemin.svgo({plugins: [{removeViewBox: false}]})
    ]))
    .pipe(gulp.dest("build/img"));
});

gulp.task("webp", function() {
  return gulp.src("source/img/**/*.{png,jpg}")
    .pipe(webp({quality: 90}))
    .pipe(gulp.dest("build/img"));
});

gulp.task("sprite", function() {
  return gulp.src("source/img/icon-*.svg")
    .pipe(imagemin(
      imagemin.svgo({plugins: [{removeViewBox: false}]}))
    )
    .pipe(svgstore({
      inlineSvg: true
    }))
    .pipe(rename("sprite.svg"))
    .pipe(gulp.dest("source/tmp"));
});

gulp.task("html", function() {
  return gulp.src("source/*.html")
    .pipe(posthtml([
      include()
    ]))
    .pipe(htmlmin({collapseWhitespace: true}))
    .pipe(gulp.dest("build"));
});

gulp.task("copy", function() {
  return gulp.src([
    "source/fonts/**/*.{woff,woff2}"
  ],{
    base: "source"
  })
    .pipe(gulp.dest("build"));
});

gulp.task("picturefill", function() {
  return gulp.src([
    "node_modules/picturefill/dist/picturefill.min.js"
  ])
    .pipe(gulp.dest("build/js"));
});

gulp.task("clean", function() {
  return del("build");
});

gulp.task("delstyle", function() {
  return del("build/css/style.css");
});

gulp.task("build", function(done) {
  run(
    "clean",
    "copy",
    "style",
    "images",
    "sprite",
    "html",
    "webp",
    "picturefill",
    "uglify",
    "delstyle",
    done
  );
});
