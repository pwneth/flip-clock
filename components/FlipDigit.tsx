
import React, { useEffect, useState } from 'react';

interface FlipDigitProps {
  value: string;
}

const FlipDigit: React.FC<FlipDigitProps> = ({ value }) => {
  const [currentValue, setCurrentValue] = useState(value);
  const [nextValue, setNextValue] = useState(value);
  const [isFlipping, setIsFlipping] = useState(false);

  useEffect(() => {
    if (value !== currentValue) {
      setNextValue(value);
      setIsFlipping(true);
      
      const timer = setTimeout(() => {
        setIsFlipping(false);
        setCurrentValue(value);
      }, 800); // Total animation duration

      return () => clearTimeout(timer);
    }
  }, [value, currentValue]);

  return (
    <div className="relative flip-card perspective-1000 select-none">
      {/* Upper Static Half (Shows Next Value) */}
      <div className="absolute top-0 left-0 w-full h-1/2 bg-zinc-800 rounded-t-lg border-b border-zinc-900 overflow-hidden">
        <span className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-[0%] text-5xl md:text-7xl font-bold text-zinc-100">
          {nextValue}
        </span>
      </div>

      {/* Lower Static Half (Shows Current Value) */}
      <div className="absolute bottom-0 left-0 w-full h-1/2 bg-zinc-800 rounded-b-lg overflow-hidden flex items-end justify-center">
        <span className="absolute bottom-1/2 left-1/2 -translate-x-1/2 translate-y-[0%] text-5xl md:text-7xl font-bold text-zinc-100">
          {currentValue}
        </span>
      </div>

      {/* Flipping Card (Top half rotating down) */}
      {isFlipping && (
        <div 
          className="absolute top-0 left-0 w-full h-1/2 bg-zinc-800 rounded-t-lg border-b border-zinc-900 overflow-hidden origin-bottom z-20 animate-flip-top backface-hidden"
          style={{ transformStyle: 'preserve-3d' }}
        >
          <span className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-[0%] text-5xl md:text-7xl font-bold text-zinc-100">
            {currentValue}
          </span>
        </div>
      )}

      {/* Flipping Card (Bottom half rotating down) */}
      {isFlipping && (
        <div 
          className="absolute bottom-0 left-0 w-full h-1/2 bg-zinc-800 rounded-b-lg overflow-hidden origin-top z-10 animate-flip-bottom backface-hidden"
          style={{ transformStyle: 'preserve-3d', transform: 'rotateX(90deg)' }}
        >
          <span className="absolute bottom-1/2 left-1/2 -translate-x-1/2 translate-y-[0%] text-5xl md:text-7xl font-bold text-zinc-100">
            {nextValue}
          </span>
        </div>
      )}

      {/* Center Hinge Line Shadow */}
      <div className="absolute top-1/2 left-0 w-full h-[1px] bg-black/30 z-30 pointer-events-none shadow-[0_1px_4px_rgba(0,0,0,0.5)]"></div>
    </div>
  );
};

export default FlipDigit;
