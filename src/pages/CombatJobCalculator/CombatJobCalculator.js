import React, { useState } from 'react';
import './CombatJobCalculator.css';

function CombatJobCalculator() {
    const [jobType, setJobType] = useState('special');
    const [currentJobLevel, setCurrentJobLevel] = useState('');
    const [targetJobLevel, setTargetJobLevel] = useState('');
    const [specifiedXP, setSpecifiedXP] = useState(''); // 指定XP用の状態を追加
    const [jobLevelResult, setJobLevelResult] = useState(null);

    const calculateJobLevel = () => {
        const x1 = parseInt(currentJobLevel);
        const x2 = parseInt(targetJobLevel);
        const xp = parseInt(specifiedXP); // 指定XPを取得
        
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
        let sandstoneTotal = 0;
        let sandyLeatherTotal = 0;
        let poisonNeedleTotal = 0;
        let totemTotal = 0;
        let guardianTotal = 0;
        let specifiedXPTotal = 0; // 指定XPでの納品回数
        
        for (let i = x1; i < x2; i++) {
            let y = formula(i);
            experienceNeeded += y;
            sandstoneTotal += Math.ceil(y / 1030);
            sandyLeatherTotal += Math.ceil(y / 1330);
            poisonNeedleTotal += Math.ceil(y / 1480);
            totemTotal += Math.ceil(y / 3190);
            guardianTotal += Math.ceil(y / 2075);
            
            // 指定XPが入力されている場合、その回数を計算
            if (!isNaN(xp) && xp > 0) {
                specifiedXPTotal += Math.ceil(y / xp);
            }
        }
        
        let requiredSandstone = sandstoneTotal * 30;
        let requiredSandyLeather = sandyLeatherTotal * 30;
        let requiredPoisonNeedle = poisonNeedleTotal * 30;
        let requiredTotem = totemTotal * 25;
        
        setJobLevelResult(
            <>
                📈 必要経験値量: <strong>{experienceNeeded}</strong><br /><br />

                🏰 番人回数: <strong>{guardianTotal}</strong><br />
                
                砂岩：<br />
                &emsp;回数：<strong>{sandstoneTotal}</strong><br />
                &emsp;個数：<strong>{requiredSandstone}</strong><br /><br />
                
                砂まみれの革：<br />
                &emsp;回数：<strong>{sandyLeatherTotal}</strong><br />
                &emsp;個数：<strong>{requiredSandyLeather}</strong><br /><br />
                
                毒針：<br />
                &emsp;回数：<strong>{poisonNeedleTotal}</strong><br />
                &emsp;個数：<strong>{requiredPoisonNeedle}</strong><br /><br />
                
                トーテム：<br />
                &emsp;回数：<strong>{totemTotal}</strong><br />
                &emsp;個数：<strong>{requiredTotem}</strong><br /><br />
                
                {specifiedXPTotal > 0 && (
                    <>📊 指定XP回数: <strong>{specifiedXPTotal}</strong></>
                )}
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
                <input
                    type="number"
                    placeholder="指定XP (任意)"
                    value={specifiedXP}
                    onChange={(e) => setSpecifiedXP(e.target.value)}
                />
                <button onClick={calculateJobLevel}>計算する</button>
                <div className="result">{jobLevelResult}</div>
            </div>
        </div>
    );
}

export default CombatJobCalculator;