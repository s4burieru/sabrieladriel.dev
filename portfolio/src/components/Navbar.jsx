import { useState, useEffect, useCallback } from 'react';

const NAV_LINKS = [
  { href: '/about', label: 'About' },
  { href: '/projects', label: 'Projects' },
  { href: '/services', label: 'Services' },
  { href: '/blog', label: 'Blog' },
  { href: '/contact', label: 'Contact' },
];

export default function Navbar() {
  const [mobileOpen, setMobileOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);

  const handleScroll = useCallback(() => {
    if (window.innerWidth >= 1024) {
      setScrolled(window.scrollY > 100);
    } else {
      setScrolled(false);
    }
  }, []);

  useEffect(() => {
    window.addEventListener('scroll', handleScroll, { passive: true });
    window.addEventListener('resize', () => {
      if (window.innerWidth < 1024) setScrolled(false);
    });
    return () => window.removeEventListener('scroll', handleScroll);
  }, [handleScroll]);

  // Close mobile menu on route change
  useEffect(() => {
    const handleRoute = () => setMobileOpen(false);
    document.addEventListener('page-loaded', handleRoute);
    return () => document.removeEventListener('page-loaded', handleRoute);
  }, []);

  const navbarStyle = {
    maxWidth: scrolled ? '50rem' : '1350px',
    padding: scrolled ? '0.5rem 1.5rem' : '0.625rem 2rem',
    top: scrolled ? '1.8rem' : '1.5rem',
    transition: 'all 0.3s ease',
  };

  return (
    <nav
      id="main-navbar"
      className="fixed top-6 left-1/2 -translate-x-1/2 z-50 backdrop-blur-lg rounded-full px-8 py-2.5 border bg-white/10 border-white/10 shadow-sm transition-all duration-300 w-12/13"
      style={navbarStyle}
    >
      <div className="flex items-center justify-between gap-8">
        {/* Left Section: Logo/Home */}
        <div className="shrink-0">
          <a
            href="/"
            className="font-poppins font-bold text-lg text-white hover:text-blue-600 transition-colors duration-200 flex items-center gap-2"
          >
            <span className="text-2xl">SA</span>
          </a>
        </div>

        {/* Middle Section: Navigation Links */}
        <div className="hidden lg:flex items-center gap-8">
          {NAV_LINKS.map((link) => (
            <a
              key={link.href}
              href={link.href}
              className="font-poppins text-sm font-medium text-white/80 hover:text-white transition-colors duration-200"
            >
              {link.label}
            </a>
          ))}
        </div>

        {/* Right Section: Resume, Theme Toggle */}
        <div className="flex items-center gap-2">
          <a
            href="./assets/sabriel-adriel-san-agustin-cv.pdf"
            className="hidden sm:inline-block font-poppins text-sm font-semibold px-4 py-2.5 rounded-full bg-white text-black hover:bg-blue-50 dark:bg-white dark:hover:bg-blue-50 transition-colors duration-200"
          >
            Resumé
          </a>

          {/* Mobile Menu Button */}
          <button
            id="mobile-menu-btn"
            className="lg:hidden inline-flex items-center justify-center w-10 h-10 rounded-full bg-white/10 hover:bg-white/20 transition-colors duration-200 focus:outline-none focus:ring-2 focus:ring-blue-400 focus:ring-offset-0"
            aria-label="Toggle mobile menu"
            onClick={() => setMobileOpen((prev) => !prev)}
          >
            {mobileOpen ? (
              <svg
                id="close-icon"
                className="w-5 h-5 text-white"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth="2"
                  d="M6 18L18 6M6 6l12 12"
                />
              </svg>
            ) : (
              <svg
                id="menu-icon"
                className="w-5 h-5 text-white"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth="2"
                  d="M4 6h16M4 12h16M4 18h16"
                />
              </svg>
            )}
          </button>
        </div>
      </div>

      {/* Mobile Menu */}
      <div
        id="mobile-menu"
        className={`${
          mobileOpen ? '' : 'hidden'
        } fixed top-24 left-4 right-4 z-40 backdrop-blur-lg rounded-2xl border border-white/20 p-4 lg:hidden bg-black/90`}
      >
        <div className="flex flex-col gap-3">
          {NAV_LINKS.map((link) => (
            <a
              key={link.href}
              href={link.href}
              className="font-poppins text-sm font-medium text-white/80 hover:text-white transition-colors duration-200 py-2"
            >
              {link.label}
            </a>
          ))}
          <a
            href="./assets/sabriel-adriel-san-agustin-cv.pdf"
            className="font-poppins text-sm font-semibold px-4 py-2 rounded-full bg-white text-black hover:bg-blue-50 transition-colors duration-200 text-center"
            target="_blank"
            rel="noopener noreferrer"
          >
            Resumé
          </a>
        </div>
      </div>
    </nav>
  );
}