import type { BlogPost } from '../data/blog-posts.js';
import { getOptimalInternalLinks, distributeLinksInContent, getPublishedPosts } from '../data/blog-posts.js';

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
    url: `/blog/${link.post.slug}`,
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
  // Validar que no haya enlaces duplicados
  const linkRegex = /<a href="\/blog\/([^"]+)">([^<]+)<\/a>/g;
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
  
  // Verificar que no haya URLs duplicadas
  for (const [url, anchors] of links) {
    if (anchors.length > 1) {
      console.warn(`URL duplicada encontrada: ${url} con ${anchors.length} anclajes`);
      return false;
    }
    
    // Verificar que no haya anchor texts duplicados
    const uniqueAnchors = new Set(anchors);
    if (uniqueAnchors.size !== anchors.length) {
      console.warn(`Anchor texts duplicados para URL: ${url}`);
      return false;
    }
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
