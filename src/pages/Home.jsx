import { useNavigate } from 'react-router-dom'
import StoryList from '../components/StoryList'

export default function Home() {
  const navigate = useNavigate()

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 to-indigo-50">
      {/* Navigation */}
      <nav className="bg-white shadow">
        <div className="max-w-6xl mx-auto px-4 py-4 flex justify-between items-center">
          <h1 className="text-2xl font-bold text-indigo-600">CYOA Maker</h1>
          <div className="flex gap-4">
            <button
              onClick={() => navigate('/author')}
              className="px-6 py-2 bg-indigo-600 text-white rounded-lg hover:bg-indigo-700 transition"
            >
              Create Story
            </button>
          </div>
        </div>
      </nav>

      {/* Hero Section */}
      <div className="max-w-6xl mx-auto px-4 py-12">
        <div className="text-center mb-12">
          <h2 className="text-4xl font-bold text-gray-800 mb-4">
            Choose Your Own Adventure
          </h2>
          <p className="text-xl text-gray-600">
            Create and explore interactive branching stories
          </p>
        </div>

        {/* Story List */}
        <StoryList />
      </div>
    </div>
  )
}
