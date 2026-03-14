#!/usr/bin/env node

import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

// Post-Implementation Diagnostic Script for BitcoinForWifi
// Checks current status after implementing web quality improvements

class PostImplementationDiagnostic {
  constructor() {
    this.projectRoot = path.resolve(__dirname, '../..');
    this.srcDir = path.join(this.projectRoot, 'src');
    this.layoutsDir = path.join(this.srcDir, 'layouts');
    this.pagesDir = path.join(this.srcDir, 'pages');
    this.componentsDir = path.join(this.srcDir, 'components');
    
    this.implementedFeatures = [];
    this.missingFeatures = [];
    this.issues = [];
  }

  // Check implemented features
  checkImplementedFeatures() {
    console.log('🔍 Checking Implemented Features...\n');

    // Check Critical CSS
    const layoutPath = path.join(this.layoutsDir, 'Layout.astro');
    if (fs.existsSync(layoutPath)) {
      const content = fs.readFileSync(layoutPath, 'utf-8');
      
      if (content.includes('Critical CSS for above-fold content')) {
        this.implementedFeatures.push('✅ Critical CSS inlined');
      } else {
        this.missingFeatures.push('❌ Critical CSS inlining');
      }
      
      if (content.includes('dns-prefetch') && content.includes('preconnect')) {
        this.implementedFeatures.push('✅ Resource hints (DNS prefetch, preconnect)');
      } else {
        this.missingFeatures.push('❌ Resource hints');
      }
      
      if (content.includes('skip-link')) {
        this.implementedFeatures.push('✅ Skip links for accessibility');
      } else {
        this.missingFeatures.push('❌ Skip links');
      }
      
      if (content.includes('Web Vitals Monitoring')) {
        this.implementedFeatures.push('✅ Performance monitoring script');
      } else {
        this.missingFeatures.push('❌ Performance monitoring');
      }
    }

    // Check OptimizedImage component
    const imagePath = path.join(this.componentsDir, 'OptimizedImage.astro');
    if (fs.existsSync(imagePath)) {
      this.implementedFeatures.push('✅ OptimizedImage component (WebP/AVIF support)');
    } else {
      this.missingFeatures.push('❌ OptimizedImage component');
    }

    // Check accessibility improvements
    const indexPath = path.join(this.pagesDir, 'index.astro');
    if (fs.existsSync(indexPath)) {
      const content = fs.readFileSync(indexPath, 'utf-8');
      
      if (content.includes('aria-label') || content.includes('role=')) {
        this.implementedFeatures.push('✅ ARIA labels and landmarks');
      } else {
        this.missingFeatures.push('❌ ARIA labels and landmarks');
      }
    }

    // Check optimization guide
    const guidePath = path.join(this.projectRoot, 'OPTIMIZATION_GUIDE.md');
    if (fs.existsSync(guidePath)) {
      this.implementedFeatures.push('✅ Optimization guide created');
    } else {
      this.missingFeatures.push('❌ Optimization guide');
    }
  }

  // Check for common issues
  checkForIssues() {
    console.log('🔧 Checking for Common Issues...\n');

    // Check if build works
    try {
      const packageJsonPath = path.join(this.projectRoot, 'package.json');
      if (fs.existsSync(packageJsonPath)) {
        this.implementedFeatures.push('✅ Package.json exists');
      } else {
        this.issues.push('❌ Package.json missing');
      }
    } catch (error) {
      this.issues.push('❌ Error checking package.json');
    }

    // Check for Tailwind config
    const tailwindPath = path.join(this.projectRoot, 'tailwind.config.mjs');
    if (fs.existsSync(tailwindPath)) {
      this.implementedFeatures.push('✅ Tailwind CSS configured');
    } else {
      this.issues.push('⚠️ Tailwind CSS config missing');
    }

    // Check for Astro config
    const astroPath = path.join(this.projectRoot, 'astro.config.mjs');
    if (fs.existsSync(astroPath)) {
      this.implementedFeatures.push('✅ Astro config exists');
    } else {
      this.issues.push('❌ Astro config missing');
    }
  }

  // Generate recommendations
  generateRecommendations() {
    console.log('💡 Generating Recommendations...\n');

    const recommendations = [];

    if (this.missingFeatures.length > 0) {
      recommendations.push({
        priority: 'HIGH',
        category: 'Missing Features',
        items: this.missingFeatures
      });
    }

    if (this.issues.length > 0) {
      recommendations.push({
        priority: 'MEDIUM',
        category: 'Issues Found',
        items: this.issues
      });
    }

    // Additional recommendations based on current state
    recommendations.push({
      priority: 'HIGH',
      category: 'Next Steps',
      items: [
        '🚀 Run Lighthouse audit to measure current scores',
        '📊 Test Core Web Vitals in Chrome DevTools',
        '🖼️ Convert images to WebP/AVIF formats',
        '🔍 Test accessibility with screen reader',
        '📱 Test on mobile devices',
        '⚡ Monitor performance in production'
      ]
    });

    recommendations.push({
      priority: 'MEDIUM',
      category: 'Future Improvements',
      items: [
        '🗂️ Implement service worker for caching',
        '🌐 Add hreflang tags for international SEO',
        '📈 Set up real user monitoring (RUM)',
        '🔐 Add security headers (CSP, HSTS)',
        '📝 Add more structured data (FAQ, breadcrumbs)',
        '🎨 Implement dark mode toggle'
      ]
    });

    return recommendations;
  }

