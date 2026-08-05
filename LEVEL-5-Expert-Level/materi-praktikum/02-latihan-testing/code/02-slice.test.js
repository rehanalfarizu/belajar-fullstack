/**
 * ============================================================
 * SOAL 02 — Integration Testing: Redux Slice
 * ============================================================
 * Install dependencies:
 *   npm install --save-dev jest @testing-library/jest-dom
 *   npm install @reduxjs/toolkit
 *
 * Run:
 *   npm test -- --testPathPattern="slice"
 * ============================================================
 * HASIL BELAJAR:
 * - Test reducer actions (synchronous state changes)
 * - Test selectors (derived state computation)
 * - Test async thunks dengan mocked API
 * - Integration flow: add → update → remove
 * ============================================================
 */

import { configureStore } from '@reduxjs/toolkit';

// ============================================================
// SAMPLE SLICE: Product Cart Slice
// Acts as the implementation reference + the slice you test.
// In the real exam, this slice would be in a separate file
// (e.g., src/store/cartSlice.js).
// ============================================================

const initialState = {
  items: [],      // Array<{ id, name, price, quantity }>
  status: 'idle', // 'idle' | 'loading' | 'succeeded' | 'failed'
  error: null,
  selectedId: null,
};

// Pure reducer function (no side effects)
function cartReducer(state = initialState, action) {
  switch (action.type) {
    case 'cart/addItem': {
      const { id, name, price } = action.payload;
      const existing = state.items.find(item => item.id === id);
      if (existing) {
        return {
          ...state,
          items: state.items.map(item =>
            item.id === id ? { ...item, quantity: item.quantity + 1 } : item
          ),
        };
      }
      return {
        ...state,
        items: [...state.items, { id, name, price, quantity: 1 }],
      };
    }

    case 'cart/removeItem':
      return {
        ...state,
        items: state.items.filter(item => item.id !== action.payload),
      };

    case 'cart/updateItem':
      return {
        ...state,
        items: state.items.map(item =>
          item.id === action.payload.id
            ? { ...item, ...action.payload }
            : item
        ),
      };

    case 'cart/clearAll':
      return { ...state, items: [] };

    case 'cart/setStatus':
      return { ...state, status: action.payload };

    case 'cart/setError':
      return { ...state, error: action.payload, status: 'failed' };

    case 'cart/selectItem':
      return { ...state, selectedId: action.payload };

    default:
      return state;
  }
}

// ============================================================
// SELECTORS
// ============================================================

const selectCartItems      = state => state.cart.items;
const selectCartStatus     = state => state.cart.status;
const selectCartError      = state => state.cart.error;
const selectSelectedId     = state => state.cart.selectedId;
const selectSelectedItem   = state => {
  const { items, selectedId } = state.cart;
  return items.find(item => item.id === selectedId) ?? null;
};
const selectCartTotal      = state =>
  state.cart.items.reduce((sum, item) => sum + item.price * item.quantity, 0);
const selectItemCount      = state =>
  state.cart.items.reduce((sum, item) => sum + item.quantity, 0);
const selectIsEmpty        = state => state.cart.items.length === 0;

// ============================================================
// ASYNC THUNK: fetchCartItems
// Simulates an API call. We mock globalThis.fetch to control behavior.
// ============================================================

async function fetchCartItemsThunk() {
  return async (dispatch, getState) => {
    dispatch({ type: 'cart/setStatus', payload: 'loading' });
    dispatch({ type: 'cart/setError', payload: null });

    try {
      // In real code: const res = await fetch('/api/cart');
      // We mock globalThis.fetch instead.
      const response = await globalThis.fetch('/api/cart');
      if (!response.ok) throw new Error(`HTTP ${response.status}`);
      const data = await response.json();

      dispatch({ type: 'cart/setStatus', payload: 'succeeded' });
      // Normally you'd dispatch cart/addItem for each item
      return data;
    } catch (err) {
      dispatch({ type: 'cart/setError', payload: err.message });
      throw err;
    }
  };
}

// ============================================================
// TEST STORE SETUP
// ============================================================

function createTestStore(preloadedState = {}) {
  return configureStore({
    reducer: { cart: cartReducer },
    preloadedState,
  });
}

// ============================================================
// HELPER: waitFor — utility to wait for async thunk to settle
// ============================================================

async function waitForStore(store) {
  // After dispatching a thunk, store updates asynchronously.
  // We use a small delay to let the promise chain settle.
  await new Promise(resolve => setTimeout(resolve, 0));
}

// ============================================================
// TESTS: Reducers
// ============================================================

