import { useState, useRef, useEffect} from 'react';
import Autocomplete from '@mui/material/Autocomplete';
import TextField from '@mui/material/TextField';
import './App.css'
import { AyahDisplay, fetchRandomAyah, fetchSpecificAyah} from './Ayah';
import useFetchAyah from "./hooks/useFetchAyah";

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

const ayahs_per_surah = [7, 286, 200, 176, 120, 165, 206, 75, 129, 109,  
    123, 111, 43, 52, 99, 128, 111, 110, 98, 135,   
    112, 78, 118, 64, 77, 227, 93, 88, 69, 60,      
    34, 30, 73, 54, 45, 83, 182, 88, 75, 85,        
    54, 53, 89, 59, 37, 35, 38, 29, 18, 45,         
    60, 49, 62, 55, 78, 96, 29, 22, 24, 13,         
    14, 11, 11, 18, 12, 12, 30, 52, 52, 44,        
    28, 28, 20, 56, 40, 31, 50, 40, 46, 42,         
    29, 19, 36, 25, 22, 17, 19, 26, 30, 20,         
    15, 21, 11, 8, 8, 19, 5, 8, 8, 11,            
    11, 8, 3, 9, 5, 4, 7, 3, 6, 3,             
    5, 4, 5, 6                                     
];

  function guessSurah() {
    // if (!surahIdGuess.current) {
    //   setResultMessage("Please select a Surah first.");
    //   return;
    // }

    // if (surahIdGuess.current == trueChapterId ) {
    //   setResultMessage("✅ Correct! Great job!");
    //   setScore((prev) => {return prev + 1 });
    // } else {
    //   setResultMessage(
    //     `❌ Incorrect. The correct Surah was ${trueChapterId}: ${surah_names[trueChapterId - 1]}`
    //   );
    // }
    
}

function QuizGuessSurah() {

  const {loading, error, loadAyah } = useFetchAyah(); 
  const [ayahList, setAyahList] = useState([]);

  const [resultMessage, setResultMessage] = useState("");
  const [score, setScore] = useState(0);
  const surahIdGuess = useRef(null);

  useEffect(() => {
    refreshAyah();
  }, []); // Empty dependency array = runs once on mount

  const refreshAyah = async () => {
    const newAyah = await loadAyah(fetchRandomAyah);
    if (newAyah) {
      setAyahList([newAyah]); // Reset to only the new random ayah
    }
  };

  const handleNext = async () => {
    if (ayahList.length === 0) return;
    
    const lastAyah = ayahList[ayahList.length - 1];
    const nextVerseKey = getNextVerseKey(lastAyah.verse_key);
    
    const newAyah = await loadAyah(fetchSpecificAyah, { verse_key: nextVerseKey });
    if (newAyah) {
      setAyahList([...ayahList, newAyah]); // Add to end
    }
  };

  const handlePrevious = async () => {
    if (ayahList.length === 0) return;
    
    const firstAyah = ayahList[0];
    const prevVerseKey = getPreviousVerseKey(firstAyah.verse_key);
    
    const newAyah = await loadAyah(fetchSpecificAyah, { verse_key: prevVerseKey });
    if (newAyah) {
      setAyahList([newAyah, ...ayahList]); // Add to beginning
    }
  };

  
  if (ayahList.length == 0) {
    return <div>Loading Ayah...</div>;
  }
  
  // const [trueChapterId, trueVerseNumber] = randomAyah.verse_key.split(":") 
  
  
return (
  <>
  <div className="score-counter"> Score: {score}</div>
   <h1>Qur'an Random Ayah </h1>
  <AyahDisplay ayahList={ayahList} loading={loading} error={error}/> 

  <div className="button-group">
    <button onClick={handlePrevious} disabled={loading || ayahList.length === 0}>
      Previous
    </button>
    <button onClick={refreshAyah} disabled={loading}>
      Random Ayah
    </button>
    <button onClick={handleNext} disabled={loading || ayahList.length === 0}>
      Next
    </button>
  </div>

        {error && <p className="error">{JSON.stringify(error)}</p>}   
  <br />
  <div>
    <Autocomplete
    options={surah_ids}
    getOptionLabel={(id) => `${id}. ${surah_names[id - 1]}`}
      onChange={(_, newSurahGuess) => surahIdGuess.current = newSurahGuess }
    renderInput={(params) => <TextField {...params} label="Select Surah" />}
    />
    <button onClick={guessSurah} disabled={loading}>
      Submit
    </button>
    <p>{resultMessage}</p>
   </div>

  </>
)
}

function getNextVerseKey(verse_key){
  let [chapterID, ayahNumber] = verse_key.split(":");
  chapterID = Number(chapterID);
  ayahNumber = Number(ayahNumber);

  if ((ayahNumber + 1) <= ayahs_per_surah[chapterID - 1]){
    return `${chapterID}:${ayahNumber+1}`
  } else if (chapterID + 1 <= ayahs_per_surah.length){
    return `${chapterID + 1}:1`
  } else {
    return null
  }
}

function getPreviousVerseKey(verse_key){
  const [chapterID, ayahNumber] = verse_key.split(":");
  if ((ayahNumber -1) > 0) {
    return `${chapterID}:${ayahNumber-1}`
  } else if ((chapterID - 1) > 0){
    return `${chapterID-1}:${ayahs_per_surah[chapterID-1]}`
  } else{
    return null
  }
}

export {QuizGuessSurah}
 