module.exports = function(eleventyConfig) {
  // 複製靜態資源
  eleventyConfig.addPassthroughCopy("assets");
  eleventyConfig.addPassthroughCopy("fonts");

  // 忽略舊的 Jekyll 檔案
  eleventyConfig.ignores.add("_sass/**");
  eleventyConfig.ignores.add("_site/**");
  eleventyConfig.ignores.add("vendor/**");
  eleventyConfig.ignores.add("boost/**");
  // 暫時忽略其他頁面（Phase 2 再轉換）
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
