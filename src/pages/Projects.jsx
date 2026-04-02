import { useEffect, useRef } from 'react';
import { Link } from 'react-router-dom';
import PageTransition from '../components/PageTransition';
import { motion, useScroll, useTransform } from 'framer-motion';
import { useLanguage } from '../context/LanguageContext';
import { projectsData } from '../data/projectsData';
import './Projects.css';

const ProjectItem = ({ project, index }) => {
  const ref = useRef(null);
  const { scrollYProgress } = useScroll({
    target: ref,
    offset: ["start end", "end start"]
  });

  return (
    <motion.div
      ref={ref}
      className="project-card-wrapper"
      initial={{ opacity: 0, y: 30 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: "-40px" }}
      transition={{ duration: 0.7, delay: (index % 5) * 0.05, ease: [0.16, 1, 0.3, 1] }}
    >
      <Link to={`/projects/${project.id}`} className="project-card">
        <div className="project-image-container">
          <motion.img
            src={project.thumbnail}
            alt={project.title}
            className="project-cover-img"
          />
          <div className="project-overlay">
            <div className="project-info">
              <span className="project-category">{project.category}</span>
              <h3 className="project-title">{project.title}</h3>
              <p className="project-description">{project.description}</p>
              <span className="project-cta">→ Detayları Gör</span>
            </div>
          </div>
        </div>
      </Link>
    </motion.div>
  );
};

const Projects = () => {
  const { t } = useLanguage();

  useEffect(() => {
    document.body.classList.remove('theme-light');
    document.body.classList.add('theme-dark-projects');
    return () => {
      document.body.classList.remove('theme-dark-projects');
    };
  }, []);

  return (
    <PageTransition className="projects-page">
      <div className="projects-grid-wrapper">
        <div className="projects-grid">
          {projectsData.map((project, index) => (
            <ProjectItem key={project.id} project={project} index={index} />
          ))}
        </div>
      </div>
    </PageTransition>
  );
};

export default Projects;