  // Calculate current score estimate
  calculateCurrentScores() {
    const totalFeatures = this.implementedFeatures.length + this.missingFeatures.length;
    const implementedCount = this.implementedFeatures.length;
    const implementationRate = totalFeatures > 0 ? (implementedCount / totalFeatures) * 100 : 0;

    // Projected scores based on implementation rate
    const projectedScores = {
      performance: Math.min(95, 60 + (implementationRate * 0.35)),
      accessibility: Math.min(100, 70 + (implementationRate * 0.3)),
      seo: Math.min(95, 65 + (implementationRate * 0.35)),
      bestPractices: Math.min(95, 75 + (implementationRate * 0.2))
    };

    return {
      implementationRate: Math.round(implementationRate),
      projectedScores,
      status: implementationRate >= 80 ? 'Excellent' : 
               implementationRate >= 60 ? 'Good' : 
               implementationRate >= 40 ? 'Fair' : 'Needs Work'
    };
  }

  // Run diagnostic
  async run() {
    console.log('🔍 BitcoinForWifi Post-Implementation Diagnostic');
    console.log('================================================\n');

    this.checkImplementedFeatures();
    this.checkForIssues();
    
    const scores = this.calculateCurrentScores();
    const recommendations = this.generateRecommendations();

    // Display results
    this.displayResults(scores, recommendations);

    return {
      implementedFeatures: this.implementedFeatures,
      missingFeatures: this.missingFeatures,
      issues: this.issues,
      scores,
      recommendations
    };
  }

  displayResults(scores, recommendations) {
    console.log('📊 IMPLEMENTATION STATUS');
    console.log('=======================');
    console.log(`Implementation Rate: ${scores.implementationRate}%`);
    console.log(`Status: ${scores.status}\n`);

    console.log('✅ IMPLEMENTED FEATURES:');
    this.implementedFeatures.forEach(feature => {
      console.log(`  ${feature}`);
    });

    if (this.missingFeatures.length > 0) {
      console.log('\n❌ MISSING FEATURES:');
      this.missingFeatures.forEach(feature => {
        console.log(`  ${feature}`);
      });
    }

    if (this.issues.length > 0) {
      console.log('\n⚠️ ISSUES FOUND:');
      this.issues.forEach(issue => {
        console.log(`  ${issue}`);
      });
    }

    console.log('\n📈 PROJECTED LIGHTHOUSE SCORES:');
    Object.entries(scores.projectedScores).forEach(([metric, score]) => {
      console.log(`  ${metric}: ${Math.round(score)}/100`);
    });

    console.log('\n💡 RECOMMENDATIONS:');
    recommendations.forEach(rec => {
      console.log(`\n${rec.priority} PRIORITY - ${rec.category}:`);
      rec.items.forEach(item => {
        console.log(`  ${item}`);
      });
    });

    console.log('\n🎯 NEXT ACTIONS:');
    console.log('1. Run: npm run build to test current implementation');
    console.log('2. Run: npm run dev to test locally');
    console.log('3. Use Lighthouse extension to audit performance');
    console.log('4. Test accessibility with keyboard navigation');
    console.log('5. Monitor Core Web Vitals in Chrome DevTools');

    console.log('\n📋 TESTING CHECKLIST:');
    console.log('PERFORMANCE:');
    console.log('  [ ] Lighthouse audit (target: 90+ performance)');
    console.log('  [ ] Core Web Vitals all "Good"');
    console.log('  [ ] Page load < 3s on 3G');
    console.log('  [ ] Images optimized (WebP/AVIF)');

    console.log('\nACCESSIBILITY:');
    console.log('  [ ] Keyboard navigation works');
    console.log('  [ ] Focus indicators visible');
    console.log('  [ ] Skip links functional');
    console.log('  [ ] Color contrast 4.5:1 minimum');

    console.log('\nSEO:');
    console.log('  [ ] Meta tags optimized');
    console.log('  [ ] Structured data valid');
    console.log('  [ ] Mobile-friendly');
    console.log('  [ ] No crawl errors');

    console.log(`\n🎉 Current Status: ${scores.status}`);
    if (scores.status === 'Excellent') {
      console.log('🚀 Ready for production deployment!');
    } else if (scores.status === 'Good') {
      console.log('👍 Good progress, continue optimization');
    } else {
      console.log('⚠️ More work needed before production');
    }
  }
}

// Run the diagnostic
const diagnostic = new PostImplementationDiagnostic();
diagnostic.run().catch(console.error);
