export default function AboutSection() {
  return (
    <section
      id="about"
      className="pt-16 md:pt-24 lg:pt-0 pb-16 md:pb-24 px-6 sm:px-6 md:px-8 flex justify-center"
    >
      <div className="flex flex-col items-start w-full max-w-6xl">
        {/* Section Label */}
        <div className="text-sm uppercase tracking-widest text-blue-600 mb-3 font-semibold">
          ABOUT
        </div>

        {/* Heading with More About Me Link */}
        <div className="w-full flex items-center justify-between mb-4">
          <h2 className="text-3xl sm:text-4xl md:text-5xl font-bold text-white text-left">
            My Passion.
          </h2>
          <a
            href="/about"
            className="text-sm sm:text-base text-gray-400 flex items-center gap-2 ml-4"
          >
            More About Me
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
          My journey through technology, creativity, and the digital landscape.
        </p>

        {/* Content */}
        <div>
          <p className="text-base sm:text-lg md:text-xl text-gray-300 mb-4 sm:mb-6 leading-relaxed">
            I've explored various areas of technology, including
            front-end web development, video editing, UI/UX, and graphic
            design. Through these experiences, I've built a strong
            foundation in both creativity and technical skills, allowing me to
            approach projects with a well-rounded perspective.
          </p>

          <p className="text-base sm:text-lg md:text-xl text-gray-300 mb-8 sm:mb-12 leading-relaxed">
            While I enjoy working across these different fields, I've
            discovered that my true passion lies in cybersecurity,
            particularly in OSINT investigation. I love the challenge of
            uncovering information, analyzing data from open sources, and
            staying one step ahead in an ever-evolving digital landscape.
          </p>
        </div>
      </div>
    </section>
  );
}