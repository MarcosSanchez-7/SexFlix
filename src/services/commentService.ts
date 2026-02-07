
export interface DummyUser {
    id: number;
    username: string;
    fullName: string;
}

export interface DummyComment {
    id: number;
    body: string;
    postId: number;
    likes: number;
    user: DummyUser;
}

interface DummyCommentsResponse {
    comments: DummyComment[];
    total: number;
    skip: number;
    limit: number;
}

const COMMENTS_API_URL = 'https://dummyjson.com/comments';

export const commentService = {
    async getComments(): Promise<DummyComment[]> {
        // Fetch a random batch of comments to simulate variety
        // Since dummyjson has 340 comments, we can pick a random skip.
        // However, for consistency per movie, we might want to use the movieId if possible.
        // But since movieId is from TMDB (e.g. 12345), we can use it to seed the skip?
        // Let's just fetch limit 10, skip random for now or just standard to ensure data.
        // User requested "Merge... for THAT movieId". But dummyjson comments strictly belong to dummy posts.
        // We will just fetch a set of comments and pretend they are for this movie.
        // Let's perform a fetch with a limit.
        try {
            const response = await fetch(`${COMMENTS_API_URL}?limit=10`);
            if (!response.ok) {
                throw new Error('Failed to fetch comments');
            }
            const data: DummyCommentsResponse = await response.json();
            return data.comments;
        } catch (error) {
            console.error('Error fetching dummy comments:', error);
            return [];
        }
    },

    async getCommentsForMovie(movieId: string): Promise<DummyComment[]> {
        // Simulate movie-specific comments by using the ID to determine skip
        // MovieId is string, usually numeric.
        const idNum = parseInt(movieId) || 0;
        // Use modulo to pick a skip between 0 and 300 (approx total comments)
        const skip = (idNum * 5) % 300;

        try {
            const response = await fetch(`${COMMENTS_API_URL}?limit=5&skip=${skip}`);
            if (!response.ok) throw new Error('Failed to fetch comments');
            const data: DummyCommentsResponse = await response.json();
            return data.comments;
        } catch (error) {
            console.error(error);
            return [];
        }
    }
};
