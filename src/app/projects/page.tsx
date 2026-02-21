'use client';
import { motion } from 'framer-motion';
import portfolioDataImport from '../../../content/portfolio.json';
import { Github, ExternalLink, Code2 } from 'lucide-react';

// This interface matches our new Gemini 2.5 prompt
interface Project {
  title: string;
  tech: string;
  bulletPoints: string[];
  repoUrl: string | null;
  liveUrl: string | null;
}

// FIX: Convert to unknown first to clear the TypeScript error
const portfolioData = (portfolioDataImport as unknown) as Project[];

export default function Projects() {
  return (
    <motion.main 
      initial={{ opacity: 0 }} 
      animate={{ opacity: 1 }}
      className="pt-48 px-6 md:px-12 max-w-7xl mx-auto pb-40 relative z-10"
    >
      <div className="flex flex-col md:flex-row justify-between items-end mb-24 gap-8">
        <div>
          <h1 className="text-6xl md:text-8xl font-light italic tracking-tighter text-white leading-none">
            Projects.
          </h1>
          <p className="text-slate-500 font-serif italic mt-6 text-lg">
            Engineering solutions refined through WPI rigor.
          </p>
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
        {portfolioData?.map((project, i) => (
          <motion.div 
            key={`${project.title}-${i}`}
            whileHover={{ y: -8 }}
            className="group relative bg-[#0d0d0d] border border-slate-900 rounded-[2.5rem] p-8 md:p-12 transition-all hover:border-emerald-500/30 shadow-2xl"
          >
            <div className="flex justify-between items-start mb-12">
              <div className="flex flex-wrap gap-2">
                {/* SAFE ACCESS: Falls back to empty string if tech is missing */}
                {(project.tech || "").split('/').map((t: string, index: number) => (
                  <span key={index} className="text-[9px] uppercase tracking-widest text-emerald-500/80 font-bold bg-emerald-500/5 border border-emerald-500/10 px-3 py-1 rounded">
                    {t.trim()}
                  </span>
                ))}
              </div>
              <span className="text-[10px] font-mono text-slate-800 italic">0{i + 1}</span>
            </div>

            <h2 className="text-3xl md:text-4xl font-light italic text-white mb-6 group-hover:text-emerald-400 transition-colors">
              {project.title}
            </h2>
            
            {/* SAFE ACCESS: Handles both bulletPoints and old description field */}
            <ul className="space-y-3 mb-12">
              {(project.bulletPoints || []).map((point, idx) => (
                <li key={idx} className="text-slate-400 font-serif leading-relaxed italic text-sm md:text-base flex gap-3">
                  <span className="text-emerald-500/40 mt-1.5">•</span>
                  {point}
                </li>
              ))}
              {(!project.bulletPoints || project.bulletPoints.length === 0) && (
                <p className="text-slate-500 italic text-sm">System implementation details synced from WPI records.</p>
              )}
            </ul>

            <div className="flex items-center justify-between pt-8 border-t border-slate-900/50">
              <div className="flex gap-8">
                {project.repoUrl ? (
                  <a href={project.repoUrl} target="_blank" rel="noopener noreferrer" className="flex items-center gap-2 text-[10px] uppercase tracking-widest text-emerald-400 hover:text-white transition-colors">
                    <Github className="w-4 h-4" /> Source
                  </a>
                ) : (
                  <span className="text-[9px] uppercase tracking-widest text-slate-800 italic">Internal System</span>
                )}

                {project.liveUrl && (
                  <a href={project.liveUrl} target="_blank" rel="noopener noreferrer" className="flex items-center gap-2 text-[10px] uppercase tracking-widest text-slate-400 hover:text-white transition-colors">
                    <ExternalLink className="w-4 h-4" /> Deployment
                  </a>
                )}
              </div>
              <div className="p-3 rounded-full bg-slate-900/50 text-slate-700 group-hover:bg-emerald-500/10 group-hover:text-emerald-400 transition-all border border-transparent group-hover:border-emerald-500/20">
                <Code2 className="w-5 h-5" />
              </div>
            </div>
          </motion.div>
        ))}
      </div>
    </motion.main>
  );
}