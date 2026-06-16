const servicesData = {
  "web-dev": {
    title: "Website Development",
    heroDesc: "Building high-performance, modern web applications.",
    content: `
      <div class="grid grid-cols-1 md:grid-cols-2 gap-12 items-start">
        <div class="space-y-6">
          <h3 class="text-2xl font-bold text-white">The Tech Stack</h3>
          <p class="text-gray-400">I specialize in modern technologies like React, Next.js, and Tailwind CSS to build scalable and maintainable applications. My focus is on writing clean, efficient code that delivers a fast user experience.</p>
          <ul class="space-y-4">
            <li class="flex gap-4"><span class="text-blue-500 font-bold">01</span> <span>Responsive Architecture: Mobile-first approach for all screen sizes.</span></li>
            <li class="flex gap-4"><span class="text-blue-500 font-bold">02</span> <span>SEO Optimized: Semantic HTML and metadata best practices.</span></li>
            <li class="flex gap-4"><span class="w-1.5 h-1.5 bg-blue-500 rounded-full"></span> Modern UI Frameworks</li>
          </ul>
        </div>
        <div class="p-8 rounded-2xl bg-white/5 border border-white/10">
          <h3 class="text-xl font-bold mb-4">Project Workflow</h3>
          <p class="text-sm text-gray-500 leading-relaxed">Discovery → Wireframing → Development → Testing → Deployment</p>
        </div>
      </div>
    `,
  },
  multimedia: {
    title: "Multimedia Design",
    heroDesc:
      "Crafting visual identities that leave a lasting impression.",
    content: `
      <div class="grid grid-cols-1 md:grid-cols-2 gap-12 items-start">
        <div class="space-y-6">
          <h3 class="text-2xl font-bold text-white">Design Philosophy</h3>
          <p class="text-gray-400">I believe that good design is invisible—it should guide the user naturally while evoking the right emotions. I focus on clarity, balance, and purposeful visual storytelling.</p>
          <div class="grid grid-cols-2 gap-4">
            <div class="p-4 rounded-xl bg-white/5 border border-white/10">
              <h4 class="font-bold text-blue-500 mb-1">UI/UX</h4>
              <p class="text-xs text-gray-500">User-centric prototypes in Figma.</p>
            </div>
            <div class="p-4 rounded-xl bg-white/5 border border-white/10">
              <h4 class="font-bold text-blue-500 mb-1">Branding</h4>
              <p class="text-xs text-gray-500">Logo and identity systems.</p>
            </div>
          </div>
        </div>
        <div class="space-y-4">
          <h3 class="text-xl font-bold">Tools I Use</h3>
          <ul class="text-gray-400 space-y-2 text-sm">
            <li class="flex items-center gap-2"><span class="w-1.5 h-1.5 bg-blue-500 rounded-full"></span> Figma for Prototyping</li>
            <li class="flex items-center gap-2"><span class="w-1.5 h-1.5 bg-blue-500 rounded-full"></span> Adobe Photoshop for Compositing</li>
            <li class="flex items-center gap-2"><span class="w-1.5 h-1.5 bg-blue-500 rounded-full"></span> Canva for Quick Visuals</li>
          </ul>
        </div>
      </div>
    `,
  },
  "video-editing": {
    title: "Video Editing",
    heroDesc: "Turning raw footage into cinematic stories.",
    content: `
      <div class="space-y-12">
        <div class="prose prose-invert max-w-none">
          <p class="text-gray-400 text-lg">My editing style is focused on pacing and narrative flow. Whether it's a short-form reel or a long-form documentary style video, I ensure the message is delivered effectively through seamless transitions and color grading.</p>
        </div>
        <div class="grid grid-cols-1 sm:grid-cols-3 gap-6">
          <div class="p-6 rounded-2xl bg-white/5 border border-white/10 text-center">
            <div class="text-3xl mb-2 text-blue-500 font-bold">4K</div>
            <p class="text-sm text-gray-500 uppercase tracking-wider">Rendering</p>
          </div>
          <div class="p-6 rounded-2xl bg-white/5 border border-white/10 text-center">
            <div class="text-3xl mb-2 text-blue-500 font-bold">LUTs</div>
            <p class="text-sm text-gray-500 uppercase tracking-wider">Color Grading</p>
          </div>
          <div class="p-6 rounded-2xl bg-white/5 border border-white/10 text-center">
            <div class="text-3xl mb-2 text-blue-500 font-bold">VFX</div>
            <p class="text-sm text-gray-500 uppercase tracking-wider">Motion Graphics</p>
          </div>
        </div>
      </div>
    `,
  },
  osint: {
    title: "OSINT Investigation",
    heroDesc: "Gathering actionable intelligence through open sources.",
    content: `
      <div class="grid grid-cols-1 md:grid-cols-2 gap-12">
        <div class="space-y-6">
          <h3 class="text-2xl font-bold text-white">Techniques & Ethics</h3>
          <p class="text-gray-400">Open Source Intelligence (OSINT) is the practice of collecting and analyzing information from publicly available sources for intelligence purposes. I follow strict ethical guidelines while uncovering digital footprints.</p>
          <div class="space-y-2">
            <h4 class="font-bold text-sm uppercase text-gray-500">Methodology</h4>
            <p class="text-sm text-gray-400">Planning → Collection → Processing → Analysis → Reporting</p>
          </div>
        </div>
        <div class="space-y-6">
          <h3 class="text-2xl font-bold text-white">Example Code</h3>
          <p class="text-gray-400 text-sm">Automating search queries using tools like Python:</p>
          <div class="p-4 rounded-xl bg-black border border-white/10 overflow-x-auto">
            <pre class="text-xs text-blue-400"><code>def google_dork(query):
    # Example of a simple dork query
    site = "site:linkedin.com"
    formatted_query = f"{site} '{query}'"
    print(f"Searching for: {formatted_query}")

google_dork("Cybersecurity Analyst")</code></pre>
          </div>
        </div>
      </div>
    `,
  },
};

