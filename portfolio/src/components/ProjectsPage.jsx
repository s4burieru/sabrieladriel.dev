import { useState, useEffect, useRef } from 'react';
import Navbar from './Navbar';
import Footer from './Footer';

export default function ProjectsPage() {
  const [projects, setProjects] = useState([]);
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedCategory, setSelectedCategory] = useState('');
  const [touchedId, setTouchedId] = useState(null);
  const sectionRef = useRef(null);

  useEffect(() => {
    fetch('/data/projects.json')
      .then((res) => res.json())
      .then((data) => setProjects(data))
      .catch((err) => console.error('Error loading projects:', err));
  }, []);

  // Close touched card when tapping outside
  useEffect(() => {
    const handleClick = (e) => {
      if (touchedId !== null && sectionRef.current && !sectionRef.current.contains(e.target)) {
        setTouchedId(null);
      }
    };
    document.addEventListener('click', handleClick);
    return () => document.removeEventListener('click', handleClick);
  }, [touchedId]);

  const filteredProjects = projects.filter((project) => {
    const matchesSearch = searchTerm.trim() === '' ||
      project.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
      project.description.toLowerCase().includes(searchTerm.toLowerCase()) ||
      project.technologies.some((tech) => tech.toLowerCase().includes(searchTerm.toLowerCase()));

    const matchesCategory = selectedCategory === '' ||
      (Array.isArray(project.category)
        ? project.category.includes(selectedCategory)
        : project.category === selectedCategory);

    return matchesSearch && matchesCategory;
  });

  return (
    <>
      {/* Dark Horizon Glow */}
      <div
        className="fixed inset-0 z-10 pointer-events-none"
        style={{
          background:
            'radial-gradient(125% 125% at 50% 10%, #00000000 40%, #0d1a36 100%)',
        }}
      />

      {/* Dark White Dotted Grid Background */}
      <div
        className="fixed inset-0 z-5 pointer-events-none"
        style={{
          background: '#000000',
          backgroundImage:
            'radial-gradient(circle, rgba(255, 255, 255, 0.1) 1.5px, transparent 1.5px)',
          backgroundSize: '30px 30px',
          backgroundPosition: '0 0',
        }}
      />

      {/* Dropdown Styles */}
      <style>{`
        #sort-dropdown {
          appearance: none;
          background-image: url("data:image/svg+xml;charset=UTF-8,%3csvg xmlns='http://www.w3.org/2000/svg' viewBox='0 0 24 24' fill='none' stroke='white' stroke-width='2' stroke-linecap='round' stroke-linejoin='round'%3e%3cpolyline points='6 9 12 15 18 9'%3e%3c/polyline%3e%3c/svg%3e");
          background-repeat: no-repeat;
          background-position: right 0.75rem center;
          background-size: 1.5rem;
          padding-right: 2.5rem;
        }

        #sort-dropdown option {
          background-color: #1a1a1a;
          color: #ffffff;
          padding: 0.5rem;
          border: 1px solid rgba(255, 255, 255, 0.1);
        }

        #sort-dropdown option:hover {
          background-color: #2a2a2a;
        }

        #sort-dropdown option:checked {
          background-color: #3a3a3a;
          color: #ffffff;
        }
      `}</style>

      {/* Content Wrapper */}
      <div className="relative z-10">
        <Navbar />

        {/* Hero Section for Projects */}
        <section
          id="hero"
          className="flex items-center justify-center px-6 sm:px-6 md:px-8 pt-28 md:pt-24 pb-4 md:pb-4"
          style={{ minHeight: '50vh' }}
        >
          <div className="flex flex-col items-center max-w-6xl">
            <h1
              className="text-4xl sm:text-5xl md:text-6xl font-bold mb-4 text-center text-white"
            >
              My Projects
            </h1>
            <p
              className="text-base sm:text-lg md:text-xl text-gray-400 text-center max-w-2xl"
            >
              A complete showcase of projects I've built across various niches,
              highlighting adaptability, creativity, and real-world problem
              solving.
            </p>
          </div>
        </section>

        {/* All Projects Section */}
        <section
          ref={sectionRef}
          id="all-projects"
          className="pb-16 md:pb-24 px-6 sm:px-6 md:px-8 flex justify-center"
        >
          <div className="flex flex-col items-start w-full max-w-6xl">
            {/* Search and Sort Controls */}
            <div
              className="w-full mb-8 sm:mb-12 flex flex-col sm:flex-row gap-4 sm:gap-6 items-start sm:items-center"
            >
              {/* Search Input */}
              <div className="flex-1 w-full sm:w-auto">
                <input
                  type="text"
                  id="search-input"
                  placeholder="Search projects..."
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                  className="w-full px-4 py-3 bg-black/10 border border-white/20 rounded-lg text-white placeholder-gray-400 focus:outline-none focus:border-white/40 focus:bg-white/15 transition"
                />
              </div>

              {/* Sort Dropdown */}
              <select
                id="sort-dropdown"
                value={selectedCategory}
                onChange={(e) => setSelectedCategory(e.target.value)}
                className="px-4 py-3 bg-black/10 border border-white/20 rounded-lg text-white focus:outline-none focus:border-white/40 focus:bg-white/20 transition cursor-pointer hover:bg-white/15"
              >
                <option value="">All Projects</option>
                <option value="graphic design">Graphic Design</option>
                <option value="video editing">Video Editing</option>
                <option value="osint">OSINT</option>
                <option value="web development">Web Development</option>
                <option value="desktop app development">
                  Desktop App Development
                </option>
                <option value="uiux design">UI/UX Design</option>
              </select>
            </div>

            {/* Projects Grid */}
            <div
              className="w-full grid grid-cols-1 md:grid-cols-3 gap-6 md:gap-8"
            >
              {filteredProjects.length > 0
                ? filteredProjects.map((project) => {
                    const isTouched = touchedId === project.id;
                    return (
                      <div
                        key={project.id}
                        onClick={() => setTouchedId(isTouched ? null : project.id)}
                        className={`group flex flex-col h-full min-h-110 sm:min-h-120 bg-white/5 border border-white/10 rounded-2xl backdrop-blur-lg overflow-hidden cursor-pointer transition hover:border-white/30 hover:bg-white/10 ${
                          isTouched ? 'border-white/30 bg-white/10' : ''
                        }`}
                      >
                        {/* Thumbnail Aspect Ratio (16:9) */}
                        <div className="relative w-full aspect-video rounded-none overflow-hidden transition">
                          <img
                            src={project.thumbnail}
                            alt={project.title}
                            className={`w-full h-full object-cover transition duration-300 group-hover:scale-105 ${
                              isTouched ? 'scale-105' : ''
                            }`}
                          />
                          <div
                            className={`absolute inset-0 transition duration-300 group-hover:bg-black/50 ${
                              isTouched ? 'bg-black/50' : ''
                            }`}
                          ></div>

                          {/* Project Link Buttons */}
                          <div
                            className={`absolute top-3 sm:top-4 right-3 sm:right-4 flex gap-2 transition duration-300 flex-wrap opacity-0 group-hover:opacity-100 ${
                              isTouched ? 'opacity-100' : ''
                            }`}
                          >
                            {project.website && project.website !== '#' ? (
                              <a
                                href={project.website}
                                className="w-12 h-12 sm:w-14 sm:h-14 flex items-center justify-center bg-white text-black rounded-full font-semibold text-xs sm:text-sm hover:bg-gray-100 transition shadow-lg"
                                title="View Website"
                              >
                                <img
                                  src="/assets/icons/web.svg"
                                  alt="Website"
                                  className="w-6 h-6 brightness-0"
                                />
                              </a>
                            ) : null}
                            {project.source && project.source !== '#' ? (
                              <a
                                href={project.source}
                                className="w-12 h-12 sm:w-14 sm:h-14 flex items-center justify-center bg-white text-black rounded-full font-semibold text-xs sm:text-sm hover:bg-gray-100 transition shadow-lg"
                                title="View Source"
                              >
                                <img
                                  src="/assets/icons/external-link.svg"
                                  alt="Source"
                                  className="w-5 h-5 brightness-0"
                                />
                              </a>
                            ) : null}
                            {project.figmaLink && project.figmaLink !== '#' ? (
                              <a
                                href={project.figmaLink}
                                className="px-5 sm:px-6 py-2.5 sm:py-3 flex items-center justify-center bg-white text-black rounded-full font-semibold text-xs sm:text-sm hover:bg-gray-100 transition shadow-lg"
                                title="View Figma"
                              >
                                Figma
                              </a>
                            ) : null}
                            {project.behanceLink && project.behanceLink !== '#' ? (
                              <a
                                href={project.behanceLink}
                                className="px-5 sm:px-6 py-2.5 sm:py-3 flex items-center justify-center bg-white text-black rounded-full font-semibold text-xs sm:text-sm hover:bg-gray-100 transition shadow-lg"
                                title="View Behance"
                              >
                                Behance
                              </a>
                            ) : null}
                          </div>
                        </div>

                        {/* Project Info */}
                        <div className="flex-1 flex flex-col p-4 sm:p-6 md:p-7">
                          <h3
                            className={`text-lg sm:text-xl font-bold transition mb-2 sm:mb-3 ${
                              isTouched ? 'text-blue-700' : 'text-white group-hover:text-blue-700'
                            }`}
                          >
                            {project.title}
                          </h3>
                          <p className="text-sm sm:text-base text-gray-400 mb-6 sm:mb-8 flex-1">
                            {project.description}
                          </p>

                          {/* Tech Stack */}
                          <div className="flex flex-wrap gap-2">
                            {project.technologies.map((tech) => (
                              <span
                                key={tech}
                                className="inline-block px-3 py-1 text-xs font-medium bg-white/10 border border-white/20 rounded-full text-white hover:bg-white/20 transition"
                              >
                                {tech}
                              </span>
                            ))}
                          </div>
                        </div>
                      </div>
                    );
                  })
                : (
                  <div className="col-span-full text-center py-12">
                    <p className="text-gray-400">No projects found matching your criteria.</p>
                  </div>
                )
              }
            </div>
          </div>
        </section>

        <Footer />
      </div>
    </>
  );
}