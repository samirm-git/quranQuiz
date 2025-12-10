import { useState} from 'react';
import './App.css'
import * as constants from './constants';

function GuessAyahButton({trueChapterId, loading, setScore}) {
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

export {GuessAyahButton}