import { useState, useEffect } from 'react';

export default function BlogSection() {
  const [posts, setPosts] = useState([]);

  useEffect(() => {
    fetch('./data/blog-posts.json')
      .then((res) => res.json())
      .then((data) => setPosts(data.slice(0, 3)))
      .catch((err) => console.error('Error loading blog posts:', err));
  }, []);

  return (
    <section
      id="blog"
      className="py-16 md:py-24 px-6 sm:px-6 md:px-8 flex justify-center"
    >
      <div className="flex flex-col items-start w-full max-w-6xl">
        {/* Section Label */}
        <div className="text-sm uppercase tracking-widest text-blue-600 mb-3 font-semibold">
          WRITING
        </div>

        {/* Heading with View All Posts Link */}
        <div className="w-full flex items-center justify-between mb-4">
          <h2 className="text-3xl sm:text-4xl md:text-5xl font-bold text-white text-left">
            Recent Blog Posts.
          </h2>
          <a
            href="/blog"
            className="text-sm sm:text-base text-gray-400 flex items-center gap-2 ml-4"
          >
            View All Posts
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
          Insights on technology, practices, and lessons learned from exploring.
        </p>

        {/* Blog Posts Grid */}
        <div className="w-full grid grid-cols-1 md:grid-cols-3 gap-6 md:gap-8">
          {posts.length > 0
            ? posts.map((post) => (
                <a
                  key={post.id}
                  href={`/blog?id=${post.id}`}
                  className="group flex flex-col h-full bg-white/5 border border-white/10 rounded-2xl backdrop-blur-lg hover:border-white/30 hover:bg-white/10 transition"
                >
                  <div className="relative w-full aspect-video rounded-t-2xl overflow-hidden">
                    <img
                      src={post.image}
                      alt={post.title}
                      className="w-full h-full object-cover rounded-t-2xl group-hover:scale-105 transition duration-300"
                    />
                    <div className="absolute inset-0 group-hover:bg-black/50 transition duration-300"></div>
                  </div>

                  <div className="flex-1 flex flex-col p-4 sm:p-6 pb-6 sm:pb-8">
                    {/* Post Meta Info */}
                    <div className="flex flex-wrap items-center gap-4 mb-4 text-xs sm:text-sm text-gray-400">
                      <div className="flex items-center gap-1">
                        <img src="./assets/icons/calendar.svg" alt="calendar" className="w-4 h-4" />
                        <span>{post.date}</span>
                      </div>
                      <div className="flex items-center gap-1">
                        <img src="./assets/icons/clock.svg" alt="clock" className="w-4 h-4" />
                        <span>{post.readTime} min read</span>
                      </div>
                    </div>

                    <h3 className="text-lg sm:text-xl font-bold text-white mb-4 group-hover:text-blue-600 transition">
                      {post.title}
                    </h3>

                    <p className="text-sm sm:text-base text-gray-400 flex-1">
                      {post.excerpt}
                    </p>

                    {/* Tags */}
                    <div className="flex flex-wrap gap-2 mt-8">
                      {post.tags.map((tag) => (
                        <span
                          key={tag}
                          className="inline-block px-3 py-1 text-xs font-medium bg-white/10 border border-white/20 rounded-full text-white"
                        >
                          {tag}
                        </span>
                      ))}
                    </div>

                    {/* Author */}
                    <div className="w-full h-px bg-gray-500/40 mt-6 mb-3"></div>
                    <p className="text-xs text-gray-500">By {post.author}</p>
                  </div>
                </a>
              ))
            : // Skeleton loading placeholders
              [1, 2, 3].map((i) => (
                <div
                  key={i}
                  className="flex flex-col h-full bg-white/5 border border-white/10 rounded-2xl overflow-hidden animate-pulse"
                >
                  <div className="w-full aspect-video bg-white/10"></div>
                  <div className="flex-1 p-4 sm:p-6">
                    <div className="h-3 bg-white/10 rounded w-1/2 mb-3"></div>
                    <div className="h-5 bg-white/10 rounded w-3/4 mb-3"></div>
                    <div className="h-4 bg-white/10 rounded w-full mb-2"></div>
                    <div className="h-4 bg-white/10 rounded w-5/6"></div>
                  </div>
                </div>
              ))}
        </div>
      </div>
    </section>
  );
}