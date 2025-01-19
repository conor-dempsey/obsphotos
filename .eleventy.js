const { eleventyImageTransformPlugin } = require("@11ty/eleventy-img");
const eleventyNavigationPlugin = require("@11ty/eleventy-navigation");

module.exports = async function(eleventyConfig) {

    const { EleventyHtmlBasePlugin } = await import("@11ty/eleventy");

    eleventyConfig.addPlugin(eleventyImageTransformPlugin);
    eleventyConfig.addPlugin(eleventyNavigationPlugin);
	eleventyConfig.addPlugin(EleventyHtmlBasePlugin);

    eleventyConfig.addPassthroughCopy("./styles/");
    eleventyConfig.addWatchTarget("./styles/");

    return {
        markdownTemplateEngine: 'njk',
        dataTemplateEngine: 'njk',
        htmlTemplateEngine: 'njk',
        dir: {
            input: '.',
            includes: '_includes',
            output: '_site'
        },
        // pathPrefix: "/obsphotos",
    }
}