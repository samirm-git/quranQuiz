export default function DisplayGuessResult({isGuessCorrect, messages:{noGuessMessage, correctGuessMessage, incorrectGuessMessage}}){
  let resultMessage = "";
  
  if (isGuessCorrect === null) {
    resultMessage = "";
  } else if (isGuessCorrect) {
    resultMessage = correctGuessMessage || "✅ Correct! Great job!";
  } else {
    resultMessage = incorrectGuessMessage || "❌ Incorrect";
  }

  return (
    <div className='quiz-result'>{resultMessage}</div>
  ); 
}