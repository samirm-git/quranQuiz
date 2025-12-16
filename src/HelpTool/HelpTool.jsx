import { useState } from 'react';
import './HelpTool.css';

export default function HelpTool({ message, position = 'right' }) {
  const [isVisible, setIsVisible] = useState(false);

  return (
    <div 
      className="help-tool-container"
      onMouseLeave={() => setIsVisible(false)}
    >
      <button
        type="button"
        onClick={() => setIsVisible(!isVisible)}
        onBlur={() => setIsVisible(false)}
        className="help-tool-button"
        aria-label="Help"
      >
        ?
      </button>
      
      {isVisible && (
        <div 
          className={`help-tool-bubble position-${position}`}
          onMouseDown={(e) => e.preventDefault()} // Prevents blur when clicking inside tool
        >
          <div className="help-tool-content">
            {message}
            <div className="help-tool-arrow"></div>
          </div>
        </div>
      )}
    </div>
  );
}