import React, { useState, useEffect } from 'react';
import { ThumbsUp, ThumbsDown, Eye } from 'lucide-react';

interface MovieActionsProps {
    movieId: string;
}

interface MovieStats {
    likes: number;
    dislikes: number;
    views: number;
    userAction: 'like' | 'dislike' | null;
}

const STORAGE_KEY_PREFIX = 'sexflix_movie_stats_';

const MovieActions: React.FC<MovieActionsProps> = ({ movieId }) => {
    const [stats, setStats] = useState<MovieStats>({
        likes: 0,
        dislikes: 0,
        views: 0,
        userAction: null,
    });

    // Initialize random stats if not present, to make it look alive
    useEffect(() => {
        const key = `${STORAGE_KEY_PREFIX}${movieId}`;
        const stored = localStorage.getItem(key);

        if (stored) {
            const parsed = JSON.parse(stored);
            // Increment view on mount
            const newStats = { ...parsed, views: parsed.views + 1 };
            setStats(newStats);
            localStorage.setItem(key, JSON.stringify(newStats));
        } else {
            // Generate some random initial stats for "active" feel
            const initialStats: MovieStats = {
                likes: Math.floor(Math.random() * 500) + 50,
                dislikes: Math.floor(Math.random() * 50),
                views: Math.floor(Math.random() * 10000) + 1000,
                userAction: null
            };
            setStats(initialStats);
            localStorage.setItem(key, JSON.stringify(initialStats));
        }
    }, [movieId]);

    const updateStats = (newStats: MovieStats) => {
        setStats(newStats);
        localStorage.setItem(`${STORAGE_KEY_PREFIX}${movieId}`, JSON.stringify(newStats));
    };

    const handleLike = () => {
        let newLikes = stats.likes;
        let newDislikes = stats.dislikes;
        let newAction: 'like' | 'dislike' | null = null;

        if (stats.userAction === 'like') {
            // Remove like
            newLikes--;
            newAction = null;
        } else {
            // Add like
            newLikes++;
            newAction = 'like';
            // Remove dislike if present
            if (stats.userAction === 'dislike') {
                newDislikes--;
            }
        }

        updateStats({
            ...stats,
            likes: newLikes,
            dislikes: newDislikes,
            userAction: newAction
        });
    };

    const handleDislike = () => {
        let newLikes = stats.likes;
        let newDislikes = stats.dislikes;
        let newAction: 'like' | 'dislike' | null = null;

        if (stats.userAction === 'dislike') {
            // Remove dislike
            newDislikes--;
            newAction = null;
        } else {
            // Add dislike
            newDislikes++;
            newAction = 'dislike';
            // Remove like if present
            if (stats.userAction === 'like') {
                newLikes--;
            }
        }

        updateStats({
            ...stats,
            likes: newLikes,
            dislikes: newDislikes,
            userAction: newAction
        });
    };

    // Format numbers compactly (e.g. 1.2k)
    const formatNumber = (num: number) => {
        if (num >= 1000) {
            return (num / 1000).toFixed(1) + 'k';
        }
        return num.toString();
    };

    return (
        <div className="flex items-center gap-6 mt-4 mb-6">
            {/* Likes */}
            <button
                onClick={handleLike}
                className={`flex items-center gap-2 px-4 py-2 rounded-full transition-all duration-200 group ${stats.userAction === 'like'
                        ? 'bg-primary/20 text-primary ring-1 ring-primary/50'
                        : 'bg-white/5 text-gray-400 hover:bg-white/10 hover:text-white'
                    }`}
            >
                <ThumbsUp
                    className={`w-5 h-5 transition-transform duration-200 ${stats.userAction === 'like' ? 'fill-current scale-110' : 'group-hover:scale-110'
                        }`}
                />
                <span className="font-semibold text-sm">{formatNumber(stats.likes)}</span>
            </button>

            {/* Dislikes */}
            <button
                onClick={handleDislike}
                className={`flex items-center gap-2 px-4 py-2 rounded-full transition-all duration-200 group ${stats.userAction === 'dislike'
                        ? 'bg-red-900/30 text-red-500 ring-1 ring-red-500/50'
                        : 'bg-white/5 text-gray-400 hover:bg-white/10 hover:text-white'
                    }`}
            >
                <ThumbsDown
                    className={`w-5 h-5 transition-transform duration-200 mt-1 ${stats.userAction === 'dislike' ? 'fill-current scale-110' : 'group-hover:scale-110'
                        }`}
                />
                <span className="font-semibold text-sm">{formatNumber(stats.dislikes)}</span>
            </button>

            {/* Views (Read-only) */}
            <div className="flex items-center gap-2 px-3 py-2 text-gray-500 ml-auto md:ml-0">
                <Eye className="w-5 h-5" />
                <span className="text-sm font-medium">{formatNumber(stats.views)} views</span>
            </div>
        </div>
    );
};

export default MovieActions;
