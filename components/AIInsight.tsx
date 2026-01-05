
import React, { useEffect, useState } from 'react';
import { getTimeInsight } from '../services/geminiService';
import { ClockInsight } from '../types';
import { Sparkles, RefreshCw, Quote } from 'lucide-react';

const AIInsight: React.FC = () => {
  const [insight, setInsight] = useState<ClockInsight | null>(null);
  const [loading, setLoading] = useState(false);

  const fetchInsight = async () => {
    setLoading(true);
    const hour = new Date().getHours();
    let timeOfDay = "morning";
    if (hour >= 12 && hour < 17) timeOfDay = "afternoon";
    else if (hour >= 17 && hour < 21) timeOfDay = "evening";
    else if (hour >= 21 || hour < 5) timeOfDay = "night";

    const data = await getTimeInsight(timeOfDay);
    setInsight(data);
    setLoading(false);
  };

  useEffect(() => {
    fetchInsight();
    // Refresh every hour
    const interval = setInterval(fetchInsight, 3600000);
    return () => clearInterval(interval);
  }, []);

  if (!insight && !loading) return null;

  return (
    <div className="mt-12 max-w-lg w-full p-6 rounded-2xl bg-zinc-900/50 border border-zinc-800 backdrop-blur-sm transition-all duration-500 hover:border-zinc-700">
      <div className="flex items-center justify-between mb-4">
        <div className="flex items-center gap-2 text-amber-400">
          <Sparkles size={16} />
          <span className="text-xs font-bold uppercase tracking-wider">Mindful Moment</span>
        </div>
        <button 
          onClick={fetchInsight}
          disabled={loading}
          className="text-zinc-500 hover:text-zinc-300 transition-colors disabled:opacity-50"
        >
          <RefreshCw size={14} className={loading ? 'animate-spin' : ''} />
        </button>
      </div>

      {loading ? (
        <div className="h-20 flex flex-col gap-2">
          <div className="h-4 bg-zinc-800 animate-pulse rounded w-3/4"></div>
          <div className="h-4 bg-zinc-800 animate-pulse rounded w-1/2"></div>
        </div>
      ) : (
        <div className="relative">
          <Quote className="absolute -top-2 -left-2 text-zinc-800" size={32} />
          <p className="text-lg md:text-xl font-medium text-zinc-200 leading-relaxed italic relative z-10">
            "{insight?.quote}"
          </p>
          {insight?.author && (
            <p className="mt-3 text-sm text-zinc-500 font-medium">
              — {insight.author}
            </p>
          )}
          <div className="mt-4 flex gap-2">
            <span className="px-2 py-0.5 rounded-full bg-zinc-800 text-[10px] text-zinc-400 font-bold uppercase tracking-tighter">
              #{insight?.category}
            </span>
          </div>
        </div>
      )}
    </div>
  );
};

export default AIInsight;
