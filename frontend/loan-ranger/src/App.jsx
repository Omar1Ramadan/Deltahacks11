import { useState } from 'react'
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import './App.css'
import Header from "./components/Header";
import Home from "./components/Home";
import Profile from "./components/Profile";
import Loan from "./components/Loan";
import CreditScore from "./components/CreditScore";
import RegisterPopup from "./components/RegisterPopup";

function App() {
  const [showRegisterPopup, setShowRegisterPopup] = useState(false)

  const toggleRegisterPopup = () => {
    setShowRegisterPopup(!showRegisterPopup)
  }
  

  return (
  <Router>
    <Header toggleRegisterPopup={toggleRegisterPopup}/>
    <Routes>
      <Route path="/" element={<Home />} />
      <Route path="/userprofile" element={<Profile />} />
      <Route path="/loan" element={<Loan />} />
      <Route path="/creditscore" element={<CreditScore />} />
    </Routes>
    {showRegisterPopup && <RegisterPopup togglePopup={toggleRegisterPopup} />}
  </Router>
  )
}

export default App
