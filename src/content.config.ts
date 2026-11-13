import { defineCollection, z } from 'astro:content';
import { glob } from 'astro/loaders';
import { docsLoader } from '@astrojs/starlight/loaders';
import { docsSchema } from '@astrojs/starlight/schema';
import { readApprovals, slugPattern } from './lib/approvals.mjs';
const ids = readApprovals();
const articles = defineCollection({
 loader: ids.length ? glob({base:'./content/approved', pattern: ids.map((id: string) => `${id}.{md,mdx}`)}) : async () => [],
 schema: z.object({
  id:z.string().regex(slugPattern),title:z.string().min(1),type:z.enum(['handwritten-note','paper','digital-note']),subject:z.string().min(1),tags:z.array(z.string()),language:z.string().min(2),visibility:z.literal('public'),status:z.literal('reviewed'),summary:z.string().min(1),
  source:z.object({kind:z.enum(['local-file','doi','url','citation']),reference:z.string(),pages:z.array(z.union([z.string(),z.number()])).optional()}),
  related:z.array(z.string().regex(slugPattern)),authors:z.array(z.string()).optional(),year:z.number().nullable().optional(),doi:z.string().nullable().optional(),venue:z.string().nullable().optional(),updated_date:z.coerce.date().optional(),course:z.string().optional(),recorded_date:z.coerce.date().optional(),
 }).superRefine((data,ctx) => {if(!ids.includes(data.id))ctx.addIssue({code:'custom',message:'Article lacks publication approval.'});}),
});
export const collections = {docs:defineCollection({loader:docsLoader(),schema:docsSchema()}),articles};
