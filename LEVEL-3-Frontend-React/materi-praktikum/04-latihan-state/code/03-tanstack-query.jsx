// ============================================================
// FILE: 04-latihan-state/code/03-cart-context.jsx
// MATERI: CartContext dengan useReducer dan Computed Values
// ============================================================
import { createContext, useContext, useReducer, useMemo } from "react";

// ============================================================
// Initial State
// ============================================================
const initialCartState = {
  items: [
    { id: "ITEM001", name: "Laptop ASUS ROG", price: 15000000, quantity: 1 },
    { id: "ITEM002", name: "Mouse Wireless", price: 250000, quantity: 2 },
    { id: "ITEM003", name: "Keyboard Mechanical", price: 1200000, quantity: 1 },
  ],
  promoCode: null,
  discountPercent: 0,
  shippingMethod: "standard", // "standard" | "express" | "same-day"
};

// ============================================================
// TODO: Cart Reducer
// ============================================================
// Action types:
//   ADD_ITEM: { type: "ADD_ITEM", payload: { product } }
//
//     Logic:
//       - Jika item dengan id yang sama SUDAH ada → update quantity (+ product.quantity atau 1)
//       - Jika TIDAK ada → push item baru dengan quantity 1
//
//   REMOVE_ITEM: { type: "REMOVE_ITEM", payload: { id } }
//
//     Logic: filter out item dengan id tersebut
//
//   UPDATE_QUANTITY: { type: "UPDATE_QUANTITY", payload: { id, quantity } }
//
//     Logic:
//       - Jika quantity <= 0 → REMOVE_ITEM
//       - Jika quantity > 0 → map dan update quantity item tersebut
//
//   CLEAR_CART: { type: "CLEAR_CART" }
//
//     Logic: return initialCartState
//
//   APPLY_PROMO: { type: "APPLY_PROMO", payload: { code } }
//
//     Logic:
//       - DISKON10 → discountPercent = 10
//       - HEMAT20 → discountPercent = 20 (valid untuk semua)
//       - Jika code tidak valid → set promoCode, tapi discountPercent = 0
//
//   REMOVE_PROMO: { type: "REMOVE_PROMO" }
//
//     Logic: promoCode = null, discountPercent = 0
//
//   SET_SHIPPING: { type: "SET_SHIPPING", payload: { method } }
//
//     Logic: shippingMethod = method
//
// CATATAN: State TIDAK boleh di-mutate langsung
// ============================================================

function cartReducer(state, action) {
  // TODO: Implementasikan reducer

  switch (action.type) {
    // TODO: ADD_ITEM

    // TODO: REMOVE_ITEM

    // TODO: UPDATE_QUANTITY

    // TODO: CLEAR_CART

    // TODO: APPLY_PROMO

    // TODO: REMOVE_PROMO

    // TODO: SET_SHIPPING

    default:
      return state;
  }
}

// ============================================================
// TODO: CartContext
// ============================================================
// createContext(null)
//
// CartProvider features:
//   1. useReducer(cartReducer, initialCartState)
//   2. Computed values (di dalam useMemo):
//      - subtotal = Σ(price × quantity)
//      - discountAmount = subtotal × (discountPercent / 100)
//      - shippingCost:
//          standard: 10000
//          express: 25000
//          same-day: 50000
//          Jika subtotal > 200000 → standard FREE (0)
//      - total = subtotal - discountAmount + shippingCost
//      - itemCount = Σ(quantity)
//      - isEmpty = items.length === 0
//   3. Action creators:
///     - addItem(product): dispatch({ type: "ADD_ITEM", payload: { product } })
//      - removeItem(id): dispatch({ type: "REMOVE_ITEM", payload: { id } })
//      - updateQuantity(id, qty): dispatch({ type: "UPDATE_QUANTITY", payload: { id, quantity: qty } })
//      - clearCart(): dispatch({ type: "CLEAR_CART" })
//      - applyPromo(code): dispatch({ type: "APPLY_PROMO", payload: { code } })
//      - removePromo(): dispatch({ type: "REMOVE_PROMO" })
//      - setShipping(method): dispatch({ type: "SET_SHIPPING", payload: { method } })
//   4. value = { state, ...computed, ...actionCreators, dispatch }
//
// CATATAN: computed values HARUS di-memoize dengan useMemo
// ============================================================

// TODO: const CartContext = createContext(null)

export function CartProvider({ children }) {
  // TODO: useReducer

  // TODO: Computed values dengan useMemo

  // TODO: Action creators

  // TODO: useMemo untuk value

  // TODO: Return <CartContext.Provider value={value}>{children}</CartContext.Provider>
}

// TODO: useCart hook
// export function useCart() {
//   const context = useContext(CartContext);
//   if (!context) throw new Error("useCart must be used within CartProvider");
//   return context;
// }

// ============================================================
// DEMO: Cart Components
// ============================================================

export function CartBadge() {
  // TODO: Ambil itemCount dari useCart()
  // TODO: Render badge dengan count (jika itemCount > 0)
}

export function CartItem({ item }) {
  // TODO: Ambil updateQuantity, removeItem dari useCart()
  // TODO: Render: name, price, quantity controls (+/-), subtotal per item, remove button
}

export function CartSummary() {
  // TODO: Ambil semua computed values dari useCart()
  // TODO: Render: subtotal, discount, shipping, total
  // TODO: Promo code input + apply button
  // TODO: Shipping method selector
}

export function CartPage() {
  // TODO: Ambil items, clearCart dari useCart()
  // TODO: Render: list CartItem, CartSummary, clearCart button
}