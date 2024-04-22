import "./App.css";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import HomePage from "./pages/HomePage";
import LoginPage from "./pages/LoginPage";
import Navbar from "./components/HP/Navbar";
import SignUp from "./pages/SignUp";

function App() {
  return (
    <Router>
      <Navbar />
      <div>
        <Routes>
          <Route path="/login" element={<LoginPage />} />
          <Route path="/signup" element={<SignUp />} />
          <Route exact path="/" element={<HomePage />} />
        </Routes>
      </div>
    </Router>
  );
}

export default App;
