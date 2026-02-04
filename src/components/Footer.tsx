import { Github, Linkedin, Instagram, Mail, Heart } from 'lucide-react';
import { Button } from '@/components/ui/button';

export const Footer = () => {
  return (
    <footer className="relative border-t border-white/10 bg-white/5 backdrop-blur-md">
      <div className="container mx-auto px-4 py-10">
        <div className="flex flex-col items-center gap-6">
          {/* Social Icons */}
          <div className="flex gap-3">
            {[
              {
                icon: Github,
                href: 'https://github.com/akhilesh-reddy2005',
                label: 'GitHub',
              },
              {
                icon: Linkedin,
                href: 'https://www.linkedin.com/in/akhilesh-reddy-612580292/',
                label: 'LinkedIn',
              },
              {
                icon: Instagram,
                href: 'https://instagram.com/akhilesh_reddy1107',
                label: 'Instagram',
              },
              {
                icon: Mail,
                href: 'mailto:akhileshreddy1246@gmail.com',
                label: 'Email',
              },
            ].map(({ icon: Icon, href, label }) => (
              <Button
                key={label}
                variant="ghost"
                size="icon"
                className="text-white/60 hover:text-white hover:bg-white/5"
                asChild
              >
                <a
                  href={href}
                  target={href.startsWith('http') ? '_blank' : undefined}
                  rel="noopener noreferrer"
                  aria-label={label}
                >
                  <Icon className="h-5 w-5" />
                </a>
              </Button>
            ))}
          </div>

          {/* Text */}
          <div className="text-center text-white/60">
            <p className="flex items-center gap-1 justify-center">
              Designed & built with
              by <span className="text-white font-medium">Akhilesh Reddy</span>
            </p>
            <p className="text-sm mt-2 text-white/40">
              © {new Date().getFullYear()} All rights reserved.
            </p>
          </div>
        </div>
      </div>
    </footer>
  );
};
