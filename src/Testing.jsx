import { Link } from "react-router-dom";

function Testing() {
  return (
    <div>
      <h1>Home Page</h1>

      <nav>
        <ul>
          <li>
            <Link to="/guessSurah">Go to Guess Surah Quiz</Link>
          </li>
        </ul>
      </nav>
    </div>
  );
}


export {Testing}