/**
 * Client-side Router for Clean URLs
 * 
 * This router intercepts internal navigation clicks and uses the History API
 * to provide clean URLs without .html extensions.
 * 
 * Navbar and Footer are rendered by React (via portfolio/src/main.jsx).
 */

// Map of clean URL paths to actual HTML files
const PAGE_MAP = {
  '/': 'index.html',
  '/about': 'about.html',
  '/services': 'services.html',
  '/contact': 'contact.html',
};

// Pages that are standalone React apps (separate entry points) - need full page navigation
const REACT_APP_PAGES = ['/about', '/projects', '/services', '/blog'];

// Get the base path for the site (works with GitHub Pages subdirectory)
function getBasePath() {
  const path = window.location.pathname;
  const possibleBase = path.substring(0, path.lastIndexOf('/') + 1);
  return possibleBase || '/';
}

// Convert a clean URL path to the actual HTML file path
function cleanPathToHtml(cleanPath) {
  const base = getBasePath();
  
  // Handle root path
  if (cleanPath === '/' || cleanPath === '') {
    return base + 'index.html';
  }
  
  // Remove leading slash for lookup
  const lookupKey = cleanPath.startsWith('/') ? cleanPath : '/' + cleanPath;
  
  // Check if it's a known page
  if (PAGE_MAP[lookupKey]) {
    return base + PAGE_MAP[lookupKey];
  }
  
  // Handle query parameters
  const pathWithoutQuery = lookupKey.split('?')[0];
  if (PAGE_MAP[pathWithoutQuery]) {
    return base + PAGE_MAP[pathWithoutQuery];
  }
  
  // Fallback: try appending .html
  return base + cleanPath.replace(/^\//, '') + '.html';
}

// Load page content via fetch
async function loadPageContent(url) {
  try {
    const response = await fetch(url);
    if (!response.ok) throw new Error(`HTTP ${response.status}`);
    const html = await response.text();
    return html;
  } catch (error) {
    console.error('Router: Failed to load page:', url, error);
    return null;
  }
}

// Extract the main content from a full HTML page (excluding navbar and footer containers)
function extractMainContent(html) {
  const parser = new DOMParser();
  const doc = parser.parseFromString(html, 'text/html');
  
  // Get the content wrapper (the div with class containing "relative z-10" or "relative z-20 flex-1")
  const contentWrapper = doc.querySelector('.relative.z-10, .relative.z-20.flex-1');
  
  if (contentWrapper) {
    return contentWrapper.innerHTML;
  }
  
  // Fallback: get everything inside body
  const body = doc.querySelector('body');
  return body ? body.innerHTML : html;
}

// Update page title from loaded HTML
function updatePageTitle(html) {
  const match = html.match(/<title>([^<]*)<\/title>/);
  if (match && match[1]) {
    document.title = match[1];
  }
}

// Re-mount React components (navbar & footer) and re-initialize page scripts
function reinitializeScripts() {
  // Re-mount React navbar
  if (typeof window.__mountReactNavbar === 'function') {
    window.__mountReactNavbar();
  }
  
  // Re-mount React footer
  if (typeof window.__mountReactFooter === 'function') {
    window.__mountReactFooter();
  }
  
  // Re-initialize page-specific functions based on the live DOM
  const path = window.location.pathname;
  const featuredProjectsContainer = document.getElementById('featured-projects-container');
  const projectsContainer = document.getElementById('projects-container');

  if (path.includes('/about')) {
    if (typeof initializeInfiniteScroll === 'function') {
      setTimeout(() => {
        initializeInfiniteScroll();
        initializeScrollAnimations();
      }, 100);
    }
  }
  
  if (featuredProjectsContainer || projectsContainer) {
    const renderTasks = [];
    if (featuredProjectsContainer && typeof renderFeaturedProjects === 'function') {
      renderTasks.push(renderFeaturedProjects());
    }
    if (projectsContainer && typeof renderAllProjects === 'function') {
      renderTasks.push(renderAllProjects());
    }
    Promise.all(renderTasks).then(() => {
      if ((featuredProjectsContainer || projectsContainer) && typeof initProjectCardTap === 'function') {
        setTimeout(initProjectCardTap, 200);
      }
    });
  }
  
  if (path.includes('/services')) {
    if (typeof handleRouting === 'function') {
      handleRouting();
    }
  }
  
  // Re-initialize GSAP animations
  if (typeof initHeroAnimations === 'function') {
    initHeroAnimations();
  }
  if (typeof initProfileImageAnimation === 'function') {
    initProfileImageAnimation();
  }
  if (typeof initScrollAnimations === 'function') {
      setTimeout(() => {
        initScrollAnimations();
        if (typeof ScrollTrigger !== 'undefined') {
          ScrollTrigger.refresh();
        }
      }, 100);
  }
  
  // Re-initialize typing animation
  if (typeof startTypingAnimation === 'function' && document.getElementById('role-text')) {
    startTypingAnimation();
  }

  // Let any page-loaded listeners run after the DOM has been repopulated
  document.dispatchEvent(new CustomEvent('page-loaded'));
}

// Navigate to a new page
async function navigateTo(url, pushState = true) {
  // Don't navigate to the same page
  if (url === window.location.href) return;
  
  // Extract the path from the URL
  const urlObj = new URL(url, window.location.origin);
  const cleanPath = urlObj.pathname;
  const queryString = urlObj.search;
  
  // For standalone React app pages, do a full page navigation
  if (REACT_APP_PAGES.includes(cleanPath)) {
    window.location.href = url;
    return;
  }
  
  // Convert clean path to HTML file
  const htmlPath = cleanPathToHtml(cleanPath + queryString);
  
  // Load the page content
  const html = await loadPageContent(htmlPath);
  if (!html) {
    // Fallback: do a normal navigation
    window.location.href = url;
    return;
  }
  
  // Update the page title
  updatePageTitle(html);
  
  // Extract and replace main content
  const mainContent = extractMainContent(html);
  const currentContentWrapper = document.querySelector('.relative.z-10, .relative.z-20.flex-1');
  
  if (currentContentWrapper) {
    currentContentWrapper.innerHTML = mainContent;
  }
  
  // Update the URL
  if (pushState) {
    const newUrl = cleanPath + queryString;
    history.pushState({ path: newUrl }, '', newUrl);
  }
  
  // Scroll to top
  window.scrollTo(0, 0);
  
  // Re-initialize scripts (React navbar/footer + page scripts)
  reinitializeScripts();
}

// Handle link clicks
function handleLinkClick(e) {
  const link = e.target.closest('a');
  if (!link) return;
  
  const href = link.getAttribute('href');
  if (!href) return;
  
  // Skip external links, anchor links, mailto, tel, etc.
  if (href.startsWith('http') || href.startsWith('mailto:') || 
      href.startsWith('tel:') || href.startsWith('#') || 
      href.startsWith('//') || href.includes('://')) {
    return;
  }
  
  // Skip links that open in new tabs
  if (link.getAttribute('target') === '_blank') return;
  
  // Skip PDF links
  if (href.endsWith('.pdf')) return;
  
  // Handle the navigation
  e.preventDefault();
  
  // Build the clean URL
  let cleanUrl;
  if (href === 'index.html' || href === '/' || href === '') {
    cleanUrl = '/';
  } else if (href.endsWith('.html')) {
    cleanUrl = '/' + href.replace('.html', '');
  } else {
    // Already a clean URL or has query params
    cleanUrl = href.startsWith('/') ? href : '/' + href;
  }
  
  navigateTo(cleanUrl);
}

// Handle browser back/forward
function handlePopState(e) {
  if (e.state && e.state.path) {
    navigateTo(e.state.path, false);
  } else {
    // If no state, reload the page
    window.location.reload();
  }
}

// Handle initial page load - check if we need to route
async function handleInitialLoad() {
  const path = window.location.pathname;
  const filename = path.split('/').pop() || '';
  
  // If the URL already has .html, redirect to clean URL
  if (filename.endsWith('.html') && filename !== 'index.html') {
    const cleanPath = path.replace('.html', '');
    history.replaceState({ path: cleanPath }, '', cleanPath);
    return;
  }
  
  // Set the initial history state
  history.replaceState({ path: path }, '', path);
  
  // Skip fetching for standalone React app pages - they handle their own rendering
  if (REACT_APP_PAGES.includes(path)) {
    return;
  }
  
  // If we're not on the homepage and the URL is clean (no .html),
  // the server served index.html as SPA fallback.
  // We need to fetch the actual page content and swap it in.
  if (path !== '/') {
    const htmlPath = cleanPathToHtml(path);
    const html = await loadPageContent(htmlPath);
    if (html) {
      updatePageTitle(html);
      const mainContent = extractMainContent(html);
      const currentContentWrapper = document.querySelector('.relative.z-10, .relative.z-20.flex-1');
      if (currentContentWrapper) {
        currentContentWrapper.innerHTML = mainContent;
      }
      await reinitializeScripts();
    }
  }
}

// Initialize the router
function initRouter() {
  // Handle initial load
  handleInitialLoad();
  
  // Intercept link clicks
  document.addEventListener('click', handleLinkClick);
  
  // Handle browser back/forward
  window.addEventListener('popstate', handlePopState);
  
  // Re-attach listener after page content changes
  document.addEventListener('page-loaded', () => {
    // The click listener is on the document, so it works for dynamically added content
  });
}

// Start the router when DOM is ready
if (document.readyState === 'loading') {
  document.addEventListener('DOMContentLoaded', initRouter);
} else {
  initRouter();
}