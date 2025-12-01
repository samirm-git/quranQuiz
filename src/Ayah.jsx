import axios from 'axios'
import './App.css'
import { useEffect, useState } from 'react';

async function fetchRandomAyah({chapter_number, page_number, juz_number, hizb_number, rub_el_hizb_number, ruku_number,
   manzil_number, language, words, translations, audio, tafsirs} = {}) {
  try{ 
    let params = { chapter_number: chapter_number, page_number: page_number, juz_number: juz_number, 
                  hizb_number: hizb_number, rub_el_hizb_number: rub_el_hizb_number, 
                  ruku_number: ruku_number, manzil_number: manzil_number, 
                  language: language, words: words, translations: translations, 
                  audio: audio, tafsirs: tafsirs}; 
    
    Object.keys(params).forEach( key => params[key] === undefined && delete params[key] );
    const res = await axios({
      method: 'get',
      url: '/api/random_ayah',
      params
    });
    return res

  }catch (err) {
   throw new Error(`fetchRandomAyah failed: ${err.message}`) 
}
}

async function fetchSpecificAyah({verse_key}){
  try {
  let params = {verse_key}
  const res = await axios({
    method: 'get',
    url: '/api/specific_ayah',
    params
  });

  return res
}catch (err){
  throw new Error(`fetchSpecificAyah failed: ${err.message}`)
}

}

function RandomAyahUI({ayah, refreshAyah, loading, error}) {
  const [ayahList, setAyahList] = useState([ayah]);
  useEffect(() => {setAyahList([ayah])}, [ayah.verse_key]);

  return (
    <>
      <h1>Qur'an Random Ayah </h1>

      <div className="card">
        <button onClick={refreshAyah} disabled={loading}>
          {loading ? 'Loading...' : 'Get Random Ayah'}
        </button>

        {error && <p className="error">{JSON.stringify(error)}</p>}

   
      </div>
      <div className="ayah-container">
        {ayahList.map((a, index) => (
          <div key={index} className="ayah-item">
            <p className="ayah-text">
              {a.text_uthmani || a.text_indopak}
            </p>
            <p className="ayah-key">
              — Surah {a.verse_key}
            </p>
            <hr />
          </div>
        ))}
      </div> 
        </>
  )
}

export {RandomAyahUI, fetchRandomAyah}
