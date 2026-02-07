import React, { useState, useEffect, useMemo } from 'react';
import { useAuth } from '../context/AuthContext';
import { useQuery } from '@tanstack/react-query';
import { commentService, DummyComment } from '../services/commentService';

interface Comment {
    id: string;
    username: string;
    text: string;
    createdAt: string;
    isLocal?: boolean; // To distinguish local from api
}

interface MovieCommentsProps {
    movieId: string;
}

const COMMENTS_STORAGE_KEY = 'sexflix_comments';

const MovieComments: React.FC<MovieCommentsProps> = ({ movieId }) => {
    const { user, isAuthenticated } = useAuth();
    const [localComments, setLocalComments] = useState<Comment[]>([]);
    const [newComment, setNewComment] = useState('');

    // Load local comments
    useEffect(() => {
        const storedComments = localStorage.getItem(COMMENTS_STORAGE_KEY);
        if (storedComments) {
            try {
                const parsedComments = JSON.parse(storedComments) as Record<string, Comment[]>;
                setLocalComments(parsedComments[movieId] || []);
            } catch (e) {
                console.error("Error parsing comments", e);
            }
        }
    }, [movieId]);

    // Fetch API comments
    const { data: apiComments, isLoading } = useQuery({
        queryKey: ['comments', movieId],
        queryFn: () => commentService.getCommentsForMovie(movieId),
        staleTime: 1000 * 60 * 60, // 1 hour
    });

    // Merge comments
    const comments = useMemo(() => {
        const mappedApiComments: Comment[] = (apiComments || []).map((c: DummyComment, index: number) => {
            // Generate a consistent "past" date based on index
            const date = new Date();
            date.setDate(date.getDate() - (index + 1));

            return {
                id: `api-${c.id}`,
                username: c.user.username,
                text: c.body,
                createdAt: date.toISOString(),
                isLocal: false
            };
        });

        // Local comments first (newest), then API comments
        return [...localComments, ...mappedApiComments];
    }, [localComments, apiComments]);

    const handleSubmit = (e: React.FormEvent) => {
        e.preventDefault();

        if (!newComment.trim()) return;
        if (!user) return;

        const comment: Comment = {
            id: `local-${Date.now()}`,
            username: user.username,
            text: newComment.trim(),
            createdAt: new Date().toISOString(),
            isLocal: true
        };

        const updatedLocalComments = [comment, ...localComments];
        setLocalComments(updatedLocalComments);
        setNewComment('');

        // Persist to local storage
        const storedComments = localStorage.getItem(COMMENTS_STORAGE_KEY);
        let allComments: Record<string, Comment[]> = {};
        if (storedComments) {
            try {
                allComments = JSON.parse(storedComments);
            } catch (e) { /* ignore */ }
        }
        allComments[movieId] = updatedLocalComments;
        localStorage.setItem(COMMENTS_STORAGE_KEY, JSON.stringify(allComments));
    };

    const formatDate = (isoString: string) => {
        return new Date(isoString).toLocaleDateString(undefined, {
            year: 'numeric',
            month: 'long',
            day: 'numeric'
        });
    };

    return (
        <div className="mt-12 max-w-4xl mx-auto px-4">
            <h3 className="text-2xl font-bold mb-6 text-white border-b border-gray-700 pb-2">
                Discussion ({isLoading ? '...' : comments.length})
            </h3>

            {/* Comment Form */}
            {isAuthenticated ? (
                <form onSubmit={handleSubmit} className="mb-10 bg-zinc-900/50 p-6 rounded-lg border border-zinc-800">
                    <label htmlFor="comment" className="block text-sm font-medium text-gray-300 mb-2">
                        Post a comment as <span className="text-primary font-bold">{user?.username}</span>
                    </label>
                    <textarea
                        id="comment"
                        rows={3}
                        className="w-full bg-zinc-800 text-white rounded-md p-3 focus:outline-none focus:ring-2 focus:ring-primary border border-zinc-700 placeholder-gray-500"
                        placeholder="What did you think of this movie?"
                        value={newComment}
                        onChange={(e) => setNewComment(e.target.value)}
                    />
                    <div className="mt-3 flex justify-end">
                        <button
                            type="submit"
                            disabled={!newComment.trim()}
                            className="bg-primary hover:bg-red-700 text-white px-6 py-2 rounded-md transition-colors disabled:opacity-50 disabled:cursor-not-allowed text-sm font-semibold"
                        >
                            Post Comment
                        </button>
                    </div>
                </form>
            ) : (
                <div className="mb-10 p-6 bg-zinc-900/50 rounded-lg border border-zinc-800 text-center">
                    <p className="text-gray-400 mb-2">Join the conversation</p>
                    <p className="text-white font-medium">Please log in to leave a comment.</p>
                </div>
            )}

            {/* Comments List */}
            <div className="space-y-6">
                {isLoading ? (
                    // Skeleton State
                    Array.from({ length: 3 }).map((_, i) => (
                        <div key={i} className="flex gap-4 p-4 rounded-lg bg-zinc-900/30 animate-pulse">
                            <div className="w-10 h-10 rounded-full bg-zinc-800"></div>
                            <div className="flex-grow space-y-2">
                                <div className="h-4 w-1/4 bg-zinc-800 rounded"></div>
                                <div className="h-4 w-3/4 bg-zinc-700 rounded"></div>
                            </div>
                        </div>
                    ))
                ) : comments.length > 0 ? (
                    comments.map((comment) => (
                        <div key={comment.id} className="flex gap-4 p-4 rounded-lg bg-zinc-900/30 hover:bg-zinc-900/50 transition-colors">
                            <div className="flex-shrink-0">
                                {/* Dynamic Avatar */}
                                <img
                                    src={`https://i.pravatar.cc/150?u=${comment.username}`}
                                    alt={comment.username}
                                    className="w-10 h-10 rounded-full object-cover border border-white/10"
                                    onError={(e) => {
                                        (e.target as HTMLImageElement).src = 'https://upload.wikimedia.org/wikipedia/commons/7/7c/Profile_avatar_placeholder_large.png';
                                    }}
                                />
                            </div>
                            <div className="flex-grow">
                                <div className="flex items-baseline justify-between mb-1">
                                    <div className="flex items-center gap-2">
                                        <h4 className="font-bold text-white text-sm">{comment.username}</h4>
                                        {comment.isLocal && (
                                            <span className="text-[10px] bg-primary/20 text-primary px-1.5 py-0.5 rounded border border-primary/30">YOU</span>
                                        )}
                                    </div>
                                    <span className="text-xs text-gray-500">{formatDate(comment.createdAt)}</span>
                                </div>
                                <p className="text-gray-300 text-sm leading-relaxed whitespace-pre-wrap">{comment.text}</p>
                            </div>
                        </div>
                    ))
                ) : (
                    <div className="text-center py-10 text-gray-500 italic">
                        No comments yet. Be the first to share your thoughts!
                    </div>
                )}
            </div>
        </div>
    );
};

export default MovieComments;
