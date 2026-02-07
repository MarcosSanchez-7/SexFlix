
import React from 'react';
import { Movie } from '../types';
import MovieCard from './MovieCard';

interface MovieGridProps {
  title: string;
  movies: Movie[];
  onMovieClick: (movie: Movie) => void;
}

const MovieGrid: React.FC<MovieGridProps> = ({ title, movies, onMovieClick }) => {
  return (
    <div className="pt-24 px-6 md:px-12 pb-12">
      <div className="flex items-center justify-between mb-8">
        <h2 className="text-2xl font-bold">{title}</h2>
        <div className="flex gap-4">
          <button className="flex items-center gap-2 px-4 py-2 bg-zinc-900 border border-zinc-800 rounded hover:bg-zinc-800">
            <span className="material-symbols-outlined text-sm">tune</span>
            Filter
          </button>
          <button className="flex items-center gap-2 px-4 py-2 bg-zinc-900 border border-zinc-800 rounded hover:bg-zinc-800">
            <span className="material-symbols-outlined text-sm">sort</span>
            Sort
          </button>
        </div>
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 xl:grid-cols-5 gap-6">
        {movies.map((movie) => (
          <MovieCard key={movie.id} movie={movie} onClick={onMovieClick} />
        ))}
      </div>

      {movies.length === 0 && (
        <div className="text-center py-20 text-gray-500">
          <span className="material-symbols-outlined text-6xl block mb-4">search_off</span>
          <p className="text-xl">No results found.</p>
        </div>
      )}
    </div>
  );
};

export default MovieGrid;
