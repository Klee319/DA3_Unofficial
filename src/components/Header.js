import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import './Header.css'; // 必要に応じて別ファイルにスタイルを記述してもOK

function Header() {
    const [menuOpen, setMenuOpen] = useState(false);
    const toggleMenu = () => setMenuOpen(!menuOpen);

    return (
        <header className="header">
            <div className="header-container">
                <div className="logo">DA3 UnOfficial Support Tool</div>
                <nav className={`nav ${menuOpen ? 'open' : ''}`}>
                    <Link to="/" onClick={() => setMenuOpen(false)}>Home</Link>
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
