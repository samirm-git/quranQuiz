import { Link } from "react-router-dom";

function App() {
  return (
    <div>
      <h1>Home Page</h1>

      <nav>
        <ul>
          <li>
            <Link to="/guessSurah">Go to Guess Surah Quiz</Link>
          </li>
          <li>
            <Link to="/completeTheAyah">Go to Complete the Ayah Quiz</Link>
          </li>
        </ul>
      </nav>
    </div>
  );
}


export default App 