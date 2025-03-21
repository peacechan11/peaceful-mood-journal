
import { useState, useEffect } from 'react';
import { Link, useLocation } from 'react-router-dom';
import { Menu, X } from 'lucide-react';
import { Button } from '@/components/ui/button';

const Header = () => {
  const [isScrolled, setIsScrolled] = useState(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const location = useLocation();

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 10);
    };

    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  useEffect(() => {
    // Close mobile menu when route changes
    setIsMobileMenuOpen(false);
  }, [location.pathname]);

  return (
    <header
      className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ease-in-out ${
        isScrolled ? 'py-3 glass shadow-subtle' : 'py-6 bg-transparent'
      }`}
    >
      <div className="container-wide flex items-center justify-between">
        <Link 
          to="/" 
          className="flex items-center space-x-2 animate-fade-in"
        >
          <div className="relative w-8 h-8 rounded-full bg-gradient-to-tr from-peace-400 to-serenity-500 shadow-peace flex items-center justify-center">
            <span className="absolute inset-0 rounded-full bg-gradient-to-tr from-peace-400 to-serenity-500 animate-pulse-soft"></span>
            <span className="relative text-white font-bold text-sm">P</span>
          </div>
          <span className="font-display font-medium text-xl tracking-tight text-foreground">
            PeaceSync
          </span>
        </Link>

        {/* Desktop Navigation */}
        <nav className="hidden md:flex items-center space-x-8 animate-fade-in">
          {navItems.map((item) => (
            <NavLink 
              key={item.path} 
              to={item.path} 
              label={item.label} 
              currentPath={location.pathname} 
            />
          ))}
        </nav>

        {/* Mobile Menu Toggle */}
        <button
          className="md:hidden p-2 rounded-md text-foreground"
          onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
          aria-label="Toggle menu"
        >
          {isMobileMenuOpen ? (
            <X className="h-6 w-6" />
          ) : (
            <Menu className="h-6 w-6" />
          )}
        </button>

        {/* Mobile Navigation */}
        {isMobileMenuOpen && (
          <div className="md:hidden absolute top-full left-0 w-full glass-card shadow-peace animate-fade-in py-4">
            <nav className="flex flex-col space-y-3 px-4">
              {navItems.map((item) => (
                <Link
                  key={item.path}
                  to={item.path}
                  className={`px-3 py-2 rounded-md text-sm font-medium transition-colors ${
                    location.pathname === item.path
                      ? 'bg-primary/10 text-primary'
                      : 'text-foreground hover:bg-primary/5'
                  }`}
                >
                  {item.label}
                </Link>
              ))}
            </nav>
          </div>
        )}
      </div>
    </header>
  );
};

const NavLink = ({ to, label, currentPath }: { to: string; label: string; currentPath: string }) => {
  const isActive = currentPath === to;
  
  return (
    <Link
      to={to}
      className={`relative py-2 text-sm font-medium transition-colors ${
        isActive ? 'text-primary' : 'text-foreground hover:text-primary'
      }`}
    >
      {label}
      {isActive && (
        <span className="absolute bottom-0 left-0 right-0 h-0.5 bg-primary rounded-full transform origin-left animate-fade-in" />
      )}
    </Link>
  );
};

const navItems = [
  { path: '/', label: 'Home' },
  { path: '/mood', label: 'Mood Tracker' },
  { path: '/journal', label: 'Journal' },
  { path: '/blog', label: 'Community' },
];

export default Header;
