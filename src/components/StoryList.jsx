import { useState, useEffect } from 'react'
import { useNavigate } from 'react-router-dom'

export default function StoryList() {
  const navigate = useNavigate()
  const [stories, setStories] = useState([])
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    // TODO: Replace with real API call to /api/stories
    // Dummy data for now
    const dummyStories = [
      {
        id: '1',
        title: 'The Cave of Time',
        author: 'Choose Your Own Adventure',
        status: 'published',
        createdAt: new Date().toISOString()
      },
      {
        id: '2',
        title: 'Lost in the Forest',
        author: 'Adventure Writer',
        status: 'draft',
        createdAt: new Date().toISOString()
      }
    ]
    setStories(dummyStories)
    setLoading(false)
  }, [])

  if (loading) {
    return <div className="text-center text-gray-500">Loading stories...</div>
  }

  if (stories.length === 0) {
    return (
      <div className="text-center py-12">
        <p className="text-gray-500 mb-4">No stories yet. Create one to get started!</p>
        <button
          onClick={() => navigate('/author')}
          className="px-6 py-2 bg-indigo-600 text-white rounded-lg hover:bg-indigo-700 transition"
        >
          Create First Story
        </button>
      </div>
    )
  }

  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
      {stories.map(story => (
        <div
          key={story.id}
          className="bg-white rounded-lg shadow hover:shadow-lg transition overflow-hidden"
        >
          <div className="p-6">
            <div className="flex items-start justify-between mb-3">
              <h3 className="text-lg font-semibold text-gray-800 flex-1">
                {story.title}
              </h3>
              <span className={`px-2 py-1 text-xs font-semibold rounded ${
                story.status === 'published'
                  ? 'bg-green-100 text-green-800'
                  : 'bg-yellow-100 text-yellow-800'
              }`}>
                {story.status}
              </span>
            </div>
            
            <p className="text-sm text-gray-600 mb-4">
              by {story.author}
            </p>
            
            <p className="text-xs text-gray-500 mb-4">
              Created {new Date(story.createdAt).toLocaleDateString()}
            </p>

            <div className="flex gap-2">
              <button
                onClick={() => navigate(`/read/${story.id}`)}
                className="flex-1 px-4 py-2 bg-indigo-600 text-white rounded-lg hover:bg-indigo-700 transition text-sm font-semibold"
              >
                Read
              </button>
              <button
                onClick={() => console.log('Edit story', story.id)}
                className="flex-1 px-4 py-2 bg-gray-200 text-gray-800 rounded-lg hover:bg-gray-300 transition text-sm font-semibold"
              >
                Edit
              </button>
            </div>
          </div>
        </div>
      ))}
    </div>
  )
}
