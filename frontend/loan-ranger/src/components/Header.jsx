import { Link } from "react-router-dom";
import "../stylesheets/Header.css";

function Header({ toggleRegisterPopup, toggleLoginPopup, loggedInUser, handleLogout }) {
  return (
    <header className="Header">
      <nav className="nav">
        <ul className="links">
          <li><Link to="/">Home</Link></li>
          <li><Link to="/userprofile">User Profile</Link></li>
          <li><Link to="/loan">Loan</Link></li>
          <li><Link to="/credit_score">Credit Score</Link></li>
          {!loggedInUser ? (
            <>
              <li>
                <button className="nav-button" onClick={toggleLoginPopup}>Log In</button>
              </li>
              <li>
                <button className="nav-button" onClick={toggleRegisterPopup}>Register</button>
              </li>
            </>
          ) : (
            <li>
              <button className="nav-button" onClick={handleLogout}>Log Out</button>
            </li>
          )}
        </ul>
      </nav>
    </header>
  );
}

export default Header;
