import { useQuery } from '@tanstack/react-query';
import { movieService } from '../services/movieService';
import { Movie, TMDBMovie, TMDBResponse } from '../types';

// CONSTANTS mapping for image URLs
const IMAGE_BASE_URL = 'https://image.tmdb.org/t/p/w500';
const BACKDROP_BASE_URL = 'https://image.tmdb.org/t/p/original';

/**
 * Mapper helper: Transforms API data (TMDBMovie) to Domain Model (Movie).
 * Important for decoupling the UI from the API structure.
 */
const mapToDomain = (tmdbMovie: TMDBMovie): Movie => {
    return {
        id: tmdbMovie.id.toString(),
        title: tmdbMovie.title,
        description: tmdbMovie.overview,
        year: new Date(tmdbMovie.release_date).getFullYear() || 0,
        rating: tmdbMovie.adult ? '18+' : 'PG-13', // Simplified logic
        matchScore: Math.round(tmdbMovie.vote_average * 10), // 0-10 -> 0-100%
        quality: 'HD', // Static capability
        posterUrl: tmdbMovie.poster_path
            ? `${IMAGE_BASE_URL}${tmdbMovie.poster_path}`
            : 'https://via.placeholder.com/500x750', // Fallback
        heroUrl: tmdbMovie.backdrop_path
            ? `${BACKDROP_BASE_URL}${tmdbMovie.backdrop_path}`
            : 'https://via.placeholder.com/1920x1080',
        genre: 'Drama', // We would need to map IDs to names, omitted for brevity
        cast: [], // List endpoint doesn't provide cast
        category: 'trending' // Default categorization
    };
};

/**
 * Hook to fetch popular movies.
 * Uses 'select' to transform data before it reaches the component.
 */
export const useMovies = () => {
    return useQuery({
        queryKey: ['movies', 'popular'],
        queryFn: () => movieService.getPopularMovies(),
        select: (data: TMDBResponse) => data.results.map(mapToDomain),
        staleTime: 1000 * 60 * 5, // Cache valid for 5 minutes
    });
};

/**
 * Hook to search movies by query.
 * Only runs if 'query' has content (enabled option).
 */
export const useSearchMovies = (query: string) => {
    return useQuery({
        queryKey: ['movies', 'search', query],
        queryFn: () => movieService.searchMovies(query),
        enabled: !!query, // Dependent query: only runs if query exists
        select: (data: TMDBResponse) => data.results.map(mapToDomain),
        staleTime: 1000 * 60 * 1, // 1 minute search cache
    });
};

/**
 * Hook to fetch single movie details.
 */
export const useMovieDetails = (id: string) => {
    return useQuery({
        queryKey: ['movies', 'details', id],
        queryFn: () => movieService.getMovieDetails(id),
        enabled: !!id,
        select: mapToDomain,
        staleTime: 1000 * 60 * 30, // 30 minutes
    });
};

export const useMovieById = useMovieDetails;
