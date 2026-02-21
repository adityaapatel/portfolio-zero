'use client';
import { motion, AnimatePresence } from 'framer-motion';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { Home, Briefcase, Mail, Layers } from 'lucide-react';
import { useState } from 'react';

const navItems = [
  { name: 'Home', path: '/#home', icon: Home },
  { name: 'Projects', path: '/#projects', icon: Layers },
  { name: 'Trajectory', path: '/#trajectory', icon: Briefcase },
  { name: 'Contact', path: '/contact', icon: Mail },
];

export default function Navbar() {
  const pathname = usePathname();
  const [hoveredItem, setHoveredItem] = useState<string | null>(null);

  return (
    <div className="fixed top-8 left-1/2 -translate-x-1/2 z-[100]">
      <motion.nav 
        initial={{ y: -20, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        className="flex items-center gap-1 p-2 bg-[#0d0d0d]/80 backdrop-blur-xl border border-white/5 rounded-2xl shadow-2xl relative"
      >
        {navItems.map((item) => {
          // Logic: Check if we are on the contact page or home page
          const isContactPage = pathname === '/contact';
          const isActive = isContactPage ? item.path === '/contact' : item.path === '/#home';

          return (
            <Link 
              key={item.name} 
              href={item.path}
              onMouseEnter={() => setHoveredItem(item.name)}
              onMouseLeave={() => setHoveredItem(null)}
              className="relative px-4 py-2.5 rounded-xl transition-all duration-300 group"
            >
              {/* THE GLOW EFFECT */}
              <AnimatePresence>
                {(isActive || hoveredItem === item.name) && (
                  <motion.div
                    layoutId="nav-glow"
                    initial={{ opacity: 0, scale: 0.8 }}
                    animate={{ opacity: 1, scale: 1 }}
                    exit={{ opacity: 0, scale: 0.8 }}
                    className="absolute inset-0 bg-emerald-500/10 rounded-xl blur-md border border-emerald-500/20"
                  />
                )}
              </AnimatePresence>

              <item.icon className={`w-4 h-4 relative z-10 transition-colors duration-300 ${isActive ? 'text-emerald-400' : 'text-slate-500 group-hover:text-white'}`} />
              
              {/* VISIBLE NAME TOOLTIP */}
              <AnimatePresence>
                {hoveredItem === item.name && (
                  <motion.span
                    initial={{ opacity: 0, y: 10, x: '-50%' }}
                    animate={{ opacity: 1, y: 0, x: '-50%' }}
                    exit={{ opacity: 0, y: 5, x: '-50%' }}
                    className="absolute -bottom-10 left-1/2 px-3 py-1 bg-[#0d0d0d] text-[9px] uppercase tracking-widest text-white rounded-md border border-white/10 whitespace-nowrap z-50 pointer-events-none font-bold shadow-xl"
                  >
                    {item.name}
                  </motion.span>
                )}
              </AnimatePresence>

              {isActive && (
                <motion.div 
                  layoutId="nav-active-pill" 
                  className="absolute inset-0 border border-emerald-500/30 rounded-xl shadow-[0_0_15px_rgba(16,185,129,0.1)]" 
                />
              )}
            </Link>
          );
        })}
      </motion.nav>
    </div>
  );
}