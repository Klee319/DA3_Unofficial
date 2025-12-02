import React from 'react';
import { Link } from 'react-router-dom';
import './Footer.css';

function Footer() {
    return (
        <footer className="footer">
            <p>© {new Date().getFullYear()} DA3 UnOfficial Support Tool. Creative Commons.</p>
            <p>
                <Link to="/credits" className="credits-link">Credits</Link>
            </p>
        </footer>
    );
}

export default Footer;
