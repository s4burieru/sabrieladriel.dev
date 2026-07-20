const services = [
  {
    id: 1,
    number: '01',
    title: 'Website Development',
    description:
      'I create modern and responsive websites tailored to meet user needs, focusing on clean design, functionality, and smooth performance across all devices.',
    link: '/services?service=web-dev',
  },
  {
    id: 2,
    number: '02',
    title: 'Multimedia Design',
    description:
      'I produce modern visual designs that balance creativity and clarity, ensuring each work is engaging, purposeful, and visually effective.',
    link: '/services?service=multimedia',
  },
  {
    id: 3,
    number: '03',
    title: 'Video Editing',
    description:
      'I edit for content creators, businesses, and individuals. I produce high-quality videos with smooth transitions, effects, and color grading to tell your story effectively.',
    link: '/services?service=video-editing',
  },
  {
    id: 4,
    number: '04',
    title: 'Open-Source Intelligence',
    description:
      'I conduct OSINT research to support fact-checking, risk assessment, and intelligence gathering for personal and professional needs.',
    link: '/services?service=osint',
  },
];

export default function ServicesSection() {
  return (
    <section
      id="services"
      className="py-16 md:py-24 px-6 sm:px-6 md:px-8 flex justify-center"
    >
      <div className="flex flex-col items-start w-full max-w-6xl">
        {/* Section Label */}
        <div className="text-sm uppercase tracking-widest text-blue-600 mb-3 font-semibold">
          SERVICES
        </div>

        {/* Heading with More Services Link */}
        <div className="w-full flex items-center justify-between mb-4">
          <h2 className="text-3xl sm:text-4xl md:text-5xl font-bold text-white text-left">
            What I Offer.
          </h2>
          <a
            href="/services"
            className="text-sm sm:text-base text-gray-400 flex items-center gap-2 ml-4"
          >
            View All Services
            <svg
              className="w-4 h-4"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth="2"
                d="M9 5l7 7-7 7"
              />
            </svg>
          </a>
        </div>

        {/* Description */}
        <p className="text-base sm:text-lg text-gray-400 text-left mb-12 md:mb-16 max-w-2xl">
          Offering professional solutions designed to meet client needs.
        </p>

        {/* Services Grid */}
        <div className="w-full grid grid-cols-1 md:grid-cols-2 gap-6 md:gap-8">
          {services.map((service) => (
            <div
              key={service.id}
              className="group flex flex-col p-6 sm:p-8 bg-white/5 border border-white/10 rounded-2xl backdrop-blur-lg hover:border-white/30 hover:bg-white/10 transition"
            >
              {/* Icon/Number */}
              <div className="w-12 h-12 mb-4 rounded-lg bg-white/10 border border-white/20 flex items-center justify-center text-lg font-bold text-blue-600 group-hover:border-white/40 transition">
                {service.number}
              </div>

              {/* Title */}
              <h3 className="text-xl sm:text-2xl font-bold text-white mb-3 sm:mb-4">
                {service.title}
              </h3>

              {/* Description */}
              <p className="text-base sm:text-lg text-gray-400 mb-6 sm:mb-8 flex-1">
                {service.description}
              </p>

              <a
                href={service.link}
                className="w-full sm:w-auto px-6 py-3 rounded-xl bg-blue-600/10 border border-blue-500/20 text-blue-600 hover:bg-blue-600 hover:text-white transition-all duration-300 font-semibold flex items-center justify-center gap-2"
              >
                View Details
                <svg
                  className="w-4 h-4"
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth="2"
                    d="M9 5l7 7-7 7"
                  />
                </svg>
              </a>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}