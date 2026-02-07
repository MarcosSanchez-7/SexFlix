
import React from 'react';
import { Movie } from '../types';

interface MovieCardProps {
  movie: Movie;
  onClick: (movie: Movie) => void;
}

const MovieCard: React.FC<MovieCardProps> = ({ movie, onClick }) => {
  return (
    <div
      className="w-full aspect-[2/3] relative rounded-lg overflow-hidden transition-all duration-300 hover:scale-105 hover:z-10 cursor-pointer shadow-lg group"
      onClick={() => onClick(movie)}
    >
      <img
        className="w-full h-full object-cover rounded-lg"
        src={movie.posterUrl}
        alt={movie.title}
      />
      <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity p-4 flex flex-col justify-end">
        <h4 className="font-bold text-sm">{movie.title}</h4>
        <div className="flex items-center gap-2 text-[10px] mt-1">
          <span className="text-green-500 font-bold">{movie.matchScore}% Match</span>
          <span className="border border-gray-400 px-1 rounded">{movie.rating}</span>
        </div>
      </div>
    </div>
  );
};

export default MovieCard;
