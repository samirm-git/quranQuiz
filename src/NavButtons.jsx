function NavButtons({ onPrevious, onRefresh, onNext, disabled }) {
  return (
    <div className="nav-buttons">
      <button onClick={onPrevious} disabled={disabled}>
        Previous
      </button>
      <button onClick={onRefresh} disabled={disabled}>
        New
      </button>
      <button onClick={onNext} disabled={disabled}>
        Next
      </button>
    </div>
  );
}

export { NavButtons };