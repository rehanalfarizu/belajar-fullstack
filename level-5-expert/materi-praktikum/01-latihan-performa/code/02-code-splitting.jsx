/**
 * TODO: Code Splitting Implementation
 *
 * Tugas:
 * 1. Implementasikan React.lazy() untuk component yang heavy
 * 2. Tambahkan <Suspense> boundary dengan fallback yang appropriate
 * 3. Preload critical routes dengan link rel="modulepreload"
 * 4. Handle error dengan React Error Boundary
 *
 * Studi Kasus:
 * - HeavyChart → hanya load saat user scroll ke section chart
 * - AdminPanel → hanya load untuk role admin
 * - ExportModal (PDF/Excel) → hanya load saat user klik export
 */

import React, { Suspense, lazy, useState, useEffect } from 'react';

// ============================================================
// APPROACH 1: Basic Lazy Loading
// ============================================================

// TODO: Implementasikan lazy loading untuk komponen berikut
// Ganti import statis dengan lazy imports

// HeavyChart — komponen charting yang berat (recharts, chart.js, dll)
// HeavyTable — Data table dengan pagination dan sorting
// RichTextEditor — WYSIWYG editor (Quill, Draft.js, dll)

// Hint: Gunakan React.lazy() dengan dynamic import
// const HeavyChart = lazy(() => import('./components/HeavyChart'));
// const HeavyTable = lazy(() => import('./components/HeavyTable'));

// ============================================================
// APPROACH 2: Route-Based Splitting
// ============================================================

/**
 * Contoh: Konfigurasi React Router dengan lazy loading per route
 *
 * Setiap Route menjadi chunk terpisah saat dibuild
 */

// import { createBrowserRouter, RouterProvider } from 'react-router-dom';
//
// const Dashboard = lazy(() => import('./pages/Dashboard'));
// const Settings = lazy(() => import('./pages/Settings'));
// const Profile = lazy(() => import('./pages/Profile'));
// const Admin = lazy(() => import('./pages/Admin'));
//
// const router = createBrowserRouter([
//   {
//     path: '/',
//     element: <Suspense fallback={<PageLoader />}><Dashboard /></Suspense>,
//   },
//   {
//     path: '/settings',
//     element: <Suspense fallback={<PageLoader />}><Settings /></Suspense>,
//   },
//   {
//     path: '/admin',
//     element: <Suspense fallback={<PageLoader />}><Admin /></Suspense>,
//   },
//   // ... routes lain
// ]);

export function RouteSplitExample() {
  const [showAdvanced, setShowAdvanced] = useState(false);

  // TODO: Lazy load komponen berikut saat needed
  // const AdvancedAnalytics = lazy(() => import('./AdvancedAnalytics'));

  return (
    <div>
      <h1>Dashboard</h1>
      {/* Route-level lazy components sudah di-setup di router */}
    </div>
  );
}

// ============================================================
// APPROACH 3: Intersection Observer (Visibility-based)
// ============================================================

/**
 * Load komponen hanya saat visible di viewport
 * Berguna untuk: infinite scroll, tab-based content, lazy images
 */

export function LazyOnVisible({ importFn, fallback, children, rootMargin = '100px' }) {
  const [Component, setComponent] = useState(null);

  useEffect(() => {
    let observer;
    let mounted = true;

    const load = async () => {
      const mod = await importFn();
      if (mounted) setComponent(() => mod.default);
    };

    // Gunakan IntersectionObserver untuk trigger load
    // TODO: Implementasikan intersection observer
    // Hint:
    // - Buat ref untuk element
    // - Observer trigger load saat element masuk viewport
    // - Cleanup observer saat unmount

    return () => {
      mounted = false;
      observer?.disconnect();
    };
  }, [importFn]);

  if (Component) return children(Component);
  return fallback;
}

// ============================================================
// APPROACH 4: Preloading (Trigger before needed)
// ============================================================

export function usePreload(chunkName) {
  // TODO: Preload chunk sebelum user navigate
  // Hint: Gunakan React Router useNavigate + prefetch
  // Atau preload saat hover di navigation links

  const preload = () => {
    // Trigger preload untuk route
    // React.lazy internally preload saat component pertama dirender
  };

  return { preload };
}

// ============================================================
// APPROACH 5: Error Boundary for Lazy Components
// ============================================================

export class LazyErrorBoundary extends React.Component {
  constructor(props) {
    super(props);
    this.state = { hasError: false, error: null };
  }

  static getDerivedStateFromError(error) {
    return { hasError: true, error };
  }

  componentDidCatch(error, errorInfo) {
    console.error('Lazy load error:', error, errorInfo);
  }

  render() {
    if (this.state.hasError) {
      return (
        <div role="alert">
          <h2>Gagal memuat komponen</h2>
          <p>{this.state.error?.message}</p>
          <button onClick={() => this.setState({ hasError: false })}>
            Coba lagi
          </button>
        </div>
      );
    }
    return this.props.children;
  }
}

// ============================================================
// APPROACH 6: Skeleton Fallback Components
// ============================================================

export function Skeleton({ width, height, variant = 'text' }) {
  const style = {
    width: width || '100%',
    height: height || (variant === 'text' ? '1em' : '200px'),
    background: 'linear-gradient(90deg, #f0f0f0 25%, #e0e0e0 50%, #f0f0f0 75%)',
    backgroundSize: '200% 100%',
    animation: 'shimmer 1.5s infinite',
    borderRadius: variant === 'circle' ? '50%' : '4px',
  };

  return <div style={style} />;
}

// ============================================================
// DEMO: Complete Lazy Loading Setup
// ============================================================

export function LazyDemo() {
  return (
    <LazyErrorBoundary>
      <Suspense fallback={<Skeleton height="300px" />}>
        {/* TODO: Ganti dengan komponen actual */}
        {/* <HeavyChart data={chartData} /> */}
        <div>Loading chart...</div>
      </Suspense>
    </LazyErrorBoundary>
  );
}