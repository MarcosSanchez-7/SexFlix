import { TMDBResponse, TMDBMovie } from '../types';

const API_KEY = import.meta.env.VITE_TMDB_API_KEY;
const BASE_URL = import.meta.env.VITE_TMDB_BASE_URL || 'https://api.themoviedb.org/3';

const headers: Record<string, string> = {
    'Content-Type': 'application/json',
};

const token = import.meta.env.VITE_TMDB_ACCESS_TOKEN;
if (token && token !== 'undefined') {
    headers.Authorization = `Bearer ${token}`;
}

// Helper for fetch handling
const fetchFromTMDB = async <T>(endpoint: string, params: Record<string, string> = {}): Promise<T> => {
    const url = new URL(`${BASE_URL}${endpoint}`);
    url.searchParams.append('api_key', API_KEY);
    url.searchParams.append('language', 'es-ES'); // Good default for Spanish context

    Object.entries(params).forEach(([key, value]) => {
        if (value) url.searchParams.append(key, value);
    });

    const response = await fetch(url.toString(), {
        headers: {
            Accept: 'application/json',
            // If the user uses Bearer token mostly nowadays:
            // 'Authorization': `Bearer ${token}` 
            // But user said "API_KEY" constant. I'll stick to query param or assume they handle it.
            // For 'API_KEY' usually it means ?api_key=...
        }
    });

    if (!response.ok) {
        throw new Error(`Error fetching from TMDB: ${response.statusText}`);
    }

    return response.json();
};

export const movieService = {
    getPopularMovies: async (page = 1): Promise<TMDBResponse> => {
        return fetchFromTMDB<TMDBResponse>('/movie/popular', { page: page.toString() });
    },

    searchMovies: async (query: string, page = 1): Promise<TMDBResponse> => {
        return fetchFromTMDB<TMDBResponse>('/search/movie', { query, page: page.toString() });
    },

    getMovieDetails: async (id: string): Promise<TMDBMovie> => {
        return fetchFromTMDB<TMDBMovie>(`/movie/${id}`);
    },
};
