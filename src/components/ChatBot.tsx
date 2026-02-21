'use client';
import { useState } from 'react';

export default function ChatBot() {
  const [isOpen, setIsOpen] = useState(false);

  return (
    <div className="fixed bottom-8 right-8 z-50">
      {isOpen && (
        <div className="w-80 h-96 bg-[#0a0f14] border border-[#10b981]/30 rounded-2xl mb-4 p-4 shadow-2xl flex flex-col">
          <div className="flex justify-between items-center border-b border-slate-800 pb-2 mb-2">
            <span className="text-[10px] font-bold text-[#10b981]">SYSTEM_ASSISTANT v1.0</span>
            <button onClick={() => setIsOpen(false)} className="text-slate-500 hover:text-white">×</button>
          </div>
          <div className="flex-1 overflow-y-auto text-[11px] text-slate-400 space-y-3">
            <p className="bg-slate-900 p-2 rounded">Hello. I am the Architect Zero AI. Ask me about Aditya's Resume or Portfolio</p>
          </div>
          <input 
            type="text" 
            placeholder="Query credentials..." 
            className="w-full bg-transparent border border-slate-800 rounded p-2 text-[10px] outline-none focus:border-[#10b981]"
          />
        </div>
      )}
      <button 
        onClick={() => setIsOpen(!isOpen)}
        className="w-14 h-14 bg-[#10b981] rounded-full flex items-center justify-center shadow-[0_0_20px_#10b98144] hover:scale-110 transition-transform"
      >
        <span className="text-black font-black">AI</span>
      </button>
    </div>
  );
}