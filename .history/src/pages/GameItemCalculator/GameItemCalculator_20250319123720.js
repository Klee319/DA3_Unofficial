import React, { useState } from 'react';
import './GameItemCalculator.css';

function GameItemCalculator() {
    const [calcType, setCalcType] = useState('magicStone');
    const [currentLevel, setCurrentLevel] = useState('');
    const [targetLevel, setTargetLevel] = useState('');
    const [successRate, setSuccessRate] = useState('');
    const [stoneLevel, setStoneLevel] = useState('');
    const [magicStoneResult, setMagicStoneResult] = useState(null);

    const [jobType, setJobType] = useState('special');
    const [currentJobLevel, setCurrentJobLevel] = useState('');
    const [targetJobLevel, setTargetJobLevel] = useState('');
    const [jobLevelResult, setJobLevelResult] = useState(null);

    const [sandstoneCount, setSandstoneCount] = useState('');
    const [sandstoneResult, setSandstoneResult] = useState(null);

    const calculateMagicStone = () => {
        const a = parseInt(currentLevel);
        const b = parseInt(targetLevel);
        const c = parseFloat(successRate);
        const d = parseInt(stoneLevel);
        if (isNaN(a) || isNaN(b) || isNaN(c) || isNaN(d) || a >= b) {
            alert("⚠️ 正しい数値を入力してください！");
            return;
        }
        let experienceNeeded = 25 * ((a + (b - 1)) / 2) * (((b - 1) - a) + 1) + 1;
        experienceNeeded *= (c / 100);
        let stoneCount = Math.ceil(experienceNeeded / d);
        let stoneC = (stoneCount / 1728).toFixed(2);
        let stoneST = (stoneCount / 64).toFixed(2);
        setMagicStoneResult(
            <>
                🔮 必要経験値量: <strong>{experienceNeeded.toFixed(2)}</strong><br />
                🪨 必要魔法石数: <strong>{stoneCount}</strong><br />
                📦 魔法石(C): <strong>{stoneC}</strong><br />
                💠 魔法石(ST): <strong>{stoneST}</strong>
            </>
        );
    };

    const calculateJobLevel = () => {
        const x1 = parseInt(currentJobLevel);
        const x2 = parseInt(targetJobLevel);
        if (isNaN(x1) || isNaN(x2) || x1 >= x2) {
            alert("⚠️ 正しい数値を入力してください！");
            return;
        }
        let formula;
        switch (jobType) {
            case "special":
                formula = (x) => x ** 2 + 4 * x + 1;
                break;
            case "first":
                formula = (x) => 2 * x ** 2 + 12 * x + 58;
                break;
            case "second":
                formula = (x) => 4 * x ** 2 + 64 * x + 2644;
                break;
            case "third":
                formula = (x) => 4 * x ** 2 + 116 * x + 4576;
                break;
            default:
                return;
        }
        let experienceNeeded = 0;
        for (let i = x1; i < x2; i++) {
            experienceNeeded += formula(i);
        }
        let sandstoneCount = Math.ceil(experienceNeeded / 1030);
        let requiredSandstone = sandstoneCount * 30;
        let guardianCount = Math.ceil(experienceNeeded / 2075);
        setJobLevelResult(
            <>
                📈 必要経験値量: <strong>{experienceNeeded}</strong><br />
                ⛏ 砂岩納品回数: <strong>{sandstoneCount}</strong><br />
                🪨 必要な砂岩の数: <strong>{requiredSandstone}</strong><br />
                🏰 番人回数: <strong>{guardianCount}</strong>
            </>
        );
    };

    const calculateSandstone = () => {
        let count = parseInt(sandstoneCount);
        if (isNaN(count) || count <= 0) {
            alert("⚠️ 正しい数値を入力してください！");
            return;
        }
        while (count % 30 !== 0) {
            count--;
        }
        let magicStoneLv2 = Math.floor((count / 3) * 2);
        let magicStoneLv3 = Math.floor((count / 9) * 4);
        setSandstoneResult(
            <>
                🟩 魔法石Lv2: <strong>{magicStoneLv2}</strong><br />
                🟦 魔法石Lv3: <strong>{magicStoneLv3}</strong>
            </>
        );
    };

    return (
        <div className="game-item-calculator container">
            <h2>ゲーム内アイテム計算</h2>
            <label>🛠 計算の種類を選択:</label>
            <select value={calcType} onChange={(e) => setCalcType(e.target.value)}>
                <option value="magicStone">🔮 魔法石の強化</option>
                <option value="jobLevel">📈 職業レベルの経験値</option>
                <option value="sandstone">⛏ 砂岩→魔法石変換</option>
            </select>
            {calcType === 'magicStone' && (
                <div className="form-section">
                    <h3>🔮 魔法石の強化</h3>
                    <input
                        type="number"
                        placeholder="現在のレベル"
                        value={currentLevel}
                        onChange={(e) => setCurrentLevel(e.target.value)}
                    />
                    <input
                        type="number"
                        placeholder="目標のレベル"
                        value={targetLevel}
                        onChange={(e) => setTargetLevel(e.target.value)}
                    />
                    <input
                        type="number"
                        placeholder="成功率(%)"
                        value={successRate}
                        onChange={(e) => setSuccessRate(e.target.value)}
                    />
                    <input
                        type="number"
                        placeholder="魔法石のレベル"
                        value={stoneLevel}
                        onChange={(e) => setStoneLevel(e.target.value)}
                    />
                    <button onClick={calculateMagicStone}>計算する</button>
                    <div className="result">{magicStoneResult}</div>
                </div>
            )}
            {calcType === 'jobLevel' && (
                <div className="form-section">
                    <h3>📈 職業レベルの経験値</h3>
                    <select value={jobType} onChange={(e) => setJobType(e.target.value)}>
                        <option value="special">🔹 特殊職</option>
                        <option value="first">🔹 一次職</option>
                        <option value="second">🔹 二次職</option>
                        <option value="third">🔹 三次職</option>
                    </select>
                    <input
                        type="number"
                        placeholder="現在のレベル"
                        value={currentJobLevel}
                        onChange={(e) => setCurrentJobLevel(e.target.value)}
                    />
                    <input
                        type="number"
                        placeholder="目標のレベル"
                        value={targetJobLevel}
                        onChange={(e) => setTargetJobLevel(e.target.value)}
                    />
                    <button onClick={calculateJobLevel}>計算する</button>
                    <div className="result">{jobLevelResult}</div>
                </div>
            )}
            {calcType === 'sandstone' && (
                <div className="form-section">
                    <h3>⛏ 砂岩→魔法石変換</h3>
                    <input
                        type="number"
                        placeholder="砂岩の数"
                        value={sandstoneCount}
                        onChange={(e) => setSandstoneCount(e.target.value)}
                    />
                    <button onClick={calculateSandstone}>計算する</button>
                    <div className="result">{sandstoneResult}</div>
                </div>
            )}
        </div>
    );
}

export default GameItemCalculator;
