import React from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import AuthProviderWrapper from "./components/context/AuthProviderWrapper";
import ProtectedRoute from "./components/routes/ProtectedRoute";
import HomePage from "./pages/HomePage";
import LoginPage from "./pages/LoginPage";
import SignUp from "./pages/SignUp";
import Usuarios from "./pages/usuarios";
import Restaurant from "./pages/restaurant";
import Products from "./pages/products";
import { CartProvider } from "./components/context/CartContext";
import { SearchProvider } from "./components/context/searchcontext";
import Cart from "./components/products/Cart";
import RestaurantLoginPage from "./pages/RestaurtantLoginPage";
import NotFound from "./pages/Error404";
import Dashboard from "./pages/Dashboard";

function App() {
  return (
    <Router>
      <AuthProviderWrapper>
        <CartProvider>
          <SearchProvider>
            <Routes>
              <Route path="/" element={<HomePage />} />
              <Route path="/login" element={<LoginPage />} />
              <Route path="/signup" element={<SignUp />} />
              <Route path="/dashboard" element={<Dashboard />} />
              <Route
                path="/user"
                element={
                  <ProtectedRoute>
                    <Usuarios />
                  </ProtectedRoute>
                }
              />
              <Route
                path="/restaurant"
                element={
                  <ProtectedRoute>
                    <Restaurant />
                  </ProtectedRoute>
                }
              />
              <Route
                path="/cart"
                element={
                  <ProtectedRoute>
                    <Cart />
                  </ProtectedRoute>
                }
              />
              <Route
                path="/restaurant/:id_restaurante/productos"
                element={
                  <ProtectedRoute>
                    <Products />
                  </ProtectedRoute>
                }
              />
              <Route
                path="/loginrestaurant"
                element={<RestaurantLoginPage />}
              />
              <Route path="*" element={<NotFound />}></Route>
            </Routes>
          </SearchProvider>
        </CartProvider>
      </AuthProviderWrapper>
    </Router>
  );
}

export default App;
