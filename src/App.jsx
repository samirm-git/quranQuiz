import { useState, useEffect, useCallback  } from 'react'
import axios from 'axios'
import Autocomplete from '@mui/material/Autocomplete';
import TextField from '@mui/material/TextField';
import './App.css'

function App() {
  const [count, setCount] = useState(0)

  const [ayah, setAyah] = useState(null)
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState(null)
  
  const [resultMessage, setResultMessage] = useState("");
  const surah_ids = Array.from({length: 114}, (_, index) => index + 1);
  const surah_names = [
  "Al-Fatiha", "Al-Baqara", "Aal-Imran", "An-Nisaa'", "Al-Ma'ida", "Al-An'am",
  "Al-A'raf", "Al-Anfal", "Al-Tawba", "Yunus", "Hud", "Yusuf", "Ar-Ra'd",
  "Ibrahim", "Al-Hijr", "An-Nahl", "Al-Israa", "Al-Kahf", "Maryam", "Ta-Ha",
  "Al-Anbiya", "Al-Hajj", "Al-Muminun", "An-Nur", "Al-Furqan", "Ash-Shuara",
  "An-Naml", "Al-Qasas", "Al-Ankabut", "Ar-Rum", "Luqman", "As-Sajdah",
  "Al-Ahzab", "Saba", "Fatir", "Yasin", "As-Saffat", "Sad", "Az-Zumar", "Ghafir",
  "Fussilat", "Ash-Shura", "Az-Zukhruf", "Ad-Dukhan", "Al-Jathiya", "Al-Ahqaf",
  "Muhammad", "Al-Fath", "Al-Hujurat", "Qaf", "Az-Zariyat", "At-Tur", "An-Najm",
  "Al-Qamar", "Ar-Rahman", "Al-Waqia", "Al-Hadid", "Al-Mujadilah", "Al-Hashr",
  "Al-Mumtahinah", "As-Saff", "Al-Jumu'ah", "Al-Munafiqun", "At-Taghabun",
  "At-Talaq", "At-Tahrim", "Al-Mulk", "Al-Qalam", "Al-Haqqah", "Al-Ma'arij",
  "Nuh", "Al-Jinn", "Al-Muzzammil", "Al-Muddaththir", "Al-Qiyamah", "Al-Insan",
  "Al-Mursalat", "An-Naba", "An-Naziat", "Abasa", "At-Takwir", "Al-Infitar",
  "Al-Mutaffifin", "Al-Inshiqaq", "Al-Buruj", "At-Tariq", "Al-Ala", "Al-Ghashiyah",
  "Al-Fajr", "Al-Balad", "Ash-Shams", "Al-Lail", "Ad-Duha", "Ash-Sharh", "At-Tin",
  "Al-Alaq", "Al-Qadr", "Al-Bayinah", "Az-Zalzalah", "Al-Adiyat", "Al-Qariah",
  "Al-Takathur", "Al-Asr", "Al-Humazah", "Al-Fil", "Quraish", "Al-Ma'un",
  "Al-Kauthar", "Al-Kafirun", "An-Nasr", "Al-Masad", "Al-Ikhlas", "Al-Falaq",
  "An-Nas"
]; 
  let surah_id_guess
  let true_surah_id = 1
  
  function guessSurah() {
  if (!surah_id_guess) {
    setResultMessage("Please select a Surah first.");
    return;
  }

  if (surah_id_guess === true_surah_id) {
    setResultMessage("✅ Correct! Great job!");
    setScore((prev) => prev + 1);
  } else {
    setResultMessage(
      `❌ Incorrect. The correct Surah was ${true_surah_id}: ${surah_names[true_surah_id - 1]}`
    );
  }
}

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
        <br />
          {ayah && <div>
            <Autocomplete
            options={surah_ids}
            getOptionLabel={(id) => `${id}. ${surah_names[id - 1]}`}
             onChange={(_, newSurahGuess) => surah_id_guess = newSurahGuess }
            renderInput={(params) => <TextField {...params} label="Select Surah" />}
            />
            <button onClick={guessSurah}>
              Submit
            </button>
            <p>{resultMessage}</p>
            </div>
            }
          

      </div>
    </>
  )
}

export default App
