import React from 'react';
import { createRoot } from 'react-dom/client';
import { Analytics } from "@vercel/analytics/react"
import HomePage from './components/HomePage';
import AboutPage from './components/AboutPage';
import ProjectsPage from './components/ProjectsPage';
import ServicesPage from './components/ServicesPage';
import BlogPage from './components/BlogPage';
import ContactPage from './components/ContactPage';

function App() {
  const path = window.location.pathname;

  if (path === '/about') {
    return <AboutPage />;
  }

  if (path === '/projects') {
    return <ProjectsPage />;
  }

  if (path === '/services') {
    return <ServicesPage />;
  }

  if (path === '/blog') {
    return <BlogPage />;
  }

  if (path === '/contact') {
    return <ContactPage />;
  }

  return <HomePage />;
}

const rootElement = document.getElementById('root');

if (rootElement) {
  const root = createRoot(rootElement);
  
  // Listen for route changes from the router
  window.addEventListener('react-route-change', () => {
    root.render(
      <React.StrictMode>
        <App />
        <Analytics />
      </React.StrictMode>
    );
  });
  
  // Initial render
  root.render(
    <React.StrictMode>
      <App />
      <Analytics />
    </React.StrictMode>
  );
}
