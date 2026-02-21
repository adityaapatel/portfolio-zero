'use client';
import { motion } from 'framer-motion';
import syncDataImport from '../../../content/linkedin_sync.json';

// Define the Interface to match your Deterministic Mapping prompt
interface SyncData {
  status: string;
  experience: { 
    company: string; 
    role: string; 
    domain: string; 
    description: string; 
    duration: string; 
  }[];
}

// Convert JSON to Type-Safe Object
const syncData = (syncDataImport as unknown) as SyncData;

export default function Experiences() {
  const token = process.env.NEXT_PUBLIC_LOGO_DEV_TOKEN;

  return (
    <motion.main 
      initial={{ opacity: 0 }} 
      animate={{ opacity: 1 }} 
      className="pt-48 px-6 max-w-5xl mx-auto pb-40"
    >
      <div className="mb-24">
        <h1 className="text-7xl md:text-9xl font-light italic tracking-tighter text-white leading-none">
          Trajectory.
        </h1>
        <p className="text-slate-500 font-serif italic mt-8 text-lg max-w-xl">
          From WPI leadership to high-scale financial systems. A chronicle of technical evolution.
        </p>
      </div>

      <div className="relative border-l border-slate-900 ml-4 md:ml-10 space-y-20">
        {syncData.experience?.map((exp, i) => (
          <motion.div 
            key={`${exp.company}-${i}`}
            initial={{ opacity: 0, x: -20 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            className="relative pl-12 md:pl-20"
          >
            {/* THE LOGO CIRCLE (IMAGE FIX) */}
            <div className="absolute -left-[22px] top-0 w-11 h-11 rounded-full bg-white border border-slate-900 flex items-center justify-center z-10 overflow-hidden shadow-2xl p-1.5 transition-all group-hover:scale-110">
              <img 
                src={`https://img.logo.dev/${exp.domain}?token=${token}`} 
                alt={exp.company}
                className="w-full h-full object-contain"
                onError={(e) => {
                  // Fallback if domain/token fails (FI/WI initials)
                  e.currentTarget.src = `https://ui-avatars.com/api/?name=${exp.company}&background=0d0d0d&color=fff&bold=true`;
                }}
              />
            </div>

            {/* THE CONTENT CARD */}
            <div className="group bg-[#0d0d0d] border border-slate-900 rounded-[2.5rem] p-10 hover:border-emerald-500/30 transition-all duration-500 relative overflow-hidden">
              <div className="flex flex-col md:flex-row justify-between gap-6 mb-8">
                <div>
                  <h3 className="text-4xl font-light text-white italic tracking-tight group-hover:text-emerald-400 transition-colors">
                    {exp.role}
                  </h3>
                  <p className="text-slate-500 mt-2 font-medium tracking-wide uppercase text-[10px]">
                    {exp.company}
                  </p>
                </div>
                <span className="px-5 py-2 rounded-full border border-slate-800 text-[9px] uppercase tracking-[0.2em] text-slate-400 font-bold h-fit bg-slate-900/50">
                  {exp.duration}
                </span>
              </div>

              <p className="text-slate-400 font-serif italic leading-relaxed text-base max-w-3xl border-l-2 border-slate-900 pl-8 group-hover:border-emerald-500/50 transition-all duration-500">
                {exp.description}
              </p>

              {/* BACKGROUND ACCENT */}
              <div className="absolute -right-20 -bottom-20 w-64 h-64 bg-emerald-500/5 rounded-full blur-3xl opacity-0 group-hover:opacity-100 transition-opacity duration-700" />
            </div>
          </motion.div>
        ))}
      </div>
    </motion.main>
  );
}