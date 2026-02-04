
import React, { useState, useMemo, useRef, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { Category, Job } from '../types';
import { MOCK_JOBS } from '../constants';

const CATEGORIES = Object.values(Category);

const JobCard: React.FC<{ job: Job }> = ({ job }) => {
  const [isHovering, setIsHovering] = useState(false);
  const videoRef = useRef<HTMLVideoElement>(null);
  
  const firstSection = job.sections[0];
  const isVideo = firstSection?.mediaType === 'video';
  const mediaSrc = firstSection?.mediaData || 'https://via.placeholder.com/600x800?text=No+Media';

  useEffect(() => {
    if (isHovering && isVideo && videoRef.current) {
      videoRef.current.currentTime = 0;
      videoRef.current.play().catch(() => {});
      
      const timer = setTimeout(() => {
        if (videoRef.current) {
          videoRef.current.pause();
        }
      }, 5000);

      return () => clearTimeout(timer);
    } else if (!isHovering && videoRef.current) {
      videoRef.current.pause();
      videoRef.current.currentTime = 0;
    }
  }, [isHovering, isVideo]);

  return (
    <Link 
      to={`/job/${job.id}`} 
      className="group block"
      onMouseEnter={() => setIsHovering(true)}
      onMouseLeave={() => setIsHovering(false)}
    >
      <div className="relative aspect-[4/5] overflow-hidden rounded-2xl bg-gray-100 mb-6 shadow-sm group-hover:shadow-2xl transition-all duration-700">
        {isVideo ? (
          <video
            ref={videoRef}
            src={mediaSrc}
            muted
            playsInline
            className="w-full h-full object-cover transition-transform duration-1000 group-hover:scale-105"
            poster={job.thumbnailUrl}
          />
        ) : (
          <img 
            src={mediaSrc} 
            alt={job.title}
            className="w-full h-full object-cover transition-transform duration-1000 group-hover:scale-110"
          />
        )}
        
        <div className="absolute inset-0 bg-gradient-to-t from-black/50 via-transparent to-transparent opacity-60"></div>
        <div className="absolute bottom-8 left-8 right-8">
          <div className="flex flex-wrap gap-2 mb-3">
            {job.categories.map(cat => (
              <span key={cat} className="inline-block px-2 py-0.5 bg-white/20 backdrop-blur-md text-[9px] text-white rounded-sm font-bold uppercase tracking-widest">
                {cat}
              </span>
            ))}
          </div>
          <h3 className="text-2xl font-light text-white leading-tight group-hover:translate-x-1 transition-transform duration-500 font-serif-jp">
            {job.title}
          </h3>
        </div>
      </div>
      <div className="px-1">
        <p className="text-base font-medium text-gray-900">{job.company}</p>
        <p className="text-xs text-gray-400 mt-2 font-light tracking-wide">{job.location} · {job.salary}</p>
      </div>
    </Link>
  );
};

const Home: React.FC = () => {
  const [selectedCategory, setSelectedCategory] = useState<Category | 'ALL'>('ALL');
  const [page, setPage] = useState(1);
  const itemsPerPage = 4;

  const filteredJobs = useMemo(() => {
    return selectedCategory === 'ALL' 
      ? MOCK_JOBS 
      : MOCK_JOBS.filter(job => job.categories.includes(selectedCategory as Category));
  }, [selectedCategory]);

  const displayedJobs = useMemo(() => {
    const start = (page - 1) * itemsPerPage;
    return filteredJobs.slice(0, start + itemsPerPage);
  }, [filteredJobs, page]);

  const hasMore = displayedJobs.length < filteredJobs.length;

  return (
    <div className="w-full overflow-hidden">
      {/* Hero Opening Section */}
      <section className="relative w-full h-screen bg-gray-900 flex items-center justify-center overflow-hidden">
        {/* Background Video */}
        <video 
          className="absolute inset-0 w-full h-full object-cover opacity-60"
          autoPlay 
          muted 
          loop 
          playsInline
          src="https://assets.mixkit.co/videos/preview/mixkit-businesspeople-having-a-meeting-in-a-sunny-office-2363-large.mp4"
        />
        <div className="absolute inset-0 bg-black/10"></div>
        
        {/* Hero Content */}
        <div className="relative z-10 text-center text-white px-4">
          <h1 className="text-7xl md:text-8xl font-serif-jp font-light tracking-[0.4em] mb-12 animate-fadeIn">
            h i t o - k o t o
          </h1>
          <p className="text-lg md:text-xl font-serif-jp font-extralight tracking-[0.6em] opacity-90 animate-fadeInDelay">
            働くヒトの空気、シゴトを綴る
          </p>
        </div>

        {/* Scroll Indicator */}
        <div className="absolute bottom-12 left-1/2 -translate-x-1/2 flex flex-col items-center animate-bounce">
          <span className="text-[10px] text-white/50 uppercase tracking-widest mb-4">Scroll to discover</span>
          <div className="w-[1px] h-12 bg-white/20"></div>
        </div>
      </section>

      <div className="max-w-6xl mx-auto px-6 py-24">
        {/* Category Filter */}
        <div className="mb-20 overflow-x-auto no-scrollbar">
          <div className="flex space-x-3 pb-4">
            <button
              onClick={() => { setSelectedCategory('ALL'); setPage(1); }}
              className={`px-8 py-3 rounded-full text-xs font-bold transition-all whitespace-nowrap tracking-widest uppercase ${
                selectedCategory === 'ALL' ? 'bg-gray-900 text-white shadow-xl' : 'bg-white border border-gray-100 text-gray-400 hover:border-gray-900 hover:text-gray-900'
              }`}
            >
              All Jobs
            </button>
            {CATEGORIES.map(cat => (
              <button
                key={cat}
                onClick={() => { setSelectedCategory(cat); setPage(1); }}
                className={`px-8 py-3 rounded-full text-xs font-bold transition-all whitespace-nowrap tracking-widest uppercase ${
                  selectedCategory === cat ? 'bg-gray-900 text-white shadow-xl' : 'bg-white border border-gray-100 text-gray-400 hover:border-gray-900 hover:text-gray-900'
                }`}
              >
                {cat}
              </button>
            ))}
          </div>
        </div>

        <div className="mb-24">
          <h2 className="text-5xl font-extralight tracking-tight text-gray-900 mb-6 italic font-serif-jp">New Story.</h2>
          <div className="w-16 h-[2px] bg-gray-900"></div>
        </div>

        {/* Job Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-16 lg:gap-24">
          {displayedJobs.map(job => (
            <JobCard key={job.id} job={job} />
          ))}
        </div>

        {/* Pagination Link */}
        {hasMore && (
          <div className="mt-32 text-center">
            <button 
              onClick={() => setPage(p => p + 1)}
              className="group flex flex-col items-center mx-auto"
            >
              <span className="text-gray-400 group-hover:text-gray-900 text-sm font-light tracking-[0.3em] uppercase transition-colors">Load More Experience</span>
              <div className="w-px h-16 bg-gray-100 mt-6 group-hover:h-24 transition-all duration-700"></div>
            </button>
          </div>
        )}

        {displayedJobs.length === 0 && (
          <div className="py-32 text-center text-gray-300 font-light italic text-xl">
            Currently, no stories were found for this category.
          </div>
        )}
      </div>
    </div>
  );
};

export default Home;