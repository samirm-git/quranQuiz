import { useState, useEffect, useCallback  } from 'react'
import axios from 'axios'
import './App.css'
import {QuizGuessSurah} from './QuizGuessSurah'


async function fetchRandomAyah({chapter_number, page_number, juz_number, hizb_number,
  rub_el_hizb_number, ruku_number, manzil_number, language, words, translations, audio, tafsirs} = {}){

  let params = {
    chapter_number: chapter_number,
    page_number: page_number,
    juz_number: juz_number,
    hizb_number: hizb_number,
    rub_el_hizb_number: rub_el_hizb_number,
    ruku_number: ruku_number,
    manzil_number: manzil_number,
    language: language,
    words: words,
    translations: translations,
    audio: audio,
    tafsirs: tafsirs,
  };

  Object.keys(params).forEach(
    key => params[key] === undefined && delete params[key]
  );

  const res = await axios({
    method: 'get',
    url: '/api/random_ayah',
    params
  });

  return res
}

function App() {
  const [count, setCount] = useState(0)

  const [ayah, setAyah] = useState(null)
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState(null)
    
  const RandomAyah = useCallback(async () => {
    setLoading(true)
    setError(null)
    try {
      const res = await fetchRandomAyah({juz_number:30}) 
      console.log(res)

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
    RandomAyah()
  }, [RandomAyah])
  

  return (
    <>
      <h1>Qur'an Random Ayah </h1>

      <div className="card">
        <button onClick={RandomAyah} disabled={loading}>
          {loading ? 'Loading...' : 'Get Random Ayah'}
        </button>

        {error && <p className="error">{JSON.stringify(error)}</p>}

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
        <br />
          {ayah && <QuizGuessSurah/>}
          

      </div>
    </>
  )
}

export default App
