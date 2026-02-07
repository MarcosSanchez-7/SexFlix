import React, { createContext, useContext, useState, useEffect, ReactNode } from 'react';
import { User, AuthContextType } from '../interfaces/auth';

const AuthContext = createContext<AuthContextType | undefined>(undefined);

// Key for local storage
const AUTH_STORAGE_KEY = 'sexflix_auth_user';

export const AuthProvider: React.FC<{ children: ReactNode }> = ({ children }) => {
    const [user, setUser] = useState<User | null>(null);
    const [isLoading, setIsLoading] = useState<boolean>(true);

    useEffect(() => {
        // Hydrate user from local storage on mount
        const storedUser = localStorage.getItem(AUTH_STORAGE_KEY);
        if (storedUser) {
            try {
                setUser(JSON.parse(storedUser));
            } catch (error) {
                console.error("Failed to parse stored user", error);
                localStorage.removeItem(AUTH_STORAGE_KEY);
            }
        }
        setIsLoading(false);
    }, []);

    const login = async (username: string, email: string) => {
        setIsLoading(true);
        // Simulate API call delay
        await new Promise(resolve => setTimeout(resolve, 800));

        // Create a dummy user
        const newUser: User = {
            id: 'u-' + Math.random().toString(36).substr(2, 9),
            username: username,
            email: email,
            name: username, // Simple for now
            token: 'fake-jwt-token-' + Date.now().toString(36)
        };

        localStorage.setItem(AUTH_STORAGE_KEY, JSON.stringify(newUser));
        setUser(newUser);
        setIsLoading(false);
    };

    const logout = () => {
        localStorage.removeItem(AUTH_STORAGE_KEY);
        setUser(null);
    };

    const isAuthenticated = !!user;

    const value = {
        user,
        isAuthenticated,
        login,
        logout,
        isLoading
    };

    return (
        <AuthContext.Provider value={value}>
            {children}
        </AuthContext.Provider>
    );
};

export const useAuth = () => {
    const context = useContext(AuthContext);
    if (context === undefined) {
        throw new Error('useAuth must be used within an AuthProvider');
    }
    return context;
};
