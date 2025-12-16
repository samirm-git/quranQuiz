// YamliInput.jsx
import "./App.css";
import { useEffect, useRef } from "react";

function YamliInput({ handleSubmit, loading, setScore }) {
  const inputRef = useRef(null);

  useEffect(() => {
    let cancelled = false;

    const bind = () => {
      if (cancelled) return;
      const el = inputRef.current;
      if (!el) return;

      // Avoid double-binding on the same DOM node
      if (el.dataset.yamliBound === "true") return;

      if (typeof window.Yamli !== "object") {
        console.warn("Yamli not available on window");
        return;
      }

      // Init only once per page
      if (!window.__yamliInitialized) {
        window.__yamliInitialized = window.Yamli.init({
          uiLanguage: "en",
          startMode: "on", // keep ON while debugging
        });
      }

      if (window.__yamliInitialized) {
        el.dataset.yamliBound = "true";

        // Bind THIS input reliably (better than yamlifyType in React apps)
        window.Yamli.yamlify("yamli-input", {
          settingsPlacement: "bottomLeft",
        });
      } else {
        console.warn("Yamli.init() returned false");
      }
    };

    // If Yamli is already loaded, bind now. Otherwise bind on script load.
    if (window.Yamli) {
      bind();
    } else {
      const script = document.getElementById("yamli-script");
      if (script) script.addEventListener("load", bind, { once: true });
      else console.warn("Could not find #yamli-script in index.html");
    }

    return () => {
      cancelled = true;
    };
  }, []);

  return (
    <form className="quiz-form" onSubmit={handleSubmit}>
      <input
        ref={inputRef}
        id="yamli-input"
        type="text"
        required
        name="yamliInput"
      />
      <div className="quiz-buttons">
        <button type="submit" disabled={loading}>
          Submit
        </button>
        <button type="button" onClick={() => setScore(0)}>
          Reset Score
        </button>
      </div>
    </form>
  );
}

export default YamliInput;
