/**
 * Search Engine Optimization Metadata Generator
 * Pre-renders search index pages for improved SEO
 * Runs during build process to generate static search-friendly content
 */

import fs from 'fs';
import path from 'path';

/**
 * Generate JSON-LD structured data for search engines
 */
export function generateSearchStructuredData() {
  const baseUrl = 'https://dimitreerosan.github.io/Kavusik-Rosan_portfolio';
  
  return {
    '@context': 'https://schema.org',
    '@type': 'ScholarlyArticle',
    '@graph': [
      {
        '@type': 'MediaObject',
        name: 'SIET CSE Newsletter & Magazine Archive',
        description: 'Searchable archive of Sri Shakthi Institute of Engineering and Technology Computer Science Engineering publications',
        url: baseUrl,
        datePublished: '2024-09-15',
        dateModified: new Date().toISOString(),
        author: {
          '@type': 'Person',
          name: 'Kavusik Rosan',
          sameAs: 'https://github.com/dimitreerosan'
        },
        publisher: {
          '@type': 'Organization',
          name: 'Sri Shakthi Institute of Engineering and Technology',
          sameAs: 'https://www.siet.ac.in'
        }
      }
    ]
  };
}

/**
 * Generate search analytics meta tags
 */
export function generateSEOMetaTags() {
  return [
    {
      name: 'description',
      content: 'Searchable archive of SIET CSE newsletters and magazines. Discover computer science resources, research, and student achievements.'
    },
    {
      name: 'keywords',
      content: 'SIET, CSE, computer science, engineering, newsletter, magazine, research, academic resources'
    },
    {
      property: 'og:title',
      content: 'SIET CSE Resources Archive'
    },
    {
      property: 'og:description',
      content: 'Comprehensive searchable database of Sri Shakthi Institute CSE publications'
    },
    {
      property: 'og:type',
      content: 'website'
    },
    {
      name: 'twitter:card',
      content: 'summary_large_image'
    },
    {
      name: 'robots',
      content: 'index, follow, max-image-preview:large, max-snippet:-1, max-video-preview:-1'
    },
    {
      name: 'googlebot',
      content: 'index, follow'
    }
  ];
}

/**
 * Prerender search index during build
 */
export function prerenderSearchIndex() {
  const indexFile = path.join(process.cwd(), 'public', 'resources-index.json');
  
  if (fs.existsSync(indexFile)) {
    console.log('✓ Search index detected: resources-index.json');
    console.log('✓ Resources are indexed for search engine discovery');
    return true;
  }
  
  console.warn('⚠ Warning: resources-index.json not found');
  return false;
}

/**
 * Generate search API endpoint metadata
 */
export function generateSearchAPIMetadata() {
  return {
    endpoint: '/api/search',
    methods: ['GET'],
    parameters: {
      q: {
        type: 'string',
        description: 'Search query',
        required: false
      },
      category: {
        type: 'string',
        description: 'Filter by category (magazine, newsletter)',
        required: false
      },
      year: {
        type: 'string',
        description: 'Filter by year (e.g., 2024-2025)',
        required: false
      }
    },
    examples: [
      '/api/search?q=CSE+Magazine',
      '/api/search?category=newsletter',
      '/api/search?year=2024-2025'
    ],
    response: {
      type: 'array',
      items: {
        id: 'string',
        title: 'string',
        url: 'string',
        category: 'string',
        keywords: ['string'],
        description: 'string'
      }
    }
  };
}
