'use client';
import { motion } from 'framer-motion';
import syncData from '../../../content/linkedin_sync.json';

export default function Posts() {
  // We can simulate the 'embed' look with a clean card
  return (
    <motion.main 
      initial={{ opacity: 0 }} 
      animate={{ opacity: 1 }} 
      className="pt-48 px-12 max-w-3xl mx-auto pb-40"
    >
      <h1 className="text-6xl font-light italic mb-20 tracking-tighter">Activity Pulse.</h1>
      
      <div className="space-y-24">
        {/* This would map through an array of posts extracted by Gemini */}
        <div className="group border-l border-slate-900 pl-12 py-4">
          <span className="text-[10px] uppercase tracking-widest text-emerald-500 block mb-4">Latest Update</span>
          <p className="text-xl text-slate-300 font-serif italic leading-relaxed">
            "Excited to share that I'll be joining Fidelity Investments as a Software Engineering Intern for Summer 2026!"
          </p>
          <div className="mt-6 flex items-center gap-4">
            <span className="text-[10px] text-slate-700 uppercase tracking-widest">LinkedIn Activity</span>
            <div className="h-[1px] w-12 bg-slate-900" />
            <a href="https://linkedin.com/in/adityaapatel" className="text-[10px] text-slate-500 hover:text-white transition-colors uppercase tracking-widest">View Original</a>
          </div>
        </div>

        <div className="opacity-30">
          <p className="text-sm font-serif italic text-slate-500">More updates syncing from system...</p>
        </div>
      </div>
    </motion.main>
  );
}