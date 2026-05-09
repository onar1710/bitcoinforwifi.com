import { defineCollection, z } from 'astro:content';

const blogCollection = defineCollection({
	type: 'content',
	schema: z.object({
		title: z.string(),
		description: z.string(),
		date: z.string(),
		readTime: z.string().optional(),
		category: z.string().optional(),
		author: z.string().optional(),
		image: z.string().optional(),
		tags: z.array(z.string()).optional(),
		keywords: z.string().optional(),
		homeSection: z.enum(['topStory', 'latest', 'moreStories', 'none']).optional().default('none'),
		featured: z.boolean().optional().default(false),
		published: z.boolean().optional().default(true),
		modifiedTime: z.string().optional()
	})
});

export const collections = {
	blog: blogCollection
};
