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
        return `${hours}時間 ${minutes}分 ${secs}秒`;
    };

    const calculate = () => {
        const cur = parseInt(currentLevel);
        const target = parseInt(targetLevel);
        if (cur >= target) {
            setResult(<p>❌ <strong>目標レベルは現在のレベルより高くしてください。</strong></p>);
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
                    <p>📦 <strong>砂塵F作成回数:</strong> {sandF} 回</p>
                    <p>🪨 <strong>必要な砂岩砂の数:</strong> {sandAmount}</p>
                </>
            );
        } else if (category === "道具") {
            const sandF = values.reduce((sum, y) => sum + Math.ceil(y / 69), 0);
            const sandAmount = sandF * 15;
            emoji = "🛠";
            extraData = (
                <>
                    <p>📦 <strong>砂塵F作成回数:</strong> {sandF} 回</p>
                    <p>🪨 <strong>必要な砂岩砂の数:</strong> {sandAmount}</p>
                </>
            );
        } else if (category === "採掘") {
            const repolo = values.reduce((sum, y) => sum + Math.ceil(y / 5), 0);
            const solsolo = values.reduce((sum, y) => sum + Math.ceil(y / 10), 0);
            const sapunera = values.reduce((sum, y) => sum + Math.ceil(y / 15), 0);
            emoji = "⛏";
            extraData = (
                <>
                    <p>🛠 <strong>レポロ・マクルダ・ルーチェア:</strong> {repolo}</p>
                    <p>🌞 <strong>ソルソロ:</strong> {solsolo}</p>
                    <p>🌿 <strong>サプネラ:</strong> {sapunera}</p>
                </>
            );
        } else if (category === "採取") {
            const repolo = values.reduce((sum, y) => sum + Math.ceil(y / 15), 0);
            const sapunera = values.reduce((sum, y) => sum + Math.ceil(y / 20), 0);
            emoji = "🌿";
            extraData = (
                <>
                    <p>🛠 <strong>サプネラ以外:</strong> {repolo}</p>
                    <p>👑 <strong>サプネラ:</strong> {sapunera}</p>
                </>
            );
        } else if (category === "釣り") {
            const fishingTimes = values.reduce((sum, y) => sum + Math.ceil(y / 5), 0);
            const totalSeconds = fishingTimes * 15;
            const formattedTime = formatTime(totalSeconds);
            emoji = "🎣";
            extraData = (
                <>
                    <p>🎣 <strong>釣る回数:</strong> {fishingTimes} 回</p>
                    <p>⏳ <strong>必要な時間:</strong> {formattedTime}</p>
                </>
            );
        }
        setResult(
            <div>
                <h4>{emoji} {category}</h4>
                <p>🔢 <strong>合計必要経験値:</strong> {totalExp}</p>
                {extraData}
            </div>
        );
    };

    return (
        <div className="production-calculator container">
            <h2>生産レベル計算</h2>
            <label>カテゴリ選択:</label>
            <select value={category} onChange={(e) => setCategory(e.target.value)}>
                <option value="武器">⚔️ 武器</option>
                <option value="防具">🛡 防具</option>
                <option value="道具">🛠 道具</option>
                <option value="採掘">⛏ 採掘</option>
                <option value="採取">🌿 採取</option>
                <option value="釣り">🎣 釣り</option>
            </select>
            <label>現在のレベル:</label>
            <input
                type="number"
                value={currentLevel}
                min="1"
                onChange={(e) => setCurrentLevel(e.target.value)}
            />
            <label>目標のレベル:</label>
            <input
                type="number"
                value={targetLevel}
                min="1"
                onChange={(e) => setTargetLevel(e.target.value)}
            />
            <button onClick={calculate}>計算する</button>
            <div className="result">{result}</div>
        </div>
    );
}

export default ProductionCalculator;
