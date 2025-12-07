import { useState, useEffect} from 'react';
import './App.css'
import { AyahDisplay, fetchRandomAyah, fetchSpecificAyah} from './Ayah';
import useFetchAyah from "./hooks/useFetchAyah";
import * as constants from './constants';


//what is the difference between putting the parameters like this (x,y) and ({x,y})
function QuizButton({trueChapterId, loading, setScore}) {
    const [resultMessage, setResultMessage] = useState("");
    const [guessChapterID, setGuessChapterID] = useState(0);
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
        <div className="quiz">
            <div className="quiz-select">
                <select
                    value={guessChapterID}
                    onChange={(e) => setGuessChapterID(e.target.value)}
                    disabled={isSubmitted}
                >
                    <option value="">Select a Surah...</option>
                    {constants.surah_ids.map(id => (
                        <option key={id} value={id}>
                            {id}. {constants.surah_names[id - 1]}
                        </option>
                    ))}
                </select>
            </div>
            
            <div className="quiz-buttons">
                <button
                    disabled={loading || isSubmitted}
                    onClick={handleSubmit}
                >
                    Submit
                </button>
                <button onClick={() => setScore(0)}>
                    Reset Score
                </button>
            </div>
            
            {resultMessage && <div className="quiz-result">{resultMessage}</div>}
        </div>
    ); 
} 

function QuizFilters({setFilters}){
  const [isVisible, setIsVisible] = useState(false);
  
 return (
    <div className="filters">
      <button 
        className="filters-toggle"
        onClick={() => setIsVisible(!isVisible)}
      >
        {isVisible ? 'Hide Filters ▼' : 'Show Filters ▶'}
      </button>
      
      <div className={`filters-grid ${isVisible ? 'show' : ''}`}>
        <div className="filter-select">
          <label>Juz</label>
          <select onChange={(e) => setFilters(prev => ({ ...prev, juz_number: e.target.value || null }))}>
            <option value="">All</option>
            {constants.juz_ids.map(id => (
              <option key={id} value={id}>{id}</option>
            ))}
          </select>
        </div>
        
        <div className="filter-select">
          <label>Page</label>
          <select onChange={(e) => setFilters(prev => ({ ...prev, page_number: e.target.value || null }))}>
            <option value="">All</option>
            {constants.page_numbers.map(num => (
              <option key={num} value={num}>{num}</option>
            ))}
          </select>
        </div>
        
        <div className="filter-select">
          <label>Hizb</label>
          <select onChange={(e) => setFilters(prev => ({ ...prev, hizb_number: e.target.value || null }))}>
            <option value="">All</option>
            {constants.hizb_numbers.map(num => (
              <option key={num} value={num}>{num}</option>
            ))}
          </select>
        </div>
        
        <div className="filter-select">
          <label>Rub el Hizb</label>
          <select onChange={(e) => setFilters(prev => ({ ...prev, rub_el_hizb_number: e.target.value || null }))}>
            <option value="">All</option>
            {constants.rub_el_hizb_numbers.map(num => (
              <option key={num} value={num}>{num}</option>
            ))}
          </select>
        </div>
        
        <div className="filter-select">
          <label>Ruku</label>
          <select onChange={(e) => setFilters(prev => ({ ...prev, ruku_number: e.target.value || null }))}>
            <option value="">All</option>
            {constants.ruku_numbers.map(num => (
              <option key={num} value={num}>{num}</option>
            ))}
          </select>
        </div>
        
        <div className="filter-select">
          <label>Manzil</label>
          <select onChange={(e) => setFilters(prev => ({ ...prev, manzil_number: e.target.value || null }))}>
            <option value="">All</option>
            {constants.manzil_numbers.map(num => (
              <option key={num} value={num}>{num}</option>
            ))}
          </select>
        </div>
      </div>
    </div>
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
 