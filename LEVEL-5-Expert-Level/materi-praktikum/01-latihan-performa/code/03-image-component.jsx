/**
 * TODO: Optimized Image Component
 *
 * Tugas:
 * 1. Implementasikan responsive image dengan <picture> dan srcset
 * 2. Lazy loading dengan Intersection Observer (fallback untuk native)
 * 3. Blur-up placeholder technique (LQIP)
 * 4. Priority loading untuk LCP images
 * 5. Error fallback dengan graceful degradation
 */

import React, { useState, useEffect, useRef, useCallback } from 'react';

// ============================================================
// CONSTANTS
// ============================================================

// Image breakpoints (sesuaikan dengan desain)
const BREAKPOINTS = {
  sm: 640,
  md: 768,
  lg: 1024,
  xl: 1280,
  '2xl': 1536,
};

// Quality settings per format
const IMAGE_QUALITY = {
  avif: 60,   // AVIF lebih efficient, bisa lower quality
  webp: 75,   // WebP good balance
  jpeg: 85,   // JPEG needs slightly higher quality
};

// ============================================================
// UTILITY FUNCTIONS
// ============================================================

/**
 * TODO: Generate srcset untuk responsive images
 *
 * @param {string} basePath - Path dasar gambar (tanpa suffix)
 * @param {number[]} widths - Array lebar yang dibutuhkan
 * @param {string} format - Format output (webp, avif, jpg)
 *
 * @example
 * generateSrcset('/images/hero', [400, 800, 1200, 1600], 'webp')
 * // → '/images/hero-400.webp 400w, /images/hero-800.webp 800w, ...'
 */
function generateSrcset(basePath, widths, format = 'webp') {
  // TODO: Implementasikan
  // Hint: Loop widths, generate URL untuk setiap width
  // Pattern: ${basePath}-${width}.${format}
  // Return: comma-separated string
  return '';
}

/**
 * TODO: Generate sizes attribute
 *
 * @param {Object} options
 * @param {Object} options.default - Default width di viewport default
 * @param {Object} options.breakpoints - Width per breakpoint
 *
 * @example
 * generateSizes({
 *   default: '100vw',
 *   md: '50vw',
 *   lg: '33vw'
 * })
 * // → '(max-width: 768px) 100vw, (max-width: 1024px) 50vw, 33vw'
 */
function generateSizes({ default: defaultSize = '100vw', breakpoints = {} }) {
  // TODO: Implementasikan
  // Hint: Convert breakpoints object ke media query string
  // Prioritas: kecil ke besar (mobile first)
  return defaultSize;
}

// ============================================================
// MAIN IMAGE COMPONENT
// ============================================================

/**
 * OptimizedImage — Image component dengan advanced optimization
 *
 * Features:
 * - AVIF/WebP dengan JPEG fallback
 * - Responsive srcset
 * - Lazy loading (native + Intersection Observer fallback)
 * - Blur-up placeholder
 * - Priority loading untuk LCP
 * - Error boundary
 */
