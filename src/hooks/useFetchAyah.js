import { useState, useEffect } from "react";

export default function useFetchAyah(fetchFunction, fetchParams = {}) {
  const [ayah, setAyah] = useState(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  async function loadRandomAyah() {
    setLoading(true);
    setError(null);

    try {
      const res = await fetchFunction(fetchParams);
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
