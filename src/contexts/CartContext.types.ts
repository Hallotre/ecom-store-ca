import { createContext } from "react";
import { CartItem, Product } from "../types/types";

export interface CartContextType {
  cartItems: CartItem[];
  addToCart: (product: Product) => void;
  removeFromCart: (productId: string) => void;
  updateQuantity: (productId: string, quantity: number) => void;
  clearCart: () => void;
  getCartTotal: () => number;
  getItemCount: () => number;
}

export const CartContext = createContext<CartContextType | undefined>(undefined);