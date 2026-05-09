#!/usr/bin/env node

import { updateBlogPostsData } from './src/utils/blogUtils.js';

console.log('🔄 Syncing blog posts...');
const updated = await updateBlogPostsData();

if (updated) {
  console.log('✅ Blog posts data updated successfully!');
} else {
  console.log('ℹ️ No updates needed');
}

console.log('🚀 Sync complete!');
