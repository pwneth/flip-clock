
import React from 'react';
import FlipDigit from './FlipDigit';

interface FlipUnitProps {
  value: number;
  label: string;
}

const FlipUnit: React.FC<FlipUnitProps> = ({ value, label }) => {
  const digits = value.toString().padStart(2, '0').split('');

  return (
    <div className="flex flex-col items-center gap-3">
      <div className="flex gap-1 md:gap-2">
        <FlipDigit value={digits[0]} />
        <FlipDigit value={digits[1]} />
      </div>
      <span className="text-zinc-500 uppercase tracking-widest text-[10px] md:text-xs font-semibold">
        {label}
      </span>
    </div>
  );
};

export default FlipUnit;
