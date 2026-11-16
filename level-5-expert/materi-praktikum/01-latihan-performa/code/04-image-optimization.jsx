/**
 * TODO: Advanced Image Optimization dengan CDN Transformation
 *
 * Tugas:
 * 1. Implementasi Image CDN URL generator (Cloudinary/Imgix style)
 * 2. Format conversion pipeline (JPEG → WebP → AVIF)
 * 3. Responsive image URL builder
 * 4. Placeholder generation (blurhash, dominant color)
 */

import React, { useState, useEffect } from 'react';

// ============================================================
// IMAGE CDN CONFIGURATION
// ============================================================

const CDN_CONFIG = {
  baseUrl: process.env.VITE_CDN_URL || 'https://cdn.example.com',
  defaultQuality: 80,
  formats: ['avif', 'webp', 'jpg'],
  breakpoints: [320, 640, 768, 1024, 1280, 1536],
};

// ============================================================
// URL BUILDER FUNCTIONS
// ============================================================

/**
 * TODO: Build CDN URL dengan transformation parameters
 *
 * @param {Object} options
 * @param {string} options.src - Original image path/URL
 * @param {number} options.width - Target width (px)
 * @param {number} options.height - Target height (px, optional)
 * @param {string} options.format - Output format: 'auto' | 'avif' | 'webp' | 'jpg'
 * @param {number} options.quality - Quality 1-100 (default: 80)
 * @param {string} options.fit - Fit mode: 'clip' | 'crop' | 'scale' | 'pad'
 * @param {string} optionsgravity - Focus point: 'auto' | 'face' | 'center'
 *
 * @example
 * buildImageUrl({ src: '/uploads/photo.jpg', width: 800, format: 'webp', quality: 80 })
 * // → 'https://cdn.example.com/fetch/w=800,f=webp,q=80/https://origin.com/uploads/photo.jpg'
 *
 * @example (Cloudinary-style)
 * buildImageUrl({ src: '/uploads/photo.jpg', width: 800, height: 600, fit: 'crop' })
 * // → 'https://cdn.example.com/fetch/w=800,h=600,c=fill,f=webp,q=80/https://origin.com/uploads/photo.jpg'
 */
export function buildImageUrl(options) {
  const {
    src,
    width,
    height,
    format = 'auto',
    quality = CDN_CONFIG.defaultQuality,
    fit = 'clip',
  } = options;

  if (!src) return '';

  // TODO: Implementasi URL builder
  // Pattern untuk CDN transformation URL:

  // Pattern 1: Path-based (Cloudflare Images, Imgix)
  // const params = new URLSearchParams();
  // if (width) params.set('w', width.toString());
  // if (height) params.set('h', height.toString());
  // if (format !== 'auto') params.set('f', format);
  // params.set('q', quality.toString());
  // return `${CDN_CONFIG.baseUrl}/${src}?${params.toString()}`;

  // Pattern 2: Fetch-style (Cloudinary, Uploadcare)
  // const transforms = [];
  // if (width) transforms.push(`w_${width}`);
  // if (height) transforms.push(`h_${height}`);
  // transforms.push(`f_${format}`);
  // transforms.push(`q_${quality}`);
  // return `${CDN_CONFIG.baseUrl}/fetch/${transforms.join(',')}/${src}`;

  // Pattern 3: Simple (self-hosted with nginx)
  // const ext = format === 'auto' ? 'jpg' : format;
  // const baseName = src.replace(/\.[^.]+$/, '');
  // return `${baseName}-${width}w.${ext}`;

  // Return placeholder untuk demo
  return src;
}

/**
 * TODO: Generate responsive srcset untuk CDN images
 *
 * @param {Object} options
 * @param {string} options.src - Original image path
 * @param {number[]} options.widths - Array lebar yang tersedia
 * @param {string} options.format - Format output
 *
 * @example
 * generateResponsiveSrcset({
 *   src: '/uploads/hero.jpg',
 *   widths: [400, 800, 1200, 1600],
 *   format: 'webp'
 * })
 * // → '/uploads/hero-400w.webp 400w, /uploads/hero-800w.webp 800w, ...'
 */
export function generateResponsiveSrcset({ src, widths = CDN_CONFIG.breakpoints, format = 'webp' }) {
  // TODO: Implementasi
  // Loop widths, build URL untuk setiap width
  // Return comma-separated string

  return widths
    .map((w) => `${buildImageUrl({ src, width: w, format })} ${w}w`)
    .join(', ');
}

/**
 * TODO: Generate srcset dengan format negotiation
 *
 * Browser kirim Accept header → server pilih format terbaik
 * Atau kita generate untuk semua format dan biarkan browser pilih
 */
