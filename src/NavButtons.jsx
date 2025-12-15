function NavButtons({ onPrevious, onRefresh, onNext, disabled }) {
  return (
    <div className="nav-buttons">
      <button onClick={onPrevious} disabled={disabled}>
        Previous Ayah
      </button>
      <button onClick={onRefresh} disabled={disabled}>
        New Ayah
      </button>
      <button onClick={onNext} disabled={disabled}>
        Next Ayah
      </button>
    </div>
  );
}

export { NavButtons };