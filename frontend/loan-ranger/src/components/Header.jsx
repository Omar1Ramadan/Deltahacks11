import { Link } from "react-router-dom"
import '../stylesheets/Header.css'

function Header({ toggleRegisterPopup, toggleLoginPopup }) {
    
    return (
        <header className="Header">
            <nav className="nav">
                <ul className="links">
                    <li><Link to="/">Home</Link></li>
                    <li><Link to="/userprofile">User Profile</Link></li>
                    <li><Link to="/loan">Loan</Link></li>
                    <li><Link to="/creditscore">Credit Score</Link></li>
                    <li><button onClick={toggleLoginPopup}>Log In</button></li>
                    <li><button onClick={toggleRegisterPopup}>Register</button></li>
                    
                </ul>
            </nav>
        </header>
    )
}

export default Header;