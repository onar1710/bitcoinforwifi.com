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
  featured: boolean;
  published: boolean;
  modifiedTime?: string;
}

export const blogPosts: BlogPost[] = [
  {
    slug: 'how-long-does-it-take-to-send-bitcoin',
    title: 'How Long Does It Take to Send Bitcoin? Complete 2026 Guide',
    description: 'Let me explain exactly how long Bitcoin transactions take and why they vary. I\'ll show you step by step how to speed up your transfers and avoid common delays, even if you\'re completely new to crypto.',
    content: 'Complete guide on Bitcoin transaction times, including confirmation process, factors affecting speed, how to track transactions, and tips for faster Bitcoin transfers.',
    date: getCurrentDate(),
    readTime: '8 min read',
    category: 'Tutorial',
    author: 'BitcoinForWifi Expert',
    image: '/blog/bitcoin-transaction-time-guide.jpg',
    tags: ['Bitcoin Transaction Time', 'Send Bitcoin', 'Bitcoin Confirmation', 'Bitcoin Speed', 'Crypto Transaction', 'Bitcoin Guide'],
    featured: true,
    published: true,
    modifiedTime: getCurrentDateTime()
  },
  {
    slug: 'how-does-a-bitcoin-transaction-work-wallet',
    title: 'How Does a Bitcoin Transaction Work Wallet: Complete Step-by-Step Guide',
    description: 'Let me walk you through exactly how Bitcoin transactions work with your wallet. I\'ll explain everything step by step so you can send and receive Bitcoin with confidence, even if you\'re completely new to crypto.',
    content: 'Complete step-by-step guide on how Bitcoin transactions work with wallets, including sending, receiving, security tips, and troubleshooting common issues for beginners.',
    date: getCurrentDate(),
    readTime: '10 min read',
    category: 'Tutorial',
    author: 'BitcoinForWifi Expert',
    image: '/blog/bitcoin-transaction-wallet-guide.jpg',
    tags: ['Bitcoin Transaction', 'Bitcoin Wallet', 'Crypto Tutorial', 'Sending Bitcoin', 'Receiving Bitcoin', 'Bitcoin Guide'],
    featured: true,
    published: true,
    modifiedTime: getCurrentDateTime()
  },
  {
    slug: 'how-bitcoin-mining-can-transform-the-energy-industry',
    title: 'How Bitcoin Mining Can Transform the Energy Industry',
    description: 'Let me show you step by step how Bitcoin mining is revolutionizing our energy systems. I\'ll explain exactly how miners are solving renewable energy problems and creating a sustainable future.',
    content: 'Complete guide on how Bitcoin mining is transforming the energy industry with renewable energy integration, grid balancing, and waste heat recovery applications.',
    date: getCurrentDate(),
    readTime: '12 min read',
    category: 'Energy & Sustainability',
    author: 'BitcoinForWifi Expert',
    image: '/blog/bitcoin-mining-energy-transformation.jpg',
    tags: ['Bitcoin Mining Energy Sector', 'Renewable Energy Bitcoin Mining', 'Bitcoin Mining Grid Balancing', 'Bitcoin Mining Waste Heat Recovery', 'Bitcoin Mining Energy Transition', 'Sustainable Bitcoin Mining'],
    featured: true,
    published: true,
    modifiedTime: getCurrentDateTime()
  },
  {
    slug: 'cash-app-introduces-new-bitcoin-stablecoin-payment-options',
    title: 'Cash App Introduces New Bitcoin and Stablecoin Payment Options',
    description: 'Complete guide to Cash App\'s new Bitcoin Lightning Network and stablecoin payment features. Learn how to use instant crypto payments without holding cryptocurrency.',
    content: 'Complete tutorial on Cash App\'s new Bitcoin Lightning Network and stablecoin payment features with step-by-step guides, security tips, and practical use cases.',
    date: getCurrentDate(),
    readTime: '18 min read',
    category: 'News & Updates',
    author: 'Michael Anderson',
    image: '/blog/cash-app-bitcoin-stablecoin-payments.jpg',
    tags: ['Cash App', 'Bitcoin', 'Lightning Network', 'Stablecoins', 'Payments', 'Crypto News'],
    featured: true,
    published: true,
    modifiedTime: getCurrentDateTime()
  },
  {
    slug: 'can-i-send-wrapped-bitcoin-to-bitcoin-wallet',
    title: 'Can I Send Wrapped Bitcoin to a Bitcoin Wallet',
    description: 'Complete guide on how to convert and send wrapped Bitcoin (WBTC) to a regular Bitcoin wallet. Learn the differences, risks, and step-by-step methods for unwrapping Bitcoin safely.',
    content: 'Complete tutorial on converting wrapped Bitcoin (WBTC) to Bitcoin (BTC) with detailed step-by-step methods, security considerations, and risk management for crypto investors.',
    date: getCurrentDate(),
    readTime: '15 min read',
    category: 'Tutorial',
    author: 'David Thompson',
    image: '/blog/wrapped-bitcoin-guide.jpg',
    tags: ['Wrapped Bitcoin', 'WBTC', 'Bitcoin', 'Tutorial', 'Crypto Wallet'],
    featured: true,
    published: true,
    modifiedTime: getCurrentDateTime()
  },
  {
    slug: 'how-to-buy-bitcoin-on-cash-app',
    title: 'How to Buy Bitcoin on Cash App',
    description: 'Complete step-by-step guide to buy Bitcoin on Cash App. Learn setup, verification, fees, security tips, and advanced investment strategies for beginners.',
    content: 'Complete tutorial on buying Bitcoin through Cash App with detailed steps, security tips, and investment strategies.',
    date: getCurrentDate(),
    readTime: '10 min read',
    category: 'Tutorial',
    author: 'Sarah Johnson',
    image: '/blog/cash-app-bitcoin-guide.jpg',
    tags: ['Bitcoin', 'Cash App', 'Tutorial', 'Investment', 'Crypto'],
    featured: true,
    published: true,
    modifiedTime: getCurrentDateTime()
  },
  {
    slug: 'how-much-is-0-46-bitcoin-worth',
    title: 'How Much Is 0.46 Bitcoin Worth? Complete Guide to Understanding Your Crypto Value',
    description: 'Discover the exact value of 0.46 Bitcoin in USD today, learn how to calculate it, understand what you can buy with this amount, and explore investment strategies for fractional Bitcoin.',
    content: 'Detailed analysis of 0.46 Bitcoin value, calculation methods, purchasing power, and investment strategies for fractional Bitcoin holdings.',
    date: getCurrentDate(),
    readTime: '12 min read',
    category: 'Investment Guide',
    author: 'Sarah Johnson',
    image: '/blog/bitcoin-value-calculator.jpg',
    tags: ['Bitcoin', 'Investment', 'Price Calculator', 'Crypto Value'],
    featured: true,
    published: true,
    modifiedTime: getCurrentDateTime()
  }
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

export const getPostBySlug = (slug: string) => {
  return blogPosts.find(post => post.slug === slug);
};
