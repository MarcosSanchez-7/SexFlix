import React from 'react';

interface PaginationProps {
    currentPage: number;
    totalPages: number;
    onPageChange: (page: number) => void;
}

const Pagination: React.FC<PaginationProps> = ({ currentPage, totalPages, onPageChange }) => {
    // Constraint: Max 10 pages as per requirement
    const MAX_PAGES = 10;
    const effectiveTotal = Math.min(totalPages, MAX_PAGES);

    const isFirstPage = currentPage === 1;
    const isLastPage = currentPage === effectiveTotal;

    const handlePrevious = () => {
        if (!isFirstPage) {
            onPageChange(currentPage - 1);
        }
    };

    const handleNext = () => {
        if (!isLastPage) {
            onPageChange(currentPage + 1);
        }
    };

    const handlePageClick = (page: number | string) => {
        if (typeof page === 'number' && page !== currentPage) {
            onPageChange(page);
        }
    };

    if (effectiveTotal <= 1) return null;

    // Smart Pagination Logic
    const getPageNumbers = () => {
        if (effectiveTotal <= 7) {
            return Array.from({ length: effectiveTotal }, (_, i) => i + 1);
        }

        if (currentPage <= 4) {
            return [1, 2, 3, 4, 5, 6, '...', effectiveTotal];
        }

        if (currentPage >= effectiveTotal - 3) {
            return [1, '...', effectiveTotal - 5, effectiveTotal - 4, effectiveTotal - 3, effectiveTotal - 2, effectiveTotal - 1, effectiveTotal];
        }

        return [1, '...', currentPage - 1, currentPage, currentPage + 1, '...', effectiveTotal];
    };

    const pages = getPageNumbers();

    return (
        <div className="flex flex-col md:flex-row justify-center items-center gap-4 py-8">
            <div className="flex items-center gap-2">
                {/* Previous Button */}
                <button
                    onClick={handlePrevious}
                    disabled={isFirstPage}
                    className={`flex items-center justify-center w-10 h-10 rounded-full border border-white/10 transition-all ${isFirstPage
                        ? 'text-gray-600 bg-transparent cursor-not-allowed'
                        : 'text-white bg-white/5 hover:bg-primary hover:border-primary hover:text-black'
                        }`}
                    title="Anterior"
                >
                    <span className="material-symbols-outlined text-sm">arrow_back_ios_new</span>
                </button>

                {/* Numeric Buttons with Ellipsis */}
                <div className="flex items-center gap-2 px-2">
                    {pages.map((page, index) => (
                        <React.Fragment key={index}>
                            {page === '...' ? (
                                <span className="text-gray-500 font-bold px-1">...</span>
                            ) : (
                                <button
                                    onClick={() => handlePageClick(page)}
                                    className={`flex items-center justify-center min-w-[40px] h-10 rounded-full font-bold text-sm transition-all border ${currentPage === page
                                        ? 'bg-primary text-black border-primary scale-110 shadow-[0_0_15px_rgba(229,9,20,0.5)]'
                                        : 'bg-transparent text-gray-400 border-white/10 hover:border-white hover:text-white'
                                        }`}
                                >
                                    {page}
                                </button>
                            )}
                        </React.Fragment>
                    ))}
                </div>

                {/* Next Button */}
                <button
                    onClick={handleNext}
                    disabled={isLastPage}
                    className={`flex items-center justify-center w-10 h-10 rounded-full border border-white/10 transition-all ${isLastPage
                        ? 'text-gray-600 bg-transparent cursor-not-allowed'
                        : 'text-white bg-white/5 hover:bg-primary hover:border-primary hover:text-black'
                        }`}
                    title="Siguiente"
                >
                    <span className="material-symbols-outlined text-sm">arrow_forward_ios</span>
                </button>
            </div>
        </div>
    );
};

export default Pagination;
