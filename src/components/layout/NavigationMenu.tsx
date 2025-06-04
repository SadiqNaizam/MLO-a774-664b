import React, { useState } from 'react';
import { Link } from 'react-router-dom'; // Assuming react-router-dom for navigation
import { Button } from '@/components/ui/button';
import { Menu, X, Search, UserCircle } from 'lucide-react'; // Icons

interface NavItem {
  label: string;
  href: string;
  isPrimary?: boolean; // e.g., for a "Submit Sample" button
}

const navItems: NavItem[] = [
  { label: 'Home', href: '/' },
  { label: 'Browse Samples', href: '/browse' },
  { label: 'Submit Sample', href: '/submit', isPrimary: true },
  // Add more navigation items as needed
];

const NavigationMenu: React.FC = () => {
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  console.log("Rendering NavigationMenu, mobileOpen:", isMobileMenuOpen);

  return (
    <nav className="bg-background border-b shadow-sm sticky top-0 z-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center h-16">
          {/* Logo/Brand */}
          <div className="flex-shrink-0">
            <Link to="/" className="text-2xl font-bold text-primary">
              SamplePlatform
            </Link>
          </div>

          {/* Desktop Navigation Links */}
          <div className="hidden md:flex space-x-4 items-center">
            {navItems.map((item) =>
              item.isPrimary ? (
                <Button key={item.label} asChild>
                  <Link to={item.href}>{item.label}</Link>
                </Button>
              ) : (
                <Link
                  key={item.label}
                  to={item.href}
                  className="text-muted-foreground hover:text-foreground transition-colors px-3 py-2 rounded-md text-sm font-medium"
                >
                  {item.label}
                </Link>
              )
            )}
            {/* Search Icon - can be expanded into a search bar */}
            <Button variant="ghost" size="icon" aria-label="Search">
              <Search className="h-5 w-5" />
            </Button>
            {/* Profile/Login Icon */}
            <Link to="/profile">
              <Button variant="ghost" size="icon" aria-label="User Profile">
                <UserCircle className="h-6 w-6" />
              </Button>
            </Link>
          </div>

          {/* Mobile Menu Button */}
          <div className="md:hidden flex items-center">
            <Link to="/profile" className="mr-2">
              <Button variant="ghost" size="icon" aria-label="User Profile">
                <UserCircle className="h-6 w-6" />
              </Button>
            </Link>
            <Button
              variant="ghost"
              size="icon"
              onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
              aria-label="Toggle menu"
            >
              {isMobileMenuOpen ? <X className="h-6 w-6" /> : <Menu className="h-6 w-6" />}
            </Button>
          </div>
        </div>
      </div>

      {/* Mobile Menu */}
      {isMobileMenuOpen && (
        <div className="md:hidden border-t">
          <div className="px-2 pt-2 pb-3 space-y-1 sm:px-3">
            {navItems.map((item) => (
              <Link
                key={item.label}
                to={item.href}
                onClick={() => setIsMobileMenuOpen(false)}
                className={`block px-3 py-2 rounded-md text-base font-medium ${
                  item.isPrimary
                    ? 'bg-primary text-primary-foreground'
                    : 'text-muted-foreground hover:bg-accent hover:text-accent-foreground'
                }`}
              >
                {item.label}
              </Link>
            ))}
          </div>
           {/* Mobile Search - can be expanded */}
          <div className="p-2 border-t">
             <Button variant="ghost" className="w-full justify-start" aria-label="Search">
              <Search className="h-5 w-5 mr-2" /> Search
            </Button>
          </div>
        </div>
      )}
    </nav>
  );
};

export default NavigationMenu;