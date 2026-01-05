
export interface TimeState {
  hours: number;
  minutes: number;
  seconds: number;
}

export interface ClockInsight {
  quote: string;
  author?: string;
  category: 'motivation' | 'reflection' | 'productivity' | 'zen';
}

export enum ClockMode {
  NORMAL = 'NORMAL',
  STOPWATCH = 'STOPWATCH',
  TIMER = 'TIMER'
}

export interface FlipDigitProps {
  current: string;
  next: string;
}
