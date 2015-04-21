var gulp = require('gulp'),
    traceur = require('gulp-traceur'),
    to5 = require('gulp-6to5'),
    plumber = require('gulp-plumber'),
    rename = require('gulp-rename'),
    uglify = require('gulp-uglify'),
    sourcemaps = require('gulp-sourcemaps'),
    concat = require('gulp-concat'),
    gzip = require('gulp-gzip'),
    properties = require ("properties"),
    fs = require('fs'),
    debug = require('gulp-debug'),
    inject = require('gulp-inject'),
    tsc = require('gulp-typescript'),
    tslint = require('gulp-tslint'),
    rimraf = require('gulp-rimraf');
	Config = require('./gulpfile.config');

	var config = new Config();

/*gulp.task('traceur', function () {
  gulp.src([config.allTypeScript])
      .pipe(rename(function (path) {
          path.dirname = path.dirname.replace('/ts/','/js/'),
          path.extname = '.js'
      }))
      .pipe(plumber())
      .pipe(traceur({ blockBinding: true }))
      .pipe(gulp.dest('./' + compilePath + '/es6'));
});*/

gulp.task('6to5', function () {
    gulp.src([config.es6Path])
      .pipe(plumber())
      .pipe(to5())
      /*.pipe(rename(function (path) {
          path.dirname = path.dirname.replace('/ts/','/js/'),
          path.extname = '.js'
      }))*/
      .pipe(gulp.dest('./' + config.compilePath + '/es5'));
});

gulp.task('compress', [  'compile-ts', 'gen-ts-refs', '6to5'],function(){
  setTimeout(function () {
    gulp.src([
      config.compilePath + 'es5/modules/**/*.js',
      config.compilePath + 'es5/services/**/*.js',
      config.compilePath + 'es5/controllers/**/*.js',
      config.compilePath + 'es5/directives/**/*.js'
    ])
      .pipe(sourcemaps.init())
      .pipe(concat('all.js'))
      .pipe(uglify({
          compress: {
              negate_iife: false
          }
      }))
     
      .pipe(rename(function(path){
          path.extname = '.min.js'
      }))
      .pipe(sourcemaps.write('./'))
      .pipe(gulp.dest('./' + config.compilePath + 'es5'));

      gulp.src([
        config.compilePath + 'es6/modules/**/*.js',
        config.compilePath + 'es6/services/**/*.js',
        config.compilePath + 'es6/controllers/**/*.js',
        config.compilePath + 'es6/directives/**/*.js'
      ])
      .pipe(sourcemaps.init())
      .pipe(concat('all.js'))
      .pipe(uglify({
          compress: {
              negate_iife: false
          }
      }))
      
      .pipe(rename(function(path){
          path.extname = '.min.js'
      }))
      .pipe(sourcemaps.write('./'))
      .pipe(gulp.dest('./' + config.compilePath + 'es6'));
    },1000);
});

/*
gulp.task('properties2json',function(){
	//get all files in a directory
	var dir = 'config/resourceBundles';
    var results = [];
    fs.readdirSync(dir).forEach(function(file) {
        file = dir+'/'+file;
        properties.parse(file,{path:true}, function (error, obj){
        	if (error) return console.error (error);
        	var newobj = {};
        	for(key in obj){
        		newobj[key.toLowerCase()] = obj[key];
        	}
        	var newfile = file.replace('.properties','.json');
        	
        	if(fs.existsSync(newfile)){
        		fs.unlink(newfile, function (err) {
    				console.log(err);
        		  if (err) throw err;
        		  console.log('successfully deleted '+newfile);
        		  	fs.writeFile(newfile, JSON.stringify(newobj), function(){
              			console.log('It\'s saved!');
              		});
        		});
        	}else{
        		fs.writeFile(newfile, JSON.stringify(newobj), function(){
            		console.log('It\'s saved!');
            	});
        	}
	  	});
    });
});*/

/**
 * Generates the app.d.ts references file dynamically from all application *.ts files.
 */
gulp.task('gen-ts-refs', function () {
    var target = gulp.src(config.appTypeScriptReferences);
    var sources = gulp.src([config.allTypeScript], {read: false});
    return target.pipe(inject(sources, {
        starttag: '//{',
        endtag: '//}',
        transform: function (filepath) {
            return '/// <reference path="../..' + filepath + '" />';
        }
    })).pipe(gulp.dest(config.typings));
});

/**
 * Lint all custom TypeScript files.
 */
gulp.task('ts-lint', function () {
    return gulp.src(config.allTypeScript).pipe(tslint()).pipe(tslint.report('prose'));
});

/**
 * Compile TypeScript and include references to library and app .d.ts files.
 */
gulp.task('compile-ts', function () {
    var sourceTsFiles = [config.allTypeScript,                //path to typescript files
                         config.libraryTypeScriptDefinitions, //reference to library .d.ts files
                         config.appTypeScriptReferences];     //reference to app.d.ts files

    var tsResult = gulp.src(sourceTsFiles)
                       .pipe(sourcemaps.init())
                       .pipe(tsc({
                           target: 'ES6',
                           declarationFiles: false,
                           noExternalResolve: true
                       }));

        tsResult.dts.pipe(gulp.dest(config.tsOutputPath));
        return tsResult.js
                        .pipe(sourcemaps.write('.'))
                        .pipe(gulp.dest(config.tsOutputPath));
});

/**
 * Remove all generated JavaScript files from TypeScript compilation.
 */
gulp.task('clean-ts', function () {
  var typeScriptGenFiles = [config.tsOutputPath,            // path to generated JS files
                            config.tsOutputPath +'**/*.js',    // path to all JS files auto gen'd by editor
                            config.tsOutputPath +'**/*.js.map' // path to all sourcemap files auto gen'd by editor
                           ];

  // delete the files
  return gulp.src(typeScriptGenFiles, {read: false})
      .pipe(rimraf());
});

gulp.task('watch', function() {
    gulp.watch([config.allTypeScript], ['compress']);
    //gulp.watch([propertiesPath],['properties2json']);
});

gulp.task('default', ['compress', 'watch']);