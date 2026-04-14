import { BrowserRouter as Router, Routes, Route } from 'react-router-dom'
import Home from './pages/Home'
import Author from './pages/Author'
import Read from './pages/Read'
import './index.css'

function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/author" element={<Author />} />
        <Route path="/read/:id" element={<Read />} />
      </Routes>
    </Router>
  )
}

export default App
