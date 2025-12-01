import { useState, useRef, useEffect} from 'react';
import Autocomplete from '@mui/material/Autocomplete';
import TextField from '@mui/material/TextField';
import './App.css'
import { AyahDisplay, fetchRandomAyah, fetchSpecificAyah} from './Ayah';
import useFetchAyah from "./hooks/useFetchAyah";
import { surah_ids, surah_names, ayahs_per_surah } from './constants';


//what is the difference between putting the parameters like this (x,y) and ({x,y})
function QuizButton({trueChapterId, loading, onCorrectAnswer}) {
    const [resultMessage, setResultMessage] = useState("");
    const [guessChapterID, setGuessChapterID] = useState(null);
    const [isSubmitted, setIsSubmitted] = useState(false);

    const handleSubmit = () => {
        if (!guessChapterID) {
            setResultMessage("Please select a Surah first");
            return;
        }

        if (guessChapterID == trueChapterId) {
            setResultMessage("✅ Correct! Great job!");
            onCorrectAnswer();
        } else {
            setResultMessage(`❌ Incorrect. The correct Surah was ${trueChapterId}: ${surah_names[trueChapterId - 1]}`);
        }
        setIsSubmitted(true);
    }

    return (
        <>
            <Autocomplete
                options={surah_ids}
                getOptionLabel={(id) => `${id}. ${surah_names[id - 1]}`}
                onChange={(_, newSurahGuess) => setGuessChapterID(newSurahGuess)}
                renderInput={(params) => <TextField {...params} label="Select Surah" />}
                disabled={isSubmitted}
            />
            <button
                disabled={loading || isSubmitted}
                onClick={handleSubmit}
            >
                Show Result
            </button>
            {resultMessage && <div>{resultMessage}</div>}
        </>
    );
} 

function QuizGuessSurah() {
  const {loading, error, loadAyah } = useFetchAyah(); 
  const [ayahList, setAyahList] = useState([]);
  const [quizAyahKey, setQuizAyahKey] = useState(null);
  const [score, setScore] = useState(0);

  useEffect(() => {
    refreshAyah();
  }, []); // Empty dependency array = runs once on mount

  const refreshAyah = async () => {
    const newAyah = await loadAyah(fetchRandomAyah);
    if (newAyah) {
      setAyahList([newAyah]); // Reset to only the new random ayah
      setQuizAyahKey(newAyah.verse_key);
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
  
return (
  <>
   <div className="score-counter">Score: {score}</div>
   <h1>Qur'an Random Ayah </h1>
  <AyahDisplay ayahList={ayahList} loading={loading} error={error} quizAyahKey={quizAyahKey}/> 

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
  <QuizButton 
        key={quizAyahKey}  // This is the magic line!
        trueChapterId={quizAyahKey.split(":")[0]} 
        loading={loading}
        onCorrectAnswer={() => setScore(prev => prev + 1)}
  />
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
 