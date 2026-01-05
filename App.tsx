
import React, { useState, useEffect } from 'react';
import FlipUnit from './components/FlipUnit';
import Header from './components/Header';
import AIInsight from './components/AIInsight';
import { TimeState } from './types';
import { MapPin, Calendar, Globe } from 'lucide-react';

const App: React.FC = () => {
  const [time, setTime] = useState<TimeState>({
    hours: new Date().getHours(),
    minutes: new Date().getMinutes(),
    seconds: new Date().getSeconds(),
  });

  const [locationName, setLocationName] = useState<string>('Local Time');
  const [dateStr, setDateStr] = useState<string>('');

  useEffect(() => {
    const timer = setInterval(() => {
      const now = new Date();
      setTime({
        hours: now.getHours(),
        minutes: now.getMinutes(),
        seconds: now.getSeconds(),
      });
      
      setDateStr(now.toLocaleDateString('en-US', { 
        weekday: 'long', 
        year: 'numeric', 
        month: 'long', 
        day: 'numeric' 
      }));
    }, 1000);

    // Try to get user's location name
    if (navigator.geolocation) {
      navigator.geolocation.getCurrentPosition(async (position) => {
        try {
          const res = await fetch(`https://api.bigdatacloud.net/data/reverse-geocode-client?latitude=${position.coords.latitude}&longitude=${position.coords.longitude}&localityLanguage=en`);
          const data = await res.json();
          if (data.city) setLocationName(`${data.city}, ${data.countryCode}`);
        } catch (e) {
          console.warn("Could not fetch location name");
        }
      });
    }

    return () => clearInterval(timer);
  }, []);

  return (
    <div className="min-h-screen bg-zinc-950 flex flex-col items-center justify-center p-6 relative overflow-hidden">
      <Header />

      {/* Background Decorative Gradients */}
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[600px] bg-orange-500/5 blur-[120px] rounded-full pointer-events-none"></div>
      <div className="absolute -top-24 -right-24 w-96 h-96 bg-amber-500/5 blur-[100px] rounded-full pointer-events-none"></div>

      <main className="z-10 flex flex-col items-center w-full max-w-4xl">
        {/* Date and Location Banner */}
        <div className="flex flex-wrap items-center justify-center gap-6 mb-12 text-zinc-500">
          <div className="flex items-center gap-2 px-4 py-2 rounded-full bg-zinc-900/40 border border-zinc-800/50">
            <MapPin size={14} className="text-amber-500" />
            <span className="text-xs font-semibold tracking-wide uppercase">{locationName}</span>
          </div>
          <div className="flex items-center gap-2 px-4 py-2 rounded-full bg-zinc-900/40 border border-zinc-800/50">
            <Calendar size={14} className="text-amber-500" />
            <span className="text-xs font-semibold tracking-wide uppercase">{dateStr}</span>
          </div>
          <div className="hidden md:flex items-center gap-2 px-4 py-2 rounded-full bg-zinc-900/40 border border-zinc-800/50">
            <Globe size={14} className="text-amber-500" />
            <span className="text-xs font-semibold tracking-wide uppercase">UTC {Intl.DateTimeFormat().resolvedOptions().timeZone}</span>
          </div>
        </div>

        {/* The Flip Clock */}
        <div className="flex items-start gap-4 md:gap-8 bg-zinc-900/20 p-8 md:p-12 rounded-[40px] border border-zinc-800/30 backdrop-blur-xl shadow-2xl">
          <FlipUnit value={time.hours} label="Hours" />
          <div className="pt-6 md:pt-10 flex flex-col gap-4">
            <div className="w-2 h-2 md:w-3 md:h-3 bg-zinc-800 rounded-full shadow-[0_0_10px_rgba(245,158,11,0.2)]"></div>
            <div className="w-2 h-2 md:w-3 md:h-3 bg-zinc-800 rounded-full shadow-[0_0_10px_rgba(245,158,11,0.2)]"></div>
          </div>
          <FlipUnit value={time.minutes} label="Minutes" />
          <div className="pt-6 md:pt-10 flex flex-col gap-4">
            <div className="w-2 h-2 md:w-3 md:h-3 bg-zinc-800 rounded-full shadow-[0_0_10px_rgba(245,158,11,0.2)]"></div>
            <div className="w-2 h-2 md:w-3 md:h-3 bg-zinc-800 rounded-full shadow-[0_0_10px_rgba(245,158,11,0.2)]"></div>
          </div>
          <FlipUnit value={time.seconds} label="Seconds" />
        </div>

        {/* Gemini Integration */}
        <AIInsight />

        {/* Footer Info */}
        <footer className="mt-20 flex flex-col items-center gap-2 opacity-30 hover:opacity-100 transition-opacity">
          <p className="text-[10px] font-bold tracking-[0.3em] text-zinc-500 uppercase">Mechanical Core v4.2.0</p>
          <div className="flex gap-4">
            <div className="w-2 h-1 bg-zinc-800 rounded-full"></div>
            <div className="w-12 h-1 bg-zinc-800 rounded-full"></div>
            <div className="w-2 h-1 bg-zinc-800 rounded-full"></div>
          </div>
        </footer>
      </main>
    </div>
  );
};

export default App;
