import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import config from '../config';
import './Header.css';

function Header() {
    const [menuOpen, setMenuOpen] = useState(false);
    const toggleMenu = () => setMenuOpen(!menuOpen);

    return (
        <header className="header">
            <div className="header-container">
                <div className="logo">DA3 UnOfficial Support Tool</div>
                <nav className={`nav ${menuOpen ? 'open' : ''}`}>
                    {/* ホームリンクをTOPテキストに変更 */}
                    <Link to="/" onClick={() => setMenuOpen(false)} className="nav-link">
                        TOP
                    </Link>
                    <Link to="/game-item" onClick={() => setMenuOpen(false)} className="nav-link">
                        アイテム計算機
                    </Link>
                    <Link to="/combat-job" onClick={() => setMenuOpen(false)} className="nav-link">
                        戦闘職計算機
                    </Link>
                    <Link to="/production" onClick={() => setMenuOpen(false)} className="nav-link">
                        生産職計算機
                    </Link>
                    <a
                        href={config.externalLinks.buildCalculator}
                        target="_blank"
                        rel="noopener noreferrer"
                        onClick={() => setMenuOpen(false)}
                        className="nav-link nav-link-external"
                    >
                        ビルド計算機
                        <span className="external-icon">↗</span>
                    </a>
                </nav>
                <div className="hamburger" onClick={toggleMenu}>
                    {menuOpen ? (
                        <img
                            src="/924_x_h.svg"
                            alt="Close Menu"
                            className="menu-icon"
                        />
                    ) : (
                        <img
                            src="/bars_24.svg"
                            alt="Open Menu"
                            className="menu-icon"
                        />
                    )}
                </div>
            </div>
        </header>
    );
}

export default Header;
