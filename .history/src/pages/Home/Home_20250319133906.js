import React from 'react';
import './Home.css';

function Home() {
    return (
        <div className="home container">
            <img
                className="banner"
                src="/logo128.png"
                alt="DA3 Support Tool Banner"
            />
            <div className="home-title">
                <h1>DA3 UnOfficial Support Tool</h1>
            </div>
        </div>
    );
}

export default Home;
