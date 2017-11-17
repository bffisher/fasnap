var gulp = require('gulp');
var util = require('gulp-util');
var react = require('gulp-react');
var less = require('gulp-less');
var minifyHtml = require('gulp-minify-html');
var minifyCss = require('gulp-clean-css');
var replace = require('gulp-html-replace');
var webpack = require('webpack');
var uglify = require('gulp-uglify');
var fs = require('fs-extra');
var q = require('q');

const root = process.cwd();

function indexHtmlStream(){
  return gulp.src('src/index.html');
}

function reactStream(){
  return gulp.src('src/js/**/*.*').pipe(react());
}

function lessStream(){
  return gulp.src('src/css/index.less').pipe(less());
}

function watchLog(event){
  console.log(event.type + ' ' + event.path);
}

gulp.task('clean',function(){
  fs.removeSync(root + '/www');
});

gulp.task('debug-index-html', function(){
  return indexHtmlStream().pipe(gulp.dest('www'));
});

gulp.task('debug-css', function(){
  return lessStream().pipe(gulp.dest('www'));
});

gulp.task('debug-lib', function(){
  return gulp.src('lib/**/*.js').pipe(gulp.dest('www/lib'));
});

gulp.task('debug-js', function(){
  return reactStream().pipe(gulp.dest('www/js'));
});

gulp.task('debug', ['debug-lib', 'debug-js', 'debug-css', 'debug-index-html'], function(){
  gulp.watch('src/index.html', ['debug-index-html']).on('change', watchLog);
  gulp.watch('src/css/**/*.*', ['debug-css']).on('change', watchLog);
  gulp.watch('../lib/**/*.*', ['debug-lib']).on('change', watchLog);
  gulp.watch('src/js/**/*.*', ['debug-js']).on('change', watchLog);
});

gulp.task('default',['debug'], function(){});

gulp.task('release-index-html', ['clean'], function(){
  return indexHtmlStream().pipe(replace({js:'js/app.js'})).pipe(minifyHtml()).pipe(gulp.dest('www'));
});

gulp.task('release-css', ['clean'], function(){
  return lessStream().pipe(minifyCss()).pipe(gulp.dest('www'));
});

gulp.task('release-js-react', ['clean'], function(){
  return reactStream().pipe(gulp.dest('www/_js'));
});

gulp.task('release-js-pack', ['release-js-react'], function(){
  var deferred = q.defer();
  
  webpack({
    entry: root + '/www/_js/index.js',
    resolve: {
      alias: require('./alias')
    },
    output: {
      path: root + '/www/js',
      publicPath: 'js/',
      filename: 'app.js',
      chunkFilename: 'app_[name].js'
    }
  }, function(){
    fs.removeSync(root + '/www/_js');
    deferred.resolve();
  });
  
  return deferred.promise;
});

gulp.task('release-js-uglify', ['release-js-pack'], function(){
  if(util.env['disable-uglify-js'] || util.env['duj']){
    util.log('Disable ugilfy js!');
    return;
  }

  var isMangle = false;
  if(util.env['mangle']){
    isMangle = true;
  }
  return gulp.src('www/js/*.*')
    .pipe(uglify({
      mangle: isMangle,
      compress: {
        'drop_console': true,
        unused: true,
        warnings: true
      }
    }))
    .pipe(gulp.dest('www/js'));
});

gulp.task('release', ['release-index-html', 'release-css', 'release-js-uglify'], function(){
  util.log('Build release successfully!');
});