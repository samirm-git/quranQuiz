// YamliInput.jsx
import './App.css'
import { useEffect } from "react";

function YamliInput({ handleSubmit, loading, setScore }) {
  useEffect(() => {
    if (typeof window === "undefined") return;
    if (typeof window.Yamli !== "object") {
      console.warn("Yamli not available on window");
      return;
    }

    // Init only once per page
    if (!window.__yamliInitialized) {
      window.__yamliInitialized = window.Yamli.init({
        uiLanguage: "en",
        startMode: "on", // force ON for debugging
      });
    }

    if (window.__yamliInitialized) {
      // 👇 This is the key change: yamlify *all* text inputs
      window.Yamli.yamlifyType("textbox", {
        settingsPlacement: "bottomLeft",
      });
    } else {
      console.warn("Yamli.init() returned false");
    }
  }, []); // run once when this component mounts

  return (
    <form className='quiz-form' onSubmit={handleSubmit}>
      <input
        id="yamli-input"
        type="text"
        required
        name="yamliInput"
        // no value prop – leave it uncontrolled
      />
      <div className='quiz-buttons'>
      <button type="submit" disabled={loading}>
        Submit
      </button>
      <button type='button' onClick={() => setScore(0)}>
        Reset Score
      </button>
      </div>

    </form>
  );
}

export default YamliInput;
