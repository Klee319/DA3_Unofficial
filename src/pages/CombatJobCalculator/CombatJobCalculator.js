import React, { useState } from 'react';
import './CombatJobCalculator.css';

function CombatJobCalculator() {
    const [jobType, setJobType] = useState('special');
    const [currentJobLevel, setCurrentJobLevel] = useState('');
    const [targetJobLevel, setTargetJobLevel] = useState('');
    const [jobLevelResult, setJobLevelResult] = useState(null);

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

    return (
        <div className="combat-job-calculator container">
            <h2>戦闘職レベル計算</h2>
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
        </div>
    );
}

export default CombatJobCalculator;