// Cache DOM elements for performance
const listSection = document.getElementById("detailed-services");
const detailSection = document.getElementById("service-detail");
const whyMeSection = document.getElementById("why-me-section");
const ctaSection = document.getElementById("cta-section");
const heroTitle = document.getElementById("hero-title");
const heroDesc = document.getElementById("hero-desc");
const detailContent = document.getElementById("detail-content");

function handleRouting() {
  const urlParams = new URLSearchParams(window.location.search);
  const serviceId = urlParams.get("service");

  if (serviceId && servicesData[serviceId]) {
    const data = servicesData[serviceId];

    // Update Content
    heroTitle.textContent = data.title;
    heroDesc.textContent = data.heroDesc;
    detailContent.innerHTML = data.content;

    // Toggle visibility
    listSection.classList.add("hidden");
    listSection.classList.remove("flex");
    detailSection.classList.remove("hidden");
    detailSection.classList.add("flex");

    // Hide extra sections
    if (whyMeSection) {
      whyMeSection.classList.add("hidden");
      whyMeSection.classList.remove("flex");
    }
    if (ctaSection) {
      ctaSection.classList.add("hidden");
      ctaSection.classList.remove("flex");
    }

    window.scrollTo(0, 0);
  } else {
    // Reset Hero Content
    heroTitle.textContent = "What I Do";
    heroDesc.textContent = "Delivering high-quality digital solutions tailored to your needs. Explore the services I offer to help your projects succeed.";

    listSection.classList.remove("hidden");
    listSection.classList.add("flex");
    detailSection.classList.add("hidden");
    detailSection.classList.remove("flex");

    // Show extra sections
    if (whyMeSection) {
      whyMeSection.classList.remove("hidden");
      whyMeSection.classList.add("flex");
    }
    if (ctaSection) {
      ctaSection.classList.remove("hidden");
      ctaSection.classList.add("flex");
    }
  }
}

window.addEventListener("popstate", handleRouting);
handleRouting();