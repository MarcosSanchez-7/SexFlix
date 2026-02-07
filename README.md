# Flixcore Streaming SPA

A modern, responsive Single Page Application (SPA) for browsing movies, built with the latest frontend technologies. This project demonstrates a production-ready architecture with authentication, data fetching, and state management.

## 🚀 Features

*   **Authentication Module**: Custom `AuthProvider` with `localStorage` persistence.
*   **Dynamic Parsing**: View popular movies, search for titles, and see detailed information.
*   **Smart Search**: Real-time search with debounce and URL synchronization.
*   **Discussion System**: Persistent commenting system per movie using LocalStorage.
*   **Premium UI**: Glassmorphism design, skeleton loading states, and responsive layouts using Tailwind CSS.
*   **Internationalization**: Full English/Spanish support with `LanguageContext`.

## 🛠 Tech Stack

*   **React 18**: Component-based UI library.
*   **TypeScript**: Static typing for robustness.
*   **Vite**: Next-generation frontend tooling.
*   **TanStack Query (React Query)**: Powerful asynchronous state management (caching, deduplication).
*   **Tailwind CSS**: Utility-first CSS framework for rapid styling.
*   **React Router DOM**: Client-side routing.
*   **Vitest**: Unit testing framework.

## 📦 Installation

1.  **Clone the repository**
    ```bash
    git clone https://github.com/your-username/flixcore-streaming.git
    cd flixcore-streaming
    ```

2.  **Install dependencies**
    ```bash
    npm install
    ```

3.  **Run the development server**
    ```bash
    npm run dev
    ```

## 🔑 Environment Configuration

Create a `.env.local` file in the root directory with the following variables:

```env
# TMDB API Configuration
VITE_TMDB_API_KEY=your_tmdb_api_key_here
VITE_TMDB_BASE_URL=https://api.themoviedb.org/3
VITE_TMDB_IMAGE_URL=https://image.tmdb.org/t/p/w500
```
> Note: You need to obtain an API Key from [The Movie Database (TMDB)](https://www.themoviedb.org/documentation/api).

## 🏛 Architecture Decisions

### Why React Query?
We chose **TanStack Query** to handle server state because it provides out-of-the-box solutions for:
*   **Caching**: Reduces unnecessary network requests.
*   **Background Updates**: Keeps data fresh without user intervention.
*   **Loading/Error States**: Simplifies component logic by providing ready-to-use status flags.

### Why Context API for Auth?
For **Authentication**, using React's built-in **Context API** was sufficient and lightweight. It allows us to access the user session (`user`, `login`, `logout`) from anywhere in the app without the overhead of a larger state management library like Redux for this specific use case.

## ✅ Running Tests

To execute the unit tests suite:

```bash
npm run test
```
This runs **Vitest** to verify the integrity of critical components like the Login Form and Movie Card.
