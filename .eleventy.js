const { eleventyImageTransformPlugin } = require("@11ty/eleventy-img");
const eleventyNavigationPlugin = require("@11ty/eleventy-navigation");

const util = require('util');

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

    eleventyConfig.addFilter('debug', function(collection) {
        return util.inspect(collection, { showHidden: false, depth: null });
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

    eleventyConfig.addCollection("allImages", function(collectionApi) {
        let images = [];

        collectionApi.getFilteredByGlob("galleries/*.md").forEach((gallery) => {
            console.log("📂 Processing gallery:", gallery.inputPath);
            if (gallery.data.images) {
            gallery.data.images.forEach(image => {
                console.log("🖼 Found image:", image.src);
                images.push({
                ...image,
                gallery: gallery.fileSlug, // Keep track of the source gallery
                });
            });
            } else {
            console.log("⚠ No images in", gallery.inputPath);
            }
        });

        console.log("✅ Final images collection:", JSON.stringify(images, null, 2));
        return images;
    });

    eleventyConfig.addFilter("date", require("./filters/date.js"));

    return {
        templateFormats: ["html", "njk", "md", "json"],
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