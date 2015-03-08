var gulp = require('gulp');
var shell = require('gulp-shell');

// Inside main folder
gulp.task('main', shell.task([
    'node node_modules/vulcanize/bin/vulcanize -o ./development/build.html pol.html'

]));
// Inside development folder
gulp.task('development', shell.task([
    'npm install',
    'bower install'

], {
    "cwd": './development'
}));


//Intialising
gulp.task('init', ['development', 'main']);


// Run project
gulp.task('run', shell.task([
    
    'node node_modules/node-webkit-builder/bin/nwbuild -v 0.11.6 --buildDir ./build --run ./development'
    
]));


// Compile project
gulp.task('build-osx', shell.task([
    'node node_modules/node-webkit-builder/bin/nwbuild -v 0.11.6 --buildDir ./build -p osx ./development'
]));

// Compile project
gulp.task('build-win', shell.task([
    'node node_modules/node-webkit-builder/bin/nwbuild -v 0.11.6 --buildDir ./build -p win ./development'
]));

// Compile project
gulp.task('build-linux', shell.task([
    'node node_modules/node-webkit-builder/bin/nwbuild -v 0.11.6 --buildDir ./build -p linux32,linux64 ./development'
]));

// Compile project
gulp.task('build', shell.task([
    'node node_modules/node-webkit-builder/bin/nwbuild -v 0.11.6 --buildDir ./build -p  win32,win64,osx32,osx64,linux32,linux64 ./development'
]));



// Install compile and run all in one
gulp.task('complete', [ 'development', 'main', 'run', 'build']);
