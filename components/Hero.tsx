
import React from 'react';
import { Movie } from '../types';

interface HeroProps {
  movie: Movie;
  onMoreInfo: (movie: Movie) => void;
}

const Hero: React.FC<HeroProps> = ({ movie, onMoreInfo }) => {
  return (
    <section className="relative h-[85vh] w-full flex flex-col justify-end pb-24 px-6 md:px-12 overflow-hidden">
      <div className="absolute inset-0 -z-10">
        <div className="absolute inset-0 bg-gradient-to-r from-black via-black/40 to-transparent"></div>
        <div className="absolute inset-0 bg-gradient-to-t from-background via-transparent to-transparent"></div>
        <img 
          className="w-full h-full object-cover" 
          src={movie.heroUrl} 
          alt={movie.title}
        />
      </div>

      <div className="max-w-2xl space-y-6">
        <div className="flex items-center gap-2">
          <div className="bg-primary/20 text-primary px-2 py-0.5 rounded text-[10px] font-bold tracking-widest uppercase italic">Original Series</div>
        </div>
        <h1 className="text-5xl md:text-7xl font-black tracking-tight leading-none drop-shadow-2xl uppercase italic">
          {movie.title.split(' ').map((word, i) => (
            <React.Fragment key={i}>
              {word}<br/>
            </React.Fragment>
          ))}
        </h1>
        <div className="flex items-center gap-4 text-sm font-semibold text-gray-300">
          <span className="text-green-500">{movie.matchScore}% Match</span>
          <span>{movie.year}</span>
          <span className="border border-gray-500 px-1.5 rounded-sm text-[10px]">{movie.rating}</span>
          {movie.seasons && <span>{movie.seasons}</span>}
          <span className="bg-gray-800/80 px-2 py-0.5 rounded text-[10px]">{movie.quality}</span>
        </div>
        <p className="text-lg text-gray-200 leading-relaxed drop-shadow-md line-clamp-3">
          {movie.description}
        </p>
        <div className="flex items-center gap-4 pt-4">
          <button className="flex items-center gap-2 bg-white text-black px-6 md:px-8 py-3 rounded-lg font-bold text-lg hover:bg-white/90 transition-all transform active:scale-95 shadow-xl">
            <span className="material-symbols-outlined fill-1">play_arrow</span>
            Play
          </button>
          <button 
            onClick={() => onMoreInfo(movie)}
            className="flex items-center gap-2 bg-white/20 backdrop-blur-md text-white px-6 md:px-8 py-3 rounded-lg font-bold text-lg hover:bg-white/30 transition-all shadow-xl"
          >
            <span className="material-symbols-outlined">info</span>
            More Info
          </button>
        </div>
      </div>
    </section>
  );
};

export default Hero;