export function generateFormatSrcset(src, width) {
  const formats = ['avif', 'webp', 'jpg'];
  const srcset = formats.map((format) => {
    const url = buildImageUrl({ src, width, format });
    return `${url} ${format}`;
  });

  return srcset.join(', ');
}

// ============================================================
// PLACEHOLDER GENERATION
// ============================================================

/**
 * TODO: Extract dominant color dari image (untuk solid placeholder)
 */
export async function extractDominantColor(imageUrl) {
  // TODO: Implementasi
  // Gunakan canvas untuk extract dominant color
  // 1. Load image ke canvas
  // 2. Get image data
  // 3. Sample pixels (tidak perlu semua)
  // 4. Find most common color cluster
  // 5. Return hex color

  // Hint: Gunakan color-thief library atau implementasi manual
  // return '#f0f0f0'; // placeholder
}

/**
 * TODO: Generate blurhash placeholder
 *
 * Blurhash adalah compact representation dari image yang bisa
 * di-render sebagai placeholder sebelum image load
 *
 * Server-side: generate blurhash string dari image
 * Client-side: render blurhash sebagai placeholder
 */
export async function generateBlurHash(imageUrl) {
  // TODO: Implementasi
  // Gunakan blurhash library
  // 1. Load image → canvas
  // 2. resize ke small size (32x32)
  // 3. encode dengan blurhash
  // Return: 'LEHV6nWB2yk8pyo0adR*.7kCMdnj'

  return 'LEHV6nWB2yk8pyo0adR*.7kCMdnj'; // placeholder
}

// ============================================================
// CDN IMAGE COMPONENT
// ============================================================

/**
 * CDNImage — Full-featured image component dengan CDN optimization
 */
export function CDNImage({
  src,
  alt,
  width,
  height,
  sizes,
  formats = ['avif', 'webp'],
  quality,
  fit = 'clip',
  placeholder = 'blur', // 'blur' | 'color' | 'none'
  className,
  style,
  ...props
}) {
  const [loaded, setLoaded] = useState(false);
  const [placeholderColor, setPlaceholderColor] = useState('#f0f0f0');
  const [blurhash, setBlurhash] = useState(null);

  // Generate blurhash on mount (expensive, use sparingly)
  useEffect(() => {
    if (placeholder === 'blur' && src) {
      generateBlurHash(src).then(setBlurhash);
    }
    if (placeholder === 'color' && src) {
      extractDominantColor(src).then(setPlaceholderColor);
    }
  }, [src, placeholder]);

  // Build URLs for each format
  const sourceUrls = formats.map((format) => ({
    format,
    srcSet: generateResponsiveSrcset({ src, format }),
  }));

  // Fallback URL
  const fallbackUrl = buildImageUrl({ src, width: width || 1200, format: 'jpg' });

  return (
    <picture>
      {/* Source elements untuk setiap format */}
      {sourceUrls.map(({ format, srcSet }) => (
        <source
          key={format}
          type={`image/${format}`}
          srcSet={srcSet}
          sizes={sizes}
        />
      ))}

      {/* Fallback img */}
      <img
        src={fallbackUrl}
        alt={alt}
        width={width}
        height={height}
        loading="lazy"
        onLoad={() => setLoaded(true)}
        className={className}
        style={{
          backgroundColor: loaded ? 'transparent' : placeholderColor,
          transition: 'opacity 0.3s ease',
          opacity: loaded ? 1 : 0,
          ...style,
        }}
        {...props}
      />

      {/* Blur placeholder overlay */}
      {placeholder === 'blur' && !loaded && blurhash && (
        <div
          style={{
            position: 'absolute',
            inset: 0,
            backgroundColor: placeholderColor,
          }}
          aria-hidden="true"
        >
          {/* TODO: Render blurhash placeholder */}
          {/* <Blurhash hash={blurhash} width="100%" height="100%" /> */}
        </div>
      )}
    </picture>
  );
}

// ============================================================
// UTILITY: Preload Images
// ============================================================

/**
 * TODO: Preload critical images
 */
export function preloadImage(url, options = {}) {
  return new Promise((resolve, reject) => {
    const img = new Image();
    if (options.crossOrigin) img.crossOrigin = options.crossOrigin;
    img.onload = () => resolve(img);
    img.onerror = reject;
    img.src = url;
  });
}

/**
 * TODO: Preload LCP image
 */
export function preloadLcpImage(src) {
  // TODO: Preload dengan as='image' link tag
  // Atau gunakan fetch + decode
}

export default CDNImage;