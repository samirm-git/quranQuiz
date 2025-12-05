import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import { BrowserRouter as Router, Routes, Route, Link } from "react-router-dom";
import './index.css'
import { QuizGuessSurah } from './QuizGuessSurah.jsx'
import { Testing } from './Testing.jsx';

createRoot(document.getElementById('root')).render(
  <StrictMode>
    <Router>
      <Routes>
        <Route path="/guessSurah" element={<QuizGuessSurah/>} />
        <Route path="/" element={<Testing/>} />
      </Routes>
    </Router>
  </StrictMode>,
)
