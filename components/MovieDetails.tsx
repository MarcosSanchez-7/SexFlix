import React, { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { useMovieDetails } from '../hooks/useMovies';
// import MovieCard from './MovieCard'; // Commented out until we reimplement 'similars' with API
import Skeleton from './ui/Skeleton';
import MovieComments from '../src/components/MovieComments';
import MovieActions from '../src/components/MovieActions';

const MovieDetails: React.FC = () => {
  const { id } = useParams<{ id: string }>();
  const navigate = useNavigate();

  const { data: movie, isLoading, isError } = useMovieDetails(id || '');

  useEffect(() => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  }, [id]);

  if (isLoading) {
    return (
      <div className="min-h-screen pt-24 px-6 md:px-12 flex flex-col gap-8 animate-pulse">
        <Skeleton className="h-[400px] w-full rounded-xl opacity-20" />
        <div className="flex gap-8">
          <Skeleton className="w-[300px] h-[450px] rounded-xl" />
          <div className="flex-1 space-y-4">
            <Skeleton className="h-12 w-3/4" />
            <Skeleton className="h-6 w-1/2" />
            <Skeleton className="h-32 w-full" />
          </div>
        </div>
      </div>
    )
  }

  if (isError || !movie) {
    return (
      <div className="min-h-screen pt-40 text-center">
        <h2 className="text-3xl font-bold mb-4">Movie not found</h2>
        <button
          onClick={() => navigate('/')}
          className="bg-primary px-6 py-2 rounded text-white"
        >
          Go Home
        </button>
      </div>
    )
  }

  return (
    <div className="relative pt-24 min-h-screen">
      <div className="absolute inset-0 -z-10 h-[700px]">
        {/* Backdrop Image */}
        <div className="absolute inset-0 bg-cover bg-center opacity-30 blur-xl" style={{ backgroundImage: `url(${movie.heroUrl})` }}></div>
        <div className="absolute inset-0 bg-gradient-to-b from-transparent via-background to-background"></div>
      </div>

      <main className="px-6 md:px-12 lg:px-20 max-w-7xl mx-auto">
        <button
          onClick={() => navigate(-1)}
          className="flex items-center gap-2 text-white/60 hover:text-white mb-8 transition-colors"
        >
          <span className="material-symbols-outlined text-sm">arrow_back</span>
          Back
        </button>

        <div className="flex flex-col lg:flex-row gap-12">
          <div className="w-full lg:w-[350px] flex-shrink-0">
            <img
              className="w-full aspect-[2/3] object-cover rounded-xl shadow-2xl border border-white/10"
              src={movie.posterUrl}
              alt={movie.title}
            />
          </div>

          <div className="flex-grow max-w-3xl">
            <h1 className="text-5xl lg:text-7xl font-bold mb-4 tracking-tighter uppercase italic">{movie.title}</h1>

            <div className="flex flex-wrap items-center gap-4 text-sm">
              <span className="text-green-400 font-bold">{movie.matchScore}% Match</span>
              <span className="bg-white/20 px-2 py-0.5 rounded text-xs font-bold">{movie.rating}</span>
              <span className="text-white/80">{movie.year}</span>
              <span className="border border-white/30 px-2 py-0.5 rounded text-[10px] uppercase font-bold">{movie.quality}</span>
            </div>

            {/* Like/Dislike/Views Actions */}
            <MovieActions movieId={movie.id} />

            <p className="text-xl text-white/90 leading-relaxed mb-8">
              {movie.description}
            </p>

            {/* AI Insight Section Removed */}

            <div className="flex flex-wrap gap-4 mb-12">
              <button className="bg-primary hover:bg-primary/90 text-white px-10 py-4 rounded-lg font-bold flex items-center gap-2 transition-all shadow-lg shadow-primary/20">
                <span className="material-symbols-outlined fill-1">play_arrow</span>
                Watch Now
              </button>
              <button className="bg-white/10 hover:bg-white/20 text-white px-8 py-4 rounded-lg font-bold flex items-center gap-2 transition-all border border-white/20">
                <span className="material-symbols-outlined">add</span>
                Add to List
              </button>
            </div>

            {/* Cast Placeholder - API Details doesn't include cast by default without append_to_response */}
            {movie.cast && movie.cast.length > 0 && (
              <div>
                <h3 className="text-xl font-bold mb-6">Cast & Crew</h3>
                <div className="flex flex-wrap gap-8">
                  {movie.cast.map((actor, i) => (
                    <div key={i} className="flex flex-col items-center gap-2 group cursor-pointer">
                      <div className="w-20 h-20 rounded-full overflow-hidden border-2 border-transparent group-hover:border-primary transition-all shadow-lg">
                        <img className="w-full h-full object-cover" src={actor.imageUrl} alt={actor.name} />
                      </div>
                      <div className="text-center">
                        <p className="text-sm font-bold">{actor.name}</p>
                        <p className="text-xs text-white/50">{actor.role}</p>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            )}

            <MovieComments movieId={movie.id} />
          </div>
        </div>
      </main>
    </div>
  );
};
export default MovieDetails;
