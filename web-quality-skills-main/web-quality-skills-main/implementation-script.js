#!/usr/bin/env node

import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

// Web Quality Implementation Script for BitcoinForWifi
// Applies the most critical optimizations identified in the audit

class WebQualityImplementation {
  constructor() {
    this.projectRoot = path.resolve(__dirname, '../..'); // Go up two levels to reach bitcoinforwin-2astro
    this.srcDir = path.join(this.projectRoot, 'src');
    this.layoutsDir = path.join(this.srcDir, 'layouts');
    this.pagesDir = path.join(this.srcDir, 'pages');
    this.componentsDir = path.join(this.srcDir, 'components');
    
    this.implementations = [];
  }

  // 1. IMPLEMENT CRITICAL CSS IN LAYOUT
  implementCriticalCSS() {
    console.log('🎨 Implementing Critical CSS...');
    
    const layoutPath = path.join(this.layoutsDir, 'Layout.astro');
    
    if (fs.existsSync(layoutPath)) {
      let content = fs.readFileSync(layoutPath, 'utf-8');
      
      // Add critical CSS to head
      const criticalCSS = `
<!-- Critical CSS for above-fold content -->
<style>
:root {
  --bitcoin-orange: #f7931a;
  --bitcoin-dark: #333;
  --text-light: #666;
  --bg-light: #f8f9fa;
}

* {
  box-sizing: border-box;
}

body {
  font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, sans-serif;
  line-height: 1.6;
  color: var(--bitcoin-dark);
  margin: 0;
  padding: 0;
  background: #fff;
}

.container {
  max-width: 1200px;
  margin: 0 auto;
  padding: 0 20px;
}

.header {
  background: linear-gradient(135deg, var(--bitcoin-orange) 0%, #ffad33 100%);
  color: white;
  padding: 1rem 0;
}

.nav {
  display: flex;
  justify-content: space-between;
  align-items: center;
  flex-wrap: wrap;
}

.logo {
  font-size: 1.5rem;
  font-weight: bold;
  text-decoration: none;
  color: white;
}

.nav-links {
  display: flex;
  gap: 2rem;
  list-style: none;
  margin: 0;
  padding: 0;
}

.nav-link {
  color: white;
  text-decoration: none;
  font-weight: 500;
  transition: opacity 0.3s;
}

.nav-link:hover,
.nav-link:focus-visible {
  opacity: 0.8;
  text-decoration: underline;
}

/* Accessibility: Focus indicators */
.nav-link:focus-visible,
.cta-button:focus-visible {
  outline: 2px solid white;
  outline-offset: 2px;
}

.hero {
  text-align: center;
  padding: 4rem 0;
}

.hero h1 {
  font-size: 3rem;
  margin-bottom: 1rem;
  font-weight: bold;
  line-height: 1.2;
}

.hero p {
  font-size: 1.25rem;
  opacity: 0.9;
  margin-bottom: 2rem;
}

.cta-button {
  display: inline-block;
  background: white;
  color: var(--bitcoin-orange);
  padding: 1rem 2rem;
  border-radius: 50px;
  text-decoration: none;
  font-weight: bold;
  transition: transform 0.3s, box-shadow 0.3s;
  border: 2px solid transparent;
}

.cta-button:hover,
.cta-button:focus-visible {
  transform: translateY(-2px);
  box-shadow: 0 10px 20px rgba(0,0,0,0.1);
}

/* Skip link for accessibility */
.skip-link {
  position: absolute;
  top: -40px;
  left: 0;
  background: var(--bitcoin-orange);
  color: white;
  padding: 8px 16px;
  text-decoration: none;
  z-index: 100;
  border-radius: 0 0 4px 4px;
}

.skip-link:focus {
  top: 0;
}

@media (max-width: 768px) {
  .hero h1 {
    font-size: 2rem;
  }
  
  .nav-links {
    display: none;
  }
  
  .container {
    padding: 0 15px;
  }
}
</style>
`;
      
      // Insert critical CSS after <head> tag
      content = content.replace('<head>', '<head>\n' + criticalCSS);
      
      fs.writeFileSync(layoutPath, content);
      this.implementations.push({
        type: 'critical-css',
        file: 'Layout.astro',
        status: 'implemented'
      });
      
      console.log('✅ Critical CSS implemented in Layout.astro');
    }
  }

