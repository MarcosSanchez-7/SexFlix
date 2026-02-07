import React from 'react';
import Skeleton from '../ui/Skeleton';

const MovieCardSkeleton: React.FC = () => {
    return (
        <div className="flex flex-col gap-2">
            {/* Aspect Ratio 2/3 Image Skeleton */}
            <Skeleton className="min-w-[200px] md:min-w-[240px] aspect-[2/3] rounded-lg" />

            {/* Title and Rating Skeleton - Mimicking the card structure that *could* be visible or just implies content */}
            <div className="mt-2 space-y-1">
                <Skeleton className="h-4 w-3/4 bg-zinc-700" /> {/* Title */}
                <div className="flex gap-2">
                    <Skeleton className="h-3 w-1/4 bg-zinc-800" /> {/* Match Score */}
                    <Skeleton className="h-3 w-10 bg-zinc-800" /> {/* Rating */}
                </div>
            </div>
        </div>
    );
};

export default MovieCardSkeleton;
