

function AyahDisplay({ayahList, error, quizAyah}) {
  if (error) return <div>Error: {error}</div>;
  if (!ayahList || ayahList.length === 0) return <div>No ayahs loaded yet</div>;

  return (
    <div className="ayah-display">
      {ayahList.map((a) => (
        <div 
          key={a.verse_key} 
          className={`ayah ${a.verse_key === quizAyah.verse_key ? 'highlight' : ''}`}
        >
          <p className="ayah-text">
            {a.verse_key === quizAyah.verse_key ? 
            quizAyah.text_uthmani || "error displaying ayah. Please try again": 
            a.text_uthmani || "error displaying ayah. Please try again" }
          </p>
          <hr />
        </div>
      ))}
    </div>
  ) 
}

export {AyahDisplay}