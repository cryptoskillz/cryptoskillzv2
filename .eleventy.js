const Terser = require("terser");
const CleanCSS = require("clean-css");
const api = require('./src/_data/api');


module.exports = function (eleventyConfig) {

  const MarkdownIt = require("markdown-it");
  const mdRender = new MarkdownIt();
  eleventyConfig.addFilter("renderUsingMarkdown", function(rawString) {
    return mdRender.render(rawString);
  });

  eleventyConfig.addPassthroughCopy({
    "src/assets/pdf": "assets/pdf"
  });
  eleventyConfig.addPassthroughCopy({
    "src/assets/images": "assets/images"
  });
  eleventyConfig.addPassthroughCopy({
    "src/assets/css": "assets/css"
  });
  eleventyConfig.addPassthroughCopy({
    "src/assets/js": "assets/js"
  });
  eleventyConfig.addPassthroughCopy({
    "src/assets/fonts": "assets/fonts"
  });
    eleventyConfig.addPassthroughCopy({
    "src/assets/webfonts": "assets/webfonts"
  });
  eleventyConfig.addPassthroughCopy({
    "src/robots.txt": "robots.txt"
  });
  //Nunjucks Filers:

  eleventyConfig.addFilter("jsmin", function (code) {
    let minified = Terser.minify(code);
    if (minified.error) {
      console.log("Terser error: ", minified.error);
      return code;
    }
    return minified.code;
  });

  eleventyConfig.addFilter("cssmin", function(code) {
    return new CleanCSS({}).minify(code).styles;
  });

  eleventyConfig.addFilter("ISODate", (str) => {
     return new Date().toISOString();
  })

  eleventyConfig.addFilter("json", (jsonObj) => {
    //console.dir(jsonObj, {depth:null});
    return JSON.stringify(jsonObj)
 })

 eleventyConfig.addFilter("formatUSD", (price) => {
   return new Intl.NumberFormat('en-US', {
     style: 'currency',
     currency: 'USD'
   }).format(price)
 })

 eleventyConfig.addFilter('isString', function(obj) {
  return (typeof obj);
});

}

