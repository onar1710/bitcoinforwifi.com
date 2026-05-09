import { getCurrentDate, getCurrentDateTime } from '../utils/dateUtils.js';

export interface BlogPost {
  slug: string;
  title: string;
  description: string;
  content: string;
  date: string;
  readTime: string;
  category: string;
  author: string;
  image: string;
  tags: string[];
  keywords?: string[];
  featured: boolean;
  published: boolean;
  modifiedTime?: string;
}

export const blogPosts: BlogPost[] = [
  {
    slug: 'can-i-send-wrapped-bitcoin-to-bitcoin-wallet',
    title: "Can I Send Wrapped Bitcoin to a Bitcoin Wallet",
    description: "Complete guide on how to convert and send wrapped Bitcoin (WBTC) to a regular Bitcoin wallet. Learn the differences, risks, and step-by-step methods for unwrapping Bitcoin safely.",
    content: "",
    date: '2026-03-14',
    readTime: "15 min read",
    category: "Tutorial",
    author: "David Thompson",
    image: "/imagenes-articulos/bitcoin-imagenes/can-i-send-wrapped-bitcoin-to-bitcoin-wallet-featured-02.svg",
    tags: ["Wrapped Bitcoin","WBTC","Bitcoin","Tutorial","Crypto Wallet"],
    featured: false,
    published: true,
    modifiedTime: '2026-03-14T13:49:41.423Z'
  },
  {
    slug: 'cash-app-introduces-new-bitcoin-stablecoin-payment-options',
    title: "Cash App Introduces New Bitcoin and Stablecoin Payment Options",
    description: "Complete guide to Cash App's new Bitcoin Lightning Network and stablecoin payment features. Learn how to use instant crypto payments without holding cryptocurrency.",
    content: "",
    date: '2026-03-14',
    readTime: "18 min read",
    category: "News & Updates",
    author: "BitcoinForWifi Expert",
    image: "/imagenes-articulos/bitcoin-imagenes/cash-app-introduces-new-bitcoin-stablecoin-payment-options-featured.svg",
    tags: ["Cash App","Bitcoin","Lightning Network","Stablecoins","Payments","Crypto News"],
    featured: false,
    published: true,
    modifiedTime: '2026-03-14T13:49:41.424Z'
  },
  {
    slug: 'how-bitcoin-mining-can-transform-the-energy-industry',
    title: "How Bitcoin Mining Can Transform the Energy Industry",
    description: "Let me show you step by step how Bitcoin mining is revolutionizing our energy systems. I'll explain exactly how miners are solving renewable energy problems and creating a sustainable future.",
    content: "",
    date: '2026-03-14',
    readTime: "12 min read",
    category: "Energy & Sustainability",
    author: "BitcoinForWifi Expert",
    image: "/imagenes-articulos/bitcoin-imagenes/how-bitcoin-mining-can-transform-the-energy-industry-featured.svg",
    tags: ["Bitcoin Mining Energy Sector","Renewable Energy Bitcoin Mining","Bitcoin Mining Grid Balancing","Bitcoin Mining Waste Heat Recovery","Bitcoin Mining Energy Transition","Sustainable Bitcoin Mining"],
    featured: false,
    published: true,
    modifiedTime: '2026-03-14T13:49:41.424Z'
  },
  {
    slug: 'how-does-a-bitcoin-transaction-work-wallet',
    title: "How Does a Bitcoin Transaction Work Wallet: Complete Step-by-Step Guide",
    description: "Let me walk you through exactly how Bitcoin transactions work with your wallet. I'll explain everything step by step so you can send and receive Bitcoin with confidence, even if you're completely new to crypto.",
    content: "",
    date: '2026-03-14',
    readTime: "10 min read",
    category: "Tutorial",
    author: "BitcoinForWifi Expert",
    image: "/imagenes-articulos/bitcoin-imagenes/how-does-a-bitcoin-transaction-work-wallet-featured.svg",
    tags: ["Bitcoin Transaction","Bitcoin Wallet","Crypto Tutorial","Sending Bitcoin","Receiving Bitcoin","Bitcoin Guide"],
    featured: false,
    published: true,
    modifiedTime: '2026-03-14T13:49:41.425Z'
  },
  {
    slug: 'how-long-does-it-take-to-send-bitcoin',
    title: "How Long Does It Take to Send Bitcoin? Complete 2026 Guide",
    description: "Let me explain exactly how long Bitcoin transactions take and why they vary. I'll show you step by step how to speed up your transfers and avoid common delays, even if you're completely new to crypto.",
    content: "",
    date: '2026-03-14',
    readTime: "8 min read",
    category: "Tutorial",
    author: "BitcoinForWifi Expert",
    image: "/imagenes-articulos/bitcoin-imagenes/how-long-does-it-take-to-send-bitcoin-featured.svg",
    tags: ["Bitcoin Transaction Time","Send Bitcoin","Bitcoin Confirmation","Bitcoin Speed","Crypto Transaction","Bitcoin Guide"],
    featured: false,
    published: true,
    modifiedTime: '2026-03-14T13:49:41.426Z'
  },
  {
    slug: 'how-much-is-0-46-bitcoin-worth',
    title: "How Much Is 0.46 Bitcoin Worth? Complete Guide to Understanding Your Crypto Value",
    description: "Discover the exact value of 0.46 Bitcoin in USD today, learn how to calculate it, understand what you can buy with this amount, and explore investment strategies for fractional Bitcoin.",
    content: "",
    date: '2026-03-14',
    readTime: "12 min read",
    category: "Investment Guide",
    author: "Sarah Johnson",
    image: "/imagenes-articulos/bitcoin-imagenes/how-much-is-0-46-bitcoin-worth-featured.svg",
    tags: ["Bitcoin","Investment","Price Calculator","Crypto Value"],
    featured: false,
    published: true,
    modifiedTime: '2026-03-14T13:49:41.426Z'
  },
  {
    slug: 'how-to-buy-bitcoin-on-cash-app',
    title: "How to Buy Bitcoin on Cash App",
    description: "Complete step-by-step guide to buy Bitcoin on Cash App. Learn setup, verification, fees, security tips, and advanced investment strategies for beginners.",
    content: "",
    date: '2026-03-14',
    readTime: "10 min read",
    category: "Tutorial",
    author: "Sarah Johnson",
    image: "/imagenes-articulos/bitcoin-imagenes/how-to-buy-bitcoin-on-cash-app-featured.svg",
    tags: ["Bitcoin","Cash App","Tutorial","Investment","Crypto"],
    featured: false,
    published: true,
    modifiedTime: '2026-03-14T13:49:41.427Z'
  },

  {
    slug: 'bitcoin-halving-2024-price-surges-supply-shock-2028-predictions',
    title: "Bitcoin Halving 2024: Price Surges, Supply Shock & 2028 Predictions  ",
    description: "Bitcoin halving explained: Discover what it is, past events (2012-2024), price impacts, and the next halving in 2028. Understand supply shocks and why it drives BTC bull runs.",
    content: "",
    date: '2026-04-14',
    readTime: "10 min read",
    category: "News & Updates",
    author: "AI Generated",
    image: "/imagenes-articulos/bitcoin-imagenes/bitcoin-halving-featured.svg",
    tags: ["bitcoin halving"],
    featured: true,
    published: true,
    modifiedTime: '2026-04-14T04:26:44.164Z'
  },

  {
    slug: 'bitcoin-halving-2026-complete-guide',
    title: "Bitcoin Halving 2026: Complete Guide",
    description: "Description",
    content: "",
    date: '2026-04-14',
    readTime: "1 min read",
    category: "News & Updates",
    author: "AI Generated",
    image: "/imagenes-articulos/bitcoin-imagenes/bitcoin-halving-featured.svg",
    tags: ["bitcoin halving"],
    featured: true,
    published: true,
    modifiedTime: '2026-04-14T04:29:05.038Z'
  },

  {
    slug: 'bitcoin-halving-2026-complete-guide-to-the-next-supply-shock',
    title: "Bitcoin Halving 2026: Complete Guide to the Next Supply Shock",
    description: "Complete guide to Bitcoin halving: mechanics, history, price impacts, and predictions for 2028.",
    content: "",
    date: '2026-04-14',
    readTime: "2 min read",
    category: "News & Updates",
    author: "AI Generated",
    image: "/imagenes-articulos/bitcoin-imagenes/bitcoin-halving-featured.svg",
    tags: ["bitcoin halving"],
    featured: true,
    published: true,
    modifiedTime: '2026-04-14T04:31:41.396Z'
  },

  {
    slug: 'bitcoin-halving-2026-complete-guide-to-the-next-supply-shock',
    title: "Bitcoin Halving 2026: Complete Guide to the Next Supply Shock",
    description: "Complete guide to Bitcoin halving: mechanics, history, price impacts, and predictions for 2028.",
    content: "",
    date: '2026-04-14',
    readTime: "2 min read",
    category: "News & Updates",
    author: "AI Generated",
    image: "/imagenes-articulos/bitcoin-imagenes/bitcoin-halving-featured.svg",
    tags: ["bitcoin halving"],
    featured: true,
    published: true,
    modifiedTime: '2026-04-14T04:32:36.967Z'
  },
];

