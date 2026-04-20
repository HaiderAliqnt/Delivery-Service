import React from 'react';
import './StatusBar.css';

const STEPS = ['OPEN', 'CLAIMED', 'PICKED UP', 'DELIVERED'];

function StatusBar({ currentStatus }) {
  const currentIndex = STEPS.indexOf(currentStatus);

  return (
    <div className="status-bar-container">
      <div className="status-blocks">
        {STEPS.map((step, index) => {
          const isCompleted = index <= currentIndex;
          const isCurrent = index === currentIndex;
          
          let className = 'status-block';
          if (isCompleted) className += ' completed';
          if (isCurrent) className += ' current';

          return <div key={step} className={className} />;
        })}
      </div>
      <h2 className="status-label">{currentStatus || 'UNKNOWN'}</h2>
    </div>
  );
}

export default StatusBar;
