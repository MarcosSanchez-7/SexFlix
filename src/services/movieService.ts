import { ENV } from '../config/env';
import { TMDBResponse, TMDBMovie, MovieDetails } from '../interfaces/movie';

/**
 * Validates if necessary environment variables are set.
 */
if (!ENV.API_KEY || !ENV.BASE_URL) {
    throw new Error('Missing TMDB Configuration. Please check .env.local');
}

/**
 * Generic fetcher for TMDB API.
 * @param endpoint - API endpoint (e.g., '/movie/popular')
 * @param params - Query parameters
 * @returns Promise with parsed JSON response
 */
const fetchFromTMDB = async <T>(endpoint: string, params: Record<string, string> = {}, language: string = 'en-US'): Promise<T> => {
    const url = new URL(`${ENV.BASE_URL}${endpoint}`);
    url.searchParams.append('api_key', ENV.API_KEY);
    url.searchParams.append('language', language);

    Object.entries(params).forEach(([key, value]) => {
        if (value) url.searchParams.append(key, value);
    });

    const response = await fetch(url.toString(), {
        headers: {
            'Content-Type': 'application/json',
        },
    });

    if (!response.ok) {
        throw new Error(`TMDB API Error: ${response.status} ${response.statusText}`);
    }

    return response.json();
};

export const movieService = {
    /**
     * Fetches the list of popular movies.
     * @param page - Page number (default: 1)
     */
    getPopularMovies: async (page = 1, language = 'en-US'): Promise<TMDBResponse> => {
        return fetchFromTMDB<TMDBResponse>('/movie/popular', { page: page.toString() }, language);
    },

    /**
     * Searches for movies by title.
     * @param query - Search term
     * @param page - Page number (default: 1)
     */
    searchMovies: async (query: string, page = 1, language = 'en-US'): Promise<TMDBResponse> => {
        return fetchFromTMDB<TMDBResponse>('/search/movie', { query, page: page.toString() }, language);
    },

    /**
     * Fetches details for a specific movie by ID.
     * @param id - Movie ID
     */
    getMovieDetail: async (id: number | string, language = 'en-US'): Promise<MovieDetails> => {
        return fetchFromTMDB<MovieDetails>(`/movie/${id}`, {}, language);
    },
};
