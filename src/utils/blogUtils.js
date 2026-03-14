import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';
import { getCurrentDate, getCurrentDateTime } from './dateUtils.js';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

// Function to scan for blog posts and return their metadata
export async function scanBlogPosts() {
  const blogDir = path.join(__dirname, '../pages/blog');
  const posts = [];
  
  try {
    const files = fs.readdirSync(blogDir);
    
    for (const file of files) {
      if (file.endsWith('.astro') && file !== '[slug].astro') {
        const filePath = path.join(blogDir, file);
        const content = fs.readFileSync(filePath, 'utf-8');
        
        // Extract metadata from the Astro file
        const slug = file.replace('.astro', '');
        
        // Try to extract the frontmatter data
        const frontmatterMatch = content.match(/export async function getStaticPaths\(\)[\s\S]*?const posts = \[([\s\S]*?)\];/);
        
        if (frontmatterMatch) {
          try {
            // Extract the post object from the array
            const postArrayStr = `[${frontmatterMatch[1]}]`;
            const postData = eval(postArrayStr);
            
            if (postData && postData[0]) {
              const post = postData[0];
              posts.push({
                slug: post.slug || slug,
                title: post.title || 'Untitled Post',
                description: post.description || '',
                content: post.content || '',
                date: post.date || new Date().toISOString().split('T')[0],
                readTime: post.readTime || '5 min read',
                category: post.category || 'Blog',
                author: post.author || 'BitcoinForWifi Expert',
                image: post.image || '/blog/default.jpg',
                tags: post.tags || [],
                featured: post.featured || false,
                published: post.published !== false, // Default to true
                modifiedTime: post.modifiedTime || new Date().toISOString()
              });
            }
          } catch (error) {
            console.warn(`Could not parse metadata for ${file}:`, error.message);
          }
        }
      }
    }
    
    // Sort by date (newest first)
    posts.sort((a, b) => new Date(b.date).getTime() - new Date(a.date).getTime());
    
    return posts;
  } catch (error) {
    console.error('Error scanning blog posts:', error);
    return [];
  }
}

// Function to check if blog-posts.ts needs updating
export async function updateBlogPostsData() {
  const scannedPosts = await scanBlogPosts();
  const dataFilePath = path.join(__dirname, '../data/blog-posts.ts');
  
  try {
    // Read current data
    const currentContent = fs.readFileSync(dataFilePath, 'utf-8');
    
    // Extract current posts
    const postsMatch = currentContent.match(/export const blogPosts: BlogPost\[\] = \[([\s\S]*?)\];/);
    if (!postsMatch) {
      console.warn('Could not find blogPosts array in data file');
      return false;
    }
    
    // Check if we need to update (compare slugs)
    const currentPostsStr = postsMatch[1];
    const currentSlugs = currentPostsStr.match(/slug: '([^']+)'/g) || [];
    const currentSlugSet = new Set(currentSlugs.map(s => s.replace(/slug: '/, '').replace(/'/, '')));
    
    const scannedSlugs = scannedPosts.map(p => p.slug);
    const newSlugs = scannedSlugs.filter(slug => !currentSlugSet.has(slug));
    
    if (newSlugs.length > 0) {
      console.log(`Found ${newSlugs.length} new posts:`, newSlugs);
      
      // Generate new blog posts array
      const newPostsArray = scannedPosts.map(post => {
        return `  {
    slug: '${post.slug}',
    title: ${JSON.stringify(post.title)},
    description: ${JSON.stringify(post.description)},
    content: ${JSON.stringify(post.content)},
    date: '${post.date}',
    readTime: ${JSON.stringify(post.readTime)},
    category: ${JSON.stringify(post.category)},
    author: ${JSON.stringify(post.author)},
    image: ${JSON.stringify(post.image)},
    tags: ${JSON.stringify(post.tags)},
    featured: ${post.featured},
    published: ${post.published},
    modifiedTime: '${post.modifiedTime}'
  }`;
      }).join(',\n');
      
      // Update the file content
      const newContent = currentContent.replace(
        /export const blogPosts: BlogPost\[\] = \[[\s\S]*?\];/,
        `export const blogPosts: BlogPost[] = [\n${newPostsArray}\n];`
      );
      
      fs.writeFileSync(dataFilePath, newContent);
      console.log('Updated blog-posts.ts with new posts');
      return true;
    } else {
      console.log('No new posts found');
      return false;
    }
  } catch (error) {
    console.error('Error updating blog posts data:', error);
    return false;
  }
}
