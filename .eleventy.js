const {eleventyImageTransformPlugin} = require("@11ty/eleventy-img");
const eleventyNavigationPlugin = require("@11ty/eleventy-navigation");

module.exports = function(eleventyConfig) {

    eleventyConfig.addPlugin(eleventyImageTransformPlugin);
    eleventyConfig.addPlugin(eleventyNavigationPlugin);

    return {
        markdownTemplateEngine: 'njk',
        dataTemplateEngine: 'njk',
        htmlTemplateEngine: 'njk',
        dir: {
            input: 'src',
            includes: '_includes',
            output: 'docs'
        }
    }
}