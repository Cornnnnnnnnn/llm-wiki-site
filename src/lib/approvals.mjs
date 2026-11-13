import { readFileSync, realpathSync, existsSync } from 'node:fs';
import { resolve, sep } from 'node:path';
import { parse } from 'yaml';
export const slugPattern = /^[a-z0-9]+(?:-[a-z0-9]+)*$/;
export function readApprovals(root = process.cwd()) {
  const config = parse(readFileSync(resolve(root, 'config/publications.yml'), 'utf8'));
  if (!config || !Array.isArray(config.approved_ids) || config.approved_ids.some(id => typeof id !== 'string' || !slugPattern.test(id)) || new Set(config.approved_ids).size !== config.approved_ids.length) throw new Error('Invalid publication allowlist.');
  const base = realpathSync(resolve(root, 'content/approved'));
  for (const id of config.approved_ids) {
    const found = ['md','mdx'].map(ext => resolve(base, `${id}.${ext}`)).filter(existsSync);
    if (found.length !== 1 || !realpathSync(found[0]).startsWith(base + sep)) throw new Error('An approved ID must have exactly one in-bound article file.');
  }
  return config.approved_ids;
}
export function isPublished(data, approved) { return approved.includes(data.id) && data.visibility === 'public' && data.status === 'reviewed'; }
export function publicRelations(entries) {
  const ids = new Set(entries.map(e => e.id)); const edges = new Map();
  for (const entry of entries) for (const target of entry.data.related) {
    if (target === entry.id || !ids.has(target)) continue;
    const pair = [entry.id, target].sort(); edges.set(pair.join(':'), {source: pair[0], target: pair[1]});
  }
  return [...edges.values()];
}
