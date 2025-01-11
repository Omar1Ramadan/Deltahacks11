import { Link } from "react-router-dom"

function Header() {
    
    return (
        <header className="Header">
            <nav className="nav">
                <ul className="links">
                    <li><Link to="/home">Home</Link></li>
                    <li><Link to="/userprofile">About</Link></li>
                    <li><Link to="/loan">Sponsors</Link></li>
                    <li><Link to="/creditscore">Join</Link></li>
                </ul>
            </nav>

        </header>
    )
}

export default Header;