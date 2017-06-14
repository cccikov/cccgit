let gulp = require('gulp');
let less = require('gulp-less'); //
let minicss = require("gulp-clean-css");
let rename = require("gulp-rename");
let browserSync = require('browser-sync').create();


// 文件路径
let lessPath = "test/css/*.less"; // 需要装换less路径
let less2cssPath = "test/css"; // less装换css后存放路径
let cssPath = "test/css/*.css"; // 需要压缩的css路径
let css2miniPath = "test/css/min"; // 压缩后的css路径

let browserSyncPath = ["*.html","{lib/**/,./}*.js","{lib/**/,./}*.css"];// 监视同步路径
let browserSyncWithoutCssPath = ["*.html","{lib/**/,./}*.js"]; // 监视路径不要css
let browserSyncRootPath = "./test/";
let browserSyncIndex = "test.html";// 服务器启动的时候,默认打开的文件


/**
 * globs 采用 node-glob 语法
 *
 * ! 不匹配
 * * 任意文件
 * ** 任意文件夹
 * {} 类似正则的分组 src/{index,layout}.less 会 拆分为"src/index.less","src/layout.less" 即{index,layout}有点类似/(index)|(layout)/g
 */

gulp.task('default', ["less","syncLess2"], function() {
    console.log("********\n执行了 less & syncLess2\n********");
});











/**
 * 转换less
 */

// 编译单个less
gulp.task("indexLess", function() {
    gulp.src("src/index.less").pipe(less()).pipe(gulp.dest("lib/css"))
});

// 编译多个less
gulp.task("someLess", function() {
    // gulp.src(["src/index.less","src/layout.less"]).pipe(less()).pipe(gulp.dest("lib/css"))
    gulp.src("src/{index,layout}.less").pipe(less()).pipe(gulp.dest("lib/css"))
});


// 正式
gulp.task("less", function() {
    gulp.src(lessPath).pipe(less()).pipe(gulp.dest(less2cssPath));//其实用lessFn(lessPath,less2cssPath) 也行
});

// 自动编译less
gulp.task("autoLess", function() {
    gulp.watch(lessPath, ['less'])// 后面的任务不要是监视任务,是一次性任务(任务里面没有watch),否则就会出现好多重监视
    .on('change', function(event) {
        console.log('File ' + event.path + ' was ' + event.type + ', running tasks...');
    });
});


// 这个是只会去转换修改的那个文件 , 而不会转换全部less , 减少性能消耗. 考拉就是单个装换
function lessFn(path,destPath) {
    gulp.src(path).pipe(less()).pipe(gulp.dest(destPath));
}
gulp.task("autoOneLess", function() {
    gulp.watch(lessPath)
    .on('change', function(event) {
        console.log('File ' + event.path + ' was ' + event.type + ', running tasks...');
        lessFn(event.path,less2cssPath);
    });
});
// 单个转换也有弊端 , 就是如果有个 基础less , 其他每个less都引入了;这是只修改了



















/**
 * 压缩css
 */

// minicss
gulp.task("minicss", function() {
    gulp.src(cssPath).pipe(minicss()).pipe(rename({suffix: '.min'})).pipe(gulp.dest(css2miniPath));
});

// less & minicss
gulp.task("lessmini", function() {
    gulp.src(lessPath)
        .pipe(less())
        .pipe(minicss())
        .pipe(rename({suffix: '.min'}))//重命名
        .pipe(gulp.dest(css2miniPath));
});

// 自动 less & minicss 一般没有什么必要 因为只有每天结束提交的时候才需要压缩css
gulp.task("autoLessmini", function() {
    gulp.watch(lessPath, ['lessmini'])
    .on('change', function(event) {
        console.log('File ' + event.path + ' was ' + event.type + ', running tasks...');
    });
});


















/**
 * browser-sync
 */

// 静态服务器
gulp.task('server', function() {
    browserSync.init({
        /*server: {
            baseDir: browserSyncRootPath,// 指定服务器的根目录
            index:"test.html"// 指定服务器启动的时候,默认打开的文件
        }*/
        server: browserSyncRootPath // 等于server: {baseDir: browserSyncRootPath}
    });
});

// 只根据某个(些)文件更新
let reload = browserSync.reload;
let syncFilePath = "index.html";
gulp.task('syncFile', function() {
    browserSync.init({
        server: {
            baseDir: browserSyncRootPath,
            index:browserSyncIndex
        }
    });
    gulp.watch(syncFilePath).on("change", reload);
});





// 浏览器同步
gulp.task('browser-sync', function() {
    browserSync.init({
        server: {
            baseDir: browserSyncRootPath,
            index:browserSyncIndex
        }
    });
    gulp.watch(browserSyncPath).on("change", function(event){
        console.log(event.path);
        gulp.src(event.path).pipe(browserSync.reload({ stream: true }));
    });
});
// browser-sync start --server --files "**/*.html,**/*.css,**/*.js"   browser-sync 不用gulp grunt等构造工具直接使用写法;
// 若用gulp去监视全部html,js,css文件 启动会十分慢(只要是由于"node_modules/"中大量文件) 甚至报错 所以还是监视指定文件夹里面的html,js,css,less(只要是少量文件会比browser-sync直接使用启动快好多);

// 就算是忽略列表也不能太大 , 否则也会慢 即使["*.html","!node_modules/**/*.html"] 也会比 "*.html" 慢好多 , 虽然忽略列表可以不写 , 所以还不要尝试去检测全部html,js,css文件变化(即使忽略了node_modules/目录也慢);例子如下
// gulp.task('testSpeed', function() {
//     browserSync.init({
//         server: {
//             baseDir: browserSyncRootPath
//         }
//     });
//     // gulp.watch(["index.html"]).on("change", reload); // 启动17ms
//     gulp.watch(["index.html", "!node_modules/**.html"]).on("change", reload); // 启动8.24s
// });



// 监视同时转换less
// 方式1 实际监视的是css , 只是less转换的时候触发css变化(可能不能用全部转换方法,只能用哪个less变化就装换哪个)
gulp.task('syncLess', function() {
    browserSync.init({
        server: {
            baseDir: browserSyncRootPath,
            index:browserSyncIndex
        }
    });

    // 转换less
    gulp.watch(lessPath).on('change', function(event) {
        lessFn(event.path,less2cssPath);
    });
    // 监视文件变化同步浏览器
    gulp.watch(browserSyncPath).on("change", function(event){
        gulp.src(event.path).pipe(browserSync.reload({ stream: true }));
    });
});

// 方式2 监视的是less , 转换后 reload
gulp.task('syncLess2', function() {
    browserSync.init({
        server: {
            baseDir: browserSyncRootPath,
            index:browserSyncIndex
        }
    });
    // 转换less 并刷新
    gulp.watch(lessPath).on('change', function(event) {
        synclessFn(event.path,less2cssPath);
    });
    // 监视文件变化同步浏览器
    gulp.watch(browserSyncWithoutCssPath).on("change", function(event){
        gulp.src(event.path).pipe(browserSync.reload({ stream: true }));
    });
});
function synclessFn(path,destPath){
    gulp.src(path)
        .pipe(less())
        .pipe(gulp.dest(destPath))
        .pipe(browserSync.reload({ stream: true }));
}