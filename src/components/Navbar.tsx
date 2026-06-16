import { useState, useEffect } from 'react';
import { Menu, X } from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';

const navItems = [
  { name: 'Home', href: '#home' },
  { name: 'About', href: '#about' },
  { name: 'Projects', href: '#projects' },
  { name: 'Skills', href: '#skills' },
  { name: 'Contact', href: '#contact' },
];

interface NavbarProps {
  theme: 'light' | 'void' | 'glitch';
  setTheme: (t: 'light' | 'void' | 'glitch') => void;
}

export const Navbar: React.FC<NavbarProps> = ({ theme, setTheme }) => {
  const [isOpen, setIsOpen] = useState(false);
  const [activeSection, setActiveSection] = useState('home');
  const [scrolled, setScrolled] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 40);

      const sections = navItems.map(item => item.href.substring(1));
      const current = sections.find(section => {
        const el = document.getElementById(section);
        if (!el) return false;
        const rect = el.getBoundingClientRect();
        return rect.top <= 140 && rect.bottom >= 140;
      });

      if (current) setActiveSection(current);
    };

    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const scrollToSection = (href: string) => {
    const el = document.getElementById(href.substring(1));
    if (el) {
      el.scrollIntoView({ behavior: 'smooth' });
      setIsOpen(false);
    }
  };

  return (
    <nav
      className={`fixed top-0 left-0 right-0 z-50 transition-all duration-200 border-b-[3px] border-[var(--border-primary)] bg-[var(--bg-canvas)] ${
        scrolled ? 'py-3' : 'py-5'
      }`}
    >
      <div className="container mx-auto px-4">
        <div className="flex items-center justify-between">
          {/* Logo */}
          <a
            href="#home"
            onClick={(e) => {
              e.preventDefault();
              scrollToSection('#home');
            }}
            className="text-xl md:text-2xl font-display font-black tracking-tighter uppercase select-none text-[var(--text-primary)]"
          >
            AKHILESH REDDY
          </a>

          {/* Desktop Navigation */}
          <div className="hidden md:flex items-center">
            {/* Nav Links */}
            <div className="flex items-center gap-5">
              {navItems.map(item => {
                const isActive = activeSection === item.href.substring(1);
                return (
                  <button
                    key={item.name}
                    onClick={() => scrollToSection(item.href)}
                    className={`font-mono-custom text-xs font-bold uppercase transition-all duration-75 px-3 py-1.5 border-[2px] ${
                      isActive
                        ? 'bg-[var(--text-primary)] text-[var(--bg-canvas)] border-[var(--border-primary)] shadow-[3px_3px_0px_var(--shadow-primary)]'
                        : 'border-transparent text-[var(--text-primary)] hover:border-[var(--border-primary)] hover:bg-[var(--text-primary)]/5'
                    }`}
                    style={{ borderRadius: '0px' }}
                  >
                    {item.name}
                  </button>
                );
              })}
            </div>

            {/* Desktop Theme Switcher */}
            <div className="flex gap-2 items-center pl-5 border-l-[2.5px] border-[var(--border-primary)] ml-5">
              {(['light', 'void', 'glitch'] as const).map((t) => (
                <button
                  key={t}
                  onClick={() => setTheme(t)}
                  className={`px-2 py-1 text-[10px] border-[2px] border-[var(--border-primary)] font-mono-custom font-bold uppercase transition-all duration-75 ${
                    theme === t
                      ? 'bg-[var(--text-primary)] text-[var(--bg-canvas)]'
                      : 'bg-[var(--bg-canvas)] text-[var(--text-primary)] hover:bg-[var(--text-primary)]/10'
                  }`}
                  style={{ borderRadius: '0px' }}
                >
                  {t}
                </button>
              ))}
            </div>
          </div>

          {/* Mobile Menu Button */}
          <div className="md:hidden">
            <button
              onClick={() => setIsOpen(v => !v)}
              aria-label="Toggle menu"
              className="p-2 border-[3px] border-[var(--border-primary)] bg-[var(--bg-canvas)] text-[var(--text-primary)] transition-all duration-75 active:translate-x-0.5 active:translate-y-0.5"
              style={{ borderRadius: '0px', boxShadow: '3px 3px 0px var(--shadow-primary)' }}
            >
              {isOpen ? <X className="h-5 w-5" /> : <Menu className="h-5 w-5" />}
            </button>
          </div>
        </div>

        {/* Mobile Menu */}
        <AnimatePresence>
          {isOpen && (
            <motion.div
              initial={{ opacity: 0, y: 15 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: 15 }}
              transition={{ duration: 0.15 }}
              className="md:hidden mt-4 border-[3px] border-[var(--border-primary)] bg-[var(--bg-canvas)] shadow-[5px_5px_0px_var(--shadow-primary)] overflow-hidden"
              style={{ borderRadius: '0px' }}
            >
              <div className="flex flex-col">
                {navItems.map((item) => {
                  const isActive = activeSection === item.href.substring(1);
                  return (
                    <button
                      key={item.name}
                      onClick={() => scrollToSection(item.href)}
                      className={`px-6 py-4 text-left font-mono-custom font-bold uppercase text-sm border-b-[2px] border-[var(--border-primary)] last:border-b-0 ${
                        isActive
                          ? 'bg-[var(--text-primary)] text-[var(--bg-canvas)]'
                          : 'text-[var(--text-primary)] hover:bg-[var(--text-primary)]/5'
                      }`}
                    >
                      {item.name}
                    </button>
                  );
                })}

                {/* Mobile Theme Selector */}
                <div className="p-6 bg-[var(--text-primary)]/5">
                  <div className="font-mono-custom text-[10px] font-bold uppercase text-[var(--text-primary)]/50 mb-3">
                    [ SELECT THEME COLOR ]
                  </div>
                  <div className="grid grid-cols-3 gap-2">
                    {(['light', 'void', 'glitch'] as const).map((t) => (
                      <button
                        key={t}
                        onClick={() => setTheme(t)}
                        className={`px-3 py-2 text-center text-xs border-[2px] border-[var(--border-primary)] font-mono-custom font-bold uppercase transition-all duration-75 ${
                          theme === t
                            ? 'bg-[var(--text-primary)] text-[var(--bg-canvas)]'
                            : 'bg-[var(--bg-canvas)] text-[var(--text-primary)] hover:bg-[var(--text-primary)]/10'
                        }`}
                        style={{ borderRadius: '0px' }}
                      >
                        {t}
                      </button>
                    ))}
                  </div>
                </div>
              </div>
            </motion.div>
          )}
        </AnimatePresence>
      </div>
    </nav>
  );
};
