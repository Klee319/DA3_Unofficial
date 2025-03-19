import React from 'react';
import './Home.css';

function Home() {
    return (
        <div className="home container">
            <img
                className="banner"
                src="https://source.unsplash.com/random/1600x400?gaming"
                alt="Top Banner"
            />
            <div className="home-title">
                <h1>DA3 UnOfficial Support Tool</h1>
            </div>
        </div>
    );
}

export default Home;
