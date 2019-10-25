const path = require("path");
const {
    src,
    dest,
    series,
    parallel,
    watch
} = require("gulp");
const connect = require("gulp-connect");
const sass = require("gulp-sass");
const webpack = require("webpack-stream");
const proxy = require("http-proxy-middleware");
const devPath = "../../dev/"
//html转存
function copyhtml() {
    return src("../*.html")
        .pipe(dest(devPath))
        .pipe(connect.reload())
}
//
function copylibs() {
    return src("../libs/*")
        .pipe(dest(devPath + "libs/"))
}
//
function copyassets() {
    return src("../assets/**/*")
        .pipe(dest(devPath + "assets/"))
}

// sass转存
function packSCSS() {
    return src(["../styles/*.scss", "!../styles/yo/**/*.scss"])
        .pipe(sass().on('error', sass.logError))
        .pipe(dest(devPath + "styles/"))
        .pipe(connect.reload())
}

//javascript转存模块化
function packJs() {
    return src("../scripts/**/*")
        .pipe(webpack({
            mode: "development",
            entry: {
                app : "../scripts/app.js"
            },
            output: {
                path: path.resolve(__dirname, devPath),
                filename: "[name].js"
            },
            module: {
                rules: [{
                    test: /\.art$/,
                    loader: "art-template-loader"
                }]
            }
        }))
        .pipe(dest(devPath + "scripts/"))
        .pipe(connect.reload())
}

// 启动服务
function gulpServer() {
    return connect.server({
        root: devPath,
        port: 8000,
        host:"localhost",
        livereload: true,
        middleware: () => {
            return [
                proxy("/api", {
                    target: "http://localhost:3000",
                    changeOrigin: true
                    // pathRewrite: {
                    //     "^/api": ""
                    // }
                })
            ]
        }
    })
}

function watchFiles() {
    watch("../*.html", series(copyhtml))
    watch("../libs/*", series(copylibs))
    watch("../styles/**/*.scss", series(packSCSS))
    watch("../scripts/**/*", series(packJs))
    watch("../assets/**/*", series(copyassets))
}
exports.default = series(parallel(copyhtml, copylibs, copyassets, packSCSS, packJs), parallel(gulpServer, watchFiles));