// Helper functions
export const getPublishedPosts = () => {
  return blogPosts
    .filter(post => post.published)
    .sort((a, b) => new Date(b.date).getTime() - new Date(a.date).getTime());
};

export const getFeaturedPosts = () => {
  return getPublishedPosts()
    .filter(post => post.featured)
    .slice(0, 6);
};

export const getLatestPosts = (limit: number = 15) => {
  return getPublishedPosts().slice(0, limit);
};

export const getPostsByCategory = (category: string) => {
  return getPublishedPosts()
    .filter(post => post.category.toLowerCase() === category.toLowerCase());
};

export const getRelatedPosts = (currentSlug: string, limit: number = 3) => {
  const currentPost = blogPosts.find(post => post.slug === currentSlug);
  if (!currentPost) return [];
  
  return getPublishedPosts()
    .filter(post => post.slug !== currentSlug)
    .filter(post => 
      post.category === currentPost.category || 
      post.tags.some(tag => currentPost.tags.includes(tag))
    )
    .slice(0, limit);
};

// Helper functions for internal linking
export const calculateLinkCount = (contentLength: number, totalArticles: number): number => {
  const wordsPerParagraph = 50; // promedio
  const paragraphs = Math.floor(contentLength / wordsPerParagraph);
  
  if (paragraphs < 5) return 1;           // Artículo corto: 1 enlace
  if (paragraphs < 10) return 2;          // Artículo medio: 2 enlaces  
  if (paragraphs < 20) return 3;          // Artículo largo: 3 enlaces
  if (paragraphs < 30) return 4;          // Artículo muy largo: 4 enlaces
  return Math.min(5, totalArticles - 1); // Artículo enorme: máx 5 enlaces
};