  // 2. IMPLEMENT RESOURCE HINTS
  implementResourceHints() {
    console.log('🔗 Implementing Resource Hints...');
    
    const layoutPath = path.join(this.layoutsDir, 'Layout.astro');
    
    if (fs.existsSync(layoutPath)) {
      let content = fs.readFileSync(layoutPath, 'utf-8');
      
      const resourceHints = `
<!-- Resource hints for performance -->
<link rel="dns-prefetch" href="//fonts.googleapis.com">
<link rel="dns-prefetch" href="//www.googletagmanager.com">
<link rel="preconnect" href="https://fonts.googleapis.com" crossorigin>
<link rel="preconnect" href="https://fonts.gstatic.com" crossorigin>
<link rel="preconnect" href="https://cdn.ampproject.org" crossorigin>
`;
      
      // Insert resource hints after critical CSS
      content = content.replace('<!-- Critical CSS for above-fold content -->', 
        '<!-- Critical CSS for above-fold content -->\n' + resourceHints);
      
      fs.writeFileSync(layoutPath, content);
      this.implementations.push({
        type: 'resource-hints',
        file: 'Layout.astro',
        status: 'implemented'
      });
      
      console.log('✅ Resource hints implemented in Layout.astro');
    }
  }

  // 3. IMPLEMENT ACCESSIBILITY IMPROVEMENTS
  implementAccessibility() {
    console.log('♿ Implementing Accessibility Improvements...');
    
    // Add skip link to layout
    const layoutPath = path.join(this.layoutsDir, 'Layout.astro');
    if (fs.existsSync(layoutPath)) {
      let content = fs.readFileSync(layoutPath, 'utf-8');
      
      // Add skip link after <body>
      const skipLink = `
<a href="#main-content" class="skip-link">Skip to main content</a>
`;
      
      content = content.replace('<body>', '<body>\n' + skipLink);
      
      // Add main content landmark
      content = content.replace(/<main>/g, '<main id="main-content">');
      
      fs.writeFileSync(layoutPath, content);
      this.implementations.push({
        type: 'skip-link',
        file: 'Layout.astro',
        status: 'implemented'
      });
    }
    
    // Improve navigation accessibility
    const indexPath = path.join(this.pagesDir, 'index.astro');
    if (fs.existsSync(indexPath)) {
      let content = fs.readFileSync(indexPath, 'utf-8');
      
      // Add proper ARIA labels
      content = content.replace('<nav>', '<nav aria-label="Main navigation">');
      content = content.replace('<header>', '<header role="banner">');
      content = content.replace('<main>', '<main role="main" id="main-content">');
      content = content.replace('<footer>', '<footer role="contentinfo">');
      
      fs.writeFileSync(indexPath, content);
      this.implementations.push({
        type: 'aria-labels',
        file: 'index.astro',
        status: 'implemented'
      });
    }
    
    console.log('✅ Accessibility improvements implemented');
  }

