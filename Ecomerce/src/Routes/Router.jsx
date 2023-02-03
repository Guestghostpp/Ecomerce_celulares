import React from "react";
import { Route, Routes } from "react-router-dom";
import { Cart } from "../components/Cart";
import { Store } from "../components/Store";

export function Router() {
  return (
    <Routes>
      <Route path="/" element={<Store />} />
      <Route path="/cart" element={<Cart />} />
    </Routes>
  );
}
