import { motion } from 'framer-motion';
import { Mail, Send, Linkedin, MessageCircle, CheckCircle2, AlertCircle } from 'lucide-react';
import emailjs from '@emailjs/browser';
import { Magnetic } from '@/components/ui/Magnetic';
import { useRef, useState } from 'react';
import { usePrefersReducedMotion } from '@/hooks/usePrefersReducedMotion';
import { useToast } from '@/hooks/use-toast';

const contactMethods = [
  {
    icon: Mail,
    title: 'Email',
    value: 'akhileshreddy1246@gmail.com',
    href: 'mailto:akhileshreddy1246@gmail.com',
    color: 'var(--accent-cyan)',
  },
  {
    icon: MessageCircle,
    title: 'WhatsApp',
    value: 'Message me directly',
    href: 'https://wa.me/917760007395',
    color: 'var(--accent-lime)',
  },
  {
    icon: Linkedin,
    title: 'LinkedIn',
    value: 'Connect with me',
    href: 'https://www.linkedin.com/in/akhilesh-reddy-612580292/',
    color: 'var(--accent-pink)',
  },
];

export const Contact = () => {
  const { toast } = useToast();
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submitStatus, setSubmitStatus] = useState<'idle' | 'success' | 'error'>('idle');
  const [errorMessage, setErrorMessage] = useState<string>('');
  const formRef = useRef<HTMLFormElement | null>(null);
  const prefersReducedMotion = usePrefersReducedMotion();

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setIsSubmitting(true);
    setSubmitStatus('idle');

    try {
      if (!formRef.current) {
        throw new Error('Form not ready');
      }

      const serviceId = import.meta.env.VITE_EMAILJS_SERVICE_ID as string;
      const templateId = import.meta.env.VITE_EMAILJS_TEMPLATE_ID as string;
      const publicKey = import.meta.env.VITE_EMAILJS_PUBLIC_KEY as string;

      if (!serviceId || !templateId || !publicKey) {
        throw new Error('EmailJS variables missing');
      }

      await emailjs.sendForm(serviceId, templateId, formRef.current, {
        publicKey,
      });

      setSubmitStatus('success');
      toast({
        title: 'Message sent! 🎉',
        description: "I'll respond within 24 hours.",
      });
      formRef.current.reset();

      setTimeout(() => setSubmitStatus('idle'), 4000);
    } catch (error: any) {
      setSubmitStatus('error');
      const msg = error?.text || error?.message || JSON.stringify(error);
      setErrorMessage(msg);
      toast({
        title: 'Form Submission Failure',
        description: `Error details: ${msg}`,
      });
      console.error('Contact submission error:', error);
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <section id="contact" className="py-24 border-t-[3px] border-[var(--border-primary)] bg-[var(--bg-canvas)] relative">
      <div className="container mx-auto px-4 relative z-10">
        {/* Section Header */}
        <div className="text-center mb-20">
          <span className="font-mono-custom font-bold uppercase text-[var(--accent-orange)] text-xs px-3 py-1 border-[2px] border-[var(--border-primary)] bg-[var(--bg-canvas)] neo-shadow inline-block mb-4">
            <Send className="w-3.5 h-3.5 inline mr-1 text-black fill-black" />
            Let's Connect
          </span>
          <h2 className="text-4xl md:text-5xl font-display font-black text-[var(--text-primary)] mb-6">
            Get In Touch
          </h2>
          <p className="font-mono-custom text-sm text-[var(--text-primary)]/80 max-w-2xl mx-auto uppercase">
            [ Send inquiries, contract offers, or collaboration proposals directly through the form below. ]
          </p>
        </div>

        {/* Contact Links Grid */}
        <div className="max-w-5xl mx-auto grid md:grid-cols-3 gap-6 mb-16">
          {contactMethods.map((method, index) => {
            const Icon = method.icon;
            return (
              <motion.a
                key={method.title}
                href={method.href}
                target={method.href.startsWith('http') ? '_blank' : undefined}
                rel={method.href.startsWith('http') ? 'noopener noreferrer' : undefined}
                initial={{ opacity: 0, y: prefersReducedMotion ? 0 : 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.4, delay: index * 0.08 }}
                className="neo-card neo-card-hover p-6 text-center flex flex-col items-center justify-center select-none"
              >
                {/* Icon wrapper */}
                <div
                  className="p-3.5 border-[3px] border-[var(--border-primary)] neo-shadow text-black mb-4 flex items-center justify-center"
                  style={{ backgroundColor: method.color, boxShadow: '3px 3px 0px var(--border-primary)' }}
                >
                  <Icon className="h-6 w-6 stroke-[2.5]" />
                </div>
                <h3 className="text-lg font-display font-black text-[var(--text-primary)] mb-1 uppercase">
                  {method.title}
                </h3>
                <p className="font-mono-custom text-xs text-[var(--text-primary)]/75 select-text font-bold">
                  {method.value}
                </p>
              </motion.a>
            );
          })}
        </div>

        {/* Contact Form */}
        <div className="max-w-2xl mx-auto neo-card p-8 md:p-12">
          <h3 className="text-xl md:text-2xl font-display font-black text-[var(--text-primary)] mb-8 uppercase border-b-[3px] border-[var(--border-primary)] pb-3">
            Send Message
          </h3>

          <form ref={formRef} onSubmit={handleSubmit} className="space-y-6">
            {/* Name Field */}
            <div>
              <label className="block font-mono-custom text-xs font-bold uppercase text-[var(--text-primary)] mb-2">
                Name *
              </label>
              <input
                type="text"
                name="user_name"
                placeholder="YOUR NAME"
                required
                disabled={isSubmitting}
                className="w-full bg-[var(--bg-canvas)] border-[3px] border-[var(--border-primary)] p-3.5 text-sm font-semibold text-[var(--text-primary)] placeholder:text-[var(--text-primary)]/40 focus:ring-0 focus:outline-none focus:bg-[var(--text-primary)]/5 transition-all"
                style={{ borderRadius: '0px' }}
              />
            </div>

            {/* Email Field */}
            <div>
              <label className="block font-mono-custom text-xs font-bold uppercase text-[var(--text-primary)] mb-2">
                Email *
              </label>
              <input
                type="email"
                name="user_email"
                placeholder="YOUR.EMAIL@EXAMPLE.COM"
                required
                disabled={isSubmitting}
                className="w-full bg-[var(--bg-canvas)] border-[3px] border-[var(--border-primary)] p-3.5 text-sm font-semibold text-[var(--text-primary)] placeholder:text-[var(--text-primary)]/40 focus:ring-0 focus:outline-none focus:bg-[var(--text-primary)]/5 transition-all"
                style={{ borderRadius: '0px' }}
              />
            </div>

            {/* Subject Field */}
            <div>
              <label className="block font-mono-custom text-xs font-bold uppercase text-[var(--text-primary)] mb-2">
                Subject *
              </label>
              <input
                type="text"
                name="subject"
                placeholder="SUBJECT TITLE"
                required
                disabled={isSubmitting}
                className="w-full bg-[var(--bg-canvas)] border-[3px] border-[var(--border-primary)] p-3.5 text-sm font-semibold text-[var(--text-primary)] placeholder:text-[var(--text-primary)]/40 focus:ring-0 focus:outline-none focus:bg-[var(--text-primary)]/5 transition-all"
                style={{ borderRadius: '0px' }}
              />
            </div>

            {/* Message Field */}
            <div>
              <label className="block font-mono-custom text-xs font-bold uppercase text-[var(--text-primary)] mb-2">
                Message *
              </label>
              <textarea
                name="message"
                placeholder="TYPE YOUR MESSAGE HERE..."
                required
                disabled={isSubmitting}
                rows={5}
                className="w-full bg-[var(--bg-canvas)] border-[3px] border-[var(--border-primary)] p-3.5 text-sm font-semibold text-[var(--text-primary)] placeholder:text-[var(--text-primary)]/40 focus:ring-0 focus:outline-none focus:bg-[var(--text-primary)]/5 transition-all resize-none"
                style={{ borderRadius: '0px' }}
              />
            </div>

            {/* Status Messages */}
            {submitStatus === 'success' && (
              <div className="flex items-center gap-3 p-4 border-[3px] border-[var(--border-primary)] bg-[var(--accent-lime)] text-black font-mono-custom text-xs font-bold uppercase neo-shadow">
                <CheckCircle2 className="h-5 w-5 stroke-[2.5]" />
                <span>Message sent successfully!</span>
              </div>
            )}

            {submitStatus === 'error' && (
              <div className="flex items-start gap-3 p-4 border-[3px] border-[var(--border-primary)] bg-[var(--accent-orange)] text-black font-mono-custom text-xs font-bold uppercase neo-shadow">
                <AlertCircle className="h-5 w-5 stroke-[2.5] mt-0.5 shrink-0" />
                <div>
                  <span className="block font-bold">Failed to send. Check console and configuration.</span>
                  {errorMessage && <span className="block mt-1 normal-case font-normal text-black/80">{errorMessage}</span>}
                </div>
              </div>
            )}

            {/* Submit Button */}
            <div className="w-full">
              <Magnetic>
                <button
                  type="submit"
                  disabled={isSubmitting}
                  className="neo-btn w-full py-4 bg-[var(--accent-pink)] text-black border-[3px] text-sm flex items-center justify-center gap-2"
                >
                  {isSubmitting ? (
                    <>
                      <div className="w-4 h-4 border-2 border-black border-t-transparent rounded-full animate-spin" />
                      COMPILING SEND...
                    </>
                  ) : (
                    <>
                      <Send className="h-4 w-4 stroke-[2.5]" />
                      SEND MESSAGE
                    </>
                  )}
                </button>
              </Magnetic>
            </div>
          </form>
        </div>
      </div>
    </section>
  );
};
