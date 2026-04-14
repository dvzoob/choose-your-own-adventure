/**
 * Story Reader Component
 * 
 * Interactive component for reading Choose-Your-Own-Adventure stories.
 * Displays the current page and allows users to navigate through choices.
 * 
 * Features:
 * - Fetch story from backend API
 * - Display current page content
 * - Render interactive choice buttons
 * - Navigate through story pages
 * - Show breadcrumb trail of visited pages
 * - Handle terminal pages gracefully
 * 
 * Props:
 * - storyId: string - The ID of the story to read
 * - apiUrl: string - Base URL for the API (default: same domain)
 */

import React, { useState, useEffect } from 'react';
import styles from './Reader.module.css';

const StoryReader = ({ storyId, apiUrl = '' }) => {
    // State management
    const [story, setStory] = useState(null);
    const [currentPageNum, setCurrentPageNum] = useState(1);
    const [visitedPages, setVisitedPages] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);

    /**
     * Fetch the story from the API on component mount
     */
    useEffect(() => {
        const fetchStory = async () => {
            try {
                setLoading(true);
                const endpoint = `${apiUrl}/.netlify/functions/api/stories/${storyId}`;
                const response = await fetch(endpoint);

                if (!response.ok) {
                    throw new Error(`Failed to fetch story: ${response.statusText}`);
                }

                const data = await response.json();
                setStory(data);

                // Start from the beginning of the story
                // Find the first page with lowest page number
                const firstPage = Math.min(
                    ...data.pages.map(p => p.pageNum)
                );
                setCurrentPageNum(firstPage);
                setVisitedPages([firstPage]);
                setError(null);
            } catch (err) {
                console.error('Error fetching story:', err);
                setError(err.message);
            } finally {
                setLoading(false);
            }
        };

        if (storyId) {
            fetchStory();
        }
    }, [storyId, apiUrl]);

    /**
     * Handle choice selection - navigate to the target page
     * @param {number} targetPageNum - The page number to navigate to
     * @param {string} choiceText - The choice text (for breadcrumb)
     */
    const handleChoice = (targetPageNum, choiceText) => {
        setCurrentPageNum(targetPageNum);
        setVisitedPages([...visitedPages, targetPageNum]);
    };

    /**
     * Reset the story to the beginning
     */
    const handleRestart = () => {
        const firstPage = Math.min(
            ...story.pages.map(p => p.pageNum)
        );
        setCurrentPageNum(firstPage);
        setVisitedPages([firstPage]);
    };

    // Loading state
    if (loading) {
        return (
            <div className={styles.container}>
                <div className={styles.loading}>Loading story...</div>
            </div>
        );
    }

    // Error state
    if (error) {
        return (
            <div className={styles.container}>
                <div className={styles.error}>
                    <h2>Error</h2>
                    <p>{error}</p>
                </div>
            </div>
        );
    }

    // No story found
    if (!story) {
        return (
            <div className={styles.container}>
                <div className={styles.error}>
                    <h2>Story Not Found</h2>
                    <p>The story you're looking for doesn't exist.</p>
                </div>
            </div>
        );
    }

    // Find current page object
    const currentPage = story.pages.find(p => p.pageNum === currentPageNum);

    if (!currentPage) {
        return (
            <div className={styles.container}>
                <div className={styles.error}>
                    <h2>Page Not Found</h2>
                    <p>Page {currentPageNum} doesn't exist in this story.</p>
                </div>
            </div>
        );
    }

    // Check if this is a terminal page (no choices)
    const isTerminal = !currentPage.choices || currentPage.choices.length === 0;

    return (
        <div className={styles.container}>
            {/* Header with story title */}
            <header className={styles.header}>
                <h1>{story.title}</h1>
                <p className={styles.author}>by {story.author}</p>
            </header>

            {/* Main story content area */}
            <main className={styles.main}>
                {/* Page indicator */}
                <div className={styles.pageIndicator}>
                    Page {currentPageNum}
                </div>

                {/* Story content */}
                <div className={styles.content}>
                    <p>{currentPage.content}</p>
                </div>

                {/* Choices section */}
                {!isTerminal && (
                    <div className={styles.choicesSection}>
                        <h3>What do you do?</h3>
                        <div className={styles.choices}>
                            {currentPage.choices.map(choice => (
                                <button
                                    key={choice.id}
                                    className={styles.choiceButton}
                                    onClick={() => handleChoice(choice.targetPage, choice.text)}
                                >
                                    {choice.text}
                                    <span className={styles.choiceMeta}>
                                        → Page {choice.targetPage}
                                    </span>
                                </button>
                            ))}
                        </div>
                    </div>
                )}

                {/* Terminal page message */}
                {isTerminal && (
                    <div className={styles.terminalMessage}>
                        <p>🎭 <strong>The End</strong></p>
                        <p>You've reached the end of this story path. Would you like to try again?</p>
                    </div>
                )}
            </main>

            {/* Footer with navigation */}
            <footer className={styles.footer}>
                <button
                    className={styles.restartButton}
                    onClick={handleRestart}
                >
                    ↻ Start Over
                </button>

                {/* Breadcrumb trail */}
                <div className={styles.breadcrumb}>
                    <span className={styles.breadcrumbLabel}>Path:</span>
                    {visitedPages.map((pageNum, index) => (
                        <React.Fragment key={pageNum}>
                            {index > 0 && <span className={styles.breadcrumbSeparator}>→</span>}
                            <span className={styles.breadcrumbItem}>
                                Page {pageNum}
                            </span>
                        </React.Fragment>
                    ))}
                </div>
            </footer>
        </div>
    );
};

export default StoryReader;
