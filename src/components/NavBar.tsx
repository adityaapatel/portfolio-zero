'use client';
import { motion } from 'framer-motion';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { Home, Briefcase, Cpu, FileText, Mail, Layers } from 'lucide-react';

const navItems = [
  { name: 'Home', path: '/', icon: Home },
  { name: 'Projects', path: '/projects', icon: Layers },
  { name: 'Skills', path: '/skills', icon: Cpu },
  { name: 'Trajectory', path: '/experiences', icon: Briefcase },
  { name: 'Contact', path: '/contact', icon: Mail },
];

export default function Navbar() {
  const pathname = usePathname();

  return (
    <div className="fixed top-8 left-1/2 -translate-x-1/2 z-[100]">
      <motion.nav 
        initial={{ y: -20, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        className="flex items-center gap-1 p-2 bg-[#0d0d0d]/80 backdrop-blur-xl border border-white/5 rounded-2xl shadow-2xl"
      >
        {navItems.map((item) => {
          const isActive = pathname === item.path;
          return (
            <Link key={item.path} href={item.path}>
              <div className={`relative px-4 py-2.5 rounded-xl transition-all duration-300 group ${isActive ? 'bg-emerald-500/10' : 'hover:bg-white/5'}`}>
                <item.icon className={`w-4 h-4 transition-colors ${isActive ? 'text-emerald-400' : 'text-slate-500 group-hover:text-white'}`} />
                
                {/* Tooltip */}
                <span className="absolute -bottom-10 left-1/2 -translate-x-1/2 px-3 py-1 bg-slate-900 text-[9px] uppercase tracking-widest text-white rounded opacity-0 group-hover:opacity-100 transition-opacity pointer-events-none border border-white/10 whitespace-nowrap">
                  {item.name}
                </span>

                {isActive && (
                  <motion.div layoutId="nav-active" className="absolute inset-0 border border-emerald-500/20 rounded-xl" />
                )}
              </div>
            </Link>
          );
        })}
      </motion.nav>
    </div>
  );
}