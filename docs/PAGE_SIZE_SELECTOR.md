# 📊 Selector de Tamaño de Página - Documentación Técnica

## 🎯 Descripción General

Se ha implementado un **Selector de Tamaño de Página** (Page Size Selector) profesional que permite a los usuarios controlar cuántas películas se muestran por página en SexFlix.

---

## 🏗️ Arquitectura de la Solución

### 1. **Componente PageSizeSelector** 
📁 `src/components/PageSizeSelector.tsx`

Un componente reutilizable y accesible que renderiza un selector estilizado.

**Props:**
- `currentSize: number` - Tamaño actual seleccionado
- `onSizeChange: (newSize: number) => void` - Callback al cambiar tamaño
- `options?: number[]` - Opciones disponibles (default: [5, 10, 20, 50])
- `className?: string` - Clases CSS adicionales

**Características:**
- ✅ Diseño moderno con tema oscuro
- ✅ Efectos hover y focus con anillo rojo
- ✅ Accesibilidad con ARIA labels
- ✅ Versión alternativa con botones (comentada)

---

## 🔄 Lógica de Sincronización

### ⚠️ **RESETEO CRÍTICO DE PÁGINA**

Cuando el usuario cambia el tamaño de página (`limit`), **SIEMPRE** debemos resetear `currentPage` a 1.

#### ¿Por qué es necesario?

**Problema sin reseteo:**
```
Estado inicial: page=5, limit=10
→ offset (skip) = (5-1) * 10 = 40 ✅

Usuario cambia a: limit=50
→ offset (skip) = (5-1) * 50 = 200 ❌ 
   (Puede exceder el total de resultados)
```

**Solución con reseteo:**
```
Estado inicial: page=5, limit=10
→ offset = 40 ✅

Usuario cambia a: limit=50
→ page se resetea a 1
→ offset = (1-1) * 50 = 0 ✅
```

### 📐 Fórmula de Cálculo

```typescript
// Cálculo del offset (skip) para APIs que lo soporten
const skip = (page - 1) * limit;

// Ejemplo con DummyJSON API:
const url = `https://dummyjson.com/posts?limit=${limit}&skip=${skip}`;
```

---

## 💻 Implementación en el Código

### Handler de Cambio de Tamaño

```typescript
const handleLimitChange = (newLimit: number) => {
  setLimit(newLimit);
  setPage(1); // ← RESETEO CRÍTICO
  window.scrollTo(0, 0); // Scroll al inicio
};
```

### Integración en useEffect

Si estuvieras usando una API con soporte nativo de `limit` (como DummyJSON), el `useEffect` sería:

```typescript
useEffect(() => {
  const skip = (page - 1) * limit;
  
  fetch(`https://api.example.com/movies?limit=${limit}&skip=${skip}`)
    .then(res => res.json())
    .then(data => setMovies(data.results));
    
}, [page, limit]); // ← Ambas dependencias
```

**Flujo de ejecución:**
1. Usuario cambia `limit` de 10 a 20
2. `handleLimitChange` ejecuta:
   - `setLimit(20)` → Actualiza limit
   - `setPage(1)` → Resetea página
3. `useEffect` se dispara porque `limit` cambió
4. Nueva petición: `?limit=20&skip=0`

---

## 🎨 Ubicación en la UI

### Componente Home
```tsx
<div className="flex justify-end items-center pt-4">
  <PageSizeSelector 
    currentSize={limit}
    onSizeChange={handleLimitChange}
    options={[5, 10, 20, 50]}
  />
