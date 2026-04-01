// YamliInput.jsx
import "./App.css";
import { useEffect, useRef, useState } from "react";

function YamliInput({ handleSubmit, loading, setScore }) {
  const textareaRef = useRef(null);
  const [yamliReady, setYamliReady] = useState(false);
  const [mounted, setMounted] = useState(false);

  // First effect: mark component as mounted
  useEffect(() => {
    setMounted(true);
  }, []);

  // Second effect: initialize Yamli only after component is mounted
  useEffect(() => {
    if (!mounted) return;

    let attempts = 0;
    const maxAttempts = 50;

    const tryInitialize = () => {
      attempts++;
      
      if (!window.Yamli || !window.Yamli.init) {
        if (attempts < maxAttempts) {
          setTimeout(tryInitialize, 100);
        }
        return;
      }

      const textarea = textareaRef.current;
      if (!textarea) {
        if (attempts < maxAttempts) {
          setTimeout(tryInitialize, 100);
        }
        return;
      }

      console.log("Both Yamli and textarea are ready");

      // Clear any previous Yamli initialization
      if (window.__yamliInitDone) {
        console.log("Yamli already initialized, trying to bind...");
      } else {
        console.log("First time initialization");
        const initResult = window.Yamli.init({
          uiLanguage: "en",
          startMode: "on"
        });
        console.log("Yamli.init result:", initResult);
        window.__yamliInitDone = true;
      }

      // Small delay to ensure Yamli is fully ready
      setTimeout(() => {
        // Try multiple binding approaches
        console.log("Attempting multiple binding methods...");

        // Method 1: yamlifyClass
        try {
          const r1 = window.Yamli.yamlifyClass("yamli-arabic");
          console.log("1. yamlifyClass('yamli-arabic'):", r1);
        } catch (e) {
          console.log("1. yamlifyClass error:", e.message);
        }

        // Method 2: yamlify with class selector
        try {
          const r2 = window.Yamli.yamlify(".yamli-arabic");
          console.log("2. yamlify('.yamli-arabic'):", r2);
        } catch (e) {
          console.log("2. yamlify class selector error:", e.message);
        }

        // Method 3: Direct call on textarea
        try {
          const r3 = window.Yamli.yamlify(textarea);
          console.log("3. yamlify(textarea element):", r3);
        } catch (e) {
          console.log("3. yamlify element error:", e.message);
        }

        // Method 4: Try with settings object
        try {
          const r4 = window.Yamli.yamlify(textarea, {
            settingsPlacement: "bottomLeft",
            allowRoman: false
          });
          console.log("4. yamlify with settings:", r4);
        } catch (e) {
          console.log("4. yamlify with settings error:", e.message);
        }

        // Check final state
        setTimeout(() => {
          console.log("Final check:", {
            hasYamliAttr: textarea.hasAttribute('yamli'),
            classList: textarea.className,
            hasOnKeyDown: textarea.onkeydown !== null,
            allAttributes: Array.from(textarea.attributes).map(a => a.name)
          });
          
          // Try to manually trigger Yamli if it has event listeners
          console.log("Try typing 'bayt' or 'alhamdulillah' now...");
          setYamliReady(true);
        }, 500);
      }, 300);
    };

    tryInitialize();
  }, [mounted]);

  const handleFormSubmit = (e) => {
    e.preventDefault();
    handleSubmit(e);
    if (textareaRef.current) {
      textareaRef.current.value = "";
    }
  };

  return (
    <form className="quiz-form" onSubmit={handleFormSubmit}>
      <textarea
        ref={textareaRef}
        // id="yamli-input"
        className="yamli-arabic"
        required
        name="yamliInput"
        placeholder="Type in English (e.g. bayt)"
        autoComplete="off"
        dir="rtl"
        rows="1"
        style={{
          resize: 'vertical',
          minHeight: '40px',
          fontFamily: 'inherit',
          fontSize: 'inherit',
          padding: '8px',
          width: '100%',
          boxSizing: 'border-box'
        }}
      />
      <div className="quiz-buttons">
        <button type="submit" disabled={loading}>
          Submit
        </button>
        <button type="button" onClick={() => setScore(0)}>
          Reset Score
        </button>
      </div>
      <div style={{ fontSize: "12px", color: "#666", marginTop: "5px" }}>
        Type English transliteration (e.g. "bayt" → بيت, "alhamdulillah" → الحمد لله)
        {yamliReady && " - Ready"}
      </div>
    </form>
  );
}

export default YamliInput;