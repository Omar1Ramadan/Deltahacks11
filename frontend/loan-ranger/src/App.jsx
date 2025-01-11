import { useState } from 'react'
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import './App.css'
// import Header from "./components/Header";
import Home from "./components/Home";
import Profile from "./components/Profile";
import Loan from "./components/Loan";
import CreditScore from "./components/CreditScore";

function App() {
  

  return (
  <Router>
    {/* <Header /> */}
    <Routes>
      <Route path="/home" element={<Home />} />
      <Route path="/userprofile" element={<Profile />} />
      <Route path="/loan" element={<Loan />} />
      <Route path="/creditscore" element={<CreditScore />} />
    </Routes>
  </Router>
  )
}

export default App
