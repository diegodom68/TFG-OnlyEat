import "./App.css";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import HomePage from "./pages/HomePage";
import LoginPage from "./pages/LoginPage";
import Navbar from "./components/HP/Navbar";
import SignUp from "./pages/SignUp";
import Usuarios from "./pages/usuarios";

function App() {
  return (
    <Router>
      <Navbar />
      <Routes>
        <Route path="/user" element={<Usuarios />} />
        <Route path="/login" element={<LoginPage />} />
        <Route path="/signup" element={<SignUp />} />
        <Route exact path="/" element={<HomePage />} />
      </Routes>
    </Router>
  );
}

export default App;