  // 4. CREATE OPTIMIZED IMAGE COMPONENT
  createOptimizedImageComponent() {
    console.log('🖼️ Creating Optimized Image Component...');
    
    // Ensure components directory exists
    if (!fs.existsSync(this.componentsDir)) {
      fs.mkdirSync(this.componentsDir, { recursive: true });
    }
    
    const imageComponent = `---
export interface Props {
  src: string;
  alt: string;
  width?: number;
  height?: number;
  loading?: 'lazy' | 'eager';
  fetchpriority?: 'high' | 'low' | 'auto';
  class?: string;
}

const {
  src,
  alt,
  width = 800,
  height = 600,
  loading = 'lazy',
  fetchpriority = 'auto',
  class: className = ''
} = Astro.props;

// Generate WebP and AVIF versions
const webpSrc = src.replace(/\\.(jpg|jpeg|png)$/i, '.webp');
const avifSrc = src.replace(/\\.(jpg|jpeg|png)$/i, '.avif');
const isAboveFold = loading === 'eager';
---

<picture class={className}>
  <source type="image/avif" srcset={avifSrc} />
  <source type="image/webp" srcset={webpSrc} />
  <img 
    src={src} 
    alt={alt}
    width={width}
    height={height}
    loading={loading}
    fetchpriority={fetchpriority}
    decoding={isAboveFold ? 'sync' : 'async'}
    style="aspect-ratio: \${width}/\${height};"
  />
</picture>`;
    
    const imagePath = path.join(this.componentsDir, 'OptimizedImage.astro');
    fs.writeFileSync(imagePath, imageComponent);
    
    this.implementations.push({
      type: 'image-optimization',
      file: 'OptimizedImage.astro',
      status: 'created'
    });
    
    console.log('✅ Optimized image component created');
  }

  // 5. IMPLEMENT PERFORMANCE MONITORING
  implementPerformanceMonitoring() {
    console.log('📊 Implementing Performance Monitoring...');
    
    const monitoringScript = `
<!-- Web Vitals Monitoring -->
<script is:inline>
// Core Web Vitals monitoring
function sendToAnalytics(metric) {
  console.log('Web Vital:', metric.name, metric.value, metric.rating);
  
  // Send to your analytics service
  if (typeof gtag !== 'undefined') {
    gtag('event', metric.name, {
      value: Math.round(metric.value),
      metric_id: metric.id,
      metric_value: metric.value,
      metric_rating: metric.rating
    });
  }
}

// Load web-vitals library
(function() {
  const script = document.createElement('script');
  script.src = 'https://unpkg.com/web-vitals@3/dist/web-vitals.iife.js';
  script.onload = function() {
    // Core Web Vitals monitoring
    webVitals.onLCP(sendToAnalytics);
    webVitals.onINP(sendToAnalytics);
    webVitals.onCLS(sendToAnalytics);
  };
  document.head.appendChild(script;
})();

// Performance observer for LCP element identification
if ('PerformanceObserver' in window) {
  new PerformanceObserver((list) => {
    const entries = list.getEntries();
    const lastEntry = entries[entries.length - 1];
    console.log('LCP element:', lastEntry.element);
  }).observe({ type: 'largest-contentful-paint', buffered: true });
}
</script>`;
    
    const layoutPath = path.join(this.layoutsDir, 'Layout.astro');
    if (fs.existsSync(layoutPath)) {
      let content = fs.readFileSync(layoutPath, 'utf-8');
      
      // Add monitoring script before </head>
      content = content.replace('</head>', monitoringScript + '\n</head>');
      
      fs.writeFileSync(layoutPath, content);
      this.implementations.push({
        type: 'performance-monitoring',
        file: 'Layout.astro',
        status: 'implemented'
      });
    }
    
    console.log('✅ Performance monitoring implemented');
  }

