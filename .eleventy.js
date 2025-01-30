const { eleventyImageTransformPlugin } = require("@11ty/eleventy-img");
const eleventyNavigationPlugin = require("@11ty/eleventy-navigation");

module.exports = async function(eleventyConfig) {

    const { EleventyHtmlBasePlugin } = await import("@11ty/eleventy");

    eleventyConfig.addPlugin(eleventyImageTransformPlugin, {
        widths: [300, 600],
        htmlOptions: {
			imgAttributes: {
				loading: "lazy",
				decoding: "async",
			},
			pictureAttributes: {}
		},
    });
    eleventyConfig.addPlugin(eleventyNavigationPlugin);
	eleventyConfig.addPlugin(EleventyHtmlBasePlugin);

    eleventyConfig.addPassthroughCopy("./css/");
    eleventyConfig.addWatchTarget("./css/");

    eleventyConfig.addPassthroughCopy("./js/");
    eleventyConfig.addWatchTarget("./js/");

    // Create a copy of Splide files in your output directory
    eleventyConfig.addPassthroughCopy({
        "node_modules/@splidejs/splide/dist/css": "/css/splide",
        "node_modules/@splidejs/splide/dist/js": "/js/splide",
        "node_modules/@splidejs/splide-extension-auto-scroll/dist/js": "/js/splide-extension-auto-scroll",
    });

    eleventyConfig.addCollection("gallery", function(collection) {
        return collection.getFilteredByGlob("galleries/*.md");
    });

    eleventyConfig.addFilter("date", require("./filters/date.js"));

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