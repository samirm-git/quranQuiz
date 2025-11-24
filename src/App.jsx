import { useState, useEffect, useCallback  } from 'react'
import axios from 'axios'
import reactLogo from '/react.svg'
import viteLogo from './assets/vite.svg'
import './App.css'

function App() {
  const [count, setCount] = useState(0)

  const [ayah, setAyah] = useState(null)
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState(null)

  const fetchRandomAyah = useCallback(async () => {
    setLoading(true)
    setError(null)
    try {
      const res = await axios({
        method: 'get',
        url: '/api/random_ayah'
      })
      // if (!res.ok) throw new Error(`HTTP error! Status: ${res.status}`)
      setAyah(res.data.verse) // adapt to your API response structure
    } catch (err) {
    // Properly read error from Axios
    if (err.response) {
      // Server responded with a status outside 2xx
      console.error('Server responded with error:', err.response.data)
      setError(err.response.data.error || 'Server error')
    } else if (err.request) {
      // Request made but no response
      console.error('No response received:', err.request)
      setError('No response from server')
    } else {
      // Something else happened
      console.error('Error setting up request:', err.message)
      setError(err.message)
    }
    } finally {
      setLoading(false)
    }
  }, [])

  useEffect(() => {
    fetchRandomAyah()
  }, [fetchRandomAyah])

  return (
    <>
      <div>
        <a href="https://vite.dev" target="_blank">
          <img src={viteLogo} className="logo" alt="Vite logo" />
        </a>
        <a href="https://react.dev" target="_blank">
          <img src={reactLogo} className="logo react" alt="React logo" />
        </a>
      </div>
      <h1>Vite + React</h1>
      <div className="card">
        <button onClick={() => setCount((count) => count + 1)}>
          count is {count}
        </button>
        <p>
          Edit <code>src/App.jsx</code> and save to test HMR
        </p>
        <p> Hello,  Dev</p>
      </div>
      <p className="read-the-docs">
        Click on the Vite and React logos to learn more
      </p>

      <h1>Qur'an Random Ayah</h1>

      <div className="card">
        <button onClick={fetchRandomAyah} disabled={loading}>
          {loading ? 'Loading...' : 'Get Random Ayah'}
        </button>

        {error && <p className="error">{error}</p>}

        {ayah && (
          <div className="ayah-display">
            <p style={{ fontSize: '1.5rem', marginTop: '1rem' }}>
              {ayah.text_uthmani || ayah.text_indopak || 'No text available'}
            </p>
            {ayah.verse_key && (
              <p style={{ marginTop: '0.5rem', fontStyle: 'italic' }}>
                — Surah {ayah.verse_key} 
              </p>
            )}
          </div>
        )}
      </div>
    </>
  )
}

export default App
