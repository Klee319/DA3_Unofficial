import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Header from './components/Header';
import Home from './pages/Home/Home';
import GameItemCalculator from './pages/GameItemCalculator/GameItemCalculator';
import ProductionCalculator from './pages/ProductionCalculator/ProductionCalculator';

function App() {
    return (
        <Router>
            <div className="app">
                <Header />
                <Routes>
                    <Route path="/" element={<Home />} />
                    <Route path="/game-item" element={<GameItemCalculator />} />
                    <Route path="/production" element={<ProductionCalculator />} />
                </Routes>
            </div>
        </Router>
    );
}

export default App;
