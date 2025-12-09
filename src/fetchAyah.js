import axios from 'axios'

async function fetchRandomAyah({chapter_number, page_number, juz_number, hizb_number, rub_el_hizb_number, ruku_number,
   manzil_number, language, words, translations, audio, tafsirs} = {}) {
  try{ 
    let params = { chapter_number: chapter_number, page_number: page_number, juz_number: juz_number, 
                  hizb_number: hizb_number, rub_el_hizb_number: rub_el_hizb_number, 
                  ruku_number: ruku_number, manzil_number: manzil_number, 
                  language: language, words: words, translations: translations, 
                  audio: audio, tafsirs: tafsirs}; 
    
    Object.keys(params).forEach( key => params[key] === undefined && delete params[key] );
    console.log(`front-end API request params: ${JSON.stringify(params)}`)
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

async function fetchSpecificAyah({verse_key, language, words, translations, audio, tafsirs} = {}){
  if (!verse_key){
    throw new Error(`missing verse_key`);
  }
  try {
  let params = {verse_key}
  const res = await axios({
    method: 'get',
    url: '/api/specific_ayah',
    params
  });

  return res
}catch (err){
  throw new Error(`fetchSpecificAyah: ${err.message}`)
}
}

export {fetchRandomAyah, fetchSpecificAyah}
