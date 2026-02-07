import React, { useState, useMemo } from 'react';
import { Route, Routes, useNavigate, useLocation, useParams } from 'react-router-dom';
import { AppView } from './types'; // Keeping types for AppView enum if used
import { Movie } from './src/interfaces/movie';
import Navbar from './components/Navbar';
import Hero from './components/Hero';
import MovieCard from './components/MovieCard';
import MovieGrid from './components/MovieGrid';
import MovieDetails from './components/MovieDetails';
import { usePopularMovies, useSearchMovies, useMovieDetail } from './src/hooks/useMovies';
import MovieGridSkeleton from './components/skeletons/MovieGridSkeleton';
import MovieCardSkeleton from './components/skeletons/MovieCardSkeleton';
import { AuthProvider } from './src/context/AuthContext';
import { LanguageProvider, useLanguage } from './src/context/LanguageContext';
import LoginPage from './src/components/LoginPage';
import ProtectedRoute from './src/components/ProtectedRoute';

// Extracted Home Component
import Pagination from './src/components/Pagination';

// Extracted Home Component
const Home: React.FC = () => {
  const navigate = useNavigate();
  const [page, setPage] = useState(1);
  const { data, isLoading, isError } = usePopularMovies(page);
  const { t } = useLanguage();

  const handlePageChange = (newPage: number) => {
    setPage(newPage);
    window.scrollTo(0, 0);
  };

  if (isLoading) {
    return (
      <main className="relative pt-24 space-y-12 pb-20 px-6 md:px-12">
        <div className="space-y-4">
          <div className="h-8 w-48 bg-zinc-800 rounded animate-pulse"></div>
          <div className="grid grid-cols-2 md:grid-cols-4 lg:grid-cols-5 gap-4">
            {Array.from({ length: 5 }).map((_, i) => <MovieCardSkeleton key={i} />)}
          </div>
        </div>
        <div className="space-y-4">
          <div className="h-8 w-48 bg-zinc-800 rounded animate-pulse"></div>
          <div className="grid grid-cols-2 md:grid-cols-4 lg:grid-cols-5 gap-4">
            {Array.from({ length: 5 }).map((_, i) => <MovieCardSkeleton key={i} />)}
          </div>
        </div>
      </main>
    );
  }

  if (isError) return <div className="pt-24 text-center">Error loading popular movies</div>;

  const validMovies = data?.results || [];
  const heroMovie = validMovies[0];
  const trendingMovies = validMovies.slice(0, 10);
  const newReleases = validMovies.slice(5, 15);
  const myList = validMovies.slice(10, 20);

  return (
    <main className="relative">
      {heroMovie && <Hero movie={heroMovie} onMoreInfo={(m) => navigate(`/movie/${m.id}`)} />}

      <div className="relative z-10 space-y-12 -mt-16 pb-20 px-6 md:px-12">
        <MovieGrid
          title={t.sections.trending}
          movies={validMovies}
          onMovieClick={(m) => navigate(`/movie/${m.id}`)}
        />

        {data && (
          <div className="mt-8">
            <Pagination
              currentPage={page}
              totalPages={data.totalPages}
              onPageChange={handlePageChange}
            />
          </div>
        )}
      </div>
    </main>
  );
}

// Extracted Search Component
const Search: React.FC = () => {
  const navigate = useNavigate();
  const location = useLocation();
  const q = new URLSearchParams(location.search).get('q') || '';
  const { t } = useLanguage();
  const [page, setPage] = useState(1);

  // Reset page when query changes
  React.useEffect(() => {
    setPage(1);
  }, [q]);

  const { data, isLoading, isError } = useSearchMovies(q, page);

  const handlePageChange = (newPage: number) => {
    setPage(newPage);
    window.scrollTo(0, 0);
  };

  if (isLoading) return <MovieGridSkeleton count={10} />;
  if (isError) return <div className="pt-24 text-center">Error searching movies</div>;

  return (
    <div className="flex flex-col min-h-screen">
      <MovieGrid
        title={q ? `${t.sections.resultsFor} "${q}"` : t.sections.browseGallery}
        movies={data?.results || []}
        onMovieClick={(m) => navigate(`/movie/${m.id}`)}
      />
      {data && (
        <div className="pb-20">
          <Pagination
            currentPage={page}
            totalPages={data.totalPages}
            onPageChange={handlePageChange}
          />
        </div>
      )}
    </div>
  );
}

// Extracted MovieDetailsWrapper Component
const MovieDetailsWrapper: React.FC = () => {
  const { id } = useParams<{ id: string }>();
  const navigate = useNavigate();
  const location = useLocation();

  // useMovieDetail acts like useMovieById but better named
  const { data: movie, isLoading, isError } = useMovieDetail(id || '');

  if (isLoading) return <div className="pt-24 text-center">Loading movie details...</div>;
  if (isError) return <div className="pt-24 text-center">Error loading movie details.</div>;
  if (!movie) return <div className="pt-24 text-center">Movie not found.</div>;

  const handleBack = () => {
    // Go back to previous search results if came from search, otherwise home
    const prevSearch = new URLSearchParams(location.state?.fromSearch || '').get('q');
    if (prevSearch) {
      navigate(`/search?q=${prevSearch}`);
    } else {
      navigate(-1); // Go back one step in history
    }
  };

  return (
    <MovieDetails
      movie={movie}
      onBack={handleBack}
      onMovieClick={(m) => navigate(`/movie/${m.id}`, { state: { fromSearch: location.state?.fromSearch } })}
    />
  );
};



// Extracted Layout Component to prevent re-mounting on every App render
const AuthenticatedLayout: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const navigate = useNavigate();
  const location = useLocation();

  const handleSearch = (term: string) => {
    if (term) {
      // Use replace: true to avoid cluttering history stack with every keystroke
      navigate(`/search?q=${term}`, { replace: true, state: { fromSearch: `?q=${term}` } });
    } else {
      navigate('/', { replace: true });
    }
  };

  const getCurrentView = (): AppView => {
    if (location.pathname.startsWith('/movie')) return AppView.DETAILS;
    if (location.pathname.startsWith('/search')) return AppView.SEARCH;
    return AppView.HOME;
  };

  return (
    <div className="min-h-screen bg-background font-sans text-white flex flex-col">
      <Navbar
        currentView={getCurrentView()}
        setView={() => { }}
        onSearch={handleSearch}
      />
      {children}
      <footer className="bg-background py-16 px-12 border-t border-white/10 mt-auto">
        <div className="max-w-4xl mx-auto grid grid-cols-2 md:grid-cols-4 gap-8 text-sm text-gray-500">
          <div className="col-span-2 md:col-span-4 text-center text-xs text-gray-600">
            © 2024 SEXFLIX Entertainment Inc.
          </div>
        </div>
      </footer>
    </div>
  );
};

const App: React.FC = () => {
  return (
    <LanguageProvider>
      <AuthProvider>
        <Routes>
          <Route path="/login" element={<LoginPage />} />

          <Route path="/" element={
            <ProtectedRoute>
              <AuthenticatedLayout>
                <Home />
              </AuthenticatedLayout>
            </ProtectedRoute>
          } />

          <Route path="/search" element={
            <ProtectedRoute>
              <AuthenticatedLayout>
                <Search />
              </AuthenticatedLayout>
            </ProtectedRoute>
          } />

          <Route path="/movie/:id" element={
            <ProtectedRoute>
              <AuthenticatedLayout>
                <MovieDetailsWrapper />
              </AuthenticatedLayout>
            </ProtectedRoute>
          } />
        </Routes>
      </AuthProvider>
    </LanguageProvider>
  );
};

export default App;
