import { EDITORIAL_CATEGORIES } from '../data/blog-posts';

export type EditorialCategorySlug = (typeof EDITORIAL_CATEGORIES)[number]['slug'];

type PostLike = {
	slug: string;
	title?: string;
	description?: string;
	category?: string;
	tags?: string[];
};

export const LEGACY_BLOG_CANONICAL_SLUGS = new Set<string>([
	'can-i-send-wrapped-bitcoin-to-bitcoin-wallet',
	'cash-app-introduces-new-bitcoin-stablecoin-payment-options',
	'how-bitcoin-mining-can-transform-the-energy-industry',
	'how-does-a-bitcoin-transaction-work-wallet',
	'how-long-does-it-take-to-send-bitcoin',
	'how-much-is-0-46-bitcoin-worth',
	'how-to-buy-bitcoin-on-cash-app'
]);

const normalizeText = (post: PostLike): string => {
	return [post.title, post.description, post.category, (post.tags ?? []).join(' ')]
		.join(' ')
		.toLowerCase();
};

const matchesKeywords = (text: string, keywords: string[]): boolean => {
	return keywords.some((k) => text.includes(k.toLowerCase()));
};

const countKeywordHits = (text: string, keywords: string[]): number => {
	return keywords.reduce((acc, k) => (text.includes(k.toLowerCase()) ? acc + 1 : acc), 0);
};

const isBitcoinCorePost = (text: string): boolean => {
	return matchesKeywords(text, ['bitcoin', 'btc', 'wbtc', 'lightning']);
};

const mustHaveCategoryCore = (categorySlug: string, text: string): boolean => {
	switch (categorySlug) {
		case 'bitcoin':
			return matchesKeywords(text, ['bitcoin', 'btc', 'wbtc', 'lightning']);
		case 'technology':
			return matchesKeywords(text, ['technology', 'tech', 'software', 'ai', 'security', 'blockchain']);
		case 'digital-marketing':
			return matchesKeywords(text, ['seo', 'marketing', 'analytics', 'search console', 'google analytics', 'content marketing']);
		case 'programming':
			return matchesKeywords(text, ['programming', 'code', 'developer', 'javascript', 'typescript', 'astro']);
		case 'economics':
			return matchesKeywords(text, ['economics', 'macro', 'inflation', 'rates', 'policy', 'adoption']);
		case 'finance':
			return matchesKeywords(text, ['finance', 'investing', 'investment', 'trading', 'portfolio', 'risk']);
		default:
			return true;
	}
};

export function getEditorialCategorySlugForPost(post: PostLike): EditorialCategorySlug | null {
	if (post.slug.includes('/')) return post.slug.split('/')[0] as EditorialCategorySlug;

	const text = normalizeText(post);
	let best: { slug: EditorialCategorySlug; score: number } | null = null;

	for (const c of EDITORIAL_CATEGORIES) {
		if (c.slug !== 'bitcoin' && isBitcoinCorePost(text)) continue;
		if (!mustHaveCategoryCore(c.slug, text)) continue;

		const keywords = [...c.keywords, ...c.topics.flatMap((t) => t.keywords)];
		if (!matchesKeywords(text, keywords)) continue;

		const score = countKeywordHits(text, keywords);
		if (!best || score > best.score) best = { slug: c.slug, score };
	}

	return best?.slug ?? null;
}

export function getPostUrl(post: PostLike): string {
	const slug = post.slug;
	const baseSlug = slug.split('/').pop() || slug;
	if (LEGACY_BLOG_CANONICAL_SLUGS.has(baseSlug)) return `/blog/${baseSlug}`;
	const cat = getEditorialCategorySlugForPost(post);
	return cat ? `/${cat}/${baseSlug}` : `/blog/${baseSlug}`;
}
