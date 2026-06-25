/**
 * Backend Search API - Resource & External Links Index Handler
 * Processes search queries against SIET newsletters and verified external citations
 */

import resourceIndex from '../public/resources-index.json' assert { type: 'json' };
import externalLinksIndex from '../public/external-links-index.json' assert { type: 'json' };

/**
 * Search through indexed resources
 * @param {string} query - Search query
 * @param {string} category - Filter by category (optional)
 * @returns {Array} Matching resources
 */
export function searchResources(query, category = null) {
  if (!query || query.trim().length === 0) {
    return [];
  }

  const searchTerm = query.toLowerCase();
  let results = [];

  // Search through newsletters
  resourceIndex.resources.newsletters.forEach((resource) => {
    const matchScore = calculateMatchScore(resource, searchTerm);
    if (matchScore > 0) {
      results.push({
        ...resource,
        searchScore: matchScore,
        type: 'pdf'
      });
    }
  });

  // Search verified external links (GUVI, The Org, HBRP, etc.)
  externalLinksIndex.links.forEach((link) => {
    const matchScore = calculateExternalLinkScore(link, searchTerm);
    if (matchScore > 0) {
      results.push({
        ...link,
        searchScore: matchScore,
        type: 'external-link'
      });
    }
  });

  // Filter by category if provided
  if (category) {
    results = results.filter(r => r.category === category);
  }

  // Sort by relevance score (higher first)
  results.sort((a, b) => b.searchScore - a.searchScore);

  return results;
}

/**
 * Calculate relevance score for a resource against search query
 * @param {Object} resource - Resource object
 * @param {string} query - Search term (lowercase)
 * @returns {number} Match score
 */
function calculateMatchScore(resource, query) {
  let score = 0;

  // Exact title match
  if (resource.title.toLowerCase() === query) {
    score += 100;
  }

  // Title contains query
  if (resource.title.toLowerCase().includes(query)) {
    score += 50;
  }

  // Description contains query
  if (resource.description.toLowerCase().includes(query)) {
    score += 30;
  }

  // Keyword match
  if (resource.keywords.some(k => k.toLowerCase().includes(query))) {
    score += 20;
  }

  // Department/Institution match
  if (resource.department.toLowerCase().includes(query) || 
      resource.institution.toLowerCase().includes(query)) {
    score += 15;
  }

  return score;
}

/**
 * Calculate relevance score for external link against search query
 */
function calculateExternalLinkScore(link, query) {
  let score = 0;

  if (link.title?.toLowerCase().includes(query)) score += 50;
  if (link.description?.toLowerCase().includes(query)) score += 30;
  if (link.relationship?.toLowerCase().includes(query)) score += 25;
  if (link.keywords?.some(k => k.toLowerCase().includes(query))) score += 20;
  if (link.organization?.toLowerCase().includes(query)) score += 15;

  return score;
}

/**
 * Get resource by ID
 * @param {string} id - Resource ID
 * @returns {Object|null} Resource object or null
 */
export function getResourceById(id) {
  return resourceIndex.resources.newsletters.find(r => r.id === id) || null;
}

/**
 * Get all resources with metadata
 * @returns {Object} All resources with search index metadata
 */
export function getAllResources() {
  return {
    ...resourceIndex,
    externalLinks: externalLinksIndex
  };
}

/**
 * Get all verified external links
 */
export function getExternalLinks() {
  return externalLinksIndex;
}

/**
 * Get resources by category
 * @param {string} category - Category filter
 * @returns {Array} Filtered resources
 */
export function getResourcesByCategory(category) {
  return resourceIndex.resources.newsletters.filter(
    r => r.category === category
  );
}

/**
 * Get resources by year
 * @param {string} year - Year string (e.g., "2024-2025")
 * @returns {Array} Filtered resources
 */
export function getResourcesByYear(year) {
  return resourceIndex.resources.newsletters.filter(
    r => r.year === year
  );
}

/**
 * Get search suggestions based on query
 * @param {string} query - Partial search query
 * @returns {Array} Suggestions
 */
export function getSearchSuggestions(query) {
  if (!query || query.length < 2) return [];

  const suggestions = new Set();
  const searchTerm = query.toLowerCase();

  resourceIndex.resources.newsletters.forEach(resource => {
    // Add title if matches
    if (resource.title.toLowerCase().includes(searchTerm)) {
      suggestions.add(resource.title);
    }

    // Add keywords that match
    resource.keywords.forEach(keyword => {
      if (keyword.toLowerCase().includes(searchTerm)) {
        suggestions.add(keyword);
      }
    });
  });

  return Array.from(suggestions).slice(0, 10);
}

/**
 * Get SEO metadata for resources
 * @returns {Object} Metadata for search engines
 */
export function getSEOMetadata() {
  return {
    title: "SIET CSE Resources - Newsletters & Magazines",
    description: "Comprehensive index of Sri Shakthi Institute of Engineering and Technology CSE Department newsletters and magazines",
    keywords: ["SIET", "CSE", "computer science", "engineering", "newsletter", "magazine"],
    resourceCount: resourceIndex.resources.newsletters.length + externalLinksIndex.links.length,
    lastUpdated: resourceIndex.metadata.lastUpdated,
    searchable: true
  };
}