</div>
```

**Posición:** Arriba a la derecha, antes del grid de películas

### Componente Search
Misma implementación, ubicado en la parte superior del área de resultados.

---

## 📊 Adaptación a TMDB API

### ⚠️ Limitación de TMDB

TMDB API **NO soporta** un parámetro `limit` personalizado. Siempre devuelve **20 resultados por página**.

### ✅ Solución Implementada

Simulamos diferentes tamaños de página mediante **filtrado en el cliente**:

```typescript
const allMovies = data?.results || []; // 20 películas de TMDB
const validMovies = allMovies.slice(0, limit); // Filtramos según limit
```

**Ejemplo:**
- TMDB devuelve: 20 películas
- Usuario selecciona limit=5
- Mostramos: `allMovies.slice(0, 5)` → 5 películas

### 🔮 Para APIs con Soporte Nativo de Limit

Si migras a una API como DummyJSON, solo necesitas modificar el servicio:

```typescript
// movieService.ts
getPopularMovies: async (page = 1, limit = 10, language = 'en-US') => {
  const skip = (page - 1) * limit;
  return fetchFromAPI(`/posts?limit=${limit}&skip=${skip}`, {}, language);
}

// useMovies.ts
export const usePopularMovies = (page: number = 1, limit: number = 10) => {
  return useQuery({
    queryKey: ['movies', 'popular', page, limit],
    queryFn: () => movieService.getPopularMovies(page, limit),
    // ...
  });
};
```

---

## 📱 Información de Resultados

Se muestra un contador informativo:

```tsx
<div className="text-center text-sm text-gray-400">
  Showing {validMovies.length} of {allMovies.length} movies on this page
</div>
```

**Ejemplos de salida:**
- `Showing 5 of 20 movies on this page` (limit=5)
- `Showing 10 of 20 movies on this page` (limit=10)
- `Showing 20 of 20 movies on this page` (limit=20)

---

## 🎯 Casos de Uso

### Caso 1: Usuario en página 1, cambia limit
```
Estado: page=1, limit=10
Usuario selecciona: limit=20
Resultado: page=1, limit=20 (sin cambio de página)
```

### Caso 2: Usuario en página 5, cambia limit
```
Estado: page=5, limit=10 (mostrando items 41-50)
Usuario selecciona: limit=50
Resultado: page=1, limit=50 (vuelve al inicio)
Razón: Evitar offset inválido
```

### Caso 3: Usuario navega entre páginas
```
Estado: page=1, limit=20
Usuario hace clic en página 3
Resultado: page=3, limit=20 (limit se mantiene)
```

---

## 🚀 Mejoras Futuras

1. **Persistencia en localStorage**
   ```typescript
   const [limit, setLimit] = useState(() => {
     return Number(localStorage.getItem('pageSize')) || 10;
   });
   
   useEffect(() => {
     localStorage.setItem('pageSize', limit.toString());
   }, [limit]);
   ```

2. **Versión con botones** (ya incluida pero comentada)
   - Descomenta la sección de botones en `PageSizeSelector.tsx`
   - Comenta el `<select>` para usar botones en su lugar

3. **Animaciones de transición**
   ```typescript
   import { motion, AnimatePresence } from 'framer-motion';
   
   <AnimatePresence mode="wait">
     <motion.div
       key={limit}
       initial={{ opacity: 0, y: 20 }}
       animate={{ opacity: 1, y: 0 }}
       exit={{ opacity: 0, y: -20 }}
     >
       <MovieGrid movies={validMovies} />
     </motion.div>
   </AnimatePresence>
   ```

---

## ✅ Checklist de Implementación

- [x] Componente `PageSizeSelector` creado
- [x] Estado `limit` con valor inicial de 10
- [x] Opciones [5, 10, 20, 50] disponibles
- [x] Reseteo automático de `page` al cambiar `limit`
- [x] Cálculo correcto de `skip` documentado
- [x] Integración en componente `Home`
- [x] Integración en componente `Search`
- [x] Documentación completa con comentarios
- [x] Contador de resultados mostrados
- [x] Diseño accesible y moderno

---

## 📚 Referencias

- **TMDB API Docs**: https://developers.themoviedb.org/3
- **DummyJSON API**: https://dummyjson.com/docs
- **React Query Pagination**: https://tanstack.com/query/latest/docs/react/guides/paginated-queries

---

**Autor:** Desarrollador Frontend Senior  
**Fecha:** 2026-02-07  
**Versión:** 1.0.0
