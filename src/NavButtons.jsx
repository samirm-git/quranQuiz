import HelpTool from "./HelpTool/HelpTool";

function NavButtons({ onPrevious, onRefresh, onNext, disabled }) {
  return (
    <>
    <div className="help-section-header">
    <span className="quiz-instructions">Navigation</span>
    <HelpTool 
      message="Use the Previous and Next Ayah buttons as hints to help you answer the question. Use the New Ayah button to generate a new question."
      position="right"
    />
    </div> 
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
    </>
  );
}

export { NavButtons };