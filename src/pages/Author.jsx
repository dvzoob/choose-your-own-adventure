import { useNavigate } from 'react-router-dom'
import AuthorForm from '../components/AuthorForm'

export default function Author() {
  const navigate = useNavigate()

  return (
    <div className="min-h-screen bg-gradient-to-br from-purple-50 to-pink-50">
      {/* Navigation */}
      <nav className="bg-white shadow">
        <div className="max-w-6xl mx-auto px-4 py-4 flex justify-between items-center">
          <button
            onClick={() => navigate('/')}
            className="text-2xl font-bold text-indigo-600 hover:text-indigo-700"
          >
            ← Back
          </button>
          <h1 className="text-2xl font-bold text-indigo-600">Create Story</h1>
          <div className="w-24"></div>
        </div>
      </nav>

      {/* Content */}
      <div className="max-w-2xl mx-auto px-4 py-12">
        <AuthorForm />
      </div>
    </div>
  )
}
