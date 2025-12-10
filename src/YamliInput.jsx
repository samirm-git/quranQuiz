// YamliInput.jsx
import { useEffect, useRef } from "react";

function YamliInput({ handleSubmit, loading }) {
  const inputRef = useRef(null);

  useEffect(() => {
    if (typeof window === "undefined") return;
    const inputEl = inputRef.current;
    if (!inputEl) return;

    function ensureYamliInitialized() {
      if (!window.Yamli || typeof window.Yamli.init !== "function") {
        return false;
      }

      // Only run init once globally
      if (!window.__yamliInitialized) {
        window.__yamliInitialized = window.Yamli.init({
          uiLanguage: "en",
          startMode: "on", // or "onOrUserDefault"
        });
      }

      return !!window.__yamliInitialized;
    }

    // Poll until the script is loaded and Yamli is initialized
    const intervalId = setInterval(() => {
      if (!ensureYamliInitialized()) {
        return;
      }

      // At this point Yamli is ready; yamlify this specific input
      window.Yamli.yamlify(inputEl.id, {
        settingsPlacement: "bottomLeft",
      });

      clearInterval(intervalId);
    }, 100);

    // Cleanup for this component only
    return () => {
      clearInterval(intervalId);
      if (
        window.Yamli &&
        typeof window.Yamli.deyamlify === "function"
      ) {
        window.Yamli.deyamlify(inputEl.id);
      }
    };
  }, []);

  return (
    <form onSubmit={handleSubmit}>
      <input
        ref={inputRef}
        id="yamli-input"
        type="text"
        name="yamliInput"
        // IMPORTANT: don't pass a `value` prop – leave it uncontrolled
      />
      <button type="submit" disabled={loading}>
        Submit
      </button>
    </form>
  );
}

export default YamliInput;
