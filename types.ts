
// Domain Interface (Used by UI)
export interface Actor {
  name: string;
  role: string;
  imageUrl: string;
}

export interface Movie {
  id: string; // TMDB uses number, but we can convert to string or keep as is. Existing uses string.
  title: string;
  description: string;
  year: number;
  rating: string;
  matchScore: number;
  seasons?: string;
  quality: string;
  posterUrl: string;
  heroUrl: string; // corresponds to backdrop_path
  genre: string;
  cast: Actor[];
  category: 'trending' | 'new' | 'mylist';
}

export enum AppView {
  HOME = 'home',
  DETAILS = 'details',
  SEARCH = 'search'
}

// TMDB API Interfaces
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

export interface TMDBResponse {
  page: number;
  results: TMDBMovie[];
  total_pages: number;
  total_results: number;
}
