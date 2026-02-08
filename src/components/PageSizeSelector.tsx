import React from 'react';

interface PageSizeSelectorProps {
  /** Tamaño de página actual seleccionado */
  currentSize: number;
  /** Callback que se ejecuta cuando el usuario cambia el tamaño de página */
  onSizeChange: (newSize: number) => void;
  /** Opciones disponibles de tamaño de página (default: [5, 10, 20, 50]) */
  options?: number[];
  /** Clase CSS adicional para personalización */
  className?: string;
}

/**
 * Componente PageSizeSelector
 * 
 * Permite al usuario seleccionar cuántos elementos mostrar por página.
 * Diseñado con un estilo moderno que se integra con el tema de SexFlix.
 * 
 * @example
 * ```tsx
 * <PageSizeSelector 
 *   currentSize={limit} 
 *   onSizeChange={handleLimitChange}
 * />
 * ```
 */
const PageSizeSelector: React.FC<PageSizeSelectorProps> = ({
  currentSize,
  onSizeChange,
  options = [5, 10, 20, 50],
  className = '',
}) => {
  return (
    <div className={`flex items-center gap-3 ${className}`}>
      <label 
        htmlFor="page-size-selector" 
        className="text-sm text-gray-400 font-medium"
      >
        Items per page:
      </label>
      
      {/* Versión con Select estilizado */}
      <select
        id="page-size-selector"
        value={currentSize}
        onChange={(e) => onSizeChange(Number(e.target.value))}
        className="
          bg-zinc-900/80 
          border border-zinc-700 
          text-white 
          text-sm 
          rounded-lg 
          px-4 
          py-2 
          focus:outline-none 
          focus:ring-2 
          focus:ring-red-500 
          focus:border-transparent
          hover:border-zinc-600
          transition-all
          cursor-pointer
          backdrop-blur-sm
        "
        aria-label="Select page size"
      >
        {options.map((size) => (
          <option key={size} value={size} className="bg-zinc-900">
            {size}
          </option>
        ))}
      </select>

      {/* Versión alternativa con botones (comentada, puedes descomentar si prefieres este estilo) */}
      {/* 
      <div className="flex gap-2">
        {options.map((size) => (
          <button
            key={size}
            onClick={() => onSizeChange(size)}
            className={`
              px-4 py-2 rounded-lg text-sm font-medium transition-all
              ${currentSize === size 
                ? 'bg-red-600 text-white shadow-lg shadow-red-500/30' 
                : 'bg-zinc-800 text-gray-400 hover:bg-zinc-700 hover:text-white'
              }
            `}
            aria-pressed={currentSize === size}
            aria-label={`Show ${size} items per page`}
          >
            {size}
          </button>
        ))}
      </div>
      */}
    </div>
  );
};

export default PageSizeSelector;
