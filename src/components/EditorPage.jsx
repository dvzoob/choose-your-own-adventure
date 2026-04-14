import { useState, useEffect } from 'react'
import SimpleGraph from './SimpleGraph'

export default function EditorPage({ storyId }) {
  const [story, setStory] = useState({
    title: '',
    author: '',
    content: ''
  })
  const [graph, setGraph] = useState(null)
  const [loading, setLoading] = useState(false)
  const [message, setMessage] = useState('')

  useEffect(() => {
    // TODO: Fetch story from /api/stories/:id if editing
    // For now, start with empty story
  }, [storyId])

  const handleChange = (e) => {
    const { name, value } = e.target
    setStory(prev => ({
      ...prev,
      [name]: value
    }))
  }

  const handleGenerateGraph = async () => {
    setLoading(true)
    try {
      // TODO: Call /api/build-graph with current content
      // Dummy response for now
      setGraph({
        nodes: [
          { id: 1, isMainTrunk: true, isTerminal: false },
          { id: 2, isMainTrunk: false, isTerminal: false },
          { id: 3, isMainTrunk: false, isTerminal: false },
          { id: 4, isMainTrunk: false, isTerminal: true }
        ],
        edges: [
          { source: 1, target: 2 },
          { source: 1, target: 3 },
          { source: 2, target: 4 }
        ]
      })
      setMessage('Graph generated successfully!')
    } catch (error) {
      setMessage('Error generating graph')
      console.error(error)
    } finally {
      setLoading(false)
    }
  }

  const handleSave = async () => {
    setLoading(true)
    try {
      // TODO: Call /api/stories/:id with PUT request
      setMessage('Story saved successfully!')
    } catch (error) {
      setMessage('Error saving story')
      console.error(error)
    } finally {
      setLoading(false)
    }
  }

  return (
    <div className="space-y-6">
      {/* Story Metadata */}
      <div className="grid grid-cols-2 gap-4">
        <div>
          <label className="block text-sm font-semibold text-gray-700 mb-2">
            Title
          </label>
          <input
            type="text"
            name="title"
            value={story.title}
            onChange={handleChange}
            className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-indigo-500"
          />
        </div>
        <div>
          <label className="block text-sm font-semibold text-gray-700 mb-2">
            Author
          </label>
          <input
            type="text"
            name="author"
            value={story.author}
            onChange={handleChange}
            className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-indigo-500"
          />
        </div>
      </div>

      {/* Content Editor */}
      <div>
        <label className="block text-sm font-semibold text-gray-700 mb-2">
          Story Content
        </label>
        <textarea
          name="content"
          value={story.content}
          onChange={handleChange}
          rows="10"
          className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-indigo-500 font-mono text-sm"
        />
      </div>

      {/* Action Buttons */}
      <div className="flex gap-4">
        <button
          onClick={handleGenerateGraph}
          disabled={loading}
          className="px-6 py-2 bg-green-600 text-white rounded-lg hover:bg-green-700 transition disabled:opacity-50"
        >
          Generate Graph
        </button>
        <button
          onClick={handleSave}
          disabled={loading}
          className="px-6 py-2 bg-indigo-600 text-white rounded-lg hover:bg-indigo-700 transition disabled:opacity-50"
        >
          Save Story
        </button>
      </div>

      {/* Message */}
      {message && (
        <div className={`p-4 rounded-lg ${
          message.includes('Error')
            ? 'bg-red-100 text-red-700'
            : 'bg-green-100 text-green-700'
        }`}>
          {message}
        </div>
      )}

      {/* Graph Visualization */}
      {graph && (
        <div className="mt-8">
          <SimpleGraph graph={graph} />
        </div>
      )}
    </div>
  )
}