export const calculateRelevance = (currentPost: BlogPost, candidatePost: BlogPost): number => {
  let score = 0;
  
  // Puntos por keywords en común
  const currentKeywords = currentPost.keywords || [];
  const candidateKeywords = candidatePost.keywords || [];
  const commonKeywords = currentKeywords.filter(k => 
    candidateKeywords.includes(k)
  );
  score += commonKeywords.length * 3;
  
  // Puntos por tags en común
  const currentTags = currentPost.tags || [];
  const candidateTags = candidatePost.tags || [];
  const commonTags = currentTags.filter(t => 
    candidateTags.includes(t)
  );
  score += commonTags.length * 2;
  
  // Puntos por misma categoría
  if (currentPost.category === candidatePost.category) {
    score += 1;
  }
  
  return score;
};

export const getOptimalInternalLinks = (currentPost: BlogPost, allPosts: BlogPost[]): Array<{post: BlogPost, anchorText: string}> => {
  const contentLength = currentPost.content.length;
  const availablePosts = allPosts.filter(post => post.slug !== currentPost.slug && post.published);
  const neededLinks = calculateLinkCount(contentLength, availablePosts.length);
  
  // Sort by relevance
  const sortedPosts = availablePosts
    .map(post => ({
      post,
      relevance: calculateRelevance(currentPost, post)
    }))
    .sort((a, b) => b.relevance - a.relevance)
    .slice(0, neededLinks);
  
  // Generate varied anchor texts
  const anchorVariations: Record<string, string[]> = {
    'how-long-does-it-take-to-send-bitcoin': [
      'how long a Bitcoin transaction takes',
      'Bitcoin confirmation time',
      'speed up Bitcoin transactions'
    ],
    'how-does-a-bitcoin-transaction-work-wallet': [
      'how Bitcoin transactions work',
      'using a Bitcoin wallet',
      'send and receive Bitcoin'
    ],
    'how-bitcoin-mining-can-transform-the-energy-industry': [
      'Bitcoin mining and renewable energy',
      'sustainable Bitcoin mining',
      'Bitcoin\'s impact on the energy industry'
    ],
    'cash-app-introduces-new-bitcoin-stablecoin-payment-options': [
      'Bitcoin payments with Cash App',
      'Lightning Network on Cash App',
      'stablecoins on Cash App'
    ],
    'can-i-send-wrapped-bitcoin-to-bitcoin-wallet': [
      'convert WBTC to Bitcoin',
      'WBTC vs Bitcoin differences',
      'using wrapped Bitcoin'
    ],
    'how-to-buy-bitcoin-on-cash-app': [
      'buy Bitcoin with Cash App',
      'invest in Bitcoin from your phone',
      'Cash App Bitcoin guide'
    ],
    'how-much-is-0-46-bitcoin-worth': [
      'value of 0.46 Bitcoin',
      'calculate Bitcoin value',
      'fractional Bitcoin investing'
    ]
  };
  
  return sortedPosts.map((item, index) => {
    const variations = anchorVariations[item.post.slug] || [item.post.title];
    const anchorText = variations[index % variations.length];
    
    return {
      post: item.post,
      anchorText
    };
  });
};

