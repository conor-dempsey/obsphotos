const { eleventyImageTransformPlugin } = require("@11ty/eleventy-img");
const eleventyNavigationPlugin = require("@11ty/eleventy-navigation");

module.exports = function(eleventyConfig) {

    eleventyConfig.addPlugin(eleventyImageTransformPlugin);
    eleventyConfig.addPlugin(eleventyNavigationPlugin);

    return {
        markdownTemplateEngine: 'njk',
        dataTemplateEngine: 'njk',
        htmlTemplateEngine: 'njk',
        dir: {
            input: '.',
            includes: '_includes',
            output: '_site'
        },
        pathPrefix: "/obsphotos",
    }
}