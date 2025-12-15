import './App.css'
import { useState, useEffect, useMemo} from 'react';
import { AyahDisplay } from './AyahDisplay';
import { AyahFilters } from './AyahFilters';
import { NavButtons } from './NavButtons';
import useAyahNavigation from './hooks/useAyahNavigation';
import YamliInput from './YamliInput';
import DisplayGuessResult from './DisplayGuessResult';
import * as constants from './constants'

function removeTashkeelExceptShadda(text) {
  return text.replace(/[\u064B-\u0650\u0652-\u065F\u0670\u06D6-\u06ED]/g, '');
}

function hideRandomText(ayah_text){
  let ayah_text_array = ayah_text.split(" ");
  let hiddenWord = ""
  let hiddenIndex = -1
  while (hiddenWord == "" ||  constants.quranStoppingSymbols.includes(hiddenWord)){
    hiddenIndex = Math.floor(Math.random() * ayah_text_array.length -1) + 1
    hiddenWord = ayah_text_array[hiddenIndex]
    console.log(hiddenWord)
  }
  ayah_text_array[hiddenIndex] = "______"
  return {
    displayText: ayah_text_array.join(" "),
    hiddenWord: hiddenWord
  };
}

export default function QuizCompleteTheAyah(){
  const [score, setScore] = useState(0);
  const [filters, setFilters] = useState({});
  const [quizAyahHidden, setQuizAyahHidden] = useState(null);
  const [isGuessCorrect, setIsGuessCorrect] = useState(null);


  const {ayahList, quizAyah, loading, error,
        refreshAyah, handleNext, handlePrevious} = useAyahNavigation(filters);

  useEffect(() => {
    setIsGuessCorrect(null);
    if (!quizAyah) {
      setQuizAyahHidden(null);
      return;
    }
    
    const { displayText, hiddenWord } = hideRandomText(quizAyah.text_uthmani);
    const hiddenWordWithoutTashkeel = removeTashkeelExceptShadda(hiddenWord);
    setQuizAyahHidden({
      displayAyah: {
        ...quizAyah,
        text_uthmani: displayText
      },
      trueAnswer: [hiddenWord, hiddenWordWithoutTashkeel]
    });
    }, [quizAyah?.verse_key]);
  
  useEffect(() => {
    refreshAyah();
  }, []);
  
 

  if (ayahList.length == 0 || !quizAyahHidden) {
    return <div>Loading Ayah...</div>;
  }

  const handleSubmit = (e) => {
    e.preventDefault();
    const formData = new FormData(e.target);
    console.log(formData.get("yamliInput"));
    const userGuess = removeTashkeelExceptShadda(formData.get("yamliInput"));

    if (userGuess){
      if (quizAyahHidden.trueAnswer.includes(userGuess)){
        setIsGuessCorrect(true)
        setScore(prev => prev + 1)
      }else{
        setIsGuessCorrect(false)
      }
    }
  }

  return(
    <>
    <div className='score'>Score: {score}</div>
    <h1>Complete the Ayah Quiz</h1>
    <AyahFilters setFilters={setFilters} />
      
    <AyahDisplay 
        ayahList={ayahList} 
        error={error}
        quizAyah={quizAyahHidden.displayAyah}
    /> 

    {error && <p className="error">{JSON.stringify(error)}</p>}
    <div className="controls">
      <NavButtons 
       onPrevious={handlePrevious}
       onRefresh={refreshAyah}
       onNext={handleNext}
       disabled={loading || ayahList.length === 0}
      /> 
      <YamliInput handleSubmit={handleSubmit} loading={loading} setScore={setScore} />
    <DisplayGuessResult isGuessCorrect={isGuessCorrect}
      messages={{incorrectGuessMessage: `❌ Incorrect. The correct answer was ${quizAyahHidden.trueAnswer.join(" or ")}`}}/>
    </div>
    </>
  )

}
