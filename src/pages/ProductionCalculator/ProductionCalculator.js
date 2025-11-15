import React, { useState } from 'react';
import './ProductionCalculator.css';

function ProductionCalculator() {
    const [category, setCategory] = useState('武器');
    const [currentLevel, setCurrentLevel] = useState(1);
    const [targetLevel, setTargetLevel] = useState(10);
    const [result, setResult] = useState(null);

    const experienceFormula = (x, cat) => {
        return cat === "武器" ? (x ** 2 + 2 * x + 1) : (x ** 2 + 4 * x + 1);
    };

    const formatTime = (seconds) => {
        const hours = Math.floor(seconds / 3600);
        const minutes = Math.floor((seconds % 3600) / 60);
        const secs = seconds % 60;
        const parts = [];
        if (hours > 0) parts.push(`${hours} 時間`);
        if (minutes > 0) parts.push(`${minutes} 分`);
        if (secs > 0 || parts.length === 0) parts.push(`${secs} 秒`);
        return parts.join(' ');
    };

    const categories = [
        { id: '武器', name: '⚔️ 武器', emoji: '⚔️' },
        { id: '防具', name: '🛡 防具', emoji: '🛡' },
        { id: '道具', name: '🛠 道具', emoji: '🛠' },
        { id: '錬金', name: '☆ 錬金', emoji: '☆' },
        { id: '採掘', name: '⛏ 採掘', emoji: '⛏' },
        { id: '採取', name: '🌿 採取', emoji: '🌿' },
        { id: '釣り', name: '🎣 釣り', emoji: '🎣' }
    ];

    const calculate = () => {
        const cur = parseInt(currentLevel);
        const target = parseInt(targetLevel);
        if (cur >= target) {
            setResult(<p className="error-message">❌ <strong>目標レベルは現在のレベルより高くしてください。</strong></p>);
            return;
        }
        let totalExp = 0;
        let values = [];
        for (let x = cur; x < target; x++) {
            let y = experienceFormula(x, category);
            totalExp += y;
            values.push(y);
        }
        let extraData = null;
        let emoji = "";
        if (category === "武器" || category === "防具") {
            const sandF = values.reduce((sum, y) => sum + Math.ceil(y / 114), 0);
            const sandAmount = sandF * 20;
            emoji = category === "武器" ? "⚔️" : "🛡";
            extraData = (
                <>
                    <div className="result-item">
                        <span className="result-label">📦 砂塵F作成回数:</span>
                        <span className="result-value">{sandF} 回</span>
                    </div>
                    <div className="result-item">
                        <span className="result-label">🪨 必要な砂岩砂の数:</span>
                        <span className="result-value">{sandAmount}</span>
                    </div>
                </>
            );
        } else if (category === "道具") {
            const sandF = values.reduce((sum, y) => sum + Math.ceil(y / 69), 0);
            const sandAmount = sandF * 15;
            emoji = "🛠";
            extraData = (
                <>
                    <div className="result-item">
                        <span className="result-label">📦 砂塵F作成回数:</span>
                        <span className="result-value">{sandF} 回</span>
                    </div>
                    <div className="result-item">
                        <span className="result-label">🪨 必要な砂岩砂の数:</span>
                        <span className="result-value">{sandAmount}</span>
                    </div>
                </>
            );
        } else if (category === "錬金") {
            const alchemyCount = values.reduce((sum, exp, index) => {
                const level = cur + index;
                const denominator = Math.round(level / 2) + Math.round(level / 2 + 3);
                return sum + Math.ceil(exp / denominator);
            }, 0);

            const crystalAmount = alchemyCount * 5;
            const totalCost = crystalAmount * 500;

            emoji = "☆";
            extraData = (
                <>
                    <div className="result-item">
                        <span className="result-label">🧪 錬金回数:</span>
                        <span className="result-value">{alchemyCount} 回</span>
                    </div>
                    <div className="result-item">
                        <span className="result-label">💎 必要魔結晶数:</span>
                        <span className="result-value">{crystalAmount} 個</span>
                    </div>
                    <div className="result-item">
                        <span className="result-label">💰 必要金額:</span>
                        <span className="result-value">{totalCost.toLocaleString()} ゴールド</span>
                    </div>
                    <div className="result-note">
                        ※ <strong>Quality:Fの初級攻撃力錬金の場合</strong>
                    </div>
                </>
            );
        } else if (category === "採掘") {
            const repolo = values.reduce((sum, y) => sum + Math.ceil(y / 5), 0);
            const solsolo = values.reduce((sum, y) => sum + Math.ceil(y / 10), 0);
            const sapunera = values.reduce((sum, y) => sum + Math.ceil(y / 15), 0);
            emoji = "⛏";
            extraData = (
                <>
                    <div className="result-item">
                        <span className="result-label">🛠 レポロ・マクルダ・ルーチェア:</span>
                        <span className="result-value">{repolo}</span>
                    </div>
                    <div className="result-item">
                        <span className="result-label">🌞 ソルソロ:</span>
                        <span className="result-value">{solsolo}</span>
                    </div>
                    <div className="result-item">
                        <span className="result-label">🌿 サプネラ:</span>
                        <span className="result-value">{sapunera}</span>
                    </div>
                </>
            );
        } else if (category === "採取") {
            const repolo = values.reduce((sum, y) => sum + Math.ceil(y / 15), 0);
            const sapunera = values.reduce((sum, y) => sum + Math.ceil(y / 20), 0);
            emoji = "🌿";
            extraData = (
                <>
                    <div className="result-item">
                        <span className="result-label">🛠 サプネラ以外:</span>
                        <span className="result-value">{repolo}</span>
                    </div>
                    <div className="result-item">
                        <span className="result-label">👑 サプネラ:</span>
                        <span className="result-value">{sapunera}</span>
                    </div>
                </>
            );
        } else if (category === "釣り") {
            const fishingTimes = values.reduce((sum, y) => sum + Math.ceil(y / 5), 0);
            const totalSeconds = fishingTimes * 15;
            const formattedTime = formatTime(totalSeconds);
            emoji = "🎣";
            extraData = (
                <>
                    <div className="result-item">
                        <span className="result-label">🎣 釣る回数:</span>
                        <span className="result-value">{fishingTimes} 回</span>
                    </div>
                    <div className="result-item">
                        <span className="result-label">⏳ 必要な時間:</span>
                        <span className="result-value">{formattedTime}</span>
                    </div>
                </>
            );
        }
        setResult(
            <div className="result-card">
                <h4 className="result-title">{emoji} {category}</h4>
                <div className="result-item">
                    <span className="result-label">🔢 合計必要経験値:</span>
                    <span className="result-value">{totalExp}</span>
                </div>
                {extraData}
            </div>
        );
    };

    return (
        <div className="production-calculator">
            <div className="calculator-container">
                <h2 className="page-title">生産レベル計算</h2>

                {/* カテゴリ選択カード */}
                <div className="input-card">
                    <h3 className="card-title">カテゴリ選択</h3>
                    <div className="category-grid">
                        {categories.map(cat => (
                            <button
                                key={cat.id}
                                className={`category-button ${category === cat.id ? 'active' : ''}`}
                                onClick={() => setCategory(cat.id)}
                            >
                                {cat.name}
                            </button>
                        ))}
                    </div>
                </div>

                {/* レベル設定カード */}
                <div className="input-card">
                    <h3 className="card-title">レベル設定</h3>
                    <div className="input-group">
                        <label className="input-label">現在のレベル</label>
                        <input
                            type="number"
                            className="input-field"
                            value={currentLevel}
                            min="1"
                            onChange={(e) => setCurrentLevel(e.target.value)}
                        />
                    </div>
                    <div className="input-group">
                        <label className="input-label">目標のレベル</label>
                        <input
                            type="number"
                            className="input-field"
                            value={targetLevel}
                            min="1"
                            onChange={(e) => setTargetLevel(e.target.value)}
                        />
                    </div>
                    <button className="calc-button" onClick={calculate}>計算する</button>
                </div>

                {/* 結果表示 */}
                {result && <div className="result-section">{result}</div>}
            </div>
        </div>
    );
}

export default ProductionCalculator;
