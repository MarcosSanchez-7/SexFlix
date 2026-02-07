/**
 * Represents the authenticated user
 */
export interface User {
    id: string;
    username: string;
    email: string;
    name: string;
    token: string;
}

/**
 * Context value interface for AuthContext
 */
export interface AuthContextType {
    user: User | null;
    isAuthenticated: boolean;
    login: (username: string, email: string) => Promise<void>; // Simulate async login
    logout: () => void;
    isLoading: boolean;
}
