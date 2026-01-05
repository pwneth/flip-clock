
import React from 'react';
import { Clock, Settings, Maximize2 } from 'lucide-react';

const Header: React.FC = () => {
  return (
    <header className="fixed top-0 left-0 w-full p-6 flex justify-between items-center z-50">
      <div className="flex items-center gap-3">
        <div className="w-10 h-10 rounded-xl bg-gradient-to-br from-amber-400 to-orange-600 flex items-center justify-center shadow-lg shadow-orange-900/20">
          <Clock className="text-zinc-950" size={24} />
        </div>
        <div>
          <h1 className="text-lg font-extrabold tracking-tight text-zinc-100">CHRONOS</h1>
          <p className="text-[10px] text-zinc-500 font-bold tracking-widest uppercase">Analog Intelligence</p>
        </div>
      </div>

      <div className="flex gap-4">
        <button className="p-2.5 rounded-full bg-zinc-900 border border-zinc-800 text-zinc-400 hover:text-zinc-100 hover:bg-zinc-800 transition-all">
          <Settings size={20} />
        </button>
        <button 
          onClick={() => document.documentElement.requestFullscreen()}
          className="p-2.5 rounded-full bg-zinc-900 border border-zinc-800 text-zinc-400 hover:text-zinc-100 hover:bg-zinc-800 transition-all"
        >
          <Maximize2 size={20} />
        </button>
      </div>
    </header>
  );
};

export default Header;
