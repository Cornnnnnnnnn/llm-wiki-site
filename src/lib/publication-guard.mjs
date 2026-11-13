// Reject local references rather than silently rewriting approved source text.
export function sourceGuard() {
 return tree => {
  const walk = node => {
   if (node.type.startsWith('mdx') || node.type === 'html') throw new Error('Executable MDX and raw HTML require separate review. Use plain Markdown syntax.');
   if (['link','image','definition'].includes(node.type) && node.url && !/^(https:\/\/|mailto:|#)/i.test(node.url)) throw new Error('Private or local source references cannot be embedded.');
   for(const child of node.children || []) walk(child);
  };walk(tree);
 };
}
export function publicationGuard() {
  return tree => {
    const walk = node => {
      if (node.type === 'element') {
        const props = node.properties || {};
        for (const key of ['href','src','srcSet','poster','data']) {
          const value = props[key]; if (value == null) continue;
          const url = String(value);
          if (!(url.startsWith('#') || /^https:\/\//i.test(url) || (key === 'href' && /^mailto:/i.test(url)))) throw new Error('Local asset references need a separate public asset review.');
        }
        if (['script','iframe','object','embed','form'].includes(node.tagName)) throw new Error('Active embedded content is not permitted.');
      }
      if (node.type === 'raw') throw new Error('Raw HTML requires publication review.');
      for (const child of node.children || []) walk(child);
    }; walk(tree);
  };
}
