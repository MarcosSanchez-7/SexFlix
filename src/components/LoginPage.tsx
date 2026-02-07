import React, { useState } from 'react';
import { useAuth } from '../context/AuthContext';
import { useNavigate } from 'react-router-dom';

const LoginPage: React.FC = () => {
    const [username, setUsername] = useState('');
    const [email, setEmail] = useState(''); // Just as a second field for "realism"
    const [error, setError] = useState('');
    const { login, isLoading } = useAuth();
    const navigate = useNavigate();

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        setError('');

        if (!username.trim() || !email.trim()) {
            setError('Please fill in all fields');
            return;
        }

        try {
            await login(username, email);
            navigate('/'); // Redirect to home on success
        } catch (err) {
            setError('Login failed. Please try again.');
        }
    };

    return (
        <div className="min-h-screen flex items-center justify-center bg-black bg-opacity-95 px-4">
            {/* Background image effect manually applied if needed, or stick to simple dark theme */}
            <div className="absolute inset-0 z-0 bg-cover bg-center opacity-30" style={{ backgroundImage: 'url(https://assets.nflxext.com/ffe/siteui/vlv3/f85718e0-bc22-4a6f-aaff-f144e0b5722e/91275211-13c2-4217-916c-48618683e30/US-en-20230212-popsignuptwoweeks-perspective_alpha_website_small.jpg)' }}></div>

            <div className="z-10 w-full max-w-md bg-black/75 p-8 md:p-16 rounded-lg backdrop-blur-sm border border-white/10 shadow-2xl">
                <h2 className="text-3xl font-bold mb-8 text-white">Sign In</h2>

                {error && (
                    <div className="bg-[#e87c03] p-4 rounded text-sm text-white mb-4">
                        {error}
                    </div>
                )}

                <form onSubmit={handleSubmit} className="space-y-6">
                    <div>
                        <label htmlFor="username" className="block text-sm text-gray-400 mb-2">Username</label>
                        <input
                            type="text"
                            id="username"
                            className="w-full bg-[#333] rounded px-5 py-3.5 text-white focus:outline-none focus:bg-[#454545] border-b-2 border-transparent focus:border-primary transition-all"
                            placeholder="Type any username"
                            value={username}
                            onChange={(e) => setUsername(e.target.value)}
                        />
                    </div>

                    <div>
                        <label htmlFor="email" className="block text-sm text-gray-400 mb-2">Email address</label>
                        <input
                            type="email" // Using email type for basic browser validation
                            id="email"
                            className="w-full bg-[#333] rounded px-5 py-3.5 text-white focus:outline-none focus:bg-[#454545] border-b-2 border-transparent focus:border-primary transition-all"
                            placeholder="Type any email"
                            value={email}
                            onChange={(e) => setEmail(e.target.value)}
                        />
                    </div>

                    <button
                        type="submit"
                        disabled={isLoading}
                        className="w-full bg-primary hover:bg-red-700 text-white font-bold py-3.5 rounded mt-8 transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
                    >
                        {isLoading ? 'Signing In...' : 'Sign In'}
                    </button>

                    <div className="flex justify-between items-center text-xs text-gray-400 mt-2">
                        <span>
                            <input type="checkbox" id="remember" className="mr-1" />
                            <label htmlFor="remember">Remember me</label>
                        </span>
                        <a href="#" className="hover:underline">Need help?</a>
                    </div>
                </form>

                <div className="mt-16 text-gray-500 text-sm">
                    New to SEXFLIX? <span className="text-white hover:underline cursor-pointer">Sign up now</span>.
                </div>
            </div>
        </div>
    );
};

export default LoginPage;
