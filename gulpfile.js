// 使用gulp,先引入gulp
var gulp = require('gulp');
// 加载package.json文件里的devDependencies中的所有插件 gulp-minify-css 这样名字在gulpfile文件中配置使用的方式是minifyCss，去掉中横线，后面的第一个字母大写
var plugins = require('gulp-load-plugins')();
// 进行文件的I/O操作
var fs = require('fs');
// 系统路径模块
var path = require('path');
// 删除文件
var del = require('del');
// 打开网址
var opn = require("opn");
// 模块化 可在js中require
var browserify = require('browserify');
// es6转es5,jsx转js
var babelify = require('babelify');
// browserify使用的是node stream 而gulp任务的src和dest 需要是gulp本身的vinyl stream,使用它进行转换
var source = require('vinyl-source-stream');
// 转换成vinyl格式的buffer
var buffer = require('vinyl-buffer');
// 配合babelify转换js
var transform = require('vinyl-transform');
// 监听加速browserify打包
var watchify = require('watchify');
// 执行compass
var compass = require('gulp-compass');
// 图片压缩
var imagemin = require('gulp-imagemin');
// 图片深度压缩
var pngquant = require('imagemin-pngquant');
// 字符串替换
var replace = require('gulp-replace');
// 打包
var zip = require('gulp-zip');
// 执行
var exec = require('child_process').exec;
// 压缩
var uglify = require('gulp-uglify');

var root = './dist/';

var dest = root + 'station/';

var connect = require("gulp-connect");
var stripDebug = require('gulp-strip-debug');

// Copy all files at the root level (app)
gulp.task('copy', function () {
    //gulp.src([
    //    'src/admin/page/**'
    //], {
    //    dot: true
    //}).pipe(gulp.dest(dest + "page")).pipe(plugins.size({
    //    title: 'copy page'
    //}));

    gulp.src([
        'src/station/img/**',
        'src/station/icon/**'
    ], {
        dot: true
    }).pipe(imagemin({
            optimizationLevel: 3,
            progressive: true,
            interlaced: true,
            use: [pngquant({
                quality: '50-60'
            })]
        }))
        .pipe(gulp.dest(dest + 'static/img')).pipe(plugins.size({
        title: 'copy image'
    }));

    gulp.src([
        'src/station/index.html'
    ], {
        dot: true
    }).pipe(gulp.dest(root))
        .pipe(plugins.size({
            title: 'copy index.html'
        }));
});

// Scan your HTML for assets & optimize them
gulp.task('html', function () {
    var assets = plugins.useref.assets({
        searchPath: '{.tmp,app}'
    });

    return gulp.src('app/**/*.html')
        .pipe(assets)
        // Concatenate and minify JavaScript
        .pipe(plugins.if('*.js', plugins.uglify({
            preserveComments: 'some'
        })))
        // Remove any unused CSS
        // Note: if not using the Style Guide, you can delete it from
        //       the next line to only include styles your project uses.
        .pipe(plugins.if('*.css', plugins.uncss({
            html: [
                'app/index.html',
                'app/styleguide.html'
            ],
            // CSS Selectors for UnCSS to ignore
            ignore: [
                /.navdrawer-container.open/,
                /.app-bar.open/
            ]
        })))
        // Concatenate and minify styles
        // In case you are still using useref build blocks
        .pipe(plugins.if('*.css', plugins.csso()))
        .pipe(assets.restore())
        .pipe(plugins.useref())
        // Update production Style Guide paths
        .pipe(plugins.replace('components/components.css', 'components/main.min.css'))
        // Minify any HTML
        .pipe(plugins.if('*.html', plugins.minifyHtml()))
        // Output files
        .pipe(gulp.dest('dist'))
        .pipe(plugins.size({
            title: 'html'
        }));
});

// Clean output directory
gulp.task('clean', del.bind(null, ['dist/*'], {
    dot: true
}));

gulp.task('buildlib', function () {
    return browserify({
        entries: ['src/station/lib/lib.js']
    })
        .transform(babelify)
        .bundle()
        .pipe(source('lib.js'))
        .pipe(buffer())
        .pipe(uglify())
        .pipe(gulp.dest(dest + 'static/js/'));
});

function getDirList(dir) {
    return fs.readdirSync(dir)
        .filter(function (file) {
            return fs.statSync(path.join(dir, file)).isDirectory();
        }).map(function (key, value) {
            return path.join(dir, key);
        });
}
String.prototype.endsWith = function (searchString, position) {
    var subjectString = this.toString();
    if (typeof position !== 'number'|| !isFinite(position)||Math.floor(position) !== position||position > subjectString.length) {
        position = subjectString.length;
    }
    position -= searchString.length;
    var lastIndex = subjectString.indexOf(searchString, position);
    return lastIndex !== -1&&lastIndex === position;
};
function getFileList(dir) {
    var dirs = getDirList(dir);
    var files = fs.readdirSync(dir)
        .filter(function (file) {
            return fs.statSync(path.join(dir, file)).isFile()&&
                (file.endsWith('.jsx')||file.endsWith('.js'));
        }).map(function (key, value) {
            return path.join(dir, key);
        });

    dirs.forEach(function (key) {
        var r = getFileList(key);
        files.push.apply(files, r);
    });
    return files;
}

gulp.task('buildjs', function () {
    var files = getFileList('src/station/js');

    return watchify(browserify({
        entries: files
    })
        .transform(babelify)
        .bundle()
        .on('error', function (err) {
            console.log(err.message);
            this.emit('end');
        })

        .pipe(source('app.js'))
        .pipe(buffer())
        //.pipe(stripDebug())
        //.pipe(uglify())
        .pipe(gulp.dest(dest + 'static/js/')));
});

gulp.task('buildreleasejs', function () {
    var files = getFileList('src/station/js');

    return browserify({
        entries: files
    })
        .transform(babelify)
        .bundle()
        .on('error', function (err) {
            console.log(err.message);
            this.emit('end');
        })
        .pipe(source('app.js'))
        .pipe(buffer())
        .pipe(stripDebug())
        .pipe(uglify())
        .pipe(gulp.dest(dest + 'static/js/'));
});

gulp.task('compass', function (cb) {

    return exec('compass compile', function (err) {
        console.log(err);
        cb(err);
    });

});

function accessLog(req, res, next) {
    console.log(req.method, req.url, 'HTTP/' + req.httpVersion, res.statusCode);
    next();
}
gulp.task('server', function () {
    connect.server({
        root: ["./dist"],
        port: 8080,
        livereload: false
    });

    gulp.watch("src/station/sass/*", ["compass"]);

    require('./proxy.js');
    // opn("http://localhost:8000");
});

gulp.task('watchjs', function () {
    gulp.watch("src/station/js/**/*", ["buildjs"]);
});

gulp.task('buildall', ['copy', 'buildlib', 'buildjs', 'compass'], function () {
});

gulp.task('buildrelease', ['copy', 'buildlib', 'buildreleasejs', 'compass'], function () {
});

gulp.task('default', ['buildall', 'watchjs', 'server']);

gulp.task('release', ['buildrelease', 'watchjs', 'server']);

