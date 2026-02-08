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
import PageSizeSelector from './src/components/PageSizeSelector';

// Extracted Home Component
const Home: React.FC = () => {
  const navigate = useNavigate();
  const [page, setPage] = useState(1);

  /**
   * Estado para el tamaño de página (limit).
   * Valor inicial: 10 elementos por página.
   * Opciones disponibles: 5, 10, 20, 50
   */
  const [limit, setLimit] = useState(10);

  const { data, isLoading, isError } = usePopularMovies(page);
  const { t } = useLanguage();

  /**
   * Handler para cambio de tamaño de página.
   * 
   * IMPORTANTE: Cuando el usuario cambia el tamaño de página (limit),
   * debemos resetear la página actual a 1. Esto es crucial porque:
   * 
   * 1. Evita peticiones a offsets inexistentes
   *    - Si estábamos en página 5 con limit=10 (offset=40)
   *    - Y cambiamos a limit=50, la página 5 tendría offset=200
   *    - Esto podría exceder el total de resultados disponibles
   * 
   * 2. Mejora la experiencia de usuario
   *    - El usuario espera ver los primeros resultados con el nuevo tamaño
   *    - Evita confusión al mostrar resultados de páginas intermedias
   * 
   * Fórmula de cálculo:
   * - skip (offset) = (page - 1) * limit
   * - Ejemplo: página 3 con limit 10 → skip = (3-1) * 10 = 20
   */
  const handleLimitChange = (newLimit: number) => {
    setLimit(newLimit);
    setPage(1); // ← RESETEO CRÍTICO: Volver a la primera página
    window.scrollTo(0, 0);
  };

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

  /**
   * Procesamiento de películas con el limit aplicado.
   * 
   * NOTA TÉCNICA: TMDB API siempre devuelve 20 resultados por página.
   * Para simular diferentes tamaños de página, filtramos los resultados
   * en el cliente usando slice(0, limit).
   * 
   * En una API que soporte limit nativo (como DummyJSON), la URL sería:
   * https://dummyjson.com/posts?limit=${limit}&skip=${(page - 1) * limit}
   */
  const allMovies = data?.results || [];
  const validMovies = allMovies.slice(0, limit);
  const heroMovie = validMovies[0];

  return (
    <main className="relative">
      {heroMovie && <Hero movie={heroMovie} onMoreInfo={(m) => navigate(`/movie/${m.id}`)} />}

      <div className="relative z-10 space-y-12 -mt-16 pb-20 px-6 md:px-12">
        {/* Selector de tamaño de página - Ubicado antes del listado */}
        <div className="flex justify-end items-center pt-4">
          <PageSizeSelector
            currentSize={limit}
            onSizeChange={handleLimitChange}
            options={[5, 10, 20, 50]}
          />
        </div>

        <MovieGrid
          title={t.sections.trending}
          movies={validMovies}
          onMovieClick={(m) => navigate(`/movie/${m.id}`)}
        />

        {data && (
          <div className="mt-8 space-y-4">
            {/* Información de resultados mostrados */}
            <div className="text-center text-sm text-gray-400">
              Showing {validMovies.length} of {allMovies.length} movies on this page
            </div>

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
  const [limit, setLimit] = useState(10);

  // Reset page when query changes
  React.useEffect(() => {
    setPage(1);
  }, [q]);

  const { data, isLoading, isError } = useSearchMovies(q, page);

  const handleLimitChange = (newLimit: number) => {
    setLimit(newLimit);
    setPage(1);
    window.scrollTo(0, 0);
  };

  const handlePageChange = (newPage: number) => {
    setPage(newPage);
    window.scrollTo(0, 0);
  };

  if (isLoading) return <MovieGridSkeleton count={10} />;
  if (isError) return <div className="pt-24 text-center">Error searching movies</div>;

  const allMovies = data?.results || [];
  const validMovies = allMovies.slice(0, limit);

  return (
    <div className="flex flex-col min-h-screen">
      <div className="px-6 md:px-12 pt-24">
        {/* Selector de tamaño de página */}
        <div className="flex justify-end items-center pb-4">
          <PageSizeSelector
            currentSize={limit}
            onSizeChange={handleLimitChange}
            options={[5, 10, 20, 50]}
          />
        </div>
      </div>

      <MovieGrid
        title={q ? `${t.sections.resultsFor} "${q}"` : t.sections.browseGallery}
        movies={validMovies}
        onMovieClick={(m) => navigate(`/movie/${m.id}`)}
      />
      {data && (
        <div className="pb-20 space-y-4">
          <div className="text-center text-sm text-gray-400">
            Showing {validMovies.length} of {allMovies.length} movies on this page
          </div>

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

/**
 * App Component - Refactorizado para Acceso Público
 * 
 * CAMBIOS DE ARQUITECTURA:
 * - Las rutas principales (/, /search, /movie/:id) son ahora PÚBLICAS
 * - No requieren autenticación para visualizar contenido
 * - La autenticación solo es necesaria para:
 *   1. Gestión de comentarios (crear, editar, eliminar)
 *   2. Acciones de usuario (likes, favoritos)
 *   3. Futuras rutas de perfil/admin
 * 
 * BENEFICIOS:
 * - Mejor SEO (contenido indexable)
 * - Experiencia de usuario mejorada (exploración sin fricción)
 * - Conversión gradual (usuarios pueden explorar antes de registrarse)
 */
const App: React.FC = () => {
  return (
    <LanguageProvider>
      <AuthProvider>
        <Routes>
          {/* Ruta de Login - Pública */}
          <Route path="/login" element={<LoginPage />} />

          {/* 
            RUTAS PÚBLICAS - Accesibles sin autenticación
            El estado de autenticación se maneja a nivel de componente
            para funcionalidades específicas (comentarios, likes, etc.)
          */}
          <Route path="/" element={
            <AuthenticatedLayout>
              <Home />
            </AuthenticatedLayout>
          } />

          <Route path="/search" element={
            <AuthenticatedLayout>
              <Search />
            </AuthenticatedLayout>
          } />

          <Route path="/movie/:id" element={
            <AuthenticatedLayout>
              <MovieDetailsWrapper />
            </AuthenticatedLayout>
          } />

          {/* 
            RUTAS PROTEGIDAS (Ejemplo para futuras implementaciones)
            Descomenta cuando implementes estas funcionalidades:
            
            <Route path="/profile" element={
              <ProtectedRoute>
                <AuthenticatedLayout>
                  <UserProfile />
                </AuthenticatedLayout>
              </ProtectedRoute>
            } />
            
            <Route path="/admin" element={
              <ProtectedRoute>
                <AuthenticatedLayout>
                  <AdminDashboard />
                </AuthenticatedLayout>
              </ProtectedRoute>
            } />
          */}
        </Routes>
      </AuthProvider>
    </LanguageProvider>
  );
};

export default App;
