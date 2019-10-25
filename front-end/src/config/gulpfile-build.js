const path = require("path");
const {
    src,
    dest,
    series
} = require("gulp");

const sass = require("gulp-sass");
const webpack = require("webpack-stream");
const cleanCSS = require('gulp-clean-css')

const rev = require('gulp-rev')
const revCollector = require('gulp-rev-collector')

const buildPath = "../../build/"
//
function copylibs() {
    return src("../libs/*")
        .pipe(dest(`${buildPath}libs/`))
}
//
function copyassets() {
    return src("../assets/**/*")
        .pipe(dest(`${buildPath}assets/`))
}

//html转存
function copyhtml() {
    return src([`${buildPath}rev/**/*.json`, '../*.html'])
        .pipe(revCollector())
        .pipe(dest(buildPath))
}
// sass转存
function packSCSS() {
    return src(["../styles/*.scss", "!../styles/yo/**/*.scss"])
        .pipe(sass().on('error', sass.logError))
        .pipe(cleanCSS({
            compatibility: 'ie8'
        }))
        .pipe(rev())
        .pipe(dest(`${buildPath}styles`))
        .pipe(rev.manifest())
        .pipe(dest(`${buildPath}rev/styles`))
}

//javascript转存模块化
function packJs() {
    return src("../scripts/**/*")
        .pipe(webpack({
            mode: "production",
            entry: "../scripts/app.js",
            output: {
                path: path.resolve(__dirname, buildPath),
                filename: "app.js"
            },
            module: {
                rules: [{
                    test: /\.art$/,
                    loader: "art-template-loader"
                }]
            }
        }))
        .pipe(rev())
        .pipe(dest(`${buildPath}scripts/`))
        .pipe(rev.manifest())
        .pipe(dest(`${buildPath}rev/scripts/`))
}

exports.default = series(copylibs, copyassets, packSCSS, packJs, copyhtml);