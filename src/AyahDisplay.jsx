function AyahDisplay({ayahList, error, quizKey}) {
  if (error) return <div>Error: {error}</div>;
  if (!ayahList || ayahList.length === 0) return <div>No ayahs loaded yet</div>;

  return (
    <div className="ayah-display">
      {ayahList.map((a) => (
        <div 
          key={a.verse_key} 
          className={`ayah ${a.verse_key === quizKey ? 'highlight' : ''}`}
        >
          <p className="ayah-text">
            {a.text_uthmani || a.text_indopak}
          </p>
          <hr />
        </div>
      ))}
    </div>
  ) 
}

export {AyahDisplay}