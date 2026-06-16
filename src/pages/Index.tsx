import { useState, useEffect } from 'react';
import { Navbar } from '@/components/Navbar';
import { Hero } from '@/components/Hero';
import { About } from '@/components/About';
import { Projects } from '@/components/Projects';
import { Skills } from '@/components/Skills';
import { Contact } from '@/components/Contact';
import { Footer } from '@/components/Footer';
import { CustomCursor } from '@/components/CustomCursor';
import { StickerSandbox } from '@/components/StickerSandbox';

const Index = () => {
  const [theme, setTheme] = useState<'light' | 'void' | 'glitch'>('light');
  const [showGrid, setShowGrid] = useState<boolean>(true);
  const [resetStickersKey, setResetStickersKey] = useState<number>(0);

  // Sync theme to document body class
  useEffect(() => {
    // Remove other theme classes
    document.body.classList.remove('theme-light', 'theme-void', 'theme-glitch');
    // Add current theme class
    document.body.classList.add(`theme-${theme}`);
  }, [theme]);

  const handleResetStickers = () => {
    setResetStickersKey(prev => prev + 1);
  };

  return (
    <div className={`min-h-screen relative overflow-hidden transition-colors duration-200 ${showGrid ? 'graph-grid' : ''}`}>
      {/* Neo-Brutalist Squares Custom Cursor */}
      <CustomCursor />

      {/* Main Page Layout */}
      <div className="pt-16 md:pt-20">
        <Navbar theme={theme} setTheme={setTheme} />
        <Hero />
        <About />

        {/* Interactive Sticker Board Sandbox with embedded controls */}
        <StickerSandbox 
          resetKey={resetStickersKey}
          onResetStickers={handleResetStickers}
          showGrid={showGrid}
          setShowGrid={setShowGrid}
        />

        <Projects />
        <Skills />
        <Contact />
        <Footer />
      </div>
    </div>
  );
};

export default Index;
