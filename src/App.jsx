import { BrowserRouter as Router, Routes, Route } from 'react-router-dom'
import ErrorBoundary from './components/ErrorBoundary'
import Home from './pages/Home'
import Author from './pages/Author'
import Read from './pages/Read'
import Footer from './components/Footer'
import './index.css'

function App() {
  return (
    <Router>
      <ErrorBoundary>
        <div className="min-h-screen bg-slate-50 text-slate-900 overflow-x-hidden">
          <main className="flex-grow px-4 sm:px-6 lg:px-8">
            <Routes>
              <Route path="/" element={<Home />} />
              <Route path="/author" element={<Author />} />
              <Route path="/read/:id" element={<Read />} />
            </Routes>
          </main>
          <Footer />
        </div>
      </ErrorBoundary>
    </Router>
  )
}

export default App
