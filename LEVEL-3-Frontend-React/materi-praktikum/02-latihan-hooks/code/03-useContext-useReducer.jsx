import {
  createContext,
  useContext,
  useMemo,
  useReducer,
} from "react";

const CartStateContext = createContext(null);
const CartDispatchContext = createContext(null);

const initialState = { items: [] };

export function cartReducer(state, action) {
  switch (action.type) {
    case "item/added": {
      const existing = state.items.find(
        (item) => item.id === action.payload.id,
      );

      if (existing) {
        return {
          ...state,
          items: state.items.map((item) =>
            item.id === action.payload.id
              ? { ...item, quantity: item.quantity + 1 }
              : item,
          ),
        };
      }

      return {
        ...state,
        items: [...state.items, { ...action.payload, quantity: 1 }],
      };
    }

    case "item/quantityChanged": {
      const { id, quantity } = action.payload;
      if (!Number.isInteger(quantity) || quantity < 1) return state;

      return {
        ...state,
        items: state.items.map((item) =>
          item.id === id ? { ...item, quantity } : item,
        ),
      };
    }

    case "item/removed":
      return {
        ...state,
        items: state.items.filter((item) => item.id !== action.payload.id),
      };

    case "cart/cleared":
      return initialState;

    default:
      throw new Error(`Action tidak dikenal: ${action.type}`);
  }
}

export function CartProvider({ children }) {
  const [state, dispatch] = useReducer(cartReducer, initialState);

  const value = useMemo(() => {
    const totalItems = state.items.reduce(
      (sum, item) => sum + item.quantity,
      0,
    );
    const subtotal = state.items.reduce(
      (sum, item) => sum + item.price * item.quantity,
      0,
    );

    return { ...state, totalItems, subtotal };
  }, [state]);

  return (
    <CartStateContext value={value}>
      <CartDispatchContext value={dispatch}>
        {children}
      </CartDispatchContext>
    </CartStateContext>
  );
}

export function useCartState() {
  const context = useContext(CartStateContext);
  if (context === null) {
    throw new Error("useCartState harus digunakan di dalam CartProvider.");
  }
  return context;
}

export function useCartDispatch() {
  const context = useContext(CartDispatchContext);
  if (context === null) {
    throw new Error("useCartDispatch harus digunakan di dalam CartProvider.");
  }
  return context;
}

// Latihan lanjutan:
// 1. Tulis unit test reducer untuk setiap action dan action tidak dikenal.
// 2. Tambahkan batas maksimum quantity.
// 3. Ukur render consumer state dan dispatch menggunakan React DevTools.
