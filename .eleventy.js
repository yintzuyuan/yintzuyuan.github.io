const yaml = require("js-yaml");

module.exports = function(eleventyConfig) {
  // 添加 YAML 支援
  eleventyConfig.addDataExtension("yml, yaml", contents => yaml.load(contents));

  // 自訂 filter：收集唯一分類
  eleventyConfig.addFilter("uniqueCategories", function(projects) {
    if (!projects) return [];
    const categories = new Set();
    projects.forEach(project => {
      if (project.categories) {
        project.categories.forEach(cat => categories.add(cat));
      }
    });
    return Array.from(categories);
  });

  // 複製靜態資源
  eleventyConfig.addPassthroughCopy("assets");
  eleventyConfig.addPassthroughCopy("fonts");
  eleventyConfig.addPassthroughCopy("favicon.ico");
  eleventyConfig.addPassthroughCopy("manifest.json");
  eleventyConfig.addPassthroughCopy("robots.txt");

  // 忽略文檔和開發檔案
  eleventyConfig.ignores.add("docs/**");
  eleventyConfig.ignores.add("node_modules/**");
  eleventyConfig.ignores.add(".mcp.json");

  return {
    dir: {
      input: ".",
      output: "_site",
      layouts: "_layouts",
      includes: "_includes",
      data: "_data"
    },
    markdownTemplateEngine: "njk",
    htmlTemplateEngine: "njk"
  };
};
