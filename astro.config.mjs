import { defineConfig } from 'astro/config';
import starlight from '@astrojs/starlight';
import mdx from '@astrojs/mdx';
import remarkMath from 'remark-math';
import rehypeKatex from 'rehype-katex';
import { publicationGuard, sourceGuard } from './src/lib/publication-guard.mjs';
const [owner, repository] = (process.env.GITHUB_REPOSITORY || '').split('/');
const pagesBuild = process.env.GITHUB_ACTIONS === 'true' && owner && repository;
const pagesOrigin = pagesBuild ? `https://${owner}.github.io` : 'https://example.invalid';
const pagesBase = pagesBuild && repository.toLowerCase() !== `${owner}.github.io`.toLowerCase() ? `/${repository}/` : '/';
export default defineConfig({
  site: process.env.SITE_URL || pagesOrigin,
  base: process.env.BASE_PATH || pagesBase, output: 'static', trailingSlash: 'always',
  integrations: [starlight({title: 'LLM Wiki', locales: {root: {label:'繁體中文',lang:'zh-Hant'}, en:{label:'English',lang:'en'}}, customCss: ['./src/styles/docs.css'], sidebar:[{label:'Guide',items:[{slug:'guide'}]}], pagefind: false}), mdx()],
  markdown: {remarkPlugins: [sourceGuard, remarkMath], rehypePlugins: [rehypeKatex, publicationGuard]},
  vite: {build: {sourcemap: false}},
});
