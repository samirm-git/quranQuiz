import {NavLink} from "react-router-dom";

export default function NavBar({links}={}){
  return (
    <nav className="nav-bar" aria-label="Primary">
      <NavLink to="/" end className={({ isActive }) => `nav-link ${isActive ? "active" : ""}`}>
        Home
      </NavLink>

      <NavLink to="/guessSurah" className={({ isActive }) => `nav-link ${isActive ? "active" : ""}`}>
        Guess Surah Quiz
      </NavLink>

      <NavLink to="/completeTheAyah" className={({ isActive }) => `nav-link ${isActive ? "active" : ""}`}>
        Complete The Ayah quiz
      </NavLink>

    </nav>
  );
}