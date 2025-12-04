import { useState } from "react";

export default function useFetchAyah() {
  const [ayah, setAyah] = useState(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  async function loadAyah(fetchFunction, fetchParams = {}) {
    setLoading(true);
    setError(null);

    try {
      const res = await fetchFunction(fetchParams);
      return res.data.verse; 
    } catch (err) {
      const message =
        err.response?.data?.error || err.message || "Unknown error";
      setError(message);
      return null;
    } finally {
      setLoading(false);
    }
  }

  return { loading, error, loadAyah };
}