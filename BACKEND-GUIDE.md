# Backend Development Guide

## Overview

The backend consists of Netlify Functions that wrap around the existing CYOA story processing scripts. It provides a RESTful API for story management, graph building, and story generation.

## Architecture

```
netlify/functions/
├── api/
│   ├── stories.js          # Main CRUD API for stories
│   ├── build-graph.js      # Wraps build_story_graph.py
│   └── write-stories.js    # Wraps write_all_stories.py
└── db/
    ├── index.js            # Firebase Admin initialization
    └── stories.js          # Database operations
```

## API Endpoints

### Stories Management

#### List Stories
```
GET /.netlify/functions/api/stories
GET /.netlify/functions/api/stories?status=published
```

**Response:**
```json
{
  "stories": [
    {
      "id": "story_123",
      "title": "The Cave of Time",
      "author": "Author Name",
      "status": "draft",
      "createdAt": "2026-04-14T...",
      "updatedAt": "2026-04-14T..."
    }
  ]
}
```

#### Create Story
```
POST /.netlify/functions/api/stories
Content-Type: application/json

{
  "title": "My Adventure",
  "author": "Your Name",
  "content": "Story text with 'turn to page X' choices..."
}
```

**Response:**
```json
{
  "id": "story_456",
  "message": "Story created successfully"
}
```

#### Get Story
```
GET /.netlify/functions/api/stories/:id
```

**Response:**
```json
{
  "id": "story_123",
  "title": "The Cave of Time",
  "author": "Author Name",
  "content": "...",
  "pages": [
    {
      "pageNum": 1,
      "content": "Page content...",
      "choices": [
        {
          "id": "choice_1_0",
          "text": "Go deeper into the cave",
          "targetPage": 3
        }
      ]
    }
  ],
  "graph": {
    "nodes": [...],
    "edges": [...]
  },
  "status": "draft",
  "createdAt": "...",
  "updatedAt": "..."
}
```

#### Update Story
```
PUT /.netlify/functions/api/stories/:id
Content-Type: application/json

{
  "title": "Updated Title",
  "author": "New Author",
  "content": "Updated content...",
  "status": "published"
}
```

#### Delete Story
```
DELETE /.netlify/functions/api/stories/:id
```

#### Publish Story
```
POST /.netlify/functions/api/stories/:id/publish
```

### Graph Generation

```
POST /.netlify/functions/api/build-graph
Content-Type: application/json

{
  "pages": [
    {
      "pageNum": 1,
      "content": "Story text...",
      "choices": [
        {
          "text": "Go left",
          "targetPage": 2
        }
      ]
    }
  ]
}
```

**Response:**
```json
{
  "nodes": [
    {
      "id": 1,
      "label": "Page 1",
      "type": "decision"
    },
    {
      "id": 2,
      "label": "Page 2",
      "type": "terminal"
    }
  ],
  "edges": [
    {
      "from": 1,
      "to": 2,
      "label": "Go left"
    }
  ]
}
```

### Story Generation

```
POST /.netlify/functions/api/write-stories
Content-Type: application/json

{
  "graph": { ... },
  "pages": [ ... ],
  "startPage": 1,
  "maxDecisions": 20
}
```

**Response:**
```json
{
  "count": 45,
  "stories": [
    {
      "pages": [1, 2, 3, 5, 10]
    },
    {
      "pages": [1, 2, 4, 8, 10]
    }
  ],
  "metadata": {
    "startPage": 1,
    "maxDecisions": 20,
    "generatedAt": "2026-04-14T..."
  }
}
```

## Setup Instructions

### 1. Firebase/Firestore Setup

1. Go to [Firebase Console](https://console.firebase.google.com)
2. Create a new project
3. Enable Firestore database
4. Create service account key:
   - Project Settings → Service Accounts
   - Generate new private key (JSON)
5. Copy the values to `.env.local`:
   - `FIREBASE_PROJECT_ID`
   - `FIREBASE_PRIVATE_KEY`
   - `FIREBASE_CLIENT_EMAIL`

### 2. Local Development

```bash
# Install dependencies
npm install firebase-admin

# Start local development server
netlify dev

# The functions will be available at http://localhost:8888/.netlify/functions/
```

### 3. Environment Variables

Copy `.env.local.example` to `.env.local` and fill in your Firebase credentials.

## Testing the API Locally

```bash
# Create a story
curl -X POST http://localhost:8888/.netlify/functions/api/stories \
  -H "Content-Type: application/json" \
  -d '{
    "title": "Test Story",
    "author": "Test Author",
    "content": "You find yourself in a cave. If you go left turn to page 2. If you go right turn to page 3."
  }'

# List stories
curl http://localhost:8888/.netlify/functions/api/stories

# Get a story
curl http://localhost:8888/.netlify/functions/api/stories/{STORY_ID}
```

## Database Schema

### Stories Collection

```
stories/
├── {storyId}/
│   ├── title: string
│   ├── author: string
│   ├── content: string (full story text)
│   ├── pages: array (parsed pages with choices)
│   ├── graph: object (story graph structure)
│   ├── status: string ("draft" | "published")
│   ├── createdAt: timestamp
│   └── updatedAt: timestamp
```

## Code Maintenance

### Key Functions

#### `parseStoryPages(content)`
Parses story content and extracts pages and choices using regex patterns. Looks for "turn to page X" phrases.

#### `buildGraphFromPages(pages)`
Converts page array into a graph structure with nodes and edges for visualization.

#### `generateAllStories(graph, pages, startPage, maxDecisions)`
Traverses story graph using depth-first search, generating all possible paths with safeguards.

### Error Handling

All API endpoints return structured error responses:

```json
{
  "error": "Error message describing what went wrong"
}
```

HTTP status codes:
- `200` - Success
- `201` - Created
- `400` - Bad request (missing/invalid data)
- `404` - Not found
- `405` - Method not allowed
- `500` - Server error

## Deployment to Netlify

1. Push code to GitHub
2. Connect repository to Netlify
3. Set environment variables in Netlify dashboard:
   - `FIREBASE_PROJECT_ID`
   - `FIREBASE_PRIVATE_KEY`
   - `FIREBASE_CLIENT_EMAIL`
4. Functions auto-deploy with each push

## Performance Considerations

### Firestore Limits
- Document size: 1 MB max
- Collections can handle unlimited documents
- Read/write operations billed per operation

### Optimization Tips
- Cache story data in frontend when possible
- Paginate large story lists
- Consider adding story search/filtering
- Monitor Firestore usage in Firebase Console

## Future Enhancements

- [ ] User authentication (Firebase Auth)
- [ ] Story search and filtering
- [ ] User-specific story collections
- [ ] Story versioning/history
- [ ] Advanced graph visualization
- [ ] Story sharing/collaboration
- [ ] Analytics on story paths
