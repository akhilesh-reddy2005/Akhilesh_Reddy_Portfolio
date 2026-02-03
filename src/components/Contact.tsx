import { motion } from 'framer-motion';
import { Mail, Send, Linkedin, MessageCircle } from 'lucide-react';
import emailjs from '@emailjs/browser';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import { useToast } from '@/hooks/use-toast';
import { useRef, useState } from 'react';

export const Contact = () => {
  const { toast } = useToast();
  const [isSubmitting, setIsSubmitting] = useState(false);
  const formRef = useRef<HTMLFormElement | null>(null);

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setIsSubmitting(true);

    try {
      if (!formRef.current) {
        throw new Error('Form not ready');
      }

      const serviceId = import.meta.env.VITE_EMAILJS_SERVICE_ID as string;
      const templateId = import.meta.env.VITE_EMAILJS_TEMPLATE_ID as string;
      const publicKey = import.meta.env.VITE_EMAILJS_PUBLIC_KEY as string;

      if (!serviceId || !templateId || !publicKey) {
        throw new Error('EmailJS env variables are missing');
      }

      await emailjs.sendForm(serviceId, templateId, formRef.current, {
        publicKey,
      });

      toast({
        title: 'Message sent successfully!',
        description: 'Thanks for reaching out. I’ll respond within 24 hours.',
      });
      formRef.current.reset();
    } catch (error) {
      toast({
        title: 'Message failed to send',
        description: 'Please try again or reach out via email/WhatsApp.',
      });
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <section id="contact" className="py-20 md:py-32 relative">
      <div className="container mx-auto px-4 relative z-10">
        {/* Heading */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5 }}
          className="text-center mb-16"
        >
          <h2 className="text-4xl md:text-5xl font-display font-bold mb-4 text-white">
            Get In <span className="gradient-text">Touch</span>
          </h2>
          <p className="text-xl text-white/60 max-w-2xl mx-auto">
            Interested in collaborating, hiring, or discussing a project?
            I’d love to hear from you.
          </p>
        </motion.div>

        <div className="max-w-4xl mx-auto grid md:grid-cols-2 gap-8">
          {/* Left: Contact Info */}
          <motion.div
            initial={{ opacity: 0, x: -20 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5 }}
            className="
              rounded-2xl border border-white/10
              bg-white/5 backdrop-blur-md
              p-8
            "
          >
            <h3 className="text-2xl font-display font-semibold mb-6 text-white">
              Let’s Connect
            </h3>

            <div className="space-y-6">
              {/* Email */}
              <div className="flex items-center gap-4">
                <div className="p-3 rounded-xl bg-gradient-to-br from-primary to-secondary">
                  <Mail className="h-5 w-5 text-white" />
                </div>
                <div>
                  <p className="font-medium text-white">Email</p>
                  <a
                    href="mailto:akhileshreddy1246@gmail.com"
                    className="text-white/70 hover:text-white hover:underline"
                  >
                    akhileshreddy1246@gmail.com
                  </a>
                </div>
              </div>

              {/* LinkedIn */}
              <div className="flex items-center gap-4">
                <div className="p-3 rounded-xl bg-gradient-to-br from-blue-600 to-blue-400">
                  <Linkedin className="h-5 w-5 text-white" />
                </div>
                <div>
                  <p className="font-medium text-white">LinkedIn</p>
                  <a
                    href="https://linkedin.com"
                    target="_blank"
                    className="text-white/70 hover:text-white hover:underline"
                  >
                    Connect with me
                  </a>
                </div>
              </div>

              {/* WhatsApp */}
              <div className="flex items-center gap-4">
                <div className="p-3 rounded-xl bg-gradient-to-br from-green-500 to-emerald-500">
                  <MessageCircle className="h-5 w-5 text-white" />
                </div>
                <div>
                  <p className="font-medium text-white">WhatsApp</p>
                  <a
                    href="https://wa.me/917760007395"
                    target="_blank"
                    className="text-white/70 hover:text-white hover:underline"
                  >
                    Quick message
                  </a>
                </div>
              </div>

              <p className="text-white/60 pt-4">
                I’m open to internships, full-time roles, freelance work, and
                collaborative projects.
              </p>
            </div>
          </motion.div>

          {/* Right: Contact Form */}
          <motion.div
            initial={{ opacity: 0, x: 20 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5 }}
          >
            <form
              ref={formRef}
              onSubmit={handleSubmit}
              className="
                rounded-2xl border border-white/10
                bg-white/5 backdrop-blur-md
                p-8 space-y-4
              "
            >
              <Input
                type="text"
                placeholder="Your Name"
                required
                disabled={isSubmitting}
                name="from_name"
                className="bg-white/5 border-white/10 text-white placeholder:text-white/40"
              />

              <Input
                type="email"
                placeholder="Your Email"
                required
                disabled={isSubmitting}
                name="reply_to"
                className="bg-white/5 border-white/10 text-white placeholder:text-white/40"
              />

              <Input
                type="text"
                placeholder="Subject"
                required
                disabled={isSubmitting}
                name="subject"
                className="bg-white/5 border-white/10 text-white placeholder:text-white/40"
              />

              <Textarea
                placeholder="Your Message"
                rows={5}
                required
                disabled={isSubmitting}
                name="message"
                className="
                  resize-none bg-white/5
                  border-white/10 text-white
                  placeholder:text-white/40
                "
              />

              <Button
                type="submit"
                disabled={isSubmitting}
                className="w-full bg-gradient-to-r from-primary to-secondary hover:shadow-glow"
              >
                {isSubmitting ? (
                  'Sending...'
                ) : (
                  <>
                    <Send className="mr-2 h-4 w-4" />
                    Send Message
                  </>
                )}
              </Button>
            </form>
          </motion.div>
        </div>
      </div>
    </section>
  );
};
