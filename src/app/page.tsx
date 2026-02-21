'use client';
import { motion } from 'framer-motion';
import Link from 'next/link';
import syncDataImport from '../../content/linkedin_sync.json';
import portfolioDataImport from '../../content/portfolio.json';
import { ArrowRight, Sparkles, MapPin, Mail, Github, Code2, ChevronDown } from 'lucide-react';
import Starfield from '@/components/Starfield';

// Interfaces for strict data handling
interface SyncData {
  status: string;
  bioSnippet: string;
  experience: { 
    company: string; 
    role: string; 
    domain: string; 
    description: string; 
    duration: string; 
  }[];
}
interface Project {
  title: string;
  tech: string;
  bulletPoints: string[];
}

const syncData = (syncDataImport as unknown) as SyncData;
const projects = (portfolioDataImport as unknown) as Project[];

export default function Home() {
  const transitionConfig = { duration: 1.2, ease: [0.22, 1, 0.36, 1] as const };

  return (
    <main className="bg-[#0a0a0a] text-white selection:bg-emerald-500/30">
      <Starfield />

      {/* SECTION 1: HERO & IDENTITY */}
      <section className="min-h-screen flex items-center justify-center p-6 md:p-24 relative overflow-hidden">
        <div className="absolute inset-0 z-0 bg-[radial-gradient(circle_at_20%_30%,rgba(16,185,129,0.06),transparent_70%)]" />
        
        <div className="relative z-10 w-full max-w-7xl grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-24 items-center">
          
          {/* Left: Identity Card */}
          <motion.div 
            initial={{ opacity: 0, x: -50 }} 
            animate={{ opacity: 1, x: 0 }} 
            transition={transitionConfig} 
            className="lg:col-span-4 flex flex-col items-center lg:items-start"
          >
            <div className="w-full max-w-md bg-[#0d0d0d]/40 backdrop-blur-xl border border-white/5 rounded-[3rem] p-10 shadow-2xl group">
              <div className="w-full aspect-[4/5] rounded-[2rem] overflow-hidden mb-8 border border-white/5 bg-slate-900 shadow-inner">
                <img 
                  src="/profile.png" 
                  alt="Aditya Patel" 
                  className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-105" 
                />
              </div>
              <h2 className="text-4xl font-light italic tracking-tight">Aditya Patel</h2>
              <p className="text-emerald-500 text-[10px] uppercase tracking-[0.3em] font-black mt-2">
                Software Engineering Intern
              </p>
              
              <div className="pt-8 flex flex-col gap-5 border-t border-white/5 mt-6">
                <div className="flex items-center gap-3 text-slate-500 text-[10px] uppercase font-bold tracking-widest">
                  <MapPin className="w-4 h-4 text-emerald-500" /> Worcester, MA // USA
                </div>
                
                <div className="flex justify-between items-center pt-4">
                   <div className="flex gap-5 text-slate-600">
                      <a href="https://github.com/adityaapatel" target="_blank" rel="noopener noreferrer" className="hover:text-white transition-colors">
                        <Github className="w-5 h-5" />
                      </a>
                      <a href="mailto:apatel11@wpi.edu" className="hover:text-white transition-colors">
                        <Mail className="w-5 h-5" />
                      </a>
                   </div>
                   
                   <Link 
                    href="/contact" 
                    className="px-8 py-3 bg-emerald-500 text-black text-[10px] font-black uppercase rounded-full hover:bg-white transition-all shadow-[0_0_20px_rgba(16,185,129,0.2)]"
                   >
                      Let's Talk
                   </Link>
                </div>
              </div>
            </div>
          </motion.div>

          {/* Right: Hero Content & Prestige Metrics */}
          <div className="lg:col-span-8 flex flex-col justify-center text-center lg:text-left">
            <motion.div initial={{ opacity: 0, y: 30 }} animate={{ opacity: 1, y: 0 }} transition={{ ...transitionConfig, delay: 0.2 }}>
              <h1 className="text-5xl md:text-8xl font-light italic tracking-tighter mb-10 leading-none">
                Transforming Ideas <br /> 
                into <span className="text-emerald-500 not-italic">Reality.</span>
              </h1>
              <p className="max-w-2xl text-slate-400 text-lg md:text-xl font-serif italic mb-16 mx-auto lg:mx-0">
                "{syncData.bioSnippet || "Crafting high-scale systems with technical rigor."}"
              </p>
              
              <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-12 mb-20 max-w-4xl border-y border-white/5 py-16">
                <div className="flex flex-col items-center lg:items-start">
                  <span className="text-6xl md:text-7xl font-light italic tracking-tighter block mb-2 underline decoration-emerald-500/20 underline-offset-8">
                    +3.91
                  </span>
                  <span className="text-[10px] uppercase tracking-[0.4em] text-emerald-500 font-black">
                    WPI CS GPA
                  </span>
                </div>
                <div className="flex flex-col items-center lg:items-start">
                  <span className="text-5xl md:text-6xl font-light italic tracking-tighter block mb-2 leading-tight">
                    FIDELITY
                  </span>
                  <span className="text-[10px] uppercase tracking-[0.4em] text-slate-500 font-black">
                    Incoming Intern
                  </span>
                </div>
                <div className="flex flex-col items-center lg:items-start">
                  <span className="text-5xl md:text-6xl font-light italic tracking-tighter block mb-2 uppercase">
                    SASA
                  </span>
                  <span className="text-[10px] uppercase tracking-[0.4em] text-slate-500 font-black">
                    President
                  </span>
                </div>
              </div>
            </motion.div>
          </div>
        </div>

        <div className="absolute bottom-10 left-1/2 -translate-x-1/2 flex flex-col items-center gap-2 text-slate-700 animate-bounce">
          <span className="text-[8px] uppercase tracking-[0.5em] font-black">Scroll to Explore</span>
          <ChevronDown className="w-4 h-4" />
        </div>
      </section>

      {/* SECTION 2: SELECTED PROJECTS */}
      <section id="projects" className="py-40 px-6 max-w-7xl mx-auto border-t border-white/5">
        <h2 className="text-7xl font-light italic mb-24 tracking-tighter text-white">Selected Works.</h2>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
          {projects.slice(0, 4).map((project, i) => (
            <motion.div key={i} whileHover={{ y: -10 }} className="bg-[#0d0d0d] border border-white/5 rounded-[2.5rem] p-12 hover:border-emerald-500/30 transition-all shadow-2xl">
               <div className="flex justify-between items-start mb-8">
                  <div className="flex gap-2">
                    {project.tech.split('/').map((t, idx) => (
                      <span key={idx} className="text-[9px] uppercase tracking-widest text-emerald-500 bg-emerald-500/5 border border-emerald-500/10 px-3 py-1 rounded">
                        {t.trim()}
                      </span>
                    ))}
                  </div>
                  <Code2 className="w-5 h-5 text-slate-800" />
               </div>
               <h3 className="text-4xl font-light italic mb-6 text-white">{project.title}</h3>
               <ul className="space-y-4 text-slate-400 font-serif italic text-base">
                 {project.bulletPoints.map((point, idx) => (
                   <li key={idx} className="flex gap-3"><span className="text-emerald-500/50">•</span>{point}</li>
                 ))}
               </ul>
            </motion.div>
          ))}
        </div>
      </section>

      {/* SECTION 3: TRAJECTORY */}
      <section id="trajectory" className="py-40 px-6 max-w-5xl mx-auto border-t border-white/5">
        <h2 className="text-7xl font-light italic mb-24 tracking-tighter text-white">Trajectory.</h2>
        <div className="relative border-l border-white/5 ml-10 space-y-20">
          {syncData.experience?.map((exp, i) => (
            <div key={i} className="relative pl-20 group">
              <div className="absolute -left-[22px] top-0 w-11 h-11 rounded-full bg-white border border-slate-900 flex items-center justify-center z-10 p-1.5 transition-transform group-hover:scale-110">
                <img 
                  src={`https://img.logo.dev/${exp.domain}?token=${process.env.NEXT_PUBLIC_LOGO_DEV_TOKEN}`} 
                  alt={exp.company} 
                  className="w-full h-full object-contain" 
                />
              </div>
              <div className="bg-[#0d0d0d] border border-white/5 rounded-[2.5rem] p-10 hover:border-emerald-500/30 transition-all">
                <h3 className="text-4xl font-light italic text-white">{exp.role}</h3>
                <p className="text-slate-500 mb-6 uppercase tracking-widest text-[10px] mt-2 font-bold">{exp.company}</p>
                <p className="text-slate-400 font-serif italic border-l-2 border-white/5 pl-6 leading-relaxed">
                  {exp.description}
                </p>
                <span className="block mt-6 text-[9px] uppercase tracking-widest text-slate-700 font-black">{exp.duration}</span>
              </div>
            </div>
          ))}
        </div>
      </section>
    </main>
  );
}