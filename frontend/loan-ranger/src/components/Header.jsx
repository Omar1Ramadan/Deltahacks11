// Header.jsx
import { Link } from "react-router-dom"
import '../stylesheets/Header.css'

// import your Auth0-based login/logout buttons
import LoginButton from "./LoginButton"
import LogoutButton from "./LogoutButton"

function Header({ toggleRegisterPopup, toggleLoginPopup }) {
  return (
    <header className="Header">
      <nav className="nav">
        <ul className="links">
          <li><Link to="/">Home</Link></li>
          <li><Link to="/userprofile">User Profile</Link></li>
          <li><Link to="/loan">Loan</Link></li>
          <li><Link to="/creditscore">Credit Score</Link></li>
          
          {/* Auth0 login/logout buttons */}
          <li><LoginButton /></li>
          <li><LogoutButton /></li>
        </ul>
      </nav>
    </header>
  )
}

export default Header
