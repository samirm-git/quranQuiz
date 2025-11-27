import { useState, useRef, useEffect} from 'react';
import Autocomplete from '@mui/material/Autocomplete';
import TextField from '@mui/material/TextField';
import './App.css'

//1) Make ayah.jsx which has 2 function - 1 to fetch random ayah, 2 to display ayah UI. 
// 2) in other pages import the fetch random ayah function, and then use the UI component with the random ayah passed in as a prop
// 3) Need to add filter options to modify random ayah generation 
function QuizGuessSurah({trueVerseKey}) {
  const [trueChapterId, trueVerseNumber] = trueVerseKey.split(":") 
  const [resultMessage, setResultMessage] = useState("");
  const [score, setScore] = useState(0);
  const [disableGuess, setDisableGuess] = useState(false);

  useEffect( () => {setDisableGuess(false)}, [trueVerseKey]);

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
  const surahIdGuess = useRef(null);

  function guessSurah() {
    console.log(`surahIdGuess.current: ${surahIdGuess.current}`)
    if (!surahIdGuess.current) {
      setResultMessage("Please select a Surah first.");
      return;
    }
    setDisableGuess(true)

    if (surahIdGuess.current == trueChapterId ) {
      setResultMessage("✅ Correct! Great job!");
      setScore((prev) => {return prev + 1 });
    } else {
      setResultMessage(
        `❌ Incorrect. The correct Surah was ${trueChapterId}: ${surah_names[trueChapterId - 1]}`
      );
    }
}
  

return (
  <>
  <div className="score-counter"> Score: {score}</div>
  <div>
    <Autocomplete
    options={surah_ids}
    getOptionLabel={(id) => `${id}. ${surah_names[id - 1]}`}
      onChange={(_, newSurahGuess) => surahIdGuess.current = newSurahGuess }
    renderInput={(params) => <TextField {...params} label="Select Surah" />}
    />
    <button onClick={guessSurah} disabled={disableGuess}>
      Submit
    </button>
    <p>{resultMessage}</p>
   </div>

  </>
)
}
export {QuizGuessSurah}
 