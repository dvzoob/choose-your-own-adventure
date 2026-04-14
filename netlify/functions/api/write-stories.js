/**
 * Netlify Function: Write All Stories
 * 
 * Wraps the existing write_all_stories.py Python script to generate
 * all possible story variants from the story graph. Includes safeguards
 * against infinite loops and excessive branching.
 * 
 * Endpoint:
 * - POST /.netlify/functions/api/write-stories
 */

/**
 * Traverse the story graph and generate all possible paths
 * Implements safeguards against infinite loops and excessive decision points
 * 
 * @param {Object} graph - Graph structure with nodes and edges
 * @param {Array} pages - Array of page objects
 * @param {number} startPage - Page number to start from
 * @param {number} maxDecisions - Maximum decision points allowed per story
 * @returns {Array} Array of story path objects
 */
function generateAllStories(graph, pages, startPage = 2, maxDecisions = 20) {
    const stories = [];
    const pageMap = {};

    // Build page map for quick lookup
    pages.forEach(page => {
        pageMap[page.pageNum] = page;
    });

    /**
     * Recursively traverse story paths using depth-first search
     * @param {number} currentPage - Current page in traversal
     * @param {Array} currentPath - Pages visited so far
     * @param {number} decisionCount - Number of choices made
     * @param {Set} visitedPages - Set of page numbers in current path (for loop detection)
     */
    function traverse(currentPage, currentPath, decisionCount, visitedPages) {
        // Stop if we've exceeded max decisions
        if (decisionCount > maxDecisions) {
            stories.push({ pages: [...currentPath] });
            return;
        }

        // Stop if we've already visited this page in current path (loop detection)
        if (visitedPages.has(currentPage)) {
            stories.push({ pages: [...currentPath] });
            return;
        }

        const page = pageMap[currentPage];
        if (!page) {
            // Page doesn't exist, end story
            stories.push({ pages: [...currentPath] });
            return;
        }

        const newVisited = new Set(visitedPages);
        newVisited.add(currentPage);

        // Terminal page (no choices)
        if (!page.choices || page.choices.length === 0) {
            stories.push({ pages: [...currentPath] });
            return;
        }

        // Explore each choice
        page.choices.forEach(choice => {
            traverse(
                choice.targetPage,
                [...currentPath, choice.targetPage],
                decisionCount + 1,
                newVisited
            );
        });
    }

    // Start traversal from the start page
    traverse(startPage, [startPage], 0, new Set());

    return stories;
}

/**
 * Main Netlify Function handler
 */
exports.handler = async (event, context) => {
    const headers = {
        'Content-Type': 'application/json',
        'Access-Control-Allow-Origin': '*',
    };

    // Handle CORS preflight
    if (event.httpMethod === 'OPTIONS') {
        return { statusCode: 200, headers };
    }

    try {
        // Only accept POST requests
        if (event.httpMethod !== 'POST') {
            return {
                statusCode: 405,
                headers,
                body: JSON.stringify({ error: 'Method not allowed. Use POST.' }),
            };
        }

        // Parse request body
        const {
            graph,
            pages,
            startPage = 2,
            maxDecisions = 20,
        } = JSON.parse(event.body);

        if (!graph || !pages) {
            return {
                statusCode: 400,
                headers,
                body: JSON.stringify({
                    error: 'Invalid request. Expected graph and pages.',
                }),
            };
        }

        // Generate all possible stories
        const stories = generateAllStories(graph, pages, startPage, maxDecisions);

        return {
            statusCode: 200,
            headers,
            body: JSON.stringify({
                count: stories.length,
                stories,
                metadata: {
                    startPage,
                    maxDecisions,
                    generatedAt: new Date().toISOString(),
                },
            }),
        };
    } catch (error) {
        console.error('Error generating stories:', error);
        return {
            statusCode: 500,
            headers,
            body: JSON.stringify({
                error: error.message || 'Failed to generate stories',
            }),
        };
    }
};
