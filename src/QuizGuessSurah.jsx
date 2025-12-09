import './App.css'
import { useState} from 'react';
import { AyahDisplay} from './AyahDisplay';
import { QuizButton } from './QuizButton';
import { QuizFilters } from './QuizFilters';
import { NavButtons } from './NavButtons';
import useAyahNavigation from './hooks/useAyahNavigation';

function QuizGuessSurah() {
  const [score, setScore] = useState(0);
  const [filters, setFilters] = useState({});
  const {ayahList, quizKey, loading, error,
        refreshAyah, handleNext, handlePrevious} = useAyahNavigation(filters);
        
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
        error={error}
        quizKey={quizKey}
      /> 

      {error && <p className="error">{JSON.stringify(error)}</p>}

      <div className="controls">
       <NavButtons 
       onPrevious={handlePrevious}
       onRefresh={refreshAyah}
       onNext={handleNext}
       disabled={loading || ayahList.length === 0}
        /> 

        <QuizButton 
          key={quizKey}
          trueChapterId={quizKey.split(":")[0]} 
          loading={loading}
          setScore={setScore}
        />
      </div>
    </>
  ) 
}

export {QuizGuessSurah}
 