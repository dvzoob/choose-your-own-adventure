/**
 * Netlify Function: Build Story Graph
 * 
 * Wraps the existing build_story_graph.py Python script to generate
 * a graph structure from story pages. This enables visualization of
 * all possible story paths.
 * 
 * Endpoint:
 * - POST /.netlify/functions/api/build-graph
 */

/**
 * Build a graph from story pages
 * This is a JavaScript implementation that mirrors the Python script logic.
 * 
 * @param {Array} pages - Array of page objects with choices
 * @returns {Object} Graph structure with nodes and edges
 */
function buildGraph(pages) {
    const nodes = [];
    const edges = [];
    const pageSet = new Set();

    // First pass: Create all nodes from pages
    pages.forEach(page => {
        pageSet.add(page.pageNum);
        const isTerminal = !page.choices || page.choices.length === 0;
        nodes.push({
            id: page.pageNum,
            label: `Page ${page.pageNum}`,
            type: isTerminal ? 'terminal' : 'decision',
        });
    });

    // Second pass: Create edges from choices
    pages.forEach(page => {
        if (page.choices && page.choices.length > 0) {
            page.choices.forEach(choice => {
                edges.push({
                    from: page.pageNum,
                    to: choice.targetPage,
                    label: choice.text || `Go to page ${choice.targetPage}`,
                });
            });
        }
    });

    return { nodes, edges };
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
        const { pages } = JSON.parse(event.body);

        if (!pages || !Array.isArray(pages)) {
            return {
                statusCode: 400,
                headers,
                body: JSON.stringify({
                    error: 'Invalid request. Expected array of pages.',
                }),
            };
        }

        // Build the graph
        const graph = buildGraph(pages);

        return {
            statusCode: 200,
            headers,
            body: JSON.stringify(graph),
        };
    } catch (error) {
        console.error('Error building graph:', error);
        return {
            statusCode: 500,
            headers,
            body: JSON.stringify({
                error: error.message || 'Failed to build graph',
            }),
        };
    }
};
