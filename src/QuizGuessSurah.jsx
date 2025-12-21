import './App.css'
import { useState, useEffect} from 'react';
import { AyahDisplay} from './AyahDisplay';
import GuessAyahForm from './GuessAyahForm';
import { AyahFilters } from './AyahFilters';
import { NavButtons } from './NavButtons';
import useAyahNavigation from './hooks/useAyahNavigation';
import NavBar from './NavBar';

function QuizGuessSurah() {
  const [score, setScore] = useState(0);
  const [filters, setFilters] = useState({});
  const {ayahList, quizAyah, loading, error,
        refreshAyah, handleNext, handlePrevious} = useAyahNavigation(filters);
  
  useEffect(() => {
    refreshAyah();
  }, []);
        
  if (ayahList.length == 0) {
    return <div className='loadingInstructions'>Loading Ayah...
      <br/>
      <br />
      You need to guess which surah the ayah is from. You can filter the ayah using the filter options
    </div>;
  }
  return (
    <>
     <div className="top-ui" aria-label="Top left controls">
      <div className="score">Score: {score}</div>
      <NavBar />
    </div>
     <h1>Quran Quiz – Guess The Surah</h1>
 
      
      <AyahFilters setFilters={setFilters} />
      
      <AyahDisplay 
        ayahList={ayahList} 
        error={error}
        quizAyah={quizAyah}
      /> 

      {error && <p className="error">{JSON.stringify(error)}</p>}

      <div className="controls">
       
        <GuessAyahForm 
          key={quizAyah.verse_key}
          trueChapterId={quizAyah.verse_key.split(":")[0]} 
          loading={loading}
          setScore={setScore}
          />
        <NavButtons 
       onPrevious={handlePrevious}
       onRefresh={refreshAyah}
       onNext={handleNext}
       disabled={loading || ayahList.length === 0}
        /> 
      </div>
    </>
  ) 
}

export default QuizGuessSurah
 