import React, { useState } from 'react';
import './GameItemCalculator.css';

function GameItemCalculator() {
    const [calcType, setCalcType] = useState('magicStone');
    const [currentLevel, setCurrentLevel] = useState('');
    const [targetLevel, setTargetLevel] = useState('');
    const [successRate, setSuccessRate] = useState('');
    const [stoneLevel, setStoneLevel] = useState('');
    const [magicStoneResult, setMagicStoneResult] = useState(null);

    const [deliveryItemType, setDeliveryItemType] = useState('sandstone');
    const [deliveryCount, setDeliveryCount] = useState('');
    const [deliveryResult, setDeliveryResult] = useState(null);

    // 武器のクオリティ別価格計算用の状態
    const [quality, setQuality] = useState('SSS');
    const [price, setPrice] = useState('');
    const [weaponPriceResult, setWeaponPriceResult] = useState(null);

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

    const calculateDeliveryReward = () => {
        let count = parseInt(deliveryCount);
        if (isNaN(count) || count <= 0) {
            alert("⚠️ 正しい数値を入力してください！");
            return;
        }

        let magicStoneLv2 = 0;
        let magicStoneLv3 = 0;
        let gold = 0;
        
        switch (deliveryItemType) {
            case 'sandstone':
                // 砂岩30個(lv2:20,ゴールド1060)
                const sandstoneDeliveries = Math.floor(count / 30);
                magicStoneLv2 = sandstoneDeliveries * 20;
                gold = sandstoneDeliveries * 1060;
                break;
            case 'sandyLeather':
                // 砂まみれの革30個(lv3:12,ゴールド1360)
                const leatherDeliveries = Math.floor(count / 30);
                magicStoneLv3 = leatherDeliveries * 12;
                gold = leatherDeliveries * 1360;
                break;
            case 'poisonNeedle':
                // 毒針30個(lv3:12,ゴールド1480)
                const needleDeliveries = Math.floor(count / 30);
                magicStoneLv3 = needleDeliveries * 12;
                gold = needleDeliveries * 1480;
                break;
            case 'totem':
                // トーテム25個(lv2:18,ゴールド2780)
                const totemDeliveries = Math.floor(count / 25);
                magicStoneLv2 = totemDeliveries * 18;
                gold = totemDeliveries * 2780;
                break;
            default:
                break;
        }

        setDeliveryResult(
            <>
                🟩 魔法石Lv2: <strong>{magicStoneLv2}</strong><br />
                🟦 魔法石Lv3: <strong>{magicStoneLv3}</strong><br />
                💰 ゴールド: <strong>{gold.toLocaleString()}</strong>
            </>
        );
    };

    // 武器のクオリティ別価格計算
    const calculateWeaponPrice = () => {
        const basePrice = parseFloat(price);
        if (isNaN(basePrice) || basePrice <= 0) {
            alert("⚠️ 正しい数値を入力してください！");
            return;
        }

        const qualities = ["SSS", "SS", "S", "A", "B", "C", "D", "E", "F"];
        const baseIndex = qualities.indexOf(quality);
        
        const results = qualities.map((q, i) => {
            const diff = i - baseIndex;
            const calculatedPrice = basePrice / Math.pow(2, diff);
            return {
                quality: q,
                price: Math.floor(calculatedPrice)
            };
        });

        setWeaponPriceResult(
            <table className="weapon-price-table">
                <thead>
                    <tr>
                        <th>クオリティ</th>
                        <th>価格</th>
                    </tr>
                </thead>
                <tbody>
                    {results.map((result, index) => (
                        <tr key={index}>
                            <td className={`quality-${result.quality}`}>{result.quality}</td>
                            <td>{formatPrice(result.price)}</td>
                        </tr>
                    ))}
                </tbody>
            </table>
        );
    };

    // 価格のフォーマット（カンマ区切りで表示）
    const formatPrice = (price) => {
        return price.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",");
    };

    return (
        <div className="game-item-calculator container">
            <h2>ゲーム内アイテム計算</h2>
            <label>🛠 計算の種類を選択:</label>
            <select value={calcType} onChange={(e) => setCalcType(e.target.value)}>
                <option value="magicStone">🔮 魔法石の強化</option>
                <option value="deliveryReward">📦 納品報酬計算</option>
                <option value="weaponPrice">💰 武器のクオリティ別価格計算</option>
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
            {calcType === 'deliveryReward' && (
                <div className="form-section">
                    <h3>📦 納品報酬計算</h3>
                    <label>納品アイテムの種類:</label>
                    <select value={deliveryItemType} onChange={(e) => setDeliveryItemType(e.target.value)}>
                        <option value="sandstone">砂岩</option>
                        <option value="sandyLeather">砂まみれの革</option>
                        <option value="poisonNeedle">毒針</option>
                        <option value="totem">トーテム</option>
                    </select>
                    
                    {deliveryItemType === 'sandstone' && (
                        <input
                            type="number"
                            placeholder="砂岩の数"
                            value={deliveryCount}
                            onChange={(e) => setDeliveryCount(e.target.value)}
                        />
                    )}
                    {deliveryItemType === 'sandyLeather' && (
                        <input
                            type="number"
                            placeholder="砂まみれの革の数"
                            value={deliveryCount}
                            onChange={(e) => setDeliveryCount(e.target.value)}
                        />
                    )}
                    {deliveryItemType === 'poisonNeedle' && (
                        <input
                            type="number"
                            placeholder="毒針の数"
                            value={deliveryCount}
                            onChange={(e) => setDeliveryCount(e.target.value)}
                        />
                    )}
                    {deliveryItemType === 'totem' && (
                        <input
                            type="number"
                            placeholder="トーテムの数"
                            value={deliveryCount}
                            onChange={(e) => setDeliveryCount(e.target.value)}
                        />
                    )}
                    
                    <button onClick={calculateDeliveryReward}>計算する</button>
                    <div className="result">{deliveryResult}</div>
                </div>
            )}
            {calcType === 'weaponPrice' && (
                <div className="form-section">
                    <h3>💰 武器のクオリティ別価格計算</h3>
                    <label>基準クオリティを選択:</label>
                    <select value={quality} onChange={(e) => setQuality(e.target.value)}>
                        <option value="SSS">SSS</option>
                        <option value="SS">SS</option>
                        <option value="S">S</option>
                        <option value="A">A</option>
                        <option value="B">B</option>
                        <option value="C">C</option>
                        <option value="D">D</option>
                        <option value="E">E</option>
                        <option value="F">F</option>
                    </select>
                    <input
                        type="number"
                        placeholder="価格を入力"
                        value={price}
                        onChange={(e) => setPrice(e.target.value)}
                    />
                    <button onClick={calculateWeaponPrice}>計算する</button>
                    <div className="result">{weaponPriceResult}</div>
                </div>
            )}
        </div>
    );
}

export default GameItemCalculator;
