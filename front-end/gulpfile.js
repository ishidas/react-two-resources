'use strict';
//if you wanna attach karma star to gulp, you can, but make sure bundle first and make sure it finishes before running test
const gulp = require('gulp');
const eslint = require('gulp-eslint');
const mocha = require('gulp-mocha');
const paths = ['*.js', 'test/*.js', 'app/*.js', 'app/templates/*.js'];
const webpack = require('webpack-stream');
const react = require('gulp-react');
const source = {
  html: __dirname + '/app/**/*.html',
  js: __dirname + '/app/index.js',
  test: __dirname + '/test/*_spec.js',
  directive: __dirname + '/app/*.js'
};


gulp.task('copy', ()=>{
  return gulp.src(source.html)
    .pipe(gulp.dest('./build'));
});

gulp.task('bundle:test', ()=>{
  return gulp.src(source.test)
    .pipe(webpack({
      watch: true,
      output: {
        filename: 'test_bundle.js'
      },
      module: {
        loaders: [
          {test:  /\.css$/, loader: 'style!css'}
        ]
      }
    }))
    .pipe(gulp.dest('./test'));
});

gulp.task('bundle:dev', function(){
  return gulp.src(source.directive)
  .pipe(webpack({
    watch: true,
    output: {
      filename: 'bundle.js'
    },
    module: {
      loaders: [
        {test:  /\.css$/, loader: 'style!css'}
      ]
    }
  }))
  .pipe(gulp.dest('build/'));
});

gulp.task('eslint', function(){
  return gulp.src(paths)
  .pipe(eslint())
  .pipe(eslint.format());
});

gulp.task('test', function(){
  return gulp.src( __dirname + '/test/test.js', {read: false})
  .pipe(mocha({reporter: 'nyan'}));
});

gulp.task('watcher', function(){
  gulp.watch( __dirname + '/**/*.js', ['eslint', 'test', 'bundle:dev']);
});
