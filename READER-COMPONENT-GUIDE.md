# Reader Component Guide

## Overview

The Story Reader component is a React component that provides an interactive, engaging interface for reading Choose-Your-Own-Adventure stories. It handles story fetching, page navigation, and displays choices for the user.

## Features

- **Story Loading**: Fetches stories from the backend API
- **Interactive Navigation**: Click choices to navigate through the story
- **Page Tracking**: Shows current page number and visited pages
- **Breadcrumb Trail**: Visual path showing the journey through the story
- **Terminal Page Detection**: Recognizes when a story path ends
- **Restart Functionality**: Ability to restart the story at any time
- **Responsive Design**: Works on desktop and mobile devices
- **Error Handling**: Gracefully displays errors when story fails to load

## Usage

### Basic Setup

```jsx
import StoryReader from './components/Reader';

function App() {
  return (
    <StoryReader 
      storyId="story_123"
      apiUrl="http://localhost:8888"
    />
  );
}
```

### Props

| Prop | Type | Default | Description |
|------|------|---------|-------------|
| `storyId` | string | Required | The ID of the story to display |
| `apiUrl` | string | `''` (same domain) | Base URL for the backend API |

### Component States

#### Loading
Shows "Loading story..." message while fetching data.

#### Error
Displays error message if story fetch fails or story ID doesn't exist.

#### Normal
Shows story content with choices and navigation.

#### Terminal
Shows "The End" message when reader reaches a page with no choices.

## Styling

The component uses CSS modules for scoped styling. Key CSS classes:

- `.container` - Main container with vertical flex layout
- `.header` - Story title and author section
- `.content` - Main story text area
- `.choicesSection` - Container for choice buttons
- `.choiceButton` - Individual choice button
- `.breadcrumb` - Path showing visited pages
- `.footer` - Navigation and controls

### Customization

To customize colors, edit `Reader.module.css`:

```css
/* Example: Change choice button color */
.choiceButton {
  background: linear-gradient(135deg, #YOUR_COLOR1 0%, #YOUR_COLOR2 100%);
}
```

## Component Structure

```
StoryReader
├── Header (Story Title & Author)
├── Main Content Area
│   ├── Page Indicator
│   ├── Story Content
│   ├── Choices (if available)
│   └── Terminal Message (if terminal page)
└── Footer
    ├── Restart Button
    └── Breadcrumb Trail
```

## Data Flow

```
1. Component Mounts
   ↓
2. Fetch Story (useEffect)
   ├── API Call: GET /api/stories/:storyId
   ↓
3. Story Loaded
   ├── Render Header
   ├── Render Current Page Content
   ├── Render Choices (if available)
   ↓
4. User Clicks Choice
   ├── Update Current Page Number
   ├── Add to Visited Pages
   ├── Re-render Content
   ↓
5. End Of Path
   ├── Show Terminal Message
   └── Offer Restart Option
```

## Example Story Format

The backend expects stories in this format:

```json
{
  "id": "story_123",
  "title": "The Cave of Time",
  "author": "Author Name",
  "pages": [
    {
      "pageNum": 1,
      "content": "You awake in a mysterious cave...",
      "choices": [
        {
          "id": "choice_1_0",
          "text": "Go deeper into the cave",
          "targetPage": 2
        },
        {
          "id": "choice_1_1",
          "text": "Go back outside",
          "targetPage": 3
        }
      ]
    },
    {
      "pageNum": 2,
      "content": "You discover an ancient artifact...",
      "choices": []  // Terminal page
    }
  ]
}
```

## Accessibility Features

- Semantic HTML structure
- Clear visual hierarchy
- Readable font sizes and contrast
- Keyboard navigation support
- Screen reader friendly labels

## Performance Tips

- Component only fetches story once on mount
- Page updates are lightweight (just state changes)
- CSS modules prevent style conflicts
- Responsive design without media query overhead

## Troubleshooting

### Story won't load
- Check browser console for errors
- Verify story ID is correct
- Ensure API is responding (test with curl)
- Check CORS settings on backend

### Choices don't appear
- Verify story format has choices array
- Check that `targetPage` is valid
- Ensure story content is parsed correctly by backend

### Styling looks broken
- Clear browser cache
- Check that CSS module is loaded
- Verify no CSS conflicts with global styles

## Future Enhancements

- [ ] Animations on page transitions
- [ ] Sound effects for choices
- [ ] Save/load story progress
- [ ] Story statistics display
- [ ] Dark mode theme
- [ ] Bookmarking functionality
- [ ] Social sharing of story paths