export function OptimizedImage({
  // Image sources
  src,
  alt,
  srcAvif,    // AVIF version
  srcWebp,    // WebP version
  placeholderSrc, // LQIP (low quality image placeholder)

  // Responsive
  sizes,      // sizes attribute
  widths = [400, 800, 1200, 1600, 2000], // Available widths

  // Loading behavior
  loading = 'lazy',  // 'lazy' | 'eager'
  fetchPriority,      // 'high' | 'low' | 'auto'

  // Styling
  className,
  style,
  aspectRatio, // CSS aspect-ratio

  // Fallback
  fallbackSrc, // Image fallback saat error

  // Callbacks
  onLoad,
  onError,
}) {
  const [loaded, setLoaded] = useState(false);
  const [error, setError] = useState(false);
  const [inView, setInView] = useState(loading === 'eager');
  const imgRef = useRef(null);

  // ============================================================
  // INTERSECTION OBSERVER (Fallback untuk native lazy loading)
  // ============================================================

  useEffect(() => {
    if (loading !== 'lazy' || inView) return;

    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setInView(true);
          observer.disconnect();
        }
      },
      {
        rootMargin: '100px', // Start loading 100px before visible
        threshold: 0.01,
      }
    );

    if (imgRef.current) observer.observe(imgRef.current);

    return () => observer.disconnect();
  }, [loading, inView]);

  // ============================================================
  // LOAD HANDLERS
  // ============================================================

  const handleLoad = useCallback(() => {
    setLoaded(true);
    onLoad?.();
  }, [onLoad]);

  const handleError = useCallback(() => {
    setError(true);
    onError?.();
  }, [onError]);

  // ============================================================
  // RENDER LOGIC
  // ============================================================

  // Generate base path dari src (strip extension)
  const getBasePath = (url) => {
    // TODO: Extract base path dari URL
    // Example: '/images/hero.jpg' → '/images/hero'
    return url?.replace(/\.[^.]+$/, '') || '';
  };

  const basePath = getBasePath(src);
  const shouldLoad = inView || loading === 'eager';

  // Build source elements
  const sources = [];

  // TODO: Tambahkan <source> untuk AVIF (browser support terbatas)
  // if (srcAvif || basePath) {
  //   const avifSrc = srcAvif || `${basePath}.avif`;
  //   sources.push(
  //     <source
  //       key="avif"
  //       srcSet={generateSrcset(basePath, widths, 'avif')}
  //       type="image/avif"
  //     />
  //   );
  // }

  // TODO: Tambahkan <source> untuk WebP
  // if (srcWebp || basePath) { ... }

  // Final img src
  const finalSrc = error && fallbackSrc ? fallbackSrc : src;

  return (
    <div
      ref={imgRef}
      className={className}
      style={{
        position: 'relative',
        overflow: 'hidden',
        backgroundColor: '#f0f0f0',
        ...style,
      }}
    >
      {/* Blur placeholder — shown sebelum load */}
      {placeholderSrc && !loaded && (
        <img
          src={placeholderSrc}
          alt=""
          aria-hidden="true"
          style={{
            position: 'absolute',
            inset: 0,
            width: '100%',
            height: '100%',
            objectFit: 'cover',
            filter: 'blur(20px)',
            transform: 'scale(1.1)', // Prevent blur edge artifacts
          }}
        />
      )}

      {/* Actual image */}
      {shouldLoad && !error && (
        <picture>
          {sources}

          <img
            src={finalSrc}
            alt={alt}
            srcSet={basePath ? generateSrcset(basePath, widths, 'jpg') : undefined}
            sizes={sizes || '100vw'}
            loading={loading}
            fetchpriority={fetchPriority}
            decoding="async"
            onLoad={handleLoad}
            onError={handleError}
            style={{
              width: '100%',
              height: '100%',
              objectFit: 'cover',
              opacity: loaded ? 1 : 0,
              transition: 'opacity 0.3s ease',
            }}
          />
        </picture>
      )}

      {/* Error state */}
      {error && (
        <div
          style={{
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            width: '100%',
            height: '100%',
            backgroundColor: '#f0f0f0',
            color: '#999',
            fontSize: '14px',
          }}
          role="alert"
        >
          Gambar gagal dimuat
        </div>
      )}
    </div>
  );
}

// ============================================================
// SPECIALIZED COMPONENTS
// ============================================================

/**
 * LcpImage — Image yang di-preload untuk LCP optimization
 */
export function LcpImage({ src, alt, ...props }) {
  // TODO: Preload hint untuk parent component
  useEffect(() => {
    const link = document.createElement('link');
    link.rel = 'preload';
    link.as = 'image';
    link.href = src;
    // Opsi: tambahkan fetchPriority="high" support
    document.head.appendChild(link);

    return () => {
      document.head.removeChild(link);
    };
  }, [src]);

  return (
    <OptimizedImage
      src={src}
      alt={alt}
      loading="eager"
      fetchPriority="high"
      {...props}
    />
  );
}

/**
 * AvatarImage — Optimized untuk avatar (square, small)
 */
export function AvatarImage({ src, alt, size = 48, ...props }) {
  return (
    <OptimizedImage
      src={src}
      alt={alt}
      widths={[48, 96, 192]}
      sizes={`${size}px`}
      style={{
        width: size,
        height: size,
        borderRadius: '50%',
        aspectRatio: '1',
        ...props.style,
      }}
      {...props}
    />
  );
}

export default OptimizedImage;