import { useState, useEffect } from 'react';
import { fetchRandomAyah, fetchSpecificAyah } from '../fetchAyah';
import useFetchAyah from './useFetchAyah';
import * as constants from '../constants';

function getNextVerseKey(verse_key) {
  let [chapterID, ayahNumber] = verse_key.split(":");
  chapterID = Number(chapterID);
  ayahNumber = Number(ayahNumber);

  if ((ayahNumber + 1) <= constants.ayahs_per_surah[chapterID - 1]) {
    return `${chapterID}:${ayahNumber + 1}`;
  } else if (chapterID + 1 <= constants.ayahs_per_surah.length) {
    return `${chapterID + 1}:1`;
  } else {
    return null;
  }
}

function getPreviousVerseKey(verse_key) {
  const [chapterID, ayahNumber] = verse_key.split(":");
  if ((ayahNumber - 1) > 0) {
    return `${chapterID}:${ayahNumber - 1}`;
  } else if ((chapterID - 1) > 0) {
    return `${chapterID - 1}:${constants.ayahs_per_surah[chapterID - 2]}`;
  } else {
    return null;
  }
}

function useAyahNavigation(filters = {}) {
  const { loading, error, loadAyah } = useFetchAyah();
  const [ayahList, setAyahList] = useState([]);
  const [quizKey, setQuizKey] = useState(null);

  useEffect(() => {
    refreshAyah();
  }, []);

  const refreshAyah = async () => {
    const newAyah = await loadAyah(fetchRandomAyah, filters);
    if (newAyah) {
      setAyahList([newAyah]);
      setQuizKey(newAyah.verse_key);
    }
  };

  const handleNext = async () => {
    if (ayahList.length === 0) return;
    
    const lastAyah = ayahList[ayahList.length - 1];
    const nextVerseKey = getNextVerseKey(lastAyah.verse_key);
    if (nextVerseKey){
      const newAyah = await loadAyah(fetchSpecificAyah, { verse_key: nextVerseKey });
      if (newAyah) {
        setAyahList(prevList => [...prevList, newAyah]);
      }
    }
  };

  const handlePrevious = async () => {
    if (ayahList.length === 0) return;
    
    const firstAyah = ayahList[0];
    const prevVerseKey = getPreviousVerseKey(firstAyah.verse_key);
    if (prevVerseKey) {
      const newAyah = await loadAyah(fetchSpecificAyah, { verse_key: prevVerseKey });
      if (newAyah) {
        setAyahList(prevList => [newAyah, ...prevList]);
      }
    }
  };

  return {
    ayahList,
    quizKey,
    loading,
    error,
    refreshAyah,
    handleNext,
    handlePrevious
  };
}



export default useAyahNavigation;