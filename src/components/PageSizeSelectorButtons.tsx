import React from 'react';

interface PageSizeSelectorButtonsProps {
    currentSize: number;
    onSizeChange: (newSize: number) => void;
    options?: number[];
    className?: string;
}

/**
 * PageSizeSelector - Versión con Botones
 * 
 * Alternativa visual al selector dropdown, usando botones individuales
 * para cada opción de tamaño de página. Ideal para interfaces más visuales.
 * 
 * @example
 * ```tsx
 * <PageSizeSelectorButtons 
 *   currentSize={limit} 
 *   onSizeChange={handleLimitChange}
 * />
 * ```
 */
const PageSizeSelectorButtons: React.FC<PageSizeSelectorButtonsProps> = ({
    currentSize,
    onSizeChange,
    options = [5, 10, 20, 50],
    className = '',
}) => {
    return (
        <div className={`flex items-center gap-3 ${className}`}>
            <label className="text-sm text-gray-400 font-medium">
                Items per page:
            </label>

            <div className="flex gap-2">
                {options.map((size) => (
                    <button
                        key={size}
                        onClick={() => onSizeChange(size)}
                        className={`
              px-4 py-2 rounded-lg text-sm font-medium transition-all
              ${currentSize === size
                                ? 'bg-red-600 text-white shadow-lg shadow-red-500/30 scale-105'
                                : 'bg-zinc-800 text-gray-400 hover:bg-zinc-700 hover:text-white border border-zinc-700'
                            }
            `}
                        aria-pressed={currentSize === size}
                        aria-label={`Show ${size} items per page`}
                    >
                        {size}
                    </button>
                ))}
            </div>
        </div>
    );
};

export default PageSizeSelectorButtons;