export const distributeLinksInContent = (content: string, links: Array<{post: BlogPost, anchorText: string}>): string => {
  const paragraphs = content.split('\n\n');
  const totalParagraphs = paragraphs.length;
  const linkCount = links.length;
  
  if (linkCount === 0) return content;
  
  // Calcular posiciones estratégicas
  const positions: number[] = [];
  const interval = Math.floor(totalParagraphs / (linkCount + 1));
  
  for (let i = 1; i <= linkCount; i++) {
    positions.push(i * interval);
  }
  
  // Insertar enlaces en las posiciones calculadas
  const updatedParagraphs = [...paragraphs];
  
  positions.forEach((position, index) => {
    if (links[index] && updatedParagraphs[position]) {
      const link = links[index];
      const paragraph = updatedParagraphs[position];
      
      // Encontrar mejor lugar para insertar el enlace
      const sentences = paragraph.split('. ');
      if (sentences.length > 1) {
        // Insertar en la segunda mitad del párrafo
        const insertIndex = Math.floor(sentences.length / 2);
        const keywords = link.post.keywords || [];
        const keywordToReplace = keywords[0] || link.post.tags[0] || link.post.title.split(' ')[0];
        sentences[insertIndex] = sentences[insertIndex].replace(
          new RegExp(keywordToReplace, 'gi'),
          `<a href="/blog/${link.post.slug}">${link.anchorText}</a>`
        );
        updatedParagraphs[position] = sentences.join('. ');
      } else {
        // Si solo hay una oración, insertar al final
        updatedParagraphs[position] = `${paragraph} <a href="/blog/${link.post.slug}">${link.anchorText}</a>.`;
      }
    }
  });
  
  return updatedParagraphs.join('\n\n');
};

export const getPostBySlug = (slug: string) => {
  return blogPosts.find(post => post.slug === slug);
};

export type EditorialCategorySlug =
	| 'bitcoin'
	| 'technology'
	| 'digital-marketing'
	| 'programming'
	| 'economics'
	| 'finance';

export type EditorialTopicSlug = string;

export interface EditorialTopicConfig {
	slug: EditorialTopicSlug;
	label: string;
	keywords: string[];
}

