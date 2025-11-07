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

  // 忽略舊的 Jekyll 檔案
  eleventyConfig.ignores.add("_sass/**");
  eleventyConfig.ignores.add("_site/**");
  eleventyConfig.ignores.add("vendor/**");
  eleventyConfig.ignores.add("boost/**");
  // 忽略舊的頁面目錄（已改用根目錄的 .md 檔案）
  eleventyConfig.ignores.add("about/**");
  eleventyConfig.ignores.add("works/**");
  eleventyConfig.ignores.add("contact/**");

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
