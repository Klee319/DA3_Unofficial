import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Header from './components/Header';
import Home from './pages/Home/Home';
import GameItemCalculator from './pages/GameItemCalculator/GameItemCalculator';
import ProductionCalculator from './pages/ProductionCalculator/ProductionCalculator';
import CombatJobCalculator from './pages/CombatJobCalculator/CombatJobCalculator';
import Credits from './pages/Credits/Credits';
import Footer from './components/Footer';

function App() {
    return (
        <Router>
            <div className="app">
                <Header />
                <Routes>
                    <Route path="/" element={<Home />} />
                    <Route path="/game-item" element={<GameItemCalculator />} />
                    <Route path="/production" element={<ProductionCalculator />} />
                    <Route path="/combat-job" element={<CombatJobCalculator />} />
                    <Route path="/credits" element={<Credits />} />
                </Routes>
                <Footer />
            </div>
        </Router>
    );
}

export default App;
