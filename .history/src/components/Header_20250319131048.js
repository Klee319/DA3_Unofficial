import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import './Header.css';

function Header() {
    const [menuOpen, setMenuOpen] = useState(false);
    const toggleMenu = () => setMenuOpen(!menuOpen);

    return (
        <header className="header">
            <div className="header-container">
                <div className="logo">DA3 UnOfficial Support Tool</div>
                <nav className={`nav ${menuOpen ? 'open' : ''}`}>
                    {/* Homeリンクを指定のSVG画像に変更 */}
                    <Link to="/" onClick={() => setMenuOpen(false)} className="home-link">
                        <img
                            src="https://illustration-free.net/thumb/svg/ifn0204.svg"
                            alt="Home"
                            className="home-icon"
                        />
                    </Link>
                    <Link to="/game-item" onClick={() => setMenuOpen(false)}>Game Item Calculator</Link>
                    <Link to="/production" onClick={() => setMenuOpen(false)}>Production Calculator</Link>
                </nav>
                <div className="hamburger" onClick={toggleMenu}>
                    <div className="bar"></div>
                    <div className="bar"></div>
                    <div className="bar"></div>
                </div>
            </div>
        </header>
    );
}

export default Header;
