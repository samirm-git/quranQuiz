import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import './index.css'
import { QuizGuessSurah } from './QuizGuessSurah.jsx'

createRoot(document.getElementById('root')).render(
  <StrictMode>
    <QuizGuessSurah />
  </StrictMode>,
)
