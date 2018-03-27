let gulp = require('gulp');
let less = require('gulp-less'); 
let browserSync = require('browser-sync').create();

/**
 * default 任务
 */
gulp.task('default', ["less", "sync"], function () {
    console.log("********\n 执行了 less & sync \n********");
});

/**
 * 转换less
 */

// 转换全部less
gulp.task("less", function () {
    gulp.src("web/less/**/*.less", {
            base: "web/less" // base + middlePath + fileName    destPath + middlePath + fileName 
        })
        .pipe(less())
        .pipe(gulp.dest("web/css")); // 返回流,调用后在返回值后面再流的操作
});

// 自动编译less
gulp.task("autoLess", function () {
    gulp.watch("web/less/*.less", ['less']) // 后面的任务不要是监视任务,是一次性任务(任务里面没有watch),否则就会出现好多重监视
});



/**
 * browser-sync
 */
// 静态服务器
gulp.task('server', function () {
    browserSync.init({
        server: "web/"
    });
});

// 监视文件变化同步浏览器
gulp.task('sync', function () {

    browserSync.init({
        server: {
            baseDir: "web/",
            index: "index.html"
        },
        port: 3000,
        // ui: { // ui的默认端口
        //     port: 3001,
        //     // weinre: { // 不知道什么鬼 "weinre"好像也是用于远程调试的nodejs工具
        //     //     port: 3002
        //     // }
        // }
    });

    // 转换less
    gulp.watch("web/less/**/*.less").on('change', function (event) {
        gulp.src("web/less/**/*.less", { // 这个是全部css变化且刷新
                base: "web/less"
            })
            .pipe(less())
            .pipe(gulp.dest("web/css"))
            .pipe(browserSync.reload({
                stream: true
            }));;
    });

    // 监视文件变化同步浏览器
    gulp.watch(["web/**/*.html", "web/js/*.js"]).on("change", function (event) {
        gulp.src(event.path).pipe(browserSync.reload({
            stream: true
        }));
    });

});

// 将文件前端用到的文件放到web文件夹是因为 , 如果是读取./**/*.html gulp 将监控 node_modules文件夹里面的文件 , 里面的文件多而杂 , 会影响启动sync时间
 