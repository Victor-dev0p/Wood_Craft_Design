// lib/cart-types.ts
import type { Piece } from "./data";

export interface CartItem {
  id: string; // piece.slug + optional suffix for custom configs
  piece: Piece;
  selectedWood?: string;
  selectedSize?: string;
  price: number;
  quantity: number;
}

export type Cart = CartItem[];
