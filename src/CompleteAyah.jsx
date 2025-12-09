import { useState, useEffect} from 'react';
import './App.css'
import { AyahDisplay, fetchRandomAyah, fetchSpecificAyah} from './Ayah';
import { QuizButton } from './QuizButton';
import { QuizFilters } from './QuizFilters';
import useFetchAyah from "./hooks/useFetchAyah";
import * as constants from './constants';

function CompleteAyah(){
  const [score, setScore] = useState(0);
  const {loading, error, loadAyah} = useFetchAyah();
  return(
    <>
    <div className='score'>Score: {score}</div>
    <h1>Complete the Ayah Quiz</h1>
    </>
  )

}

export {CompleteAyah}