import { BrowserRouter as Router, Routes, Route, useLocation } from 'react-router-dom';
import { AnimatePresence } from 'framer-motion';
import { useLayoutEffect, useEffect, useState } from 'react';
import Lenis from 'lenis';

// Components
import Navbar from './components/Navbar';
import FloatingButton from './components/FloatingButton';
import Footer from './components/Footer';
import CustomCursor from './components/CustomCursor';
import Preloader from './components/Preloader';

// Pages
import Home from './pages/Home';
import About from './pages/About';
import Projects from './pages/Projects';
import ProjectDetail from './pages/ProjectDetail';
import Contact from './pages/Contact';
import Privacy from './pages/Privacy';
import Terms from './pages/Terms';

// Scroll to top on route change
const ScrollToTop = () => {
  const { pathname } = useLocation();
  useLayoutEffect(() => {
    window.scrollTo(0, 0);
  }, [pathname]);
  return null;
};

// AnimatedRoutes wrapper to extract useLocation
const AnimatedRoutes = () => {
  const location = useLocation();
  
  return (
    <AnimatePresence mode="wait">
      <Routes location={location} key={location.pathname}>
        <Route path="/" element={<Home />} />
        <Route path="/about" element={<About />} />
        <Route path="/projects" element={<Projects />} />
        <Route path="/projects/:id" element={<ProjectDetail />} />
        <Route path="/contact" element={<Contact />} />
        <Route path="/privacy" element={<Privacy />} />
        <Route path="/terms" element={<Terms />} />
      </Routes>
    </AnimatePresence>
  );
};

// Conditional Footer wrapper - hide on home and project detail  
const ConditionalFooter = () => {
  const location = useLocation();
  const isHome = location.pathname === '/' || location.pathname === '';
  const isProjectDetail = location.pathname.startsWith('/projects/');
  if (isHome || isProjectDetail) return null;
  return <Footer />;
};

// Conditional Navbar - hide on project detail pages
const ConditionalNavbar = () => {
  const location = useLocation();
  const isProjectDetail = location.pathname.match(/^\/projects\/.+/);
  if (isProjectDetail) return null;
  return <Navbar />;
};



function App() {
  const [loading, setLoading] = useState(true);
  const [lenis, setLenis] = useState(null);

  // Initialize Lenis for smooth scrolling
  useEffect(() => {
    const lenisInstance = new Lenis({
      duration: 1.2,
      easing: (t) => Math.min(1, 1.001 - Math.pow(2, -10 * t)),
      smoothWheel: true,
      smoothTouch: false,
    });

    let rafHandle;
    function raf(time) {
      lenisInstance.raf(time);
      rafHandle = requestAnimationFrame(raf);
    }
    rafHandle = requestAnimationFrame(raf);
    setLenis(lenisInstance);

    return () => {
      cancelAnimationFrame(rafHandle);
      lenisInstance.destroy();
    };
  }, []);

  return (
    <Router>
      <ScrollToTop />
      <CustomCursor />
      
      <AnimatePresence mode="wait">
        {loading && <Preloader key="preloader" onComplete={() => setLoading(false)} />}
      </AnimatePresence>

      <div className="app-container">
        <ConditionalNavbar />
        
        <main className="main-content">
          <AnimatedRoutes />
        </main>
        
        <ConditionalFooter />
        <FloatingButton />
      </div>
    </Router>
  );
}

export default App;
