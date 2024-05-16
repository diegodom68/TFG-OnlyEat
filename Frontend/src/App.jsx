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
                path="/restaurant-login"
                element={
                  <ProtectedRoute>
                    <RestaurantLoginPage />
                  </ProtectedRoute>
                }
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
