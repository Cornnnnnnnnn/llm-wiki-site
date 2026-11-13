import { getCollection } from 'astro:content';
import { readApprovals, isPublished, publicRelations } from './approvals.mjs';
export async function catalog() {
 const approved=readApprovals(); if(!approved.length)return [];
 const entries=await getCollection('articles');
 for(const e of entries) if(e.id!==e.data.id || !isPublished(e.data,approved)) throw new Error('Article metadata does not match the approved filename.');
 return entries.sort((a,b)=>a.data.title.localeCompare(b.data.title));
}
export {publicRelations};
export const href=(path='') => `${import.meta.env.BASE_URL.replace(/\/$/,'')}/${path}`;
