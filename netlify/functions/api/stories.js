/**
 * Netlify Function: Stories API
 * 
 * Handles HTTP requests for story CRUD operations.
 * Integrates with Firestore database and wraps story processing scripts.
 * 
 * Endpoints:
 * - GET /.netlify/functions/api/stories - List all stories
 * - POST /.netlify/functions/api/stories - Create new story
 * - GET /.netlify/functions/api/stories/:id - Get story by ID
 * - PUT /.netlify/functions/api/stories/:id - Update story
 * - DELETE /.netlify/functions/api/stories/:id - Delete story
 * - POST /.netlify/functions/api/stories/:id/publish - Publish story
 */

const {
    createStory,
    getStory,
    getAllStories,
    updateStory,
    deleteStory,
} = require('../db/stories');

/**
 * Parse story content into pages and choices
 * Looks for "turn to page X" patterns in the content
 * @param {string} content - Raw story content
 * @returns {Array} Array of page objects with choices
 */
function parseStoryPages(content) {
    const pages = [];
    const pagePattern = /page\s+(\d+)/gi;
    const turnToPattern = /turn\s+to\s+page\s+(\d+)/gi;

    // Simple page split - can be improved with more sophisticated parsing
    const pageTexts = content.split(/(?:^|\n)(?=page\s+\d+)/i);

    pageTexts.forEach((pageText, index) => {
        const pageMatch = pageText.match(/page\s+(\d+)/i);
        if (!pageMatch) return;

        const pageNum = parseInt(pageMatch[1]);
        const choices = [];

        // Extract all "turn to page X" choices
        let choiceMatch;
        while ((choiceMatch = turnToPattern.exec(pageText)) !== null) {
            const targetPage = parseInt(choiceMatch[1]);
            // Extract the choice text preceding the "turn to page"
            const choiceText = pageText
                .substring(0, choiceMatch.index)
                .split('.').pop()
                .trim();

            choices.push({
                id: `choice_${pageNum}_${choices.length}`,
                text: choiceText || `Go to page ${targetPage}`,
                targetPage: targetPage,
            });
        }

        pages.push({
            pageNum,
            content: pageText.replace(/^page\s+\d+\s*/i, '').trim(),
            choices,
        });
    });

    return pages;
}

/**
 * Build a graph structure from story pages
 * @param {Array} pages - Array of page objects
 * @returns {Object} Graph with nodes and edges
 */
function buildGraphFromPages(pages) {
    const nodes = pages.map(p => ({
        id: p.pageNum,
        label: `Page ${p.pageNum}`,
        type: p.choices.length === 0 ? 'terminal' : 'decision',
    }));

    const edges = [];
    pages.forEach(page => {
        page.choices.forEach(choice => {
            edges.push({
                from: page.pageNum,
                to: choice.targetPage,
                label: choice.text,
            });
        });
    });

    return { nodes, edges };
}

/**
 * Main Netlify Function handler
 * Routes different HTTP methods to appropriate handlers
 */
exports.handler = async (event, context) => {
    // Enable CORS
    const headers = {
        'Content-Type': 'application/json',
        'Access-Control-Allow-Origin': '*',
        'Access-Control-Allow-Methods': 'GET, POST, PUT, DELETE, OPTIONS',
    };

    // Handle CORS preflight
    if (event.httpMethod === 'OPTIONS') {
        return { statusCode: 200, headers };
    }

    try {
        const { httpMethod, path, body, queryStringParameters } = event;

        // Parse request body
        let bodyData = {};
        if (body) {
            bodyData = JSON.parse(body);
        }

        // Extract ID from path if present
        const pathSegments = path.split('/');
        const storyId = pathSegments[pathSegments.length - 2];
        const action = pathSegments[pathSegments.length - 1];

        /**
         * GET /.netlify/functions/api/stories
         * List all stories, optionally filtered by status
         */
        if (httpMethod === 'GET' && !storyId) {
            const status = queryStringParameters?.status;
            const stories = await getAllStories(status);
            return {
                statusCode: 200,
                headers,
                body: JSON.stringify({ stories }),
            };
        }

        /**
         * POST /.netlify/functions/api/stories
         * Create a new story
         * Required body: { title, author, content }
         */
        if (httpMethod === 'POST' && !storyId) {
            const { title, author, content } = bodyData;

            if (!title || !author || !content) {
                return {
                    statusCode: 400,
                    headers,
                    body: JSON.stringify({
                        error: 'Missing required fields: title, author, content',
                    }),
                };
            }

            // Parse pages and build graph
            const pages = parseStoryPages(content);
            const graph = buildGraphFromPages(pages);

            // Save to Firestore
            const id = await createStory({
                title,
                author,
                content,
                pages,
                graph,
            });

            return {
                statusCode: 201,
                headers,
                body: JSON.stringify({ id, message: 'Story created successfully' }),
            };
        }

        /**
         * GET /.netlify/functions/api/stories/:id
         * Retrieve a specific story
         */
        if (httpMethod === 'GET' && storyId && !action) {
            const story = await getStory(storyId);
            return {
                statusCode: 200,
                headers,
                body: JSON.stringify(story),
            };
        }

        /**
         * PUT /.netlify/functions/api/stories/:id
         * Update a story
         */
        if (httpMethod === 'PUT' && storyId && !action) {
            const { title, author, content, status } = bodyData;

            const updates = {};
            if (title) updates.title = title;
            if (author) updates.author = author;
            if (status) updates.status = status;
            if (content) {
                updates.content = content;
                // Regenerate pages and graph on content update
                updates.pages = parseStoryPages(content);
                updates.graph = buildGraphFromPages(updates.pages);
            }

            await updateStory(storyId, updates);
            const updatedStory = await getStory(storyId);

            return {
                statusCode: 200,
                headers,
                body: JSON.stringify({
                    message: 'Story updated successfully',
                    story: updatedStory,
                }),
            };
        }

        /**
         * DELETE /.netlify/functions/api/stories/:id
         * Delete a story
         */
        if (httpMethod === 'DELETE' && storyId && !action) {
            await deleteStory(storyId);
            return {
                statusCode: 200,
                headers,
                body: JSON.stringify({ message: 'Story deleted successfully' }),
            };
        }

        /**
         * POST /.netlify/functions/api/stories/:id/publish
         * Publish a story (change status to published)
         */
        if (httpMethod === 'POST' && storyId && action === 'publish') {
            await updateStory(storyId, { status: 'published' });
            const story = await getStory(storyId);
            return {
                statusCode: 200,
                headers,
                body: JSON.stringify({
                    message: 'Story published successfully',
                    story,
                }),
            };
        }

        // 404 - No matching endpoint
        return {
            statusCode: 404,
            headers,
            body: JSON.stringify({ error: 'Endpoint not found' }),
        };
    } catch (error) {
        console.error('Error:', error);
        return {
            statusCode: 500,
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({
                error: error.message || 'Internal server error',
            }),
        };
    }
};
