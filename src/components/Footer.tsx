import { Github, Linkedin, Instagram, Mail, ArrowUp } from 'lucide-react';
import { Magnetic } from '@/components/ui/Magnetic';

const footerLinks = [
  { label: 'GitHub', href: 'https://github.com/akhilesh-reddy2005' },
  { label: 'LinkedIn', href: 'https://www.linkedin.com/in/akhilesh-reddy-612580292/' },
  { label: 'Instagram', href: 'https://instagram.com/akhilesh_reddy1107' },
  { label: 'Email', href: 'mailto:akhileshreddy1246@gmail.com' },
];

const quickLinks = [
  { label: 'Home', href: '#home' },
  { label: 'About', href: '#about' },
  { label: 'Projects', href: '#projects' },
  { label: 'Skills', href: '#skills' },
  { label: 'Contact', href: '#contact' },
];

export const Footer = () => {
  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  return (
    <footer className="relative border-t-[3px] border-[var(--border-primary)] bg-[var(--bg-canvas)] select-none">
      <div className="container mx-auto px-4 py-16">
        {/* Main Footer Content */}
        <div className="grid md:grid-cols-4 gap-12 mb-12">
          {/* Brand Section */}
          <div className="md:col-span-1">
            <h3 className="text-xl font-display font-black text-[var(--text-primary)] mb-4 uppercase">
              AKHILESH REDDY
            </h3>
            <p className="font-mono-custom text-xs text-[var(--text-primary)]/80 leading-relaxed font-semibold uppercase">
              [ Developer crafting raw, performant architectures for high-speed systems. ]
            </p>
          </div>

          {/* Quick Links */}
          <div>
            <h4 className="font-mono-custom text-xs font-black uppercase text-[var(--text-primary)] mb-4 border-b-[2px] border-[var(--border-primary)] pb-1 w-fit">
              Navigation
            </h4>
            <ul className="space-y-2">
              {quickLinks.map(link => (
                <li key={link.label}>
                  <a
                    href={link.href}
                    className="font-mono-custom text-xs font-bold uppercase text-[var(--text-primary)]/75 hover:text-[var(--text-primary)] hover:underline transition-colors"
                  >
                    {link.label}
                  </a>
                </li>
              ))}
            </ul>
          </div>

          {/* Resources */}
          <div>
            <h4 className="font-mono-custom text-xs font-black uppercase text-[var(--text-primary)] mb-4 border-b-[2px] border-[var(--border-primary)] pb-1 w-fit">
              Resources
            </h4>
            <ul className="space-y-2">
              <li>
                <a
                  href="/Akhilesh_Resume.pdf"
                  target="_blank"
                  rel="noreferrer"
                  className="font-mono-custom text-xs font-bold uppercase text-[var(--text-primary)]/75 hover:text-[var(--text-primary)] hover:underline transition-colors"
                >
                  Resume PDF
                </a>
              </li>
              {footerLinks.slice(0, 3).map(link => (
                <li key={link.label}>
                  <a
                    href={link.href}
                    target="_blank"
                    rel="noreferrer"
                    className="font-mono-custom text-xs font-bold uppercase text-[var(--text-primary)]/75 hover:text-[var(--text-primary)] hover:underline transition-colors"
                  >
                    {link.label}
                  </a>
                </li>
              ))}
            </ul>
          </div>

          {/* Social Media Connect */}
          <div>
            <h4 className="font-mono-custom text-xs font-black uppercase text-[var(--text-primary)] mb-4 border-b-[2px] border-[var(--border-primary)] pb-1 w-fit">
              Connect Channels
            </h4>
            <div className="flex flex-wrap gap-3">
              {[
                { icon: Github, href: 'https://github.com/akhilesh-reddy2005', label: 'GitHub', color: 'var(--accent-lime)' },
                { icon: Linkedin, href: 'https://www.linkedin.com/in/akhilesh-reddy-612580292/', label: 'LinkedIn', color: 'var(--accent-pink)' },
                { icon: Instagram, href: 'https://instagram.com/akhilesh_reddy1107', label: 'Instagram', color: 'var(--accent-orange)' },
                { icon: Mail, href: 'mailto:akhileshreddy1246@gmail.com', label: 'Email', color: 'var(--accent-cyan)' },
              ].map(({ icon: Icon, href, label, color }) => (
                <Magnetic key={label}>
                  <a
                    href={href}
                    target="_blank"
                    rel="noopener noreferrer"
                    aria-label={label}
                    className="w-10 h-10 border-[3px] border-[var(--border-primary)] neo-shadow flex items-center justify-center text-black"
                    style={{ backgroundColor: color, boxShadow: '3px 3px 0px var(--border-primary)' }}
                  >
                    <Icon className="h-4 w-4 stroke-[2.5]" />
                  </a>
                </Magnetic>
              ))}
            </div>
          </div>
        </div>

        {/* Footer Divider */}
        <div className="border-t-[3px] border-[var(--border-primary)] border-dashed pt-8">
          <div className="flex flex-col md:flex-row items-center justify-between gap-6">
            {/* Copyright */}
            <p className="font-mono-custom text-xs font-bold uppercase text-[var(--text-primary)]/80 text-center md:text-left">
              <span className="inline-flex items-center gap-1.5">
                Made by Akhilesh Reddy
              </span>
              <span className="block md:inline md:ml-4">
                © {new Date().getFullYear()} ALL RIGHTS RESERVED
              </span>
            </p>

            {/* Scroll to Top */}
            <Magnetic>
              <button
                onClick={scrollToTop}
                aria-label="Scroll to top"
                className="neo-btn p-3 bg-[var(--accent-lime)] text-black border-[3px]"
              >
                <ArrowUp className="h-4 w-4 stroke-[2.5]" />
              </button>
            </Magnetic>
          </div>
        </div>

        {/* Fun Monospace Quote */}
        <p className="text-center font-mono-custom text-[10px] uppercase text-[var(--text-primary)]/50 mt-8">
          [ "CODE IS LOGIC, DESIGN IS FLUIDITY" ]
        </p>
      </div>
    </footer>
  );
};
