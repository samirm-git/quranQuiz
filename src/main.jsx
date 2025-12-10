import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import { BrowserRouter as Router, Routes, Route, Link } from "react-router-dom";
import './index.css'
import QuizGuessSurah from './QuizGuessSurah'
import QuizCompleteTheAyah from './QuizCompleteTheAyah'; 
import App from './App'

createRoot(document.getElementById('root')).render(
  <StrictMode>
    <Router>
      <Routes>
        <Route path="/" element={<App/>} />
        <Route path="/guessSurah" element={<QuizGuessSurah/>} />
        <Route path="/completeTheAyah" element={<QuizCompleteTheAyah/>}/>
      </Routes>
    </Router>
  </StrictMode>,
)
