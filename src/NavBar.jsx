import { useState } from "react";
import { NavLink } from "react-router-dom";

export default function NavBar() {
  const [isOpen, setIsOpen] = useState(true);

  return (
    <nav className={`nav-bar ${isOpen ? "open" : "collapsed"}`} aria-label="Primary">
      <button
        type="button"
        className="nav-toggle"
        aria-expanded={isOpen}
        aria-controls="primary-nav-links"
        onClick={() => setIsOpen((v) => !v)}
      >
        Menu
      </button>

      <div id="primary-nav-links" className="nav-links">
        <NavLink to="/" end className={({ isActive }) => `nav-link ${isActive ? "active" : ""}`}>
          Home
        </NavLink>

        <NavLink to="/guessSurah" className={({ isActive }) => `nav-link ${isActive ? "active" : ""}`}>
          Guess Surah Quiz
        </NavLink>

        <NavLink to="/completeTheAyah" className={({ isActive }) => `nav-link ${isActive ? "active" : ""}`}>
          Complete The Ayah quiz
        </NavLink>
      </div>
    </nav>
  );
}
