import { useState, useEffect } from "react";
import {fetchRandomAyah} from "../Ayah";

export default function useRandomAyah() {
  const [ayah, setAyah] = useState(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  async function loadRandomAyah(params = {}) {
    setLoading(true);
    setError(null);

    try {
      const res = await fetchRandomAyah(params);
      setAyah(res.data.verse);
    } catch (err) {
      const message =
        err.response?.data?.error || err.message || "Unknown error";
      setError(message);
    } finally {
      setLoading(false);
    }
  }

  useEffect(() => {
    loadRandomAyah();
  }, []);

  return { ayah, loading, error, loadRandomAyah };
}
