import React from 'react';
import { Link } from 'react-router-dom';
import { Github, Twitter, Linkedin } from 'lucide-react'; // Example social icons

const Footer: React.FC = () => {
  console.log("Rendering Footer");
  const currentYear = new Date().getFullYear();

  return (
    <footer className="bg-muted/50 border-t mt-12">
      <div className="max-w-7xl mx-auto py-8 px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mb-8">
          {/* About Section */}
          <div>
            <h3 className="text-lg font-semibold text-foreground mb-2">SamplePlatform</h3>
            <p className="text-sm text-muted-foreground">
              Discover and share useful code samples.
            </p>
          </div>

          {/* Quick Links */}
          <div>
            <h3 className="text-sm font-semibold text-foreground uppercase tracking-wider mb-3">Quick Links</h3>
            <ul className="space-y-2">
              <li><Link to="/browse" className="text-sm text-muted-foreground hover:text-primary">Browse All</Link></li>
              <li><Link to="/submit" className="text-sm text-muted-foreground hover:text-primary">Submit Sample</Link></li>
              <li><Link to="/faq" className="text-sm text-muted-foreground hover:text-primary">FAQ</Link></li>
              <li><Link to="/contact" className="text-sm text-muted-foreground hover:text-primary">Contact Us</Link></li>
            </ul>
          </div>

          {/* Social Media */}
          <div>
            <h3 className="text-sm font-semibold text-foreground uppercase tracking-wider mb-3">Connect</h3>
            <div className="flex space-x-4">
              <a href="#" className="text-muted-foreground hover:text-primary"><span className="sr-only">Twitter</span><Twitter className="h-5 w-5" /></a>
              <a href="#" className="text-muted-foreground hover:text-primary"><span className="sr-only">GitHub</span><Github className="h-5 w-5" /></a>
              <a href="#" className="text-muted-foreground hover:text-primary"><span className="sr-only">LinkedIn</span><Linkedin className="h-5 w-5" /></a>
            </div>
          </div>
        </div>

        <div className="border-t pt-8 text-center">
          <p className="text-xs text-muted-foreground">
            &copy; {currentYear} SamplePlatform. All rights reserved.
          </p>
        </div>
      </div>
    </footer>
  );
};

export default Footer;