const YAMLI_SRC = "https://api.yamli.com/js/yamli_api.js";

let loadPromise = null;

export function loadYamli() {
  if (typeof window === "undefined") return Promise.resolve(null);
  if (window.Yamli) return Promise.resolve(window.Yamli);
  if (loadPromise) return loadPromise;

  loadPromise = new Promise((resolve, reject) => {
    // reuse existing tag if present
    const existing = document.querySelector('script[data-yamli="true"]');
    if (existing) {
      existing.addEventListener("load", () => resolve(window.Yamli), { once: true });
      existing.addEventListener("error", reject, { once: true });
      return;
    }

    const s = document.createElement("script");
    s.src = YAMLI_SRC;
    s.async = true;
    s.setAttribute("data-yamli", "true");

    s.onload = () => resolve(window.Yamli);
    s.onerror = () => reject(new Error("Failed to load yamli_api.js"));

    document.head.appendChild(s);
  });

  return loadPromise;
}

export async function initYamliOnce(options = {}) {
  const Yamli = await loadYamli();
  if (!Yamli) return null;

  if (!window.__yamliInitDone) {
    window.__yamliInitDone = Yamli.init({
      uiLanguage: "en",
      startMode: "on",
      ...options,
    });
  }

  return window.__yamliInitDone ? Yamli : null;
}
