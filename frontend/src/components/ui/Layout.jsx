import { useState, useEffect, useRef } from 'react';
import { Outlet, useLocation } from 'react-router-dom';
import { motion, AnimatePresence, useScroll, useTransform } from 'framer-motion';
import Sidebar from './Sidebar';
import Header from './Header';
import './Layout.css';

const Layout = () => {
  const [sidebarCollapsed, setSidebarCollapsed] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [isMobile, setIsMobile] = useState(false);
  const scrollRef = useRef(null);
  const location = useLocation();

  // Reset scroll on route change
  useEffect(() => {
    if (scrollRef.current) {
      scrollRef.current.scrollTo(0, 0);
    }
  }, [location.pathname]);

  useEffect(() => {
    const checkMobile = () => {
      setIsMobile(window.innerWidth < 1200);
      if (window.innerWidth < 1200) setSidebarCollapsed(true);
    };
    checkMobile();
    window.addEventListener('resize', checkMobile);
    return () => window.removeEventListener('resize', checkMobile);
  }, []);

  // Parallax Scroll Effects
  const { scrollYProgress } = useScroll({
    container: scrollRef
  });

  const yOrb1 = useTransform(scrollYProgress, [0, 1], [0, 500]);
  const yOrb2 = useTransform(scrollYProgress, [0, 1], [0, -300]);
  const yOrb3 = useTransform(scrollYProgress, [0, 1], [0, 200]);

  return (
    <div className="app-layout-root">
      {/* Noise Texture Overlay */}
      <div className="noise-texture" />

      {/* Ambient background with Parallax */}
      <div className="ambient-bg" aria-hidden="true">
        <motion.div className="ambient-orb ambient-orb-1" style={{ y: yOrb1 }} />
        <motion.div className="ambient-orb ambient-orb-2" style={{ y: yOrb2 }} />
        <motion.div className="ambient-orb ambient-orb-3" style={{ y: yOrb3 }} />
      </div>

      {/* Sidebar */}
      <Sidebar
        collapsed={sidebarCollapsed}
        onToggle={() => setSidebarCollapsed(c => !c)}
        mobileOpen={mobileMenuOpen}
        onMobileClose={() => setMobileMenuOpen(false)}
        isMobile={isMobile}
      />

      {/* Mobile overlay */}
      <AnimatePresence>
        {mobileMenuOpen && isMobile && (
          <motion.div
            className="mobile-overlay"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={() => setMobileMenuOpen(false)}
          />
        )}
      </AnimatePresence>

      {/* Main content area */}
      <div
        className={`layout-main ${sidebarCollapsed ? 'sidebar-collapsed' : ''} ${isMobile ? 'mobile' : ''}`}
      >
        <Header
          onMobileMenuToggle={() => setMobileMenuOpen(o => !o)}
          sidebarCollapsed={sidebarCollapsed}
        />

        {/* Scrollable Container */}
        <div className="layout-scroll-container" ref={scrollRef}>
          <motion.main
            className="layout-page"
            key={location.pathname}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -20 }}
            transition={{ duration: 0.4, ease: [0.22, 1, 0.36, 1] }}
          >
            <Outlet />
          </motion.main>
        </div>
      </div>
    </div>
  );
};

export default Layout;
