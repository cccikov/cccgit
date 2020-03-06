let gulp = require('gulp');
let less = require('gulp-less'); //
let minicss = require("gulp-clean-css");
let rename = require("gulp-rename");
let browserSync = require('browser-sync').create();

/**
 * 静态服务器
 */
function server() {
    return browserSync.init({
        server: {
            baseDir: "./test",
            index: "test.html", // http://localhost:3008 和 http://localhost:3008/test.html 都指向 test.html
            middleware: [] // 中间件
        },
        port: 3008,
        ui: { // ui的默认端口
            port: 3009,
            weinre: { // 不知道什么鬼 "weinre"好像也是用于远程调试的nodejs工具
                port: 3010
            }
        }
    });
}

/**
 * 监测 html 变化的时候 reload
 */
function reload() {
    return gulp.watch(["test/**/*.html"]).on("change", function(event) {
        console.log(event + " change")
        try {
            gulp.src(event).pipe(browserSync.reload({
                stream: true
            }));
        } catch (error) {
            console.error(error);
        }
    });
}


exports.default = gulp.series(gulp.parallel(server, reload)); // 默认，直接 npx gulp 运行