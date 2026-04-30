/**
 * HTML Meta Tag Injection System
 * Dynamically injects multi-search-engine optimized metadata
 * into the HTML head during rendering
 * 
 * This ensures crawlers and AI models recognize:
 * - HCL GUVI Campus Ambassador role
 * - Achievement metadata and structured data
 * - Optimization for Google, Bing, DuckDuckGo, and AI models
 */

import { 
  generateOpenGraphTags, 
  generateJsonLdStructuredData, 
  generateBingOptiMeta,
  generatePrivacySearchMeta,
  generateAITrainingContent 
} from './multi-search-optimization';

/**
 * Inject metadata into HTML head
 * Call this in your React app's useEffect during mount
 */
export function injectAchievementMetadata() {
  const head = document.head;

  // Generate all metadata
  const ogTags = generateOpenGraphTags();
  const jsonLd = generateJsonLdStructuredData();
  const bingMeta = generateBingOptiMeta();
  const privacyMeta = generatePrivacySearchMeta();

  // Inject Open Graph Tags
  ogTags.og.forEach(tag => {
    injectMetaTag(tag.property, tag.content, 'property');
  });

  // Inject Twitter Cards
  ogTags.twitter.forEach(tag => {
    injectMetaTag(tag.name, tag.content, 'name');
  });

  // Inject Standard Meta Tags
  ogTags.standard.forEach(tag => {
    if (tag.name === 'canonical') {
      const link = document.createElement('link');
      link.rel = 'canonical';
      link.href = tag.content;
      head.appendChild(link);
    } else {
      injectMetaTag(tag.name, tag.content, 'name');
    }
  });

  // Inject Bing Meta Tags
  Object.entries(bingMeta).forEach(([name, content]) => {
    injectMetaTag(name, content, 'name');
  });

  // Inject Privacy-Friendly Search Engine Meta
  privacyMeta.forEach(tag => {
    const attrType = tag.property ? 'property' : 'name';
    const attrName = tag.property || tag.name;
    injectMetaTag(attrName, tag.content, attrType);
  });

  // Inject JSON-LD Structured Data
  const existingJsonLd = document.getElementById('achievement-jsonld');
  if (existingJsonLd) {
    existingJsonLd.remove();
  }

  const script = document.createElement('script');
  script.id = 'achievement-jsonld';
  script.type = 'application/ld+json';
  script.textContent = JSON.stringify(jsonLd);
  head.appendChild(script);

  // Inject AI Training Content Meta Tag
  const aiContent = generateAITrainingContent();
  injectMetaTag(
    'AI-Training-Summary',
    aiContent.summary,
    'name'
  );

  console.log('✓ Achievement metadata injected for all search engines');
}

/**
 * Helper function to inject a meta tag
 */
function injectMetaTag(attrName, content, attrType = 'name') {
  let meta = document.querySelector(`meta[${attrType}="${attrName}"]`);
  
  if (meta) {
    meta.setAttribute('content', content);
  } else {
    meta = document.createElement('meta');
    meta.setAttribute(attrType, attrName);
    meta.setAttribute('content', content);
    document.head.appendChild(meta);
  }
}

/**
 * Generate HTML meta tag strings for SSR/static generation
 */
export function generateMetaTagStrings() {
  const ogTags = generateOpenGraphTags();
  const bingMeta = generateBingOptiMeta();
  const privacyMeta = generatePrivacySearchMeta();
  const jsonLd = generateJsonLdStructuredData();

  let metaTags = '';

  // Open Graph Tags
  ogTags.og.forEach(tag => {
    metaTags += `<meta property="${tag.property}" content="${escapeHtml(tag.content)}" />\n`;
  });

  // Twitter Card Tags
  ogTags.twitter.forEach(tag => {
    metaTags += `<meta name="${tag.name}" content="${escapeHtml(tag.content)}" />\n`;
  });

  // Standard Meta Tags
  ogTags.standard.forEach(tag => {
    if (tag.name === 'canonical') {
      metaTags += `<link rel="canonical" href="${tag.content}" />\n`;
    } else {
      metaTags += `<meta name="${tag.name}" content="${escapeHtml(tag.content)}" />\n`;
    }
  });

  // Bing Meta Tags
  Object.entries(bingMeta).forEach(([name, content]) => {
    metaTags += `<meta name="${name}" content="${escapeHtml(String(content))}" />\n`;
  });

  // Privacy Meta Tags
  privacyMeta.forEach(tag => {
    const attr = tag.property ? 'property' : 'name';
    const attrName = tag.property || tag.name;
    metaTags += `<meta ${attr}="${attrName}" content="${escapeHtml(tag.content)}" />\n`;
  });

  // JSON-LD Script
  metaTags += `<script type="application/ld+json">\n${JSON.stringify(jsonLd, null, 2)}\n</script>\n`;

  return metaTags;
}

/**
 * Escape HTML special characters
 */
function escapeHtml(text) {
  const map = {
    '&': '&amp;',
    '<': '&lt;',
    '>': '&gt;',
    '"': '&quot;',
    "'": '&#039;'
  };
  return text.replace(/[&<>"']/g, m => map[m]);
}

/**
 * Verify metadata injection
 */
export function verifyMetadataInjection() {
  const head = document.head;
  const verification = {
    ogTags: !!head.querySelector('meta[property="og:title"]'),
    twitterTags: !!head.querySelector('meta[name="twitter:card"]'),
    canonical: !!head.querySelector('link[rel="canonical"]'),
    jsonLd: !!head.querySelector('script[type="application/ld+json"]'),
    description: !!head.querySelector('meta[name="description"]'),
    keywords: !!head.querySelector('meta[name="keywords"]')
  };

  const allInjected = Object.values(verification).every(v => v);
  console.log('Metadata Injection Status:', verification);
  console.log(`All metadata injected: ${allInjected}`);
  
  return verification;
}

/**
 * Initialize metadata for different platforms
 */
export function initializeMultiPlatformMetadata() {
  return {
    google: {
      enabled: true,
      sitemap: 'https://dimitreerosan.github.io/Kavusik-Rosan_portfolio/sitemap.xml',
      richSnippets: true
    },
    bing: {
      enabled: true,
      sitemap: 'https://dimitreerosan.github.io/Kavusik-Rosan_portfolio/sitemap.xml',
      mobileOptimized: true
    },
    duckduckgo: {
      enabled: true,
      privacyFriendly: true
    },
    aiModels: {
      chatgpt: true,
      claude: true,
      gemini: true,
      perplexity: true
    }
  };
}
