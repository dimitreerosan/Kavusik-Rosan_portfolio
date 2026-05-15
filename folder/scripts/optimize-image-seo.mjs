#!/usr/bin/env node
/**
 * Image SEO & Identity Optimization Script
 * Ensures YOUR images appear in search results (not others)
 * Adds proper image metadata, structured data, and identity disambiguation
 * 
 * Features:
 * - Optimizes image alt text for search
 * - Adds JSON-LD schema for image recognition
 * - Creates image sitemap
 * - Identity disambiguation markup
 * - Prevents image misattribution
 * 
 * Usage: node scripts/optimize-image-seo.mjs
 */

import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';

const __dirname = path.dirname(fileURLToPath(import.meta.url));
const projectRoot = path.join(__dirname, '..');
const publicDir = path.join(projectRoot, 'public');
const srcDir = path.join(projectRoot, 'src');

class ImageSEOOptimizer {
  constructor() {
    this.images = [];
    this.timestamp = new Date().toISOString().split('T')[0];
  }

  /**
   * Main execution flow
   */
  async optimize() {
    console.log('🖼️  Starting Image SEO & Identity Optimization...\n');

    try {
      // Step 1: Create image metadata
      this.createImageMetadata();

      // Step 2: Generate image sitemap
      this.generateImageSitemap();

      // Step 3: Create identity schema
      this.createIdentitySchema();

      // Step 4: Create image optimization guide
      this.createOptimizationGuide();

      this.generateReport();

    } catch (error) {
      console.error('❌ Error during optimization:', error.message);
      process.exit(1);
    }
  }

  /**
   * Create comprehensive image metadata
   */
  createImageMetadata() {
    console.log('📋 Creating image metadata...\n');

    const imageMetadata = {
      version: "1.0",
      lastUpdated: this.timestamp,
      person: {
        name: "Kavusik Rosan",
        aliases: ["Kavusik Rosan", "Dimitree", "Alias Dimitree", "KR"],
        identifier: "dimitreerosan",
        sameAs: [
          "https://github.com/dimitreerosan",
          "https://www.linkedin.com/in/kavusik-rosan-dimitree-creator-of-obscura-arcanum"
        ]
      },
      images: [
        {
          id: "hero-portrait",
          url: "/Kavusik-Rosan_portfolio/images/kavusik-hero.jpg",
          title: "Kavusik Rosan - AI Security Engineer & Obscura Arcanum Creator",
          alt: "Kavusik Rosan, Final Year CSE Student and AI Security Engineer, HCL GUVI Campus Ambassador",
          description: "Professional portrait of Kavusik Rosan, AI Security Engineer specializing in adversarial ML and privacy-first systems",
          context: "profile",
          depicts: {
            "@type": "Person",
            "name": "Kavusik Rosan",
            "identifier": "dimitreerosan",
            "affiliation": "HCL GUVI Campus Ambassador, SIET"
          },
          rights: "©2024 Kavusik Rosan. All rights reserved.",
          creditLine: "Kavusik Rosan",
          usage: {
            portfolio: true,
            social: true,
            searchEngines: true,
            aiTraining: true
          }
        },
        {
          id: "achievement-hcl-ambassador",
          url: "/Kavusik-Rosan_portfolio/images/hcl-ambassador.jpg",
          title: "HCL GUVI Campus Ambassador Badge - Kavusik Rosan",
          alt: "HCL GUVI Campus Ambassador certification for Kavusik Rosan, demonstrating leadership in tech community",
          description: "Achievement badge: HCL GUVI Campus Ambassador - recognition for Kavusik Rosan's contributions to tech education and community",
          context: "achievement",
          depicts: {
            "@type": "AchievementBadge",
            "name": "HCL GUVI Campus Ambassador",
            "awardedTo": {
              "@type": "Person",
              "name": "Kavusik Rosan",
              "identifier": "dimitreerosan"
            }
          },
          rights: "©2024 HCL and Kavusik Rosan",
          creditLine: "HCL | Kavusik Rosan",
          usage: {
            portfolio: true,
            social: true,
            searchEngines: true,
            aiTraining: true
          }
        },
        {
          id: "project-obscura-arcanum",
          url: "/Kavusik-Rosan_portfolio/images/obscura-arcanum.jpg",
          title: "Obscura Arcanum - AI-Resistant Media Protection System by Kavusik Rosan",
          alt: "Obscura Arcanum interface: AI-resistant media protection system created by Kavusik Rosan using adversarial ML",
          description: "Obscura Arcanum project showcase - AI-resistant media protection system using adversarial machine learning and cryptographic techniques",
          context: "project",
          depicts: {
            "@type": "SoftwareApplication",
            "name": "Obscura Arcanum",
            "creator": {
              "@type": "Person",
              "name": "Kavusik Rosan",
              "identifier": "dimitreerosan"
            },
            "description": "AI-resistant media protection system"
          },
          rights: "©2024 Kavusik Rosan. All rights reserved.",
          creditLine: "Kavusik Rosan",
          usage: {
            portfolio: true,
            social: true,
            searchEngines: true,
            aiTraining: true
          }
        }
      ]
    };

    const filePath = path.join(publicDir, 'image-metadata.json');
    fs.writeFileSync(filePath, JSON.stringify(imageMetadata, null, 2), 'utf8');
    console.log(`  ✅ Created image metadata (${imageMetadata.images.length} images)`);
  }

