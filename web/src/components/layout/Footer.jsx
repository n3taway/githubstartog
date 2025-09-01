import { motion } from 'framer-motion';
import { Github, Twitter, Linkedin, Mail } from 'lucide-react';

const Footer = () => {
  const socialLinks = [
    { icon: Github, href: '#', label: 'GitHub' },
    { icon: Twitter, href: '#', label: 'Twitter' },
    { icon: Linkedin, href: '#', label: 'LinkedIn' },
    { icon: Mail, href: '#', label: 'Email' },
  ];

  return (
    <footer className="bg-notion-gray-50 border-t border-gray-100 mt-20">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8 sm:py-12">
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6 sm:gap-8">
          {/* Brand */}
          <div className="space-y-4 text-center sm:text-left sm:col-span-2 md:col-span-1">
            <div className="flex items-center justify-center sm:justify-start space-x-2">
              <div className="w-8 h-8 bg-notion-blue rounded-notion-md flex items-center justify-center">
                <Github className="w-5 h-5 text-white" />
              </div>
              <span className="text-xl font-semibold notion-text-primary">
                Projects
              </span>
            </div>
            <p className="notion-text-secondary text-sm leading-relaxed">
              A curated showcase of my development projects,
              <br />
              built with passion and attention to detail.
            </p>
          </div>

          {/* Quick Links */}
          <div className="space-y-4 text-center sm:text-left">
            <h3 className="font-semibold notion-text-primary">Quick Links</h3>
            <nav className="flex flex-col space-y-2">
              <a
                href="#"
                className="notion-text-secondary hover:notion-text-primary transition-colors duration-200 text-sm"
              >
                All Projects
              </a>
              <a
                href="#"
                className="notion-text-secondary hover:notion-text-primary transition-colors duration-200 text-sm"
              >
                Featured Work
              </a>
              <a
                href="#"
                className="notion-text-secondary hover:notion-text-primary transition-colors duration-200 text-sm"
              >
                About Me
              </a>
              <a
                href="#"
                className="notion-text-secondary hover:notion-text-primary transition-colors duration-200 text-sm"
              >
                Contact
              </a>
            </nav>
          </div>

          {/* Social Links */}
          <div className="space-y-4 text-center sm:text-left">
            <h3 className="font-semibold notion-text-primary">Connect</h3>
            <div className="flex justify-center sm:justify-start space-x-4">
              {socialLinks.map(({ icon: Icon, href, label }) => (
                <motion.a
                  key={label}
                  href={href}
                  whileHover={{ scale: 1.1, y: -2 }}
                  whileTap={{ scale: 0.95 }}
                  className="p-2 rounded-notion-md bg-white hover:bg-notion-blue hover:text-white transition-all duration-200 shadow-sm"
                  aria-label={label}
                >
                  <Icon className="w-5 h-5" />
                </motion.a>
              ))}
            </div>
          </div>
        </div>

        {/* Bottom Bar */}
        <div className="mt-6 sm:mt-8 pt-6 sm:pt-8 border-t border-gray-200 flex flex-col sm:flex-row justify-between items-center space-y-4 sm:space-y-0">
          <p className="notion-text-tertiary text-sm">
            © 2024 Projects Showcase. Crafted with ❤️ and attention to detail.
          </p>
          <div className="flex space-x-6">
            <a
              href="#"
              className="notion-text-tertiary hover:notion-text-secondary transition-colors duration-200 text-sm"
            >
              Privacy
            </a>
            <a
              href="#"
              className="notion-text-tertiary hover:notion-text-secondary transition-colors duration-200 text-sm"
            >
              Terms
            </a>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;