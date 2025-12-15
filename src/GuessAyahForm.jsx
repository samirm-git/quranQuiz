import { useState} from 'react';
import './App.css'
import * as constants from './constants';
import DisplayGuessResult from './DisplayGuessResult';

export default function GuessAyahForm({trueChapterId, loading, setScore}) {
  const [isSubmitted, setIsSubmitted] = useState(false);
  const [isGuessCorrect, setIsGuessCorrect] = useState(null);

  const handleSubmit = (e) => {
    e.preventDefault();
    setIsSubmitted(true);
    const formData = new FormData(e.target);
    const userGuess = formData.get("surah")
    if (userGuess == trueChapterId) {
      setIsGuessCorrect(true);
      setScore(prev => prev + 1);
    }else{
      setIsGuessCorrect(false);
    }
  } 

  return (
  <>   
  <form onSubmit={handleSubmit} className='quiz-form'>
    <select
      name="surah"
      required
      disabled={isSubmitted}
    >
      <option value="">Select a Surah...</option>
      {constants.surah_ids.map(id => (
        <option key={id} value={id}>
          {id}. {constants.surah_names[id - 1]}
        </option>
      ))}
    </select>
    <div className='quiz-buttons'>
    <button type="submit" disabled={loading || isSubmitted}>Submit</button>
    <button type="button" onClick={() => setScore(0)}>Reset Score</button>
    </div>
  </form> 
  <DisplayGuessResult isGuessCorrect={isGuessCorrect} 
    messages={{incorrectGuessMessage: `❌ Incorrect. The correct Surah was ${trueChapterId}: ${constants.surah_names[trueChapterId - 1]}`}}/>
</>
    ); 
} 
