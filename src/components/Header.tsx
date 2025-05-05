
import { useState, useEffect } from 'react';
import { Link, useLocation } from 'react-router-dom';
import { Menu, X, LogIn, LogOut, User } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { useAuth } from '@/contexts/AuthContext';
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";

const Header = () => {
  const [isScrolled, setIsScrolled] = useState(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const location = useLocation();
  const { user, userRole, signOut } = useAuth();

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
              requiresAuth={item.requiresAuth}
              isLoggedIn={!!user}
            />
          ))}
          
          {user ? (
            <DropdownMenu>
              <DropdownMenuTrigger asChild>
                <Button variant="outline" size="sm" className="gap-2">
                  <User className="h-4 w-4" />
                  <span className="hidden md:inline">{userRole === 'moderator' ? 'Moderator' : 'Account'}</span>
                </Button>
              </DropdownMenuTrigger>
              <DropdownMenuContent align="end">
                <DropdownMenuLabel>
                  {userRole === 'moderator' ? 'Moderator Account' : 'User Account'}
                </DropdownMenuLabel>
                <DropdownMenuSeparator />
                <DropdownMenuItem onClick={() => signOut()}>
                  <LogOut className="h-4 w-4 mr-2" />
                  Sign Out
                </DropdownMenuItem>
              </DropdownMenuContent>
            </DropdownMenu>
          ) : (
            <Button 
              variant="outline" 
              size="sm" 
              asChild 
              className="gap-2"
            >
              <Link to="/auth">
                <LogIn className="h-4 w-4" />
                <span>Sign In</span>
              </Link>
            </Button>
          )}
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
                <NavLink
                  key={item.path}
                  to={item.path}
                  label={item.label}
                  currentPath={location.pathname}
                  requiresAuth={item.requiresAuth}
                  isLoggedIn={!!user}
                  isMobile={true}
                />
              ))}
              
              {user ? (
                <>
                  <div className="px-3 py-2 text-sm font-medium text-muted-foreground">
                    {userRole === 'moderator' ? 'Moderator Account' : 'User Account'}
                  </div>
                  <button
                    onClick={() => signOut()}
                    className="flex items-center px-3 py-2 rounded-md text-sm font-medium text-foreground hover:bg-primary/5"
                  >
                    <LogOut className="h-4 w-4 mr-2" />
                    Sign Out
                  </button>
                </>
              ) : (
                <Link
                  to="/auth"
                  className="flex items-center px-3 py-2 rounded-md text-sm font-medium text-foreground hover:bg-primary/5"
                >
                  <LogIn className="h-4 w-4 mr-2" />
                  Sign In
                </Link>
              )}
            </nav>
          </div>
        )}
      </div>
    </header>
  );
};

const NavLink = ({ 
  to, 
  label, 
  currentPath, 
  requiresAuth = false,
  isLoggedIn = false,
  isMobile = false 
}: { 
  to: string; 
  label: string; 
  currentPath: string;
  requiresAuth?: boolean;
  isLoggedIn?: boolean;
  isMobile?: boolean;
}) => {
  const isActive = currentPath === to;
  
  // If route requires auth and user is not logged in
  if (requiresAuth && !isLoggedIn) {
    return null;
  }
  
  if (isMobile) {
    return (
      <Link
        to={to}
        className={`px-3 py-2 rounded-md text-sm font-medium transition-colors ${
          isActive
            ? 'bg-primary/10 text-primary'
            : 'text-foreground hover:bg-primary/5'
        }`}
      >
        {label}
      </Link>
    );
  }
  
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
  { path: '/', label: 'Home', requiresAuth: false },
  { path: '/mood', label: 'Mood Tracker', requiresAuth: true },
  { path: '/journal', label: 'Journal', requiresAuth: true },
  { path: '/blog', label: 'Community', requiresAuth: false },
];

export default Header;
