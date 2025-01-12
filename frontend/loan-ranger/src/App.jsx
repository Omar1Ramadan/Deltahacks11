import { useState } from 'react'
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import './App.css'
import Header from "./components/Header";
import Home from "./components/Home";
import Profile from "./components/Profile";
import Loan from "./components/Loan";
import CreditScore from "./components/CreditScore";
import RegisterPopup from "./components/RegisterPopup";
import LoginPopup from "./components/LoginPopup";

function App() {
  const [showRegisterPopup, setShowRegisterPopup] = useState(false)
  const [showLoginPopup, setShowLoginPopup] = useState(false)

  const toggleRegisterPopup = () => {
    setShowRegisterPopup(!showRegisterPopup)
  }
  
  const toggleLoginPopup = () => {
    setShowLoginPopup(!showLoginPopup);
  }

  return (
  <Router>
    <Header toggleRegisterPopup={toggleRegisterPopup} toggleLoginPopup={toggleLoginPopup}/>
    <Routes>
      <Route path="/" element={<Home />} />
      <Route path="/userprofile" element={<Profile />} />
      <Route path="/loan" element={<Loan />} />
      <Route path="/creditscore" element={<CreditScore />} />
    </Routes>
    {showRegisterPopup && <RegisterPopup togglePopup={toggleRegisterPopup} />}
    {showLoginPopup && <LoginPopup togglePopup={toggleLoginPopup} />}
  </Router>
  )
}

export default App
