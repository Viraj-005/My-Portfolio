import { Github, Linkedin, BookOpen, Heart } from 'lucide-react';

export const Footer = () => {
  const currentYear = new Date().getFullYear();

  const socialLinks = [
    {
      name: 'LinkedIn',
      icon: Linkedin,
      href: 'https://linkedin.com/in/viraj-induruwa',
      color: 'hover:text-blue-400'
    },
    {
      name: 'GitHub',
      icon: Github,
      href: 'https://github.com/Viraj-005',
      color: 'hover:text-purple-400'
    },
    {
      name: 'Medium',
      icon: BookOpen,
      href: 'https://medium.com/@virajinduruwa2',
      color: 'hover:text-green-400'
    }
  ];

  const navigationLinks = [
    { name: 'Home', href: '#hero' },
    { name: 'About', href: '#about' },
    { name: 'Skills', href: '#skills' },
    { name: 'Projects', href: '#projects' },
    { name: 'Contact', href: '#contact' }
  ];

  const scrollToSection = (href) => {
    const element = document.querySelector(href);
    if (element) {
      element.scrollIntoView({ behavior: 'smooth' });
    }
  };

  return (
    <div className="relative overflow-hidden">
      {/* Background Elements */}
      <div className="absolute inset-0 overflow-hidden">
        <div className="star w-2 h-2 top-20 left-20 animate-pulse-subtle" />
        <div className="star w-1 h-1 top-40 right-32 animate-pulse-subtle" style={{ animationDelay: '1s' }} />
        <div className="star w-3 h-3 bottom-40 right-20 animate-pulse-subtle" style={{ animationDelay: '2s' }} />
      </div>

      <div className="bg-card border-t border-border mt-24 relative z-10">
        <div className="container py-12">
          <div className="max-w-6xl mx-auto grid md:grid-cols-3 gap-8">
            {/* Brand Section */}
            <div className="md:col-span-1">
              <div className="text-glow text-4xl font-black tracking-wider mb-4 text-primary">
                <span className="relative z-10">
                    <span className="text-glow text-foreground">V</span>RJ
                </span>
              </div>
              <p className="text-foreground/70 mb-6 leading-relaxed">
                Software Engineer passionate about creating innovative solutions 
                through AI, machine learning, and modern web technologies.
              </p>
              
              {/* Social Links */}
              <div className="flex space-x-4">
                {socialLinks.map((social) => {
                  const Icon = social.icon;
                  return (
                    <a
                      key={social.name}
                      href={social.href}
                      target="_blank"
                      rel="noopener noreferrer"
                      className={`p-3 card-hover rounded-full bg-primary/10 border border-primary/20 transition-all duration-300 ${social.color}`}
                      aria-label={social.name}
                    >
                      <Icon className="w-5 h-5" />
                    </a>
                  );
                })}
              </div>
            </div>

            {/* Navigation Links */}
            <div className="md:col-span-1">
              <h3 className="text-lg font-semibold mb-4 text-primary">Navigation</h3>
              <nav className="space-y-3">
                {navigationLinks.map((link) => (
                  <button
                    key={link.name}
                    onClick={() => scrollToSection(link.href)}
                    className="block text-foreground/70 hover:text-primary transition-colors duration-300 text-left card-hover cursor-pointer"
                  >
                    {link.name}
                  </button>
                ))}
              </nav>
            </div>

            {/* Contact Info */}
            <div className="md:col-span-1">
              <h3 className="text-lg font-semibold mb-4 text-primary">Get In Touch</h3>
              <div className="space-y-3">
                <a 
                  href="mailto:virajinduruwa123@gmail.com"
                  className="block text-foreground/70 hover:text-primary transition-colors duration-300 card-hover"
                >
                  virajinduruwa123@gmail.com
                </a>
                <p className="text-foreground/70">Sri Lanka</p>
                <p className="text-foreground/60 text-sm leading-relaxed">
                  Available for freelance opportunities and exciting projects.
                </p>
              </div>
            </div>
          </div>

          {/* Divider */}
          <div className="border-t border-border my-8"></div>

          {/* Copyright */}
          <div className="flex flex-col md:flex-row justify-between items-center text-center md:text-left">
            <p className="text-foreground/60 text-sm">
              © {currentYear} Viraj Induruwa. All rights reserved.
            </p>
          </div>
        </div>
      </div>

      {/* Bottom padding for mobile navigation */}
      <div className="md:hidden h-20"></div>
    </div>
  );
};