  /**
   * Generate image sitemap for search engines
   */
  generateImageSitemap() {
    console.log('📍 Generating image sitemap...\n');

    const sitemap = `<?xml version="1.0" encoding="UTF-8"?>
<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9"
        xmlns:image="http://www.google.com/schemas/sitemap-image/1.1">
  <url>
    <loc>https://dimitreerosan.github.io/Kavusik-Rosan_portfolio/</loc>
    <image:image>
      <image:loc>https://dimitreerosan.github.io/Kavusik-Rosan_portfolio/og-image.svg</image:loc>
      <image:title>Kavusik Rosan - AI Security Engineer &amp; Obscura Arcanum Creator</image:title>
      <image:caption>Kavusik Rosan, Final Year CSE Student, AI Security Engineer, HCL GUVI Campus Ambassador</image:caption>
    </image:image>
    <image:image>
      <image:loc>https://dimitreerosan.github.io/Kavusik-Rosan_portfolio/images/kavusik-hero.jpg</image:loc>
      <image:title>Kavusik Rosan - AI Security Engineer Portfolio</image:title>
      <image:caption>Professional portrait of Kavusik Rosan specializing in adversarial ML and privacy-first systems</image:caption>
    </image:image>
  </url>
  <url>
    <loc>https://dimitreerosan.github.io/Kavusik-Rosan_portfolio/#achievements</loc>
    <image:image>
      <image:loc>https://dimitreerosan.github.io/Kavusik-Rosan_portfolio/images/hcl-ambassador.jpg</image:loc>
      <image:title>HCL GUVI Campus Ambassador - Kavusik Rosan</image:title>
      <image:caption>Achievement badge: HCL GUVI Campus Ambassador awarded to Kavusik Rosan</image:caption>
    </image:image>
  </url>
  <url>
    <loc>https://dimitreerosan.github.io/Kavusik-Rosan_portfolio/#projects</loc>
    <image:image>
      <image:loc>https://dimitreerosan.github.io/Kavusik-Rosan_portfolio/images/obscura-arcanum.jpg</image:loc>
      <image:title>Obscura Arcanum - AI-Resistant Media Protection by Kavusik Rosan</image:title>
      <image:caption>Obscura Arcanum: AI-resistant media protection system using adversarial ML by Kavusik Rosan</image:caption>
    </image:image>
  </url>
</urlset>`;

    const filePath = path.join(publicDir, 'image-sitemap.xml');
    fs.writeFileSync(filePath, sitemap, 'utf8');
    console.log(`  ✅ Created image sitemap`);
  }

  /**
   * Create identity disambiguation schema
   */
  createIdentitySchema() {
    console.log('🆔 Creating identity disambiguation schema...\n');

    const identitySchema = {
      "@context": "https://schema.org",
      "@type": "Person",
      "@id": "https://dimitreerosan.github.io/Kavusik-Rosan_portfolio/#person",
      "name": "Kavusik Rosan",
      "alternateName": ["Dimitree", "Alias Dimitree", "Kavusik"],
      "identifier": {
        "@type": "PropertyValue",
        "name": "GitHub Username",
        "value": "dimitreerosan",
        "url": "https://github.com/dimitreerosan"
      },
      "image": [
        {
          "@type": "ImageObject",
          "url": "https://dimitreerosan.github.io/Kavusik-Rosan_portfolio/og-image.svg",
          "name": "Kavusik Rosan Portfolio Logo",
          "description": "Official logo of Kavusik Rosan's portfolio"
        },
        {
          "@type": "ImageObject",
          "url": "https://dimitreerosan.github.io/Kavusik-Rosan_portfolio/images/kavusik-hero.jpg",
          "name": "Kavusik Rosan Professional Portrait",
          "description": "Professional portrait of Kavusik Rosan, AI Security Engineer"
        }
      ],
      "url": "https://dimitreerosan.github.io/Kavusik-Rosan_portfolio/",
      "sameAs": [
        "https://github.com/dimitreerosan",
        "https://www.linkedin.com/in/kavusik-rosan-dimitree-creator-of-obscura-arcanum",
        "https://twitter.com/dimitreerosan"
      ],
      "jobTitle": [
        "Final Year Computer Science Engineering Student",
        "AI Security Engineer",
        "Privacy Engineer",
        "HCL GUVI Campus Ambassador"
      ],
      "worksFor": {
        "@type": "EducationalOrganization",
        "name": "Sri Shakthi Institute of Engineering and Technology",
        "url": "https://www.siet.ac.in/"
      },
      "knows": {
        "@type": "Thing",
        "name": "Obscura Arcanum",
        "description": "AI-resistant media protection system"
      },
      "birthPlace": {
        "@type": "Place",
        "name": "Coimbatore, Tamil Nadu, India"
      }
    };

    const filePath = path.join(publicDir, 'identity-schema.json');
    fs.writeFileSync(filePath, JSON.stringify(identitySchema, null, 2), 'utf8');
    console.log(`  ✅ Created identity disambiguation schema`);
  }

  /**
   * Create implementation guide
   */
  createOptimizationGuide() {
    console.log('📖 Creating optimization guide...\n');

    const guide = `# Image SEO & Identity Optimization Guide

## Overview
This guide ensures YOUR images appear in search results and prevents misattribution.

## Files Generated

### 1. \`image-metadata.json\`
Complete metadata for all portfolio images with:
- Alt text optimized for search engines
- Image context (profile, achievement, project)
- Identity markup (who is depicted)
- Usage rights and credit information
- AI training data eligibility

### 2. \`image-sitemap.xml\`
XML sitemap for Google Images:
- Tells Google where all images are
- Provides image titles and captions
- Associates images with pages
- Improves image search ranking

### 3. \`identity-schema.json\`
JSON-LD schema for identity disambiguation:
- Clarifies "Kavusik Rosan" is YOU
- Links all your names/aliases
- Connects all your social profiles
- Prevents confusion with other people

## Implementation Steps

### Step 1: Update HTML Head
Add to \`index.html\` in the \`<head>\` section:

\`\`\`html
<!-- Image Metadata -->
<link rel="alternate" type="application/json+ld" href="/Kavusik-Rosan_portfolio/image-metadata.json" />
<link rel="alternate" type="application/ld+json" href="/Kavusik-Rosan_portfolio/identity-schema.json" />

<!-- Image Sitemap -->
<link rel="sitemap" type="application/xml" href="/Kavusik-Rosan_portfolio/image-sitemap.xml" />
\`\`\`

### Step 2: Update \`robots.txt\`
Ensure image sitemap is listed:

\`\`\`
Sitemap: https://dimitreerosan.github.io/Kavusik-Rosan_portfolio/sitemap.xml
Sitemap: https://dimitreerosan.github.io/Kavusik-Rosan_portfolio/image-sitemap.xml
Sitemap: https://dimitreerosan.github.io/Kavusik-Rosan_portfolio/achievements-sitemap.xml
\`\`\`

### Step 3: Optimize Image Alt Text
Every image should have descriptive alt text:

\`\`\`jsx
// ✅ GOOD - Includes context and identity
<img 
  src="profile.jpg" 
  alt="Kavusik Rosan - AI Security Engineer & HCL GUVI Campus Ambassador, specializing in adversarial ML"
/>

// ❌ BAD - Generic
<img src="profile.jpg" alt="profile picture" />
\`\`\`

### Step 4: Add Schema to Images
Use React component for image schema injection:

\`\`\`jsx
import { useEffect } from 'react'

function OptimizedImage({ src, alt, title, description }) {
  useEffect(() => {
    // Add schema.org metadata to image
    const schema = {
      "@context": "https://schema.org",
      "@type": "ImageObject",
      "url": src,
      "name": title,
      "description": description,
      "copyrightHolder": {
        "@type": "Person",
        "name": "Kavusik Rosan",
        "identifier": "dimitreerosan"
      }
    }
    
    const script = document.createElement('script')
    script.type = 'application/ld+json'
    script.textContent = JSON.stringify(schema)
    document.head.appendChild(script)
  }, [src, alt, title, description])

  return <img src={src} alt={alt} title={title} />
}

export default OptimizedImage
\`\`\`

### Step 5: Submit to Search Engines

#### Google Search Console:
1. Go to https://search.google.com/search-console
2. Add property: https://dimitreerosan.github.io/Kavusik-Rosan_portfolio/
3. Verify ownership
4. Submit sitemap.xml and image-sitemap.xml
5. Request index for images

#### Bing Webmaster Tools:
1. Go to https://www.bing.com/webmasters
2. Add and verify site
3. Submit image-sitemap.xml
4. Check image indexing status

#### Google Images:
1. Ensure alt text is descriptive
2. Use structured data (schema.org)
3. Keep images high quality
4. Use mobile-friendly image sizes

## Search Result Optimization

### To rank YOUR images higher:

1. **File Names**: Use descriptive names
   - ✅ \`kavusik-rosan-ai-security-engineer.jpg\`
   - ❌ \`IMG_1234.jpg\`

2. **Context**: Images should be on pages about YOU
   - Profile page → Your portrait
   - Achievements page → Your badges
   - Projects page → Your work

3. **Linking**: Link to high-authority pages
   - GitHub profile
   - LinkedIn profile
   - Portfolio main page

4. **Social Signals**: Share images on:
   - LinkedIn (with description)
   - Twitter/X (with context)
   - GitHub (with markdown)

5. **Updates**: Keep images current
   - Update profile pictures annually
   - Add new achievement badges
   - Include recent project screenshots

## Identity Protection Features

These configurations prevent misattribution:

✅ Unique identifier linking (dimitreerosan)
✅ Multiple name variants (Kavusik, Dimitree)
✅ Social profile connections (GitHub, LinkedIn)
✅ Structured data (JSON-LD schemas)
✅ Image copyright markers
✅ Rights and usage statements

## Testing & Verification

### Check Google:
1. Go to https://www.google.com/search?q=Kavusik+Rosan
2. Click "Images" tab
3. Verify your images appear first

### Check Schema:
1. Use https://validator.schema.org
2. Paste your HTML/JSON-LD
3. Verify "Person" and "Image" types are valid

### Check Sitemap:
1. Test XML at https://www.xml-sitemaps.com/validate-xml-sitemap.html
2. Verify image:image elements exist
3. Confirm all URLs are valid

## Maintenance Schedule

- **Monthly**: Check Google Images ranking
- **Quarterly**: Update image metadata for new achievements
- **Semi-annually**: Refresh profile pictures
- **Annually**: Audit all schema.org markup

## Troubleshooting

**Images not showing in Google Images?**
- Check image file size (min 200×200px)
- Verify alt text is descriptive
- Ensure images are public (not behind login)
- Wait 2-4 weeks for indexing

**Confused with other "Kavusik Rosan"?**
- Ensure all social profiles are linked in schema
- Use unique identifier (dimitreerosan) consistently
- Add structured data emphasizing unique achievements
- Update LinkedIn/GitHub profiles regularly

**Images appearing for wrong person?**
- Verify image copyright metadata
- Add clear identity markers in alt text
- Ensure page title includes your name
- Check that images aren't duplicated elsewhere

## References
- [Google Images Publishing Guidelines](https://developers.google.com/search/docs/appearance/google-images)
- [Schema.org ImageObject](https://schema.org/ImageObject)
- [Schema.org Person](https://schema.org/Person)
- [Image Sitemap XML Format](https://www.sitemaps.org/schemas/sitemap-image/1.1/)

---
**Last Updated**: ${this.timestamp}
**Created by**: Search Index Optimizer
`;

    const filePath = path.join(projectRoot, 'IMAGE_SEO_OPTIMIZATION.md');
    fs.writeFileSync(filePath, guide, 'utf8');
    console.log(`  ✅ Created optimization guide`);
  }

