import { useNavigate, useParams } from 'react-router-dom'
import { useEffect, useState } from 'react'

export default function Read() {
  const navigate = useNavigate()
  const { id } = useParams()
  const [story, setStory] = useState(null)
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    // TODO: Fetch story from /api/stories/:id
    // For now, we'll use dummy data
    setStory({
      id,
      title: 'The Cave of Time',
      author: 'Choose Your Own Adventure',
      content: 'You stand at the entrance of a mysterious cave...',
      pages: [
        {
          id: 1,
          content: 'You stand at the entrance of a mysterious cave. What do you do?',
          choices: [
            { text: 'Enter the cave', next: 2 },
            { text: 'Turn back', next: 3 }
          ]
        },
        {
          id: 2,
          content: 'Inside the cave it is dark and cold...',
          choices: [
            { text: 'Light a torch', next: 4 },
            { text: 'Go back outside', next: 1 }
          ]
        },
        {
          id: 3,
          content: 'You turn back and head home. THE END.',
          choices: []
        },
        {
          id: 4,
          content: 'The cave is illuminated. You see ancient ruins... THE END.',
          choices: []
        }
      ]
    })
    setLoading(false)
  }, [id])

  const [currentPage, setCurrentPage] = useState(1)

  if (loading) {
    return <div className="min-h-screen flex items-center justify-center">Loading...</div>
  }

  if (!story) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="text-center">
          <p className="text-xl text-gray-600 mb-4">Story not found</p>
          <button
            onClick={() => navigate('/')}
            className="px-6 py-2 bg-indigo-600 text-white rounded-lg hover:bg-indigo-700"
          >
            Back to Home
          </button>
        </div>
      </div>
    )
  }

  const page = story.pages.find(p => p.id === currentPage)

  return (
    <div className="min-h-screen bg-gradient-to-br from-green-50 to-blue-50">
      {/* Navigation */}
      <nav className="bg-white shadow">
        <div className="max-w-4xl mx-auto px-4 py-4 flex justify-between items-center">
          <button
            onClick={() => navigate('/')}
            className="text-2xl font-bold text-indigo-600 hover:text-indigo-700"
          >
            ← Home
          </button>
          <h1 className="text-2xl font-bold text-indigo-600">{story.title}</h1>
          <div className="w-24"></div>
        </div>
      </nav>

      {/* Reader */}
      <div className="max-w-2xl mx-auto px-4 py-12">
        <div className="bg-white rounded-lg shadow-lg p-8">
          <h2 className="text-xl font-semibold text-gray-800 mb-4">
            Page {currentPage}
          </h2>
          <p className="text-lg text-gray-700 mb-8 leading-relaxed">
            {page?.content}
          </p>

          {page?.choices && page.choices.length > 0 ? (
            <div className="flex flex-col gap-4">
              {page.choices.map((choice, idx) => (
                <button
                  key={idx}
                  onClick={() => setCurrentPage(choice.next)}
                  className="px-6 py-3 bg-indigo-600 text-white rounded-lg hover:bg-indigo-700 transition text-left font-semibold"
                >
                  → {choice.text}
                </button>
              ))}
            </div>
          ) : (
            <div className="text-center">
              <p className="text-gray-600 mb-4">The End</p>
              <button
                onClick={() => navigate('/')}
                className="px-6 py-2 bg-indigo-600 text-white rounded-lg hover:bg-indigo-700"
              >
                Back to Home
              </button>
            </div>
          )}
        </div>
      </div>
    </div>
  )
}
