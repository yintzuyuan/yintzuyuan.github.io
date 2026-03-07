#!/usr/bin/env node

/**
 * 掃描 content/writing/*.md 的 frontmatter，產生 data/essays.js
 * 用法：node scripts/build-essays.js
 */

const fs = require('node:fs');
const path = require('node:path');

const CONTENT_DIR = path.join(__dirname, '..', 'content', 'writing');
const OUTPUT_FILE = path.join(__dirname, '..', 'data', 'essays.js');

function parseFrontmatter(content) {
  const match = content.match(/^---\n([\s\S]*?)\n---/);
  if (!match) return null;

  const raw = match[1];
  const data = {};

  for (const line of raw.split('\n')) {
    const colonIdx = line.indexOf(':');
    if (colonIdx === -1) continue;

    const key = line.slice(0, colonIdx).trim();
    let value = line.slice(colonIdx + 1).trim();

    // Parse arrays: [a, b, c]
    if (value.startsWith('[') && value.endsWith(']')) {
      value = value.slice(1, -1).split(',').map(s => s.trim());
    }
    // Parse booleans
    else if (value === 'true') value = true;
    else if (value === 'false') value = false;

    data[key] = value;
  }

  return data;
}

function main() {
  if (!fs.existsSync(CONTENT_DIR)) {
    console.error('content/writing/ 目錄不存在');
    process.exit(1);
  }

  const files = fs.readdirSync(CONTENT_DIR).filter(f => f.endsWith('.md'));
  const essays = [];

  for (const file of files) {
    const content = fs.readFileSync(path.join(CONTENT_DIR, file), 'utf-8');
    const meta = parseFrontmatter(content);
    if (!meta) {
      console.warn(`跳過 ${file}：無 frontmatter`);
      continue;
    }

    // 方案 A：排除草稿
    if (meta.draft === true) {
      console.log(`草稿：${file}（已排除）`);
      continue;
    }

    essays.push({
      slug: file.replace(/\.md$/, ''),
      date: meta.date || '',
      title: meta.title || '',
      excerpt: meta.excerpt || '',
      tags: Array.isArray(meta.tags) ? meta.tags : [],
    });
  }

  // 按日期降序排列
  essays.sort((a, b) => (b.date > a.date ? 1 : b.date < a.date ? -1 : 0));

  const output = `// 此檔案由 scripts/build-essays.js 自動產生，請勿手動編輯
window.ESSAYS_DATA = ${JSON.stringify(essays, null, 2)};
`;

  fs.writeFileSync(OUTPUT_FILE, output, 'utf-8');
  console.log(`已產生 data/essays.js（${essays.length} 篇已發表，${files.length - essays.length} 篇草稿已排除）`);
}

main();