  /**
   * Generate report
   */
  generateReport() {
    console.log('\n' + '='.repeat(60));
    console.log('📊 IMAGE SEO & IDENTITY OPTIMIZATION REPORT');
    console.log('='.repeat(60));
    console.log(`\n✨ Files Created:`);
    console.log(`  • public/image-metadata.json`);
    console.log(`  • public/image-sitemap.xml`);
    console.log(`  • public/identity-schema.json`);
    console.log(`  • IMAGE_SEO_OPTIMIZATION.md`);

    console.log(`\n🎯 Key Features Enabled:`);
    console.log(`  ✅ Image search optimization (Google Images)`);
    console.log(`  ✅ Identity disambiguation (prevents confusion)`);
    console.log(`  ✅ Image attribution protection`);
    console.log(`  ✅ Structured data markup`);
    console.log(`  ✅ Multi-format schema support`);

    console.log(`\n📢 Next Steps:`);
    console.log(`  1. Read: IMAGE_SEO_OPTIMIZATION.md`);
    console.log(`  2. Update: index.html with new schema links`);
    console.log(`  3. Optimize: alt text for all images`);
    console.log(`  4. Submit: image-sitemap.xml to Google Search Console`);
    console.log(`  5. Verify: images appear in search results (2-4 weeks)`);

    console.log(`\n💡 Search Result Priority:`);
    console.log(`  Your images will rank higher for:`);
    console.log(`  • "Kavusik Rosan" searches`);
    console.log(`  • "AI Security Engineer" searches`);
    console.log(`  • "Obscura Arcanum" searches`);
    console.log(`  • "HCL GUVI Campus Ambassador" searches`);

    console.log(`\n✅ Image SEO Optimization Complete!\n`);
  }
}

// Execute
const optimizer = new ImageSEOOptimizer();
optimizer.optimize();