describe('cartReducer — addItem', () => {
  let store;

  beforeEach(() => {
    store = createTestStore();
  });

  it('adds a new item to an empty cart', () => {
    const payload = { id: 'p-1', name: 'Baju Kemeja', price: 150000 };
    store.dispatch({ type: 'cart/addItem', payload });
    expect(selectCartItems(store.getState())).toHaveLength(1);
    expect(selectCartItems(store.getState())[0]).toMatchObject({
      id: 'p-1',
      name: 'Baju Kemeja',
      price: 150000,
      quantity: 1,
    });
  });

  it('increments quantity if item already exists', () => {
    const payload = { id: 'p-1', name: 'Baju Kemeja', price: 150000 };
    store.dispatch({ type: 'cart/addItem', payload });
    store.dispatch({ type: 'cart/addItem', payload });
    store.dispatch({ type: 'cart/addItem', payload });

    expect(selectCartItems(store.getState())).toHaveLength(1);
    expect(selectCartItems(store.getState())[0].quantity).toBe(3);
  });

  it('adds different items without interfering', () => {
    store.dispatch({ type: 'cart/addItem', payload: { id: 'p-1', name: 'A', price: 100 } });
    store.dispatch({ type: 'cart/addItem', payload: { id: 'p-2', name: 'B', price: 200 } });
    expect(selectCartItems(store.getState())).toHaveLength(2);
  });
});

describe('cartReducer — removeItem', () => {
  it('removes an item by id', () => {
    const store = createTestStore({
      cart: {
        ...initialState,
        items: [
          { id: 'p-1', name: 'A', price: 100, quantity: 1 },
          { id: 'p-2', name: 'B', price: 200, quantity: 1 },
        ],
      },
    });
    store.dispatch({ type: 'cart/removeItem', payload: 'p-1' });
    const items = selectCartItems(store.getState());
    expect(items).toHaveLength(1);
    expect(items[0].id).toBe('p-2');
  });

  it('does nothing when removing a non-existent id', () => {
    const store = createTestStore({
      cart: {
        ...initialState,
        items: [{ id: 'p-1', name: 'A', price: 100, quantity: 1 }],
      },
    });
    store.dispatch({ type: 'cart/removeItem', payload: 'nonexistent' });
    expect(selectCartItems(store.getState())).toHaveLength(1);
  });
});

describe('cartReducer — updateItem', () => {
  it('updates item properties', () => {
    const store = createTestStore({
      cart: {
        ...initialState,
        items: [{ id: 'p-1', name: 'A', price: 100, quantity: 1 }],
      },
    });
    store.dispatch({ type: 'cart/updateItem', payload: { id: 'p-1', quantity: 5 } });
    const item = selectCartItems(store.getState())[0];
    expect(item.quantity).toBe(5);
    expect(item.name).toBe('A'); // unchanged
  });

  it('does nothing for non-existent id', () => {
    const store = createTestStore({
      cart: {
        ...initialState,
        items: [{ id: 'p-1', name: 'A', price: 100, quantity: 1 }],
      },
    });
    store.dispatch({ type: 'cart/updateItem', payload: { id: 'nonexistent', quantity: 9 } });
    expect(selectCartItems(store.getState())[0].quantity).toBe(1);
  });
});

describe('cartReducer — clearAll', () => {
  it('empties the cart', () => {
    const store = createTestStore({
      cart: {
        ...initialState,
        items: [
          { id: 'p-1', name: 'A', price: 100, quantity: 2 },
          { id: 'p-2', name: 'B', price: 200, quantity: 1 },
        ],
      },
    });
    store.dispatch({ type: 'cart/clearAll' });
    expect(selectCartItems(store.getState())).toHaveLength(0);
    expect(selectIsEmpty(store.getState())).toBe(true);
  });
});

describe('cartReducer — setStatus & setError', () => {
  it('setStatus changes status field', () => {
    const store = createTestStore();
    store.dispatch({ type: 'cart/setStatus', payload: 'loading' });
    expect(selectCartStatus(store.getState())).toBe('loading');

    store.dispatch({ type: 'cart/setStatus', payload: 'succeeded' });
    expect(selectCartStatus(store.getState())).toBe('succeeded');
  });

  it('setError sets error and transitions status to failed', () => {
    const store = createTestStore();
    store.dispatch({ type: 'cart/setError', payload: 'Network timeout' });
    expect(selectCartError(store.getState())).toBe('Network timeout');
    expect(selectCartStatus(store.getState())).toBe('failed');
  });

  it('selectItem sets selectedId', () => {
    const store = createTestStore();
    store.dispatch({ type: 'cart/selectItem', payload: 'p-42' });
    expect(selectSelectedId(store.getState())).toBe('p-42');
  });

  it('selectItem with null clears selection', () => {
    const store = createTestStore({ cart: { ...initialState, selectedId: 'p-1' } });
    store.dispatch({ type: 'cart/selectItem', payload: null });
    expect(selectSelectedId(store.getState())).toBeNull();
  });
});

// ============================================================
// TESTS: Selectors
// ============================================================

