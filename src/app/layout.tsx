import './globals.css';
import Link from 'next/link';
import syncData from '../../content/linkedin_sync.json';
import { Sparkles } from 'lucide-react';

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en">
      <body className="bg-[#0a0a0a] text-[#f5f5f5] font-sans selection:bg-emerald-500/20">
        
        {/* FIXED NAVIGATION: High Z-Index to stay above background effects */}
        <nav className="fixed top-0 w-full z-[100] flex justify-between items-center px-12 py-10 bg-[#0a0a0a]/40 backdrop-blur-md">
          <Link href="/" className="flex items-center gap-2 text-[10px] tracking-[0.5em] font-light uppercase text-slate-500 hover:text-white transition-colors">
            <Sparkles className="w-3 h-3 text-emerald-400" />
            Aditya Patel
          </Link>

          {/* DYNAMIC NAVIGATION LINKS */}
          <div className="flex gap-8 items-center">
            {['projects', 'experiences', 'posts', 'skills', 'contact'].map((path) => (
              <Link 
                key={path} 
                href={`/${path}`} 
                className="text-[10px] uppercase tracking-[0.3em] text-slate-500 hover:text-emerald-400 transition-all font-bold"
              >
                {path}
              </Link>
            ))}
          </div>
        </nav>

        {/* PAGE CONTENT WRAPPER */}
        <div className="relative z-10">
          {children}
        </div>

        {/* FIXED FOOTER: Always displaying WPI Credentials */}
        <footer className="fixed bottom-0 w-full px-12 py-8 flex justify-between items-end border-t border-slate-900/50 text-[10px] uppercase tracking-widest text-slate-700 bg-[#0a0a0a]/80 backdrop-blur-md z-[100]">
          <div className="flex flex-col gap-1">
            <span className="text-emerald-500 font-bold tracking-tighter uppercase">Status // {syncData.status}</span>
            <span className="opacity-50">Last System Sync: {new Date(syncData.lastUpdate).toLocaleDateString()}</span>
          </div>
          <div className="text-right">
            <span className="block font-bold text-slate-400">3.91 GPA // WPI CS</span>
            <span className="opacity-50 tracking-tighter italic">Charles O. Thompson Scholar</span>
          </div>
        </footer>

      </body>
    </html>
  );
}