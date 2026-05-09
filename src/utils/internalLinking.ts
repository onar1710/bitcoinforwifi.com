import type { BlogPost } from '../data/blog-posts.js';
import { getOptimalInternalLinks, distributeLinksInContent, getPublishedPosts } from '../data/blog-posts.js';
import { getPostUrl } from './editorialRouting';

export interface ProcessedContent {
  content: string;
  internalLinks: Array<{
    url: string;
    anchorText: string;
    title: string;
  }>;
}

export const processInternalLinks = (currentPost: BlogPost): ProcessedContent => {
  const allPosts = getPublishedPosts();
  const optimalLinks = getOptimalInternalLinks(currentPost, allPosts);
  const processedContent = distributeLinksInContent(currentPost.content, optimalLinks);
  
  const internalLinks = optimalLinks.map(link => ({
    url: getPostUrl(link.post),
    anchorText: link.anchorText,
    title: link.post.title
  }));
  
  return {
    content: processedContent,
    internalLinks
  };
};

export const generateRelatedArticlesSection = (currentPost: BlogPost, limit: number = 3): BlogPost[] => {
  const allPosts = getPublishedPosts();
  const processed = getOptimalInternalLinks(currentPost, allPosts);
  
  return processed
    .slice(0, limit)
    .map(item => item.post);
};

export const validateInternalLinks = (content: string): boolean => {
  // Validate that there are no duplicate links
  const linkRegex = /<a href="\/(?:blog\/)?([^"]+)">([^<]+)<\/a>/g;
  const links = new Map<string, string[]>();
  let match;
  
  while ((match = linkRegex.exec(content)) !== null) {
    const url = match[1];
    const anchorText = match[2];
    
    if (!links.has(url)) {
      links.set(url, []);
    }
    links.get(url)!.push(anchorText);
  }
  
  // Verify there are no duplicate URLs
  for (const [url, anchors] of links) {
    if (anchors.length > 1) {
      console.warn(`Duplicate URL found: ${url} with ${anchors.length} anchors`);
      return false;
    }
    
    // Verify there are no duplicate anchor texts
    const uniqueAnchors = new Set(anchors);
    if (uniqueAnchors.size !== anchors.length) {
      console.warn(`Duplicate anchor texts for URL: ${url}`);
      return false;
    }
  }
  
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
      'Bitcoin’s impact on the energy industry'
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

  for (const [url, variations] of Object.entries(anchorVariations)) {
    if (typeof url !== 'string') return false;
    if (!Array.isArray(variations)) return false;
  }
  
  return true;
};

export const getContentStatistics = (content: string): {
  wordCount: number;
  paragraphCount: number;
  linkCount: number;
  linkDensity: number;
} => {
  const wordCount = content.split(/\s+/).length;
  const paragraphCount = content.split('\n\n').length;
  const linkCount = (content.match(/<a href=/g) || []).length;
  const linkDensity = wordCount > 0 ? (linkCount / wordCount) * 100 : 0;
  
  return {
    wordCount,
    paragraphCount,
    linkCount,
    linkDensity
  };
};