describe('cartSlice selectors', () => {
  const populatedState = {
    cart: {
      items: [
        { id: 'p-1', name: 'Kaos Polos',   price: 75000,  quantity: 2 },
        { id: 'p-2', name: 'Celana Jeans', price: 250000, quantity: 1 },
      ],
      status: 'idle',
      error: null,
      selectedId: 'p-1',
    },
  };

  it('selectCartItems returns all items', () => {
    const store = createTestStore(populatedState);
    expect(selectCartItems(store.getState())).toHaveLength(2);
  });

  it('selectCartTotal computes correct total (75000*2 + 250000*1)', () => {
    const store = createTestStore(populatedState);
    expect(selectCartTotal(store.getState())).toBe(400000);
  });

  it('selectItemCount returns total quantity', () => {
    const store = createTestStore(populatedState);
    expect(selectItemCount(store.getState())).toBe(3);
  });

  it('selectSelectedItem returns the item matching selectedId', () => {
    const store = createTestStore(populatedState);
    expect(selectSelectedItem(store.getState())).toMatchObject({
      id: 'p-1',
      name: 'Kaos Polos',
    });
  });

  it('selectSelectedItem returns null when no item is selected', () => {
    const store = createTestStore({
      cart: { ...populatedState.cart, selectedId: null },
    });
    expect(selectSelectedItem(store.getState())).toBeNull();
  });

  it('selectIsEmpty returns true for empty cart', () => {
    const store = createTestStore();
    expect(selectIsEmpty(store.getState())).toBe(true);
  });

  it('selectIsEmpty returns false for non-empty cart', () => {
    const store = createTestStore(populatedState);
    expect(selectIsEmpty(store.getState())).toBe(false);
  });
});

// ============================================================
// TESTS: Async Thunks with Mocked fetch
// ============================================================

describe('fetchCartItemsThunk — async with mocked fetch', () => {
  beforeEach(() => {
    jest.clearAllMocks();
  });

  it('dispatches loading then succeeded on successful fetch', async () => {
    const mockData = [{ id: 'p-1', name: 'Remote Item', price: 500000 }];
    globalThis.fetch = jest.fn().mockResolvedValueOnce({
      ok: true,
      json: () => Promise.resolve(mockData),
    });

    const store = createTestStore();
    store.dispatch({ type: 'cart/setStatus', payload: 'idle' });
    await store.dispatch(fetchCartItemsThunk());
    await waitForStore(store);

    expect(selectCartStatus(store.getState())).toBe('succeeded');
    expect(selectCartError(store.getState())).toBeNull();
    globalThis.fetch = undefined; // clean up global
  });

  it('sets error status on failed fetch', async () => {
    globalThis.fetch = jest.fn().mockResolvedValueOnce({
      ok: false,
      status: 500,
    });

    const store = createTestStore();
    await store.dispatch(fetchCartItemsThunk());
    await waitForStore(store);

    expect(selectCartStatus(store.getState())).toBe('failed');
    expect(selectCartError(store.getState())).toBe('HTTP 500');
    globalThis.fetch = undefined;
  });

  it('throws when fetch throws (network error)', async () => {
    globalThis.fetch = jest.fn().mockRejectedValueOnce(new Error('ENOENT'));

    const store = createTestStore();
    await store.dispatch(fetchCartItemsThunk());
    await waitForStore(store);

    expect(selectCartStatus(store.getState())).toBe('failed');
    expect(selectCartError(store.getState())).toBe('ENOENT');
    globalThis.fetch = undefined;
  });
});

// ============================================================
// TESTS: Integration — Full Cart Flow
// ============================================================

describe('Integration — Full cart flow', () => {
  it('add multiple items → update quantity → remove one → clear all', () => {
    const store = createTestStore();

    // Add items
    store.dispatch({ type: 'cart/addItem', payload: { id: 'p-1', name: 'A', price: 100 } });
    store.dispatch({ type: 'cart/addItem', payload: { id: 'p-2', name: 'B', price: 200 } });
    store.dispatch({ type: 'cart/addItem', payload: { id: 'p-3', name: 'C', price: 300 } });
    expect(selectItemCount(store.getState())).toBe(3);

    // Update quantity
    store.dispatch({ type: 'cart/updateItem', payload: { id: 'p-1', quantity: 5 } });
    expect(selectCartTotal(store.getState())).toBe(500 + 200 + 300); // 1000

    // Remove one
    store.dispatch({ type: 'cart/removeItem', payload: 'p-2' });
    expect(selectCartItems(store.getState())).toHaveLength(2);

    // Clear all
    store.dispatch({ type: 'cart/clearAll' });
    expect(selectIsEmpty(store.getState())).toBe(true);
    expect(selectCartTotal(store.getState())).toBe(0);
  });

  it('complete flow with async fetch then local update', async () => {
    const mockData = [{ id: 'p-99', name: 'Fetched Item', price: 999 }];
    globalThis.fetch = jest.fn().mockResolvedValueOnce({
      ok: true,
      json: () => Promise.resolve(mockData),
    });

    const store = createTestStore();
    await store.dispatch(fetchCartItemsThunk());
    await waitForStore(store);

    expect(selectCartStatus(store.getState())).toBe('succeeded');

    // Simulate adding to fetched cart
    store.dispatch({
      type: 'cart/addItem',
      payload: { id: 'local-1', name: 'Local Extra', price: 50 },
    });
    expect(selectItemCount(store.getState())).toBeGreaterThan(0);

    globalThis.fetch = undefined;
  });
});

export {};
