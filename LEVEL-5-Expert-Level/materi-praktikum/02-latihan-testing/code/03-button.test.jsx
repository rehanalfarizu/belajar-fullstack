/**
 * TODO: React Testing Library — Button Component Tests
 *
 * Tugas:
 * 1. Setup Jest dan React Testing Library dengan jest-dom
 * 2. Test rendering dengan berbagai props
 * 3. Test user interactions (click, keyboard)
 * 4. Test states: default, hover, focus, loading, disabled
 * 5. Test accessibility (aria attributes, focus management)
 * 6. Test with CartContext integration
 *
 * Setup file: jest.setup.js
 * Run: npm test -- Button.test.jsx
 */

import React from 'react';
// TODO: Import render, screen, fireEvent dari @testing-library/react
// TODO: Import userEvent dari @testing-library/user-event
// TODO: Import expect dari @jest/globals (atau dari @testing-library/jest-dom matchers)

// NOTE: Jika jest config menggunakan transform esophageal,
// kamu bisa import .jsx langsung

// ============================================================
// COMPONENT: AddToCartButton
// ============================================================

/**
 * Sample component yang akan di-test
 * Implementasikan komponen ini sesuai dengan deskripsi soal
 */

export function AddToCartButton({ productId, onAddToCart, disabled = false }) {
  const [added, setAdded] = React.useState(false);
  const [loading, setLoading] = React.useState(false);

  const handleClick = async () => {
    if (disabled || loading) return;

    setLoading(true);
    try {
      // Simulate API call
      await new Promise((resolve) => setTimeout(resolve, 500));
      setAdded(true);
      onAddToCart?.(productId);
    } catch (error) {
      setAdded(false);
    } finally {
      setLoading(false);
    }
  };

  const handleKeyDown = (e) => {
    if (e.key === 'Enter' || e.key === ' ') {
      e.preventDefault();
      handleClick();
    }
  };

  if (loading) {
    return (
      <button
        data-testid="add-to-cart-button"
        disabled
        aria-busy="true"
        aria-label="Adding to cart..."
      >
        Adding...
      </button>
    );
  }

  if (added) {
    return (
      <button
        data-testid="add-to-cart-button"
        onClick={() => {
          setAdded(false);
        }}
        aria-label="Added to cart"
        style={{ backgroundColor: 'green', color: 'white' }}
      >
        Added!
      </button>
    );
  }

  return (
    <button
      data-testid="add-to-cart-button"
      onClick={handleClick}
      onKeyDown={handleKeyDown}
      disabled={disabled}
      aria-label={`Add product ${productId} to cart`}
    >
      Add to Cart
    </button>
  );
}

// ============================================================
// CART CONTEXT (untuk integration test)
// ============================================================

export const CartContext = React.createContext(null);

export function CartProvider({ children }) {
  const [cartItems, setCartItems] = React.useState([]);

  const addToCart = React.useCallback((productId) => {
    setCartItems((prev) => {
      const existing = prev.find((item) => item.productId === productId);
      if (existing) {
        return prev.map((item) =>
          item.productId === productId
            ? { ...item, quantity: item.quantity + 1 }
            : item
        );
      }
      return [...prev, { productId, quantity: 1 }];
    });
  }, []);

  const cartCount = cartItems.reduce((sum, item) => sum + item.quantity, 0);

  return (
    <CartContext.Provider value={{ cartItems, addToCart, cartCount }}>
      {children}
    </CartContext.Provider>
  );
}

export function useCart() {
  return React.useContext(CartContext);
}

// ============================================================
// TEST HELPERS
// ============================================================

/**
 * TODO: Helper function untuk render dengan CartProvider
 */
function renderWithCart(ui, options = {}) {
  // TODO: Implementasikan wrapper dengan CartProvider
  // Hint: Gunakan render dari @testing-library/react
  // dengan wrapper option
}

// ============================================================
// TESTS
// ============================================================

describe('AddToCartButton — Rendering', () => {
  it('renders without crashing', () => {
    // TODO: Implementasikan
  });

  it('displays "Add to Cart" text by default', () => {
    // TODO: Implementasikan
  });

  it('renders with correct data-testid', () => {
    // TODO: Implementasikan
    // Hint: getByTestId
  });

  it('has correct aria-label', () => {
    // TODO: Implementasikan
    // getByRole('button') dan check aria-label
  });
});

describe('AddToCartButton — States', () => {
  it('shows "Adding..." when loading', async () => {
    // TODO: Implementasikan
    // Hint: trigger click, langsung check text (sebelum promise resolve)
  });

  it('button is disabled during loading', async () => {
    // TODO: Implementasikan
  });

  it('shows "Added!" after successful click', async () => {
    // TODO: Implementasikan
    // Hint: use userEvent.click(), tunggu findByText('Added!')
  });

  it('reverts to "Add to Cart" on second click (toggle)', async () => {
    // TODO: Implementasikan
  });
});

describe('AddToCartButton — Interactions', () => {
  it('calls onAddToCart with productId when clicked', async () => {
    // TODO: Implementasikan
    // Hint: mock onAddToCart, verify calledWith
  });

  it('can be triggered with Enter key', async () => {
    // TODO: Implementasikan
  });

  it('can be triggered with Space key', async () => {
    // TODO: Implementasikan
    // Hint: Space di button punya default behavior scroll,
    // harus preventDefault
  });
});

describe('AddToCartButton — Accessibility', () => {
  it('button has accessible name from aria-label', () => {
    // TODO: Implementasikan
    // Hint: getByRole('button', { name: /.../ })
  });

  it('button is focusable', () => {
    // TODO: Implementasikan
    // Hint: tab(), expect toHaveFocus()
  });

  it('loading state announces to screen reader', () => {
    // TODO: Implementasikan
    // Hint: check aria-busy attribute
  });
});

describe('AddToCartButton — Error Handling', () => {
  it('reverts on error', async () => {
    // TODO: Implementasikan
    // Hint: Mock fetch untuk throw error
    // Assert: button kembali ke "Add to Cart"
  });
});

describe('AddToCartButton — Cart Integration', () => {
  it('updates cart count when added', async () => {
    // TODO: Implementasikan
    // 1. Render dengan CartProvider (wrapper)
    // 2. Click button
    // 3. Check cart badge (dari context)
  });

  it('decrements cart count when toggled off', async () => {
    // TODO: Implementasikan
  });
});

// ============================================================
// EDGE CASES
// ============================================================

describe('AddToCartButton — Edge Cases', () => {
  it('handles double-click prevention', async () => {
    // TODO: Implementasikan
    // Rapid clicks tidak boleh cause multiple API calls
  });

  it('handles disabled prop', () => {
    // TODO: Implementasikan
    // Disabled button tidak merespons click
  });

  it('handles missing productId gracefully', () => {
    // TODO: Implementasikan
  });
});

export {};