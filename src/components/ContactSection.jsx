import { useState, useRef } from 'react';
import { Send, CheckCircle, Mail, Phone, MapPin } from 'lucide-react';
import { cn } from "@/lib/utils";
import { useToast } from "@/hooks/use-toast";
import emailjs from '@emailjs/browser';

export const ContactSection = () => {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    message: ''
  });
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isSubmitted, setIsSubmitted] = useState(false);
  const { toast } = useToast();
  const form = useRef();

  // Get environment variables
  const serviceId = import.meta.env.VITE_EMAILJS_SERVICE_ID;
  const templateId = import.meta.env.VITE_EMAILJS_TEMPLATE_ID;
  const publicKey = import.meta.env.VITE_EMAILJS_PUBLIC_KEY;



  const handleSubmit = async (e) => {
    e.preventDefault();
    setIsSubmitting(true);

    try {
      // Send email using EmailJS
      await emailjs.sendForm(
        serviceId,
        templateId,
        form.current,
        {
          publicKey: publicKey,
        }
      );

      // Success
      setIsSubmitted(true);
      setFormData({ name: '', email: '', message: '' });
      
      toast({
        title: "Message sent successfully!",
        description: "Thank you for your message. I'll get back to you soon.",
      });
      
      // Reset success message after 3 seconds
      setTimeout(() => setIsSubmitted(false), 3000);

    } catch (error) {
      console.error('Failed to send email:', error);
      
      toast({
        title: "Failed to send message",
        description: "Something went wrong. Please try again or contact me directly.",
        variant: "destructive"
      });
    } finally {
      setIsSubmitting(false);
    }
  };

  const contactInfo = [
    {
      icon: Mail,
      label: 'Email',
      value: 'virajinduruwa123@gmail.com',
      href: 'mailto:virajinduruwa123@gmail.com'
    },
    {
      icon: Phone,
      label: 'Phone',
      value: '+94 75 541 5575',
      href: 'tel:+94 75 541 5575'
    },
    {
      icon: MapPin,
      label: 'Location',
      value: 'Sri Lanka',
      href: 'https://maps.app.goo.gl/VyLz6RkyuPLX7baS7'
    }
  ];

  return (
    <div id="contact" className="py-20 relative">
      {/* Background Elements */}
      <div className="absolute inset-0 overflow-hidden">
        <div className="star w-2 h-2 top-20 left-20 animate-pulse-subtle" />
        <div className="star w-1 h-1 top-40 right-32 animate-pulse-subtle" style={{ animationDelay: '1s' }} />
        <div className="star w-3 h-3 bottom-40 left-32 animate-pulse-subtle" style={{ animationDelay: '2s' }} />
      </div>

      <div className="container relative z-10">
        {/* Section Title */}
        <div className="text-center mb-16">
          <h2 className="text-3xl md:text-5xl font-bold mb-4 text-center text-glow">
            Get In <span className="text-primary"> Touch</span>
          </h2>
          <p className="text-xl text-foreground/70 max-w-2xl mx-auto animate-fade-in-delay-1 opacity-0">
            Let's discuss your next project or just say hello!
          </p>
        </div>

        <div className="max-w-6xl mx-auto grid lg:grid-cols-2 gap-12">
          {/* Contact Form */}
          <div className="bg-card border border-border p-8 rounded-2xl card-hover animate-fade-in-delay-2 opacity-0">
            <h3 className="text-2xl font-bold mb-6">Send Message</h3>
            
            {isSubmitted && (
              <div className="mb-6 p-4 bg-green-500/10 border border-green-500/20 rounded-lg flex items-center space-x-3 text-green-400 animate-fade-in">
                <CheckCircle className="w-5 h-5" />
                <span className="font-medium">Message sent successfully!</span>
              </div>
            )}

            <form ref={form} onSubmit={handleSubmit} className="space-y-6">
              <div className="grid sm:grid-cols-2 gap-4">
                <div>
                  <label htmlFor="name" className="block text-sm font-medium mb-2">
                    Full Name
                  </label>
                  <input
                    id="name"
                    name="user_name"
                    type="text"
                    required
                    value={formData.name}
                    onChange={(e) => setFormData({...formData, name: e.target.value})}
                    className={cn(
                      "w-full px-3 py-2 bg-card border border-border rounded-md",
                      "focus:outline-none focus:ring-2 focus:ring-primary/20 focus:border-primary",
                      "transition-colors duration-200 card-hover"
                    )}
                    placeholder="Your Name"
                  />
                </div>
                <div>
                  <label htmlFor="email" className="block text-sm font-medium mb-2">
                    Email Address
                  </label>
                  <input
                    id="email"
                    name="from_email"
                    type="email"
                    required
                    value={formData.email}
                    onChange={(e) => setFormData({...formData, email: e.target.value})}
                    className={cn(
                      "w-full px-3 py-2 bg-card border border-border rounded-md",
                      "focus:outline-none focus:ring-2 focus:ring-primary/20 focus:border-primary",
                      "transition-colors duration-200 card-hover"
                    )}
                    placeholder="your@email.com"
                  />
                </div>
              </div>
              
              <div>
                <label htmlFor="message" className="block text-sm font-medium mb-2">
                  Message
                </label>
                <textarea
                  id="message"
                  name="message"
                  required
                  rows={6}
                  value={formData.message}
                  onChange={(e) => setFormData({...formData, message: e.target.value})}
                  className={cn(
                    "w-full px-3 py-2 bg-card border border-border rounded-md resize-none",
                    "focus:outline-none focus:ring-2 focus:ring-primary/20 focus:border-primary",
                    "transition-colors duration-200 card-hover"
                  )}
                  placeholder="Tell me about your project or just say hello..."
                />
              </div>

              <button
                type="submit"
                disabled={isSubmitting}
                className={cn(
                  "cosmic-button w-full py-3 cursor-pointer",
                  isSubmitting && "opacity-75 cursor-not-allowed"
                )}
              >
                {isSubmitting ? (
                  <div className="flex items-center justify-center space-x-2">
                    <div className="w-4 h-4 border-2 border-white/30 border-t-white rounded-full animate-spin" />
                    <span>Sending...</span>
                  </div>
                ) : (
                  <div className="flex items-center justify-center">
                    <Send className="mr-2 w-4 h-4" />
                    Send Message
                  </div>
                )}
              </button>
            </form>
          </div>

          {/* Contact Info */}
          <div className="space-y-8 animate-fade-in-delay-3 opacity-0">
            <div>
              <h3 className="text-2xl font-bold mb-4">Let's Connect</h3>
              <p className="text-foreground/70 leading-relaxed mb-8">
                I'm always interested in hearing about new opportunities, 
                interesting projects, or just having a conversation about technology 
                and innovation. Feel free to reach out!
              </p>
            </div>

            {/* Contact Details */}
            <div className="space-y-6">
              {contactInfo.map((info, index) => {
                const Icon = info.icon;
                return (
                  <a
                    key={index}
                    href={info.href}
                    className="flex items-center space-x-4 p-4 bg-card border border-border rounded-xl card-hover group transition-all duration-300"
                  >
                    <div className="w-12 h-12 rounded-full bg-gradient-to-r from-primary to-purple-500 flex items-center justify-center group-hover:scale-110 transition-transform duration-300">
                      <Icon className="w-5 h-5 text-white" />
                    </div>
                    <div>
                      <p className="text-sm text-foreground/60">{info.label}</p>
                      <p className="font-medium group-hover:text-primary transition-colors duration-300">
                        {info.value}
                      </p>
                    </div>
                  </a>
                );
              })}
            </div>

            {/* CTA */}
            <div className="bg-card border border-border p-6 rounded-xl text-center card-hover">
              <h4 className="text-lg font-semibold mb-2">Ready to start a project?</h4>
              <p className="text-foreground/60 text-sm mb-4">
                Let's build something amazing together
              </p>
              <button 
                className="px-6 py-2 rounded-full border border-primary/30 hover:border-primary text-primary hover:bg-primary/10 font-medium transition-all duration-300 hover:scale-105 active:scale-95 cursor-pointer"
                onClick={() => document.getElementById('contact')?.querySelector('form')?.scrollIntoView({ behavior: 'smooth' })}
              >
                Start Conversation
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};