  // 6. CREATE OPTIMIZATION GUIDE
  createOptimizationGuide() {
    console.log('📚 Creating Optimization Guide...');
    
    const guide = `# BitcoinForWifi Web Quality Implementation Guide

## 🎯 What Was Implemented

### Performance Optimizations
- ✅ Critical CSS inlined for above-fold content
- ✅ Resource hints (preconnect, dns-prefetch)
- ✅ Optimized image component with WebP/AVIF support
- ✅ Performance monitoring with Web Vitals

### Accessibility Improvements
- ✅ Skip links for keyboard navigation
- ✅ ARIA labels and landmarks
- ✅ Focus indicators for keyboard navigation
- ✅ Semantic HTML5 structure

## 🚀 How to Use the New Components

### OptimizedImage Component
\`\`\`astro
---
import OptimizedImage from '../components/OptimizedImage.astro';
---

<OptimizedImage 
  src="/images/bitcoin-hero.jpg" 
  alt="Bitcoin network visualization"
  width={1200}
  height={600}
  loading="eager"
  fetchpriority="high"
/>
\`\`\`

### Performance Monitoring
The monitoring script automatically tracks:
- Largest Contentful Paint (LCP)
- Interaction to Next Paint (INP)
- Cumulative Layout Shift (CLS)
- LCP element identification

## 📊 Expected Results

Based on the implementations:

- **Performance**: 78 → 90+ (target)
- **Accessibility**: 85 → 100 (target)
- **SEO**: 69 → 95+ (target)
- **Best Practices**: 80 → 95+ (target)

### Core Web Vitals Targets
- **LCP**: ≤ 2.5s
- **INP**: ≤ 200ms
- **CLS**: ≤ 0.1

## 🔧 Testing Checklist

### Performance Testing
- [ ] Run Lighthouse audit (target: 90+ performance)
- [ ] Test Core Web Vitals in Chrome DevTools
- [ ] Check load time on 3G connection
- [ ] Verify image optimization

### Accessibility Testing
- [ ] Test keyboard navigation (Tab, Enter, Space, Escape)
- [ ] Test with screen reader (NVDA, VoiceOver)
- [ ] Check color contrast ratios
- [ ] Verify focus indicators
- [ ] Test zoom to 200%

## 🛠️ Next Steps

### Immediate (This Week)
1. Test the implemented changes
2. Run Lighthouse audit
3. Monitor Core Web Vitals
4. Fix any issues found

### Short Term (2-4 Weeks)
1. Convert images to WebP/AVIF formats
2. Implement service worker for caching
3. Add more structured data
4. Optimize fonts with variable fonts

### Long Term (1-3 Months)
1. Advanced performance monitoring
2. Enhanced accessibility features
3. International SEO preparation
4. Real-user monitoring setup

---

*Generated on ${new Date().toISOString()}*
*Implementation based on Google Web Quality guidelines*`;
    
    const guidePath = path.join(this.projectRoot, 'OPTIMIZATION_GUIDE.md');
    fs.writeFileSync(guidePath, guide);
    
    this.implementations.push({
      type: 'optimization-guide',
      file: 'OPTIMIZATION_GUIDE.md',
      status: 'created'
    });
    
    console.log('✅ Optimization guide created');
  }

  // RUN ALL IMPLEMENTATIONS
  async run() {
    console.log('🚀 Starting Web Quality Implementation for BitcoinForWifi...\n');
    
    try {
      this.implementCriticalCSS();
      this.implementResourceHints();
      this.implementAccessibility();
      this.createOptimizedImageComponent();
      this.implementPerformanceMonitoring();
      this.createOptimizationGuide();
      
      console.log('\n🎉 Implementation Complete!');
      console.log('================================');
      
      this.displaySummary();
      
      console.log('\n📋 Next Steps:');
      console.log('1. Test the implemented changes');
      console.log('2. Run Lighthouse audit');
      console.log('3. Monitor Core Web Vitals');
      console.log('4. Review OPTIMIZATION_GUIDE.md');
      
      return this.implementations;
      
    } catch (error) {
      console.error('❌ Implementation failed:', error);
      throw error;
    }
  }

  displaySummary() {
    console.log(`\n📊 Implementation Summary:`);
    console.log(`Total changes implemented: ${this.implementations.length}`);
    
    console.log('\n📁 Files modified/created:');
    this.implementations.forEach(impl => {
      const icon = impl.status === 'implemented' ? '✅' : '📝';
      console.log(`${icon} ${impl.file} - ${impl.type}`);
    });
    
    console.log('\n🎯 Expected improvements:');
    console.log('• Performance: 78 → 90+ Lighthouse score');
    console.log('• Accessibility: 85 → 100 Lighthouse score');
    console.log('• SEO: 69 → 95+ Lighthouse score');
    console.log('• Best Practices: 80 → 95+ Lighthouse score');
    
    console.log('\n⚡ Core Web Vitals:');
    console.log('• LCP: Target ≤ 2.5s');
    console.log('• INP: Target ≤ 200ms');
    console.log('• CLS: Target ≤ 0.1');
  }
}

// Run the implementation
const implementation = new WebQualityImplementation();
implementation.run().catch(console.error);
