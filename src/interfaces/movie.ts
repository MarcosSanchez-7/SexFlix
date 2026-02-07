/**
 * Represents a movie from TMDB API (subset of fields).
 */
export interface TMDBMovie {
    id: number;
    title: string;
    overview: string;
    poster_path: string | null;
    backdrop_path: string | null;
    release_date: string;
    vote_average: number;
    vote_count: number;
    adult: boolean;
    genre_ids: number[];
}

/**
 * Standard TMDB API Response wrapper.
 */
export interface TMDBResponse {
    page: number;
    results: TMDBMovie[];
    total_pages: number;
    total_results: number;
}

/**
 * Detailed movie information from TMDB.
 */
export interface MovieDetails extends TMDBMovie {
    tagline: string | null;
    runtime: number | null;
    status: string;
    genres: { id: number; name: string }[];
}

/**
 * Domain model for Movie (used in UI).
 */
export interface Movie {
    id: string;
    title: string;
    description: string;
    year: number;
    rating: string;
    matchScore: number;
    quality: string;
    posterUrl: string;
    heroUrl: string;
    genre: string;
    cast: { name: string; role: string; imageUrl: string }[]; // Placeholder for now
    category: 'trending' | 'new' | 'mylist';
}
