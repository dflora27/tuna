import { BrowserRouter as Router, Routes, Route, useLocation } from 'react-router-dom';
import { AnimatePresence } from 'framer-motion';
import { useLayoutEffect, useEffect, useState, lazy, Suspense } from 'react';
import Lenis from 'lenis';

// Components (always needed — in initial chrome)
import Navbar from './components/Navbar';
import FloatingButton from './components/FloatingButton';
import Footer from './components/Footer';
import CustomCursor from './components/CustomCursor';
import Preloader from './components/Preloader';

// Pages — code-split so each route ships only its own JS/CSS
const Home = lazy(() => import('./pages/Home'));
const About = lazy(() => import('./pages/About'));
const Projects = lazy(() => import('./pages/Projects'));
const ProjectDetail = lazy(() => import('./pages/ProjectDetail'));
const Applications = lazy(() => import('./pages/Applications'));
const Contact = lazy(() => import('./pages/Contact'));
const Privacy = lazy(() => import('./pages/Privacy'));
const Terms = lazy(() => import('./pages/Terms'));

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
      <Suspense fallback={<div className="route-fallback" aria-hidden="true" />}>
        <Routes location={location} key={location.pathname}>
          <Route path="/" element={<Home />} />
          <Route path="/about" element={<About />} />
          <Route path="/projects" element={<Projects />} />
          <Route path="/projects/:id" element={<ProjectDetail />} />
          <Route path="/applications" element={<Applications />} />
          <Route path="/contact" element={<Contact />} />
          <Route path="/privacy" element={<Privacy />} />
          <Route path="/terms" element={<Terms />} />
        </Routes>
      </Suspense>
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

// Hide the floating "PROJE TALEBİ" button on contact page (it already lives there)
const ConditionalFloatingButton = () => {
  const location = useLocation();
  if (location.pathname === '/contact') return null;
  return <FloatingButton />;
};


function App() {
  const [loading, setLoading] = useState(true);

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
        <ConditionalFloatingButton />
      </div>
    </Router>
  );
}

export default App;
