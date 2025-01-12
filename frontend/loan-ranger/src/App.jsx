import { useState, useEffect } from "react";
import { BrowserRouter as Router, Routes, Route, Navigate } from "react-router-dom";
import "./App.css";
import Header from "./components/Header";
import Home from "./components/Home";
import Profile from "./components/Profile";
import Loan from "./components/Loan";
import CreditScore from "./components/CreditScore";
import RegisterPopup from "./components/RegisterPopup";
import LoginPopup from "./components/LoginPopup";

function App() {
  const [loggedInUser, setLoggedInUser] = useState(localStorage.getItem("userId") || null);
  const [showRegisterPopup, setShowRegisterPopup] = useState(false);
  const [showLoginPopup, setShowLoginPopup] = useState(false);

  const toggleRegisterPopup = () => setShowRegisterPopup(!showRegisterPopup);
  const toggleLoginPopup = () => setShowLoginPopup(!showLoginPopup);
  const handleLogout = () => {
    localStorage.removeItem("userId");
    setLoggedInUser(null);
  };

  return (
    <Router>
      <Header
        toggleRegisterPopup={toggleRegisterPopup}
        toggleLoginPopup={toggleLoginPopup}
        loggedInUser={loggedInUser}
        handleLogout={handleLogout}
      />
      <Routes>
        <Route path="/" element={<Home />} />
        {loggedInUser ? (
          <Route path="/userprofile" element={<Profile />} />
        ) : (
          <Route path="/userprofile" element={<Navigate to="/" />} />
        )}
        <Route path="/loan" element={<Loan />} />
        <Route path="/credit_score" element={<CreditScore />} />
      </Routes>
      {showRegisterPopup && <RegisterPopup togglePopup={toggleRegisterPopup} />}
      {showLoginPopup && (
        <LoginPopup togglePopup={toggleLoginPopup} setLoggedInUser={setLoggedInUser} />
      )}
    </Router>
  );
}

export default App;
