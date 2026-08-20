// components/ClearCartOnConfirm.tsx
"use client";

import { useEffect } from "react";
import { useCart } from "./CartContext";

export default function ClearCartOnConfirm() {
  const { clearCart } = useCart();
  useEffect(() => {
    clearCart();
  }, [clearCart]);
  return null;
}