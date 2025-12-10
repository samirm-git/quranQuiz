import { useState, useEffect} from 'react';
import './App.css'
import { AyahDisplay } from './AyahDisplay';
import { AyahFilters } from './AyahFilters';
import { NavButtons } from './NavButtons';
import useAyahNavigation from './hooks/useAyahNavigation';
import YamliInput from './YamliInput';

function QuizCompleteTheAyah(){
  const [score, setScore] = useState(0);
  const [filters, setFilters] = useState({});
  const {ayahList, quizKey, loading, error,
        refreshAyah, handleNext, handlePrevious} = useAyahNavigation(filters);
  
  if (ayahList.length == 0) {
    return <div>Loading Ayah...</div>;
  }   

  const handleSubmit = (e) => {
    e.preventDefault();
    const formData = new FormData(e.target);
    console.log(formData.get("yamliInput"));
  }

  return(
    <>
    <div className='score'>Score: {score}</div>
    <h1>Complete the Ayah Quiz</h1>
    <AyahFilters setFilters={setFilters} />
      
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

      <YamliInput handleSubmit={handleSubmit} loading={loading} />
    </div>
    </>
  )

}

export default QuizCompleteTheAyah