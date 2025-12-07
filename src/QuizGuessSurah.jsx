import { useState, useEffect} from 'react';
import './App.css'
import { AyahDisplay, fetchRandomAyah, fetchSpecificAyah} from './Ayah';
import { QuizButton } from './QuizButton';
import { QuizFilters } from './QuizFilters';
import useFetchAyah from "./hooks/useFetchAyah";
import * as constants from './constants';

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
      <div className="score">Score: {score}</div>
      
      <h1>Qur'an Random Ayah</h1>
      
      <QuizFilters setFilters={setFilters} />
      
      <AyahDisplay 
        ayahList={ayahList} 
        quizAyahKey={quizAyahKey}
      /> 

      {error && <p className="error">{JSON.stringify(error)}</p>}

      <div className="controls">
        <div className="nav-buttons">
          <button onClick={handlePrevious} disabled={loading || ayahList.length === 0}>
            Previous
          </button>
          <button onClick={refreshAyah} disabled={loading}>
            New
          </button>
          <button onClick={handleNext} disabled={loading || ayahList.length === 0}>
            Next
          </button>
        </div>

        <QuizButton 
          key={quizAyahKey}
          trueChapterId={quizAyahKey.split(":")[0]} 
          loading={loading}
          setScore={setScore}
        />
      </div>
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
 