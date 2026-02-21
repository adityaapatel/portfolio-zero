'use client';
import { motion } from 'framer-motion';
import { useEffect, useState } from 'react';

// Data Imports
import portfolioData from '../../content/portfolio.json';
import syncData from '../../content/linkedin_sync.json';

export default function Home() {
  const [mounted, setMounted] = useState(false);

  // Prevention of Hydration Mismatch
  useEffect(() => {
    setMounted(true);
  }, []);

  if (!mounted) return null;

  return (
    <main className="min-h-screen bg-[#030303] text-white font-mono selection:bg-cyan-500/30 overflow-x-hidden">
      
      {/* 1. Dynamic Ambient Background */}
      <div className="fixed inset-0 z-0 opacity-30 pointer-events-none">
        <div className="absolute top-[-10%] left-[-10%] w-[40%] h-[40%] bg-cyan-900/20 rounded-full blur-[120px]" />
        <div className="absolute bottom-[-10%] right-[-10%] w-[40%] h-[40%] bg-purple-900/20 rounded-full blur-[120px]" />
      </div>

      <div className="relative z-10 max-w-7xl mx-auto px-6 py-20">
        
        {/* 2. Live LinkedIn Pulse Component */}
        <motion.div 
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          className="mb-12 inline-flex items-center gap-4 bg-cyan-500/5 border border-cyan-500/20 p-4 rounded-xl backdrop-blur-xl"
        >
          <div className="relative">
            <div className="w-3 h-3 bg-cyan-500 rounded-full animate-ping" />
            <div className="absolute inset-0 w-3 h-3 bg-cyan-500 rounded-full" />
          </div>
          <div className="flex flex-col">
            <span className="text-[10px] text-cyan-500 font-bold tracking-[0.3em]">LIVE_LINKEDIN_PULSE</span>
            <span className="text-sm text-gray-300 italic font-medium">
              "{syncData.status || "Establishing connection..."}"
            </span>
          </div>
        </motion.div>

        {/* 3. Hero Section */}
        <header className="mb-32">
          <motion.div 
            initial={{ opacity: 0, x: -20 }} 
            animate={{ opacity: 1, x: 0 }}
            className="flex items-center gap-3 mb-6"
          >
            <span className="h-[1px] w-12 bg-cyan-500" />
            <span className="text-cyan-500 text-sm font-bold tracking-[0.2em]">SYSTEM_VERSION_3.1</span>
          </motion.div>
          
          <h1 className="text-7xl md:text-9xl font-black tracking-tighter mb-8 leading-none uppercase">
            ARCHITECT<br />
            <span className="text-transparent bg-clip-text bg-gradient-to-r from-cyan-400 to-purple-600">ZERO.</span>
          </h1>
          <p className="text-xl text-gray-400 max-w-2xl leading-relaxed">
            {syncData.bioSnippet || "Autonomous Portfolio Engine. Senior Platform Architect. Synthesizing code and AI into scalable digital organisms."}
          </p>
        </header>

        {/* 4. The Agentic Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {portfolioData.map((item: any, idx: number) => (
            <motion.div
              key={idx}
              whileHover={{ y: -10 }}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: idx * 0.1 }}
              className="group relative p-8 rounded-2xl bg-white/[0.03] border border-white/10 hover:border-cyan-500/50 transition-all flex flex-col min-h-[350px]"
            >
              {/* Animated Top Border */}
              <div className="absolute top-0 left-0 w-full h-1 bg-gradient-to-r from-transparent via-cyan-500/50 to-transparent opacity-0 group-hover:opacity-100 transition-opacity" />
              
              <div className="flex justify-between items-start mb-8">
                <div className="text-[10px] text-gray-500 font-bold uppercase tracking-widest border border-white/10 px-2 py-1 rounded">
                  {item.techStack}
                </div>
                <div className="text-cyan-500 text-xs font-bold tracking-widest">0{idx + 1}</div>
              </div>

              <h3 className="text-3xl font-bold mb-4 group-hover:text-cyan-400 transition-colors">
                {item.title}
              </h3>
              <p className="text-gray-400 text-sm leading-relaxed mb-8 flex-grow">
                {item.description}
              </p>

              <div className="flex items-center gap-3 mt-auto pt-6 border-t border-white/5">
                <div className="w-2 h-2 rounded-full bg-green-500 animate-pulse" />
                <span className="text-[10px] font-bold text-gray-300 uppercase tracking-wider">
                  {item.impact}
                </span>
              </div>
            </motion.div>
          ))}
        </div>

        {/* 5. Terminal Footer */}
        <footer className="mt-32 border-t border-white/10 pt-10 text-center">
          <span className="text-[10px] text-gray-600 tracking-[0.5em] uppercase">
            Designed by Aditya Patel // Powered by Gemini 2.5 Flash
          </span>
        </footer>
      </div>
    </main>
  );
}