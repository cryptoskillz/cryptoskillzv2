const minify = require('@node-minify/core');
const gcc = require('@node-minify/google-closure-compiler');
const htmlMinifier = require('@node-minify/html-minifier');
const glob = require("glob");

let htmlFileArray = glob.sync("./output/HTML/**/*.html")

//Ordering of this array is important, we can't use glob here.

let jsFileArray = [
    'src/assets/js/bootstrap.bundle.min.js',
    'src/assets/js/app.js'
]

console.log('These HTML files will be minified:')
console.log(htmlFileArray)
console.log('')
console.log('These JS files will be minified & bundled into bundle.js:')
console.log(jsFileArray)
console.log('')




 minify({
    compressor: htmlMinifier,
    input: htmlFileArray,
    output: htmlFileArray,
    callback: function (err, min) {
         if (err) console.error(err);
    }
}).catch(function(err){
     console.error(err);
 });



minify({
    compressor: gcc,
    input: jsFileArray,
    output: 'output/HTML/assets/js/bundle.js',
    options: {
        warningLevel: "QUIET",
        compilationLevel: "ADVANCED"
    },
    callback: function (err, min) {
         console.log(err)
    }
}).catch(function (err) {
    console.error(err)
});