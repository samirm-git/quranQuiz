import { useEffect, useMemo, useRef } from "react";
import { initYamliOnce } from "./yamli"; 

export default function YamliInput({ handleSubmit, loading, setScore }) {
  // Unique, Yamli-friendly id (avoid React useId's ":" just in case)
  const inputId = useMemo(
    () => `yamli-input-${Math.random().toString(36).slice(2)}`,
    []
  );

  const inputRef = useRef(null);

  useEffect(() => {
    let cancelled = false;

    (async () => {
      const Yamli = await initYamliOnce({ zIndexBase: 999999 }); // helps if menus get hidden
      if (!Yamli || cancelled) return;

      const el = inputRef.current;
      if (!el) return;

      // Prevent duplicate binding on the same DOM node (but allow rebinding on remount)
      if (el.dataset.yamliBound === "true") return;
      el.dataset.yamliBound = "true";

      // Bind by id (Yamli docs emphasize correct textbox id) :contentReference[oaicite:1]{index=1}
      Yamli.yamlify(inputId, { settingsPlacement: "inside" });
    })().catch(console.error);

    return () => {
      cancelled = true;
    };
  }, [inputId]);

  return (
    <form className="quiz-form" onSubmit={handleSubmit}>
      <input
        ref={inputRef}
        id={inputId}
        type="text"
        required
        name="yamliInput"
      />
      <div className="quiz-buttons">
        <button type="submit" disabled={loading}>Submit</button>
        <button type="button" onClick={() => setScore(0)}>Reset Score</button>
      </div>
    </form>
  );
}
