import { useQuery, UseQueryResult, keepPreviousData } from '@tanstack/react-query';
import { movieService } from '../services/movieService';
import { TMDBResponse, MovieDetails, Movie, TMDBMovie } from '../interfaces/movie';
import { ENV } from '../config/env';
import { useLanguage } from '../context/LanguageContext';

const IMAGE_BASE_URL = ENV.IMAGE_URL || 'https://image.tmdb.org/t/p/w500';
const BACKDROP_BASE_URL = 'https://image.tmdb.org/t/p/original';

/**
 * Adapter: Maps TMDBMovie API response to our UI 'Movie' model.
 */
const mapToDomain = (tmdbMovie: TMDBMovie | MovieDetails): Movie => {
    return {
        id: tmdbMovie.id.toString(),
        title: tmdbMovie.title,
        description: tmdbMovie.overview,
        year: new Date(tmdbMovie.release_date).getFullYear() || 0,
        rating: tmdbMovie.adult ? '18+' : 'PG-13',
        matchScore: Math.round(tmdbMovie.vote_average * 10),
        quality: 'HD',
        posterUrl: tmdbMovie.poster_path
            ? `${IMAGE_BASE_URL}${tmdbMovie.poster_path}`
            : 'https://via.placeholder.com/500x750?text=No+Poster',
        heroUrl: tmdbMovie.backdrop_path
            ? `${BACKDROP_BASE_URL}${tmdbMovie.backdrop_path}`
            : 'https://via.placeholder.com/1920x1080?text=No+Backdrop',
        genre: 'Drama', // Placeholder: would need genre mapping
        cast: [],
        category: 'trending'
    };
};


// ... imports

// ... mapToDomain ...

interface PaginatedResult {
    results: Movie[];
    totalPages: number;
}

/**
 * Hook to fetch popular movies with pagination.
 */
export const usePopularMovies = (page: number = 1): UseQueryResult<PaginatedResult, Error> => {
    const { language } = useLanguage();
    return useQuery({
        queryKey: ['movies', 'popular', page, language],
        queryFn: () => movieService.getPopularMovies(page, language),
        select: (data: TMDBResponse) => ({
            results: data.results.map(mapToDomain),
            totalPages: data.total_pages > 500 ? 500 : data.total_pages // TMDB limits to 500 pages often
        }),
        staleTime: 1000 * 60 * 5, // 5 minutes
        placeholderData: keepPreviousData,
    });
};

/**
 * Hook to search movies with pagination.
 */
export const useSearchMovies = (query: string, page: number = 1): UseQueryResult<PaginatedResult, Error> => {
    const { language } = useLanguage();
    return useQuery({
        queryKey: ['movies', 'search', query, page, language],
        queryFn: () => movieService.searchMovies(query, page, language),
        enabled: !!query && query.length > 0,
        select: (data: TMDBResponse) => ({
            results: data.results.map(mapToDomain),
            totalPages: data.total_pages
        }),
        staleTime: 1000 * 60 * 5,
        placeholderData: keepPreviousData,
    });
};

// ... useMovieDetail ...

/**
 * Hook to fetch movie details.
 */
export const useMovieDetail = (id: string | number): UseQueryResult<Movie, Error> => {
    const { language } = useLanguage();
    return useQuery({
        queryKey: ['movie', 'detail', id, language],
        queryFn: () => movieService.getMovieDetail(id, language),
        enabled: !!id,
        select: mapToDomain,
        staleTime: 1000 * 60 * 5,
    });
};
