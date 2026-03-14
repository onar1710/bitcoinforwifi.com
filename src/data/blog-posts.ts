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
    image: "/blog/wrapped-bitcoin-guide.jpg",
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
    image: "/blog/cash-app-bitcoin-stablecoin-payments.jpg",
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
    image: "/blog/bitcoin-mining-energy-transformation.jpg",
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
    image: "/blog/bitcoin-transaction-wallet-guide.jpg",
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
    image: "/blog/bitcoin-transaction-time-guide.jpg",
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
    image: "/blog/bitcoin-value-calculator.jpg",
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
    image: "/blog/cash-app-bitcoin-guide.jpg",
    tags: ["Bitcoin","Cash App","Tutorial","Investment","Crypto"],
    featured: false,
    published: true,
    modifiedTime: '2026-03-14T13:49:41.427Z'
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
  
  // Ordenar por relevancia
  const sortedPosts = availablePosts
    .map(post => ({
      post,
      relevance: calculateRelevance(currentPost, post)
    }))
    .sort((a, b) => b.relevance - a.relevance)
    .slice(0, neededLinks);
  
  // Generar anchor texts variados
  const anchorVariations: Record<string, string[]> = {
    'how-long-does-it-take-to-send-bitcoin': [
      'cuánto tarda una transacción Bitcoin',
      'tiempo de confirmación Bitcoin',
      'acelerar transacciones Bitcoin'
    ],
    'how-does-a-bitcoin-transaction-work-wallet': [
      'cómo funcionan las transacciones Bitcoin',
      'usar wallet Bitcoin',
      'enviar y recibir Bitcoin'
    ],
    'how-bitcoin-mining-can-transform-the-energy-industry': [
      'minería Bitcoin y energía renovable',
      'sostenibilidad en minería Bitcoin',
      'impacto energético de Bitcoin'
    ],
    'cash-app-introduces-new-bitcoin-stablecoin-payment-options': [
      'pagos Bitcoin con Cash App',
      'Lightning Network en Cash App',
      'stablecoins en Cash App'
    ],
    'can-i-send-wrapped-bitcoin-to-bitcoin-wallet': [
      'convertir WBTC a Bitcoin',
      'diferencia WBTC y Bitcoin',
      'usar wrapped Bitcoin'
    ],
    'how-to-buy-bitcoin-on-cash-app': [
      'comprar Bitcoin con Cash App',
      'invertir en Bitcoin desde móvil',
      'guía Cash App Bitcoin'
    ],
    'how-much-is-0-46-bitcoin-worth': [
      'valor de 0.46 Bitcoin',
      'calcular valor Bitcoin',
      'inversión en Bitcoin fraccionario'
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
