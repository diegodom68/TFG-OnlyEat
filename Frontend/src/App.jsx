import "./App.css";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
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

function App() {
  return (
    <CartProvider>
      <SearchProvider>
        <Router>
          <Routes>
            <Route path="/user" element={<Usuarios />} />
            <Route path="/login" element={<LoginPage />} />
            <Route path="/signup" element={<SignUp />} />
            <Route path="/" element={<HomePage />} />
            <Route path="/restaurant" element={<Restaurant />} />
            <Route path="/cart" element={<Cart />} />
            <Route
              path="/restaurant/:id_restaurante/productos"
              element={<Products />}
            />
            <Route path="/restaurant-login" element={<RestaurantLoginPage />} />
          </Routes>
        </Router>
      </SearchProvider>
    </CartProvider>
  );
}

export default App;
