import React from 'react';
import './Footer.css';

function Footer() {
    return (
        <footer className="footer">
            <p>© {new Date().getFullYear()} DA3 UnOfficial Support Tool. Creative Commons.</p>
            <p>
                Author: Klee319 (<span className="discord">
          <img
              src="https://www.svgrepo.com/show/353655/discord-icon.svg"
              alt="Discord"
              className="discord-icon"
          />
          klee.com
        </span>) | Contributer: ねきまり (<span className="discord">
          <img
              src="https://www.svgrepo.com/show/353655/discord-icon.svg"
              alt="Discord"
              className="discord-icon"
          />
          nekimari
        </span>)
            </p>
        </footer>
    );
}

export default Footer;
