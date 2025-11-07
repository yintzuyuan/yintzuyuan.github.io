const yaml = require("js-yaml");
const markdownIt = require("markdown-it");

module.exports = function(eleventyConfig) {
  // 添加 YAML 支援
  eleventyConfig.addDataExtension("yml, yaml", contents => yaml.load(contents));

  // 初始化 Markdown 解析器，配置外部連結屬性
  const md = new markdownIt({
    html: true,
    linkify: true,
    typographer: true
  });

  // 為所有外部連結自動添加 target="_blank" 和 rel="noopener noreferrer"
  const defaultRender = md.renderer.rules.link_open || function(tokens, idx, options, _env, self) {
    return self.renderToken(tokens, idx, options);
  };

  md.renderer.rules.link_open = function(tokens, idx, options, _env, self) {
    const aIndex = tokens[idx].attrIndex('target');
    if (aIndex < 0) {
      tokens[idx].attrPush(['target', '_blank']);
      tokens[idx].attrPush(['rel', 'noopener noreferrer']);
    }
    return defaultRender(tokens, idx, options, _env, self);
  };

  // 設定 Eleventy 使用自訂的 Markdown 解析器
  eleventyConfig.setLibrary("md", md);

  // 自訂 filter：將 Markdown 轉換為 HTML
  eleventyConfig.addFilter("markdownify", function(content) {
    if (!content) return "";
    return md.renderInline(content);
  });

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
