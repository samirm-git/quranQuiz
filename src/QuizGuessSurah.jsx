import { useState, useRef, useEffect} from 'react';
import Autocomplete from '@mui/material/Autocomplete';
import TextField from '@mui/material/TextField';
import './App.css'
import { AyahDisplay, fetchRandomAyah, fetchSpecificAyah} from './Ayah';
import useFetchAyah from "./hooks/useFetchAyah";
import * as constants from './constants';


//what is the difference between putting the parameters like this (x,y) and ({x,y})
function QuizButton({trueChapterId, loading, setScore}) {
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
            setScore(prev => prev+1);
        } else {
            setResultMessage(`❌ Incorrect. The correct Surah was ${trueChapterId}: ${constants.surah_names[trueChapterId - 1]}`);
        }
        setIsSubmitted(true);
    }

    return (
        <>
            <Autocomplete
                options={constants.surah_ids}
                getOptionLabel={(id) => `${id}. ${constants.surah_names[id - 1]}`}
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

function QuizFilters({setFilters}){
  const [isVisible, setIsVisible] = useState(false);
  
  return (
    <>
      <button 
        className="filter-toggle"
        onClick={() => setIsVisible(!isVisible)}
        aria-label="Toggle filters"
      >
        {isVisible ? 'Filters ▼' : 'Filters ▶'}
      </button>
      <div className={`quiz-filter-group ${isVisible ? 'active' : ''}`}>
        <Autocomplete
          options={constants.juz_ids}
          getOptionLabel={(id) => id.toString()}
          onChange={(_, newJuz) => setFilters(prev => ({ ...prev, juz_number: newJuz }))}
          renderInput={(params) => <TextField {...params} label="Select Juz" />}
        /> 
        <Autocomplete
          options={constants.page_numbers}
          getOptionLabel={(id) => id.toString()}
          onChange={(_, newPage) => setFilters(prev => ({...prev, page_number: newPage}))}
          renderInput={(params) => <TextField {...params} label="Select page number" />}
        />
        <Autocomplete
          options={constants.hizb_numbers}
          getOptionLabel={(id) => id.toString()}
          onChange={(_, newHizb) => setFilters(prev => ({...prev, hizb_number: newHizb}))}
          renderInput={(params) => <TextField {...params} label="Select Hizb number" />}
        />
       <Autocomplete
          options={constants.rub_el_hizb_numbers}
          getOptionLabel={(id) => id.toString()}
          onChange={(_, newRubHizb) => setFilters(prev => ({...prev, rub_el_hizb_number: newRubHizb}))}
          renderInput={(params) => <TextField {...params} label="Select Rub-el-Hizb number" />}
        />
       <Autocomplete
          options={constants.ruku_numbers}
          getOptionLabel={(id) => id.toString()}
          onChange={(_, newRuku) => setFilters(prev => ({...prev, ruku_number: newRuku}))}
          renderInput={(params) => <TextField {...params} label="Select Ruku number" />}
        />
       <Autocomplete
          options={constants.manzil_numbers}
          getOptionLabel={(id) => id.toString()}
          onChange={(_, newManzil) => setFilters(prev => ({...prev, manzil_number: newManzil}))}
          renderInput={(params) => <TextField {...params} label="Select Manzil number" />}
        />
      </div>
    </>
  )
}

function QuizGuessSurah() {
  const {loading, error, loadAyah } = useFetchAyah(); 
  const [ayahList, setAyahList] = useState([]);
  const [quizAyahKey, setQuizAyahKey] = useState(null);
  const [score, setScore] = useState(0);
  const [filters, setFilters] = useState({});

  useEffect(() => {
    refreshAyah();
  }, []); // Empty dependency array = runs once on mount

  const refreshAyah = async () => {
    console.log(`filters: ${JSON.stringify(filters)}`);
    const newAyah = await loadAyah(fetchRandomAyah, filters);
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
      setAyahList(prevList => [...prevList, newAyah]); // Add to end
    }
  };

  const handlePrevious = async () => {
    if (ayahList.length === 0) return;
    
    const firstAyah = ayahList[0];
    const prevVerseKey = getPreviousVerseKey(firstAyah.verse_key);
    
    const newAyah = await loadAyah(fetchSpecificAyah, { verse_key: prevVerseKey });
    if (newAyah) {
      setAyahList(prevList => [newAyah, ...prevList]); // Add to beginning
    }
  };
  
  if (ayahList.length == 0) {
    return <div>Loading Ayah...</div>;
  }
  
return (
  <>
   <div className="score-counter">Score: {score}</div>
   <h1>Qur'an Random Ayah </h1>
   <QuizFilters setFilters={setFilters} />
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
        setScore={setScore}
  />
  <button onClick={() => setScore(0)}>
    Reset Score
  </button>
  </>
)
}

function getNextVerseKey(verse_key){
  let [chapterID, ayahNumber] = verse_key.split(":");
  chapterID = Number(chapterID);
  ayahNumber = Number(ayahNumber);

  if ((ayahNumber + 1) <= constants.ayahs_per_surah[chapterID - 1]){
    return `${chapterID}:${ayahNumber+1}`
  } else if (chapterID + 1 <= constants.ayahs_per_surah.length){
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
    return `${chapterID-1}:${constants.ayahs_per_surah[chapterID-1]}`
  } else{
    return null
  }
}

export {QuizGuessSurah}
 