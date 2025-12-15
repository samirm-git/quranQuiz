import './App.css'
import { useState, useEffect} from 'react';
import { AyahDisplay} from './AyahDisplay';
import GuessAyahForm from './GuessAyahForm';
import { AyahFilters } from './AyahFilters';
import { NavButtons } from './NavButtons';
import useAyahNavigation from './hooks/useAyahNavigation';

function QuizGuessSurah() {
  const [score, setScore] = useState(0);
  const [filters, setFilters] = useState({});
  const {ayahList, quizAyah, loading, error,
        refreshAyah, handleNext, handlePrevious} = useAyahNavigation(filters);
  
  useEffect(() => {
    refreshAyah();
  }, []);
        
  if (ayahList.length == 0) {
    return <div>Loading Ayah...</div>;
  }
  return (
    <>
      <div className="score">Score: {score}</div>
      
      <h1>Qur'an Random Ayah</h1>
      
      <AyahFilters setFilters={setFilters} />
      
      <AyahDisplay 
        ayahList={ayahList} 
        error={error}
        quizAyah={quizAyah}
      /> 

      {error && <p className="error">{JSON.stringify(error)}</p>}

      <div className="controls">
       <NavButtons 
       onPrevious={handlePrevious}
       onRefresh={refreshAyah}
       onNext={handleNext}
       disabled={loading || ayahList.length === 0}
        /> 
        <GuessAyahForm 
          key={quizAyah.verse_key}
          trueChapterId={quizAyah.verse_key.split(":")[0]} 
          loading={loading}
          setScore={setScore}
          />
      </div>
    </>
  ) 
}

export default QuizGuessSurah
 