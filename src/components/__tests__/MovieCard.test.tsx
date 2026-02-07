import { describe, it, expect, vi } from 'vitest';
import { render, screen } from '@testing-library/react';
import MovieCard from '../../../components/MovieCard';
import { MemoryRouter } from 'react-router-dom';
import { Movie } from '../../../types';

// Helper to create a mock movie
const mockMovie: Movie = {
    id: '123',
    title: 'Inception',
    description: 'A mind-bending thriller',
    year: 2010,
    rating: 'PG-13',
    matchScore: 98,
    quality: 'HD',
    posterUrl: 'http://example.com/poster.jpg',
    heroUrl: 'http://example.com/hero.jpg',
    genre: 'Sci-Fi',
    category: 'trending',
    cast: []
};

describe('MovieCard', () => {
    it('renders movie title correctly', () => {
        const handleClick = vi.fn();
        render(
            <MemoryRouter>
                <MovieCard movie={mockMovie} onClick={handleClick} />
            </MemoryRouter>
        );

        // Check if title is present (it might be in alt text or rendered text)
        // Based on component: <img alt={movie.title} /> and <h4>{movie.title}</h4>

        const heading = screen.getByText('Inception');
        expect(heading).toBeInTheDocument();

        const image = screen.getByRole('img');
        expect(image).toHaveAttribute('alt', 'Inception');
    });
});
