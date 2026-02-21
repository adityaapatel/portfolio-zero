'use client';
import { motion } from 'framer-motion';
import { Mail, Linkedin, Github, ArrowUpRight } from 'lucide-react';

export default function Contact() {
  return (
    <motion.main initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} className="pt-48 px-6 max-w-5xl mx-auto pb-40">
      <div className="mb-24">
        <h1 className="text-8xl md:text-[10rem] font-light italic tracking-tighter text-white leading-none">Hello.</h1>
        <p className="text-2xl text-slate-500 font-serif italic mt-8 max-w-xl leading-relaxed">
          I'm currently focused on my upcoming role at Fidelity. If you'd like to collaborate or just say hi, reach out below.
        </p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        <a href="mailto:aditya.patel@wpi.edu" className="group p-12 bg-[#0d0d0d] border border-slate-900 rounded-[2.5rem] flex flex-col justify-between hover:border-emerald-500/50 transition-all h-[300px]">
          <Mail className="w-8 h-8 text-slate-700 group-hover:text-emerald-500 transition-colors" />
          <div>
            <p className="text-[10px] uppercase tracking-[0.4em] text-slate-600 mb-2">Email Me</p>
            <h2 className="text-3xl font-serif italic text-white flex items-center gap-2">aditya.patel@wpi.edu <ArrowUpRight className="w-5 h-5 opacity-0 group-hover:opacity-100 transition-all" /></h2>
          </div>
        </a>

        <a href="https://linkedin.com/in/adityaapatel" target="_blank" className="group p-12 bg-[#0d0d0d] border border-slate-900 rounded-[2.5rem] flex flex-col justify-between hover:border-blue-500/50 transition-all h-[300px]">
          <Linkedin className="w-8 h-8 text-slate-700 group-hover:text-blue-500 transition-colors" />
          <div>
            <p className="text-[10px] uppercase tracking-[0.4em] text-slate-600 mb-2">Network</p>
            <h2 className="text-3xl font-serif italic text-white flex items-center gap-2">LinkedIn <ArrowUpRight className="w-5 h-5 opacity-0 group-hover:opacity-100 transition-all" /></h2>
          </div>
        </a>
      </div>
    </motion.main>
  );
}