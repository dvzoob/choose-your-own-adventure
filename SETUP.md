# CYOA Web App - Setup Complete ✅

## Phase 0 Setup Complete

This is the scaffold for the Choose-Your-Own-Adventure web application built with React, Vite, and Netlify Functions.

### Project Structure

```
cyoa-app/
├── src/
│   ├── components/
│   │   ├── AuthorForm.jsx      ← Person B: Story creation form
│   │   ├── StoryList.jsx       ← Person B: Browse stories
│   │   ├── SimpleGraph.jsx     ← Person B: Graph visualization
│   │   └── EditorPage.jsx      ← Person B: Story editor
│   ├── pages/
│   │   ├── Home.jsx            ← Landing page with story list
│   │   ├── Author.jsx          ← Story creation page
│   │   └── Read.jsx            ← Story reader
│   ├── App.jsx                 ← Main app with routing
│   ├── main.jsx
│   └── index.css               ← Tailwind CSS
├── netlify/
│   └── functions/              ← Person A: API endpoints (to be created)
│       ├── api/
│       │   ├── stories.js      (CRUD)
│       │   ├── build-graph.js  (Wraps Python)
│       │   └── write-stories.js (Wraps Python)
│       └── db/
│           └── index.js        (Firestore helpers)
├── netlify.toml                ← Netlify configuration
├── tailwind.config.js
├── postcss.config.js
├── package.json
└── .env.local                  ← Firestore config (git ignored)
```

### Getting Started

#### 1. Install Dependencies
```bash
cd cyoa-app
npm install
```

#### 2. Configure Environment Variables
Update `.env.local` with your Firestore credentials:
```
VITE_FIREBASE_API_KEY=your_key
VITE_FIREBASE_PROJECT_ID=your_project
VITE_FIREBASE_DATABASE_URL=your_url
```

#### 3. Run Development Server
```bash
npm run dev
```
Opens at `http://localhost:5173`

#### 4. Run with Netlify Functions (Local)
```bash
npm run dev
# In another terminal:
npx netlify dev
```

#### 5. Build for Production
```bash
npm run build
```

### Person B Tasks (Frontend) - Phase 1b

**Estimated Time: 2 hours**

Your components are scaffolded and ready. Implementation tasks:

1. **AuthorForm.jsx** - DONE (basic form with validation)
2. **StoryList.jsx** - DONE (displays stories with Read/Edit buttons)
3. **SimpleGraph.jsx** - DONE (simple node/edge visualization)
4. **EditorPage.jsx** - DONE (story editor with graph generation)

#### TODO Items:
- Replace API stub calls with real `/api/stories` endpoints (Person A will provide)
- Add story list pagination if needed
- Enhance graph visualization if desired
- Add error handling and loading states
- Test end-to-end workflow

### Person A Tasks (Backend) - Phase 1a

**Estimated Time: 2-3 hours**

1. Create Netlify Functions in `/netlify/functions/api/`:
   - `stories.js` - CRUD endpoints (GET, POST, PUT, DELETE)
   - `build-graph.js` - Wrap Python `build_story_graph.py`
   - `write-stories.js` - Wrap Python `write_all_stories.py`

2. Set up Firebase in `/src/firebase.js`

3. Create `Reader.jsx` component for story playback

### Key Stack
- **Frontend**: React 18 + Vite
- **CSS**: Tailwind CSS
- **Backend**: Netlify Functions (Node.js)
- **Database**: Firestore
- **Deployment**: Netlify

### Development Workflow

1. **Person A**: Work on backend in `netlify/functions/` branch `person-a/*`
2. **Person B**: Work on frontend in `src/` (you are here) branch `person-b/*`
3. **Sync at 1:30 PM**: Check progress and identify blockers
4. **Phase 2 (2:30 PM)**: Integrate backend and frontend
5. **Phase 3 (3:30 PM)**: Deploy to Netlify

### API Contracts (for Integration)

These endpoints will be created by Person A:

```javascript
// GET /api/stories
{ stories: [{ id, title, author, status, createdAt }] }

// POST /api/stories
Request: { title, author, content }
Response: { id, title, author, status, createdAt }

// GET /api/stories/:id
{ id, title, author, content, graph, status }

// PUT /api/stories/:id
Request: { title, author, content }
Response: { ...updated }

// DELETE /api/stories/:id
Response: { success: true }

// POST /api/build-graph
Request: { content }
Response: { nodes: [...], edges: [...] }

// POST /api/write-stories
Request: { graph }
Response: { stories: [...] }
```

### Tips for Person B

- ✅ Components have dummy data - they work without backend
- ✅ Tailwind classes are already configured
- ✅ React Router is set up for multi-page navigation
- ✅ Use `TODO` comments for API integration points
- ✅ Keep components focused and reusable

### Testing the App

1. Start dev server: `npm run dev`
2. Visit `http://localhost:5173`
3. Navigate: Home → Create Story → Read Story
4. All pages should load and dummy data should display

### Deployment to Netlify

```bash
git push origin person-b/frontend
# Create PR and merge to main
git push origin main
# Netlify auto-deploys on push to main
```

### Next Steps
- Work on Person B tasks in Phase 1b
- Prepare API integration points for Phase 2
- Test with dummy data before integrating with backend
- Communicate blockers immediately in Phase 2

---

**Good luck!** 🚀 You've got a solid foundation. Now build the UI! ✨
