import "./App.css";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import HomePage from "./pages/HomePage";
import LoginPage from "./pages/LoginPage";
import SignUp from "./pages/SignUp";
import Usuarios from "./pages/usuarios";
import Restaurant from "./pages/restaurant";

function App() {
  return (
    <Router>
      <Routes>
        <Route path="/user" element={<Usuarios />} />
        <Route path="/login" element={<LoginPage />} />
        <Route path="/signup" element={<SignUp />} />
        <Route exact path="/" element={<HomePage />} />
        <Route path="/restaurant" element={<Restaurant />} />
      </Routes>
    </Router>
  );
}

export default App;
