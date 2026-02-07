import React from 'react';
import MovieCardSkeleton from './MovieCardSkeleton';

interface MovieGridSkeletonProps {
    count?: number; // Configurable number of skeletons
}

const MovieGridSkeleton: React.FC<MovieGridSkeletonProps> = ({ count = 12 }) => {
    return (
        <div className="pt-24 px-6 md:px-12 pb-12">
            {/* Header Skeleton */}
            <div className="flex items-center justify-between mb-8">
                <div className="h-8 w-48 animate-pulse bg-zinc-800 rounded"></div>
                <div className="flex gap-4">
                    {/* Fake buttons */}
                    <div className="h-10 w-24 animate-pulse bg-zinc-800 rounded"></div>
                    <div className="h-10 w-24 animate-pulse bg-zinc-800 rounded"></div>
                </div>
            </div>

            {/* Grid Skeleton */}
            <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 xl:grid-cols-6 gap-6">
                {Array.from({ length: count }).map((_, index) => (
                    <MovieCardSkeleton key={index} />
                ))}
            </div>
        </div>
    );
};

export default MovieGridSkeleton;