export interface EditorialCategoryConfig {
	slug: EditorialCategorySlug;
	label: string;
	description: string;
	keywords: string[];
	topics: EditorialTopicConfig[];
}

	export const EDITORIAL_CATEGORIES: EditorialCategoryConfig[] = [
	{
		slug: 'bitcoin',
		label: 'Bitcoin',
		description: 'Bitcoin, wallets, mining, exchanges, trading, and the Lightning Network.',
		keywords: ['bitcoin', 'btc', 'wbtc', 'lightning', 'mining', 'wallet', 'transaction'],
		topics: [
			{ slug: 'exchanges', label: 'Exchanges', keywords: ['exchange', 'coinbase', 'kraken', 'binance', 'cash app'] },
			{ slug: 'mining', label: 'Mining', keywords: ['mining', 'miner', 'hash', 'hashrate', 'energy'] },
			{ slug: 'wallets', label: 'Wallets', keywords: ['wallet', 'hardware wallet', 'ledger', 'trezor', 'electrum', 'seed'] },
			{ slug: 'trading', label: 'Trading', keywords: ['trading', 'price', 'worth', 'value', 'investment'] },
			{ slug: 'lightning-network', label: 'Lightning Network', keywords: ['lightning', 'ln', 'payment', 'payments'] }
		]
	},
	{
		slug: 'technology',
		label: 'Technology',
		description: 'Technology applied to Bitcoin, blockchain, and digital products.',
		keywords: ['technology', 'tech', 'blockchain', 'protocol', 'network', 'security'],
		topics: [
			{ slug: 'blockchain', label: 'Blockchain', keywords: ['blockchain', 'protocol', 'network'] },
			{ slug: 'security', label: 'Security', keywords: ['security', 'privacy', 'secure'] },
			{ slug: 'productivity', label: 'Productivity', keywords: ['tool', 'tools', 'workflow'] },
			{ slug: 'ia', label: 'AI', keywords: ['ai', 'artificial intelligence', 'machine learning'] },
			{ slug: 'web', label: 'Web', keywords: ['web', 'browser', 'site', 'seo'] }
		]
	},
	{
		slug: 'digital-marketing',
		label: 'Digital Marketing',
		description: 'SEO, content, analytics, and growth for digital products.',
		keywords: ['seo', 'marketing', 'content', 'analytics', 'growth', 'search'],
		topics: [
			{ slug: 'seo', label: 'SEO', keywords: ['seo', 'search console', 'index', 'sitemap', 'robots'] },
			{ slug: 'contenido', label: 'Content', keywords: ['content', 'copy', 'editorial'] },
			{ slug: 'social', label: 'Social', keywords: ['twitter', 'social'] },
			{ slug: 'paid', label: 'Paid', keywords: ['ads', 'paid', 'cpc'] },
			{ slug: 'email', label: 'Email', keywords: ['email', 'newsletter'] }
		]
	},
	{
		slug: 'programming',
		label: 'Programming',
		description: 'Guides, tools, and best practices for software development.',
		keywords: ['programming', 'code', 'developer', 'javascript', 'typescript', 'astro'],
		topics: [
			{ slug: 'frontend', label: 'Frontend', keywords: ['frontend', 'ui', 'css', 'tailwind'] },
			{ slug: 'backend', label: 'Backend', keywords: ['backend', 'api', 'server'] },
			{ slug: 'devops', label: 'DevOps', keywords: ['devops', 'deploy', 'vercel', 'ci'] },
			{ slug: 'tools', label: 'Tools', keywords: ['tool', 'tools', 'cli'] },
			{ slug: 'tutorials', label: 'Tutorials', keywords: ['tutorial', 'guide', 'step-by-step'] }
		]
	},
	{
		slug: 'economics',
		label: 'Economics',
		description: 'Digital economics, macro trends, incentives, and adoption.',
		keywords: ['economics', 'macro', 'inflation', 'policy', 'adoption', 'market'],
		topics: [
			{ slug: 'macro', label: 'Macro', keywords: ['macro', 'inflation', 'rates'] },
			{ slug: 'adoption', label: 'Adoption', keywords: ['adoption', 'payments'] },
			{ slug: 'energy', label: 'Energy', keywords: ['energy', 'sustainability'] },
			{ slug: 'markets', label: 'Markets', keywords: ['market', 'price'] },
			{ slug: 'policy', label: 'Policy', keywords: ['policy', 'regulation'] }
		]
	},
	{
		slug: 'finance',
		label: 'Finance',
		description: 'Investing, trading, risk management, and financial tools.',
		keywords: ['finance', 'investment', 'trading', 'portfolio', 'risk'],
		topics: [
			{ slug: 'investing', label: 'Investing', keywords: ['investment', 'investing', 'portfolio'] },
			{ slug: 'trading', label: 'Trading', keywords: ['trading', 'price', 'worth', 'value'] },
			{ slug: 'risk', label: 'Risk', keywords: ['risk', 'volatility'] },
			{ slug: 'tools', label: 'Tools', keywords: ['calculator', 'tools'] },
			{ slug: 'payments', label: 'Payments', keywords: ['payments', 'cash app', 'stablecoin'] }
		]
	}
];

export const getEditorialCategoryConfig = (slug: string): EditorialCategoryConfig | undefined => {
	return EDITORIAL_CATEGORIES.find((c) => c.slug === slug);
};

const normalizeText = (post: BlogPost): string => {
	return [
		post.title,
		post.description,
		post.category,
		post.tags.join(' ')
	]
		.join(' ')
		.toLowerCase();
};

const matchesKeywords = (text: string, keywords: string[]): boolean => {
	return keywords.some((k) => text.includes(k.toLowerCase()));
};

export const getEditorialPosts = (categorySlug: EditorialCategorySlug, topicSlug?: EditorialTopicSlug): BlogPost[] => {
	const config = getEditorialCategoryConfig(categorySlug);
	if (!config) return [];

	const published = getPublishedPosts();
	const topic = topicSlug ? config.topics.find((t) => t.slug === topicSlug) : undefined;
	const keywords = topic ? topic.keywords : [...config.keywords, ...config.topics.flatMap((t) => t.keywords)];

	return published
		.filter((post) => matchesKeywords(normalizeText(post), keywords))
		.sort((a, b) => new Date(b.date).getTime() - new Date(a.date).getTime());
};
