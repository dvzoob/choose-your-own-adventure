/**
 * Firestore Database Initialization
 * 
 * This module initializes the Firebase Admin SDK and provides access to the Firestore database.
 * It handles storing and retrieving story data, including pages, choices, and metadata.
 * 
 * Environment Variables Required:
 * - FIREBASE_PROJECT_ID
 * - FIREBASE_PRIVATE_KEY
 * - FIREBASE_CLIENT_EMAIL
 */

const admin = require('firebase-admin');

// Initialize Firebase Admin SDK on first import
if (!admin.apps.length) {
    admin.initializeApp({
        projectId: process.env.FIREBASE_PROJECT_ID,
        privateKey: process.env.FIREBASE_PRIVATE_KEY?.replace(/\\n/g, '\n'),
        clientEmail: process.env.FIREBASE_CLIENT_EMAIL,
    });
}

const db = admin.firestore();

/**
 * Export the Firestore database instance for use in other modules
 */
module.exports = { db, admin };
