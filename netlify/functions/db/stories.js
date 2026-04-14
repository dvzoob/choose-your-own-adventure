/**
 * Stories Database Module
 * 
 * Provides CRUD operations for stories stored in Firestore.
 * Handles story creation, retrieval, updates, and deletion.
 * 
 * Story Schema:
 * {
 *   title: string - Story title
 *   author: string - Author name
 *   content: string - Full story text with page breaks
 *   status: "draft" | "published"
 *   createdAt: timestamp
 *   updatedAt: timestamp
 *   graph: object - Story graph structure (auto-generated)
 *   pages: array - Array of page objects with choices
 * }
 */

const { db } = require('./index');

/**
 * Create a new story in Firestore
 * @param {Object} storyData - Story data to save
 * @param {string} storyData.title - Story title
 * @param {string} storyData.author - Author name
 * @param {string} storyData.content - Story content
 * @returns {Promise<string>} Story ID
 */
async function createStory(storyData) {
    try {
        const docRef = await db.collection('stories').add({
            ...storyData,
            status: storyData.status || 'draft',
            createdAt: new Date(),
            updatedAt: new Date(),
        });
        return docRef.id;
    } catch (error) {
        console.error('Error creating story:', error);
        throw error;
    }
}

/**
 * Retrieve a story by ID from Firestore
 * @param {string} storyId - The ID of the story to retrieve
 * @returns {Promise<Object>} Story data with ID
 */
async function getStory(storyId) {
    try {
        const doc = await db.collection('stories').doc(storyId).get();
        if (!doc.exists) {
            throw new Error(`Story ${storyId} not found`);
        }
        return { id: doc.id, ...doc.data() };
    } catch (error) {
        console.error('Error retrieving story:', error);
        throw error;
    }
}

/**
 * Retrieve all stories from Firestore
 * @param {string} status - Optional filter by status ("draft" or "published")
 * @returns {Promise<Array>} Array of story objects
 */
async function getAllStories(status = null) {
    try {
        let query = db.collection('stories');
        if (status) {
            query = query.where('status', '==', status);
        }
        const snapshot = await query.orderBy('createdAt', 'desc').get();
        return snapshot.docs.map(doc => ({ id: doc.id, ...doc.data() }));
    } catch (error) {
        console.error('Error retrieving all stories:', error);
        throw error;
    }
}

/**
 * Update a story in Firestore
 * @param {string} storyId - The ID of the story to update
 * @param {Object} updates - Fields to update
 * @returns {Promise<void>}
 */
async function updateStory(storyId, updates) {
    try {
        await db.collection('stories').doc(storyId).update({
            ...updates,
            updatedAt: new Date(),
        });
    } catch (error) {
        console.error('Error updating story:', error);
        throw error;
    }
}

/**
 * Delete a story from Firestore
 * @param {string} storyId - The ID of the story to delete
 * @returns {Promise<void>}
 */
async function deleteStory(storyId) {
    try {
        await db.collection('stories').doc(storyId).delete();
    } catch (error) {
        console.error('Error deleting story:', error);
        throw error;
    }
}

module.exports = {
    createStory,
    getStory,
    getAllStories,
    updateStory,
    deleteStory,
};
