'use client';
import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { ChevronDown, ChevronUp } from 'lucide-react';
import syncDataImport from '../../../content/linkedin_sync.json';

interface SyncData {
  skills: { name: string; slug: string }[];
}

const syncData = (syncDataImport as unknown) as SyncData;

export default function Skills() {
  const [isExpanded, setIsExpanded] = useState(false);
  const initialCount = 18;
  const visibleSkills = isExpanded ? syncData.skills : syncData.skills?.slice(0, initialCount);
  const hasMore = (syncData.skills?.length || 0) > initialCount;

  return (
    <motion.main initial={{ opacity: 0 }} animate={{ opacity: 1 }} className="pt-48 px-6 max-w-6xl mx-auto pb-40">
      <h1 className="text-7xl font-light italic mb-20 tracking-tighter text-white">Technical Stack.</h1>
      <div className="grid grid-cols-2 md:grid-cols-4 lg:grid-cols-6 gap-4">
        <AnimatePresence mode="popLayout">
          {visibleSkills?.map((skill, index) => (
            <motion.div key={index} layout initial={{ opacity: 0, scale: 0.9 }} animate={{ opacity: 1, scale: 1 }} exit={{ opacity: 0, scale: 0.9 }} className="group relative p-8 bg-[#0d0d0d] border border-slate-900 rounded-[2rem] flex flex-col items-center justify-center gap-6 hover:border-emerald-500/40 transition-all aspect-square overflow-hidden">
              <div className="relative w-12 h-12 flex items-center justify-center z-10">
                {skill.slug ? (
                  <img 
                    src={`https://cdn.simpleicons.org/${skill.slug}`} 
                    alt={skill.name}
                    className="w-full h-full opacity-80 group-hover:opacity-100 group-hover:scale-110 transition-all duration-500"
                    onError={(e) => (e.currentTarget.style.display = 'none')}
                  />
                ) : null}
                <span className="absolute inset-0 flex items-center justify-center text-5xl font-black text-white/[0.03] group-hover:text-emerald-500/10 transition-colors uppercase">{skill.name.charAt(0)}</span>
              </div>
              <span className="text-[9px] uppercase tracking-[0.3em] text-slate-500 group-hover:text-emerald-400 font-bold text-center z-10">{skill.name}</span>
            </motion.div>
          ))}
        </AnimatePresence>
      </div>
      {hasMore && (
        <div className="flex justify-center mt-24">
          <button onClick={() => setIsExpanded(!isExpanded)} className="group flex flex-col items-center gap-4 text-slate-600 hover:text-white transition-all">
            <span className="text-[10px] uppercase tracking-[0.5em] font-bold">{isExpanded ? 'Collapse Stack' : 'Expand Full Toolkit'}</span>
            <div className="p-5 rounded-full border border-slate-900 bg-[#0d0d0d] group-hover:border-emerald-500 transition-all">
              {isExpanded ? <ChevronUp className="w-5 h-5" /> : <ChevronDown className="w-5 h-5" />}
            </div>
          </button>
        </div>
      )}
    </motion.main>
  );
}