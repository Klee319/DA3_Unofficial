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

    // 討伐Gold計算用の状態
    const [huntCalcMode, setHuntCalcMode] = useState('targetGold'); // 'targetGold' or 'targetTime'
    const [targetGold, setTargetGold] = useState('');
    const [targetTime, setTargetTime] = useState('');
    const [mobType, setMobType] = useState('fanatic');
    const [spawnCount, setSpawnCount] = useState('1');
    const [serverBoost, setServerBoost] = useState(false);
    const [huntResult, setHuntResult] = useState(null);

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
                <div className="result-item">
                    <span className="result-label">必要経験値量:</span>
                    <span className="result-value">{experienceNeeded.toFixed(2)}</span>
                </div>
                <div className="result-item">
                    <span className="result-label">必要魔法石数:</span>
                    <span className="result-value">{stoneCount}</span>
                </div>
                <div className="result-item">
                    <span className="result-label">魔法石(C):</span>
                    <span className="result-value">{stoneC}</span>
                </div>
                <div className="result-item">
                    <span className="result-label">魔法石(ST):</span>
                    <span className="result-value">{stoneST}</span>
                </div>
            </>
        );
    };

    const calculateDeliveryReward = () => {
        let count = parseInt(deliveryCount);
        if (isNaN(count) || count <= 0) {
            alert("⚠️ 正しい数値を入力してください！");
            return;
        }

        let exp = 0;
        let gold = 0;
        let deliveryUnit = 30; // デフォルトの納品単位

        switch (deliveryItemType) {
            case 'sandstone':
                // 砂岩納品30個(経験値870,ゴールド1060)
                const sandstoneDeliveries = Math.floor(count / 30);
                exp = sandstoneDeliveries * 870;
                gold = sandstoneDeliveries * 1060;
                break;
            case 'sandyLeather':
                // 砂まみれの革納品30個(経験値1290,ゴールド1360)
                const leatherDeliveries = Math.floor(count / 30);
                exp = leatherDeliveries * 1290;
                gold = leatherDeliveries * 1360;
                break;
            case 'poisonNeedle':
                // 毒針納品30個(経験値1470,ゴールド1480)
                const needleDeliveries = Math.floor(count / 30);
                exp = needleDeliveries * 1470;
                gold = needleDeliveries * 1480;
                break;
            case 'totem':
                // トーテム納品25個(経験値2220,ゴールド2780)
                deliveryUnit = 25;
                const totemDeliveries = Math.floor(count / 25);
                exp = totemDeliveries * 2220;
                gold = totemDeliveries * 2780;
                break;
            case 'shadowFragment':
                // 影の欠片納品5個(経験値4290,ゴールド4560)
                deliveryUnit = 5;
                const shadowDeliveries = Math.floor(count / 5);
                exp = shadowDeliveries * 4290;
                gold = shadowDeliveries * 4560;
                break;
            case 'waterBottle':
                // 水の入った瓶納品32個(経験値3870,ゴールド3200)
                deliveryUnit = 32;
                const waterDeliveries = Math.floor(count / 32);
                exp = waterDeliveries * 3870;
                gold = waterDeliveries * 3200;
                break;
            default:
                break;
        }

        const deliveries = Math.floor(count / deliveryUnit);
        const remaining = count % deliveryUnit;

        setDeliveryResult(
            <>
                <div className="result-item">
                    <span className="result-label">納品回数:</span>
                    <span className="result-value">{deliveries} 回</span>
                </div>
                <div className="result-item">
                    <span className="result-label">獲得経験値:</span>
                    <span className="result-value">{exp.toLocaleString()} exp</span>
                </div>
                <div className="result-item">
                    <span className="result-label">獲得ゴールド:</span>
                    <span className="result-value">{gold.toLocaleString()} gold</span>
                </div>
                {remaining > 0 && (
                    <div className="result-item warning">
                        <span className="result-label">余り:</span>
                        <span className="result-value">{remaining} 個</span>
                    </div>
                )}
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
            <div className="weapon-price-grid">
                {results.map((result, index) => (
                    <div key={index} className={`price-card quality-${result.quality}`}>
                        <div className="quality-badge">{result.quality}</div>
                        <div className="price-value">{formatPrice(result.price)}</div>
                    </div>
                ))}
            </div>
        );
    };

    // 討伐Gold計算
    const calculateHuntGold = () => {
        const mobData = {
            fanatic: { gold: 420, respawn: 10, name: '狂信者 lv100~' },
            sandLizard: { gold: 280, respawn: 10, name: 'サンドリザード lv100~' },
            sandScorpion: { gold: 280, respawn: 10, name: 'サンドスコーピオン lv100~' },
            darufGazelle: { gold: 420, respawn: 10, name: 'ダルフガゼル lv100~' }
        };

        const mob = mobData[mobType];
        const goldPerKill = serverBoost ? mob.gold * 1.1 : mob.gold;
        const spawn = parseInt(spawnCount) || 1;

        if (huntCalcMode === 'targetGold') {
            const gold = parseInt(targetGold);
            if (isNaN(gold) || gold <= 0) {
                alert("⚠️ 正しい目標Goldを入力してください！");
                return;
            }

            const killCount = Math.ceil(gold / goldPerKill);
            let timeSeconds;

            if (mob.respawn === 10 && spawn > 1) {
                // 10秒リスポーンで同時湧きがある場合
                const cyclesNeeded = Math.ceil(killCount / spawn);
                timeSeconds = cyclesNeeded * mob.respawn;
            } else {
                // それ以外の場合
                timeSeconds = killCount * mob.respawn;
            }

            const minutes = Math.floor(timeSeconds / 60);
            const seconds = Math.floor(timeSeconds % 60);

            setHuntResult(
                <>
                    <div className="result-item">
                        <span className="result-label">選択モブ:</span>
                        <span className="result-value">{mob.name}</span>
                    </div>
                    <div className="result-item">
                        <span className="result-label">討伐回数:</span>
                        <span className="result-value">{killCount} 回</span>
                    </div>
                    <div className="result-item">
                        <span className="result-label">必要時間:</span>
                        <span className="result-value">{minutes} 分 {seconds} 秒</span>
                    </div>
                    {serverBoost && (
                        <div className="result-item boost">
                            <span className="result-label">ブースト:</span>
                            <span className="result-value">+10% 適用中</span>
                        </div>
                    )}
                </>
            );
        } else {
            const timeMinutes = parseInt(targetTime);
            if (isNaN(timeMinutes) || timeMinutes <= 0) {
                alert("⚠️ 正しい目標時間を入力してください！");
                return;
            }

            const timeSeconds = timeMinutes * 60;
            let killCount;

            if (mob.respawn === 10 && spawn > 1) {
                // 10秒リスポーンで同時湧きがある場合
                const cycles = Math.floor(timeSeconds / mob.respawn);
                killCount = cycles * spawn;
            } else {
                // それ以外の場合
                killCount = Math.floor(timeSeconds / mob.respawn);
            }

            const totalGold = Math.floor(killCount * goldPerKill);

            setHuntResult(
                <>
                    <div className="result-item">
                        <span className="result-label">選択モブ:</span>
                        <span className="result-value">{mob.name}</span>
                    </div>
                    <div className="result-item">
                        <span className="result-label">討伐回数:</span>
                        <span className="result-value">{killCount} 回</span>
                    </div>
                    <div className="result-item">
                        <span className="result-label">獲得Gold:</span>
                        <span className="result-value">{totalGold.toLocaleString()} gold</span>
                    </div>
                    {serverBoost && (
                        <div className="result-item boost">
                            <span className="result-label">ブースト:</span>
                            <span className="result-value">+10% 適用中</span>
                        </div>
                    )}
                </>
            );
        }
    };

    // 価格のフォーマット（カンマ区切りで表示）
    const formatPrice = (price) => {
        return price.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",");
    };

    return (
        <div className="game-item-calculator">
            <div className="calculator-container">
                <h1 className="page-title">ゲーム内アイテム計算機</h1>

                <div className="calc-type-selector">
                    <button
                        className={`type-button ${calcType === 'magicStone' ? 'active' : ''}`}
                        onClick={() => setCalcType('magicStone')}
                    >
                        <span className="button-icon">🔮</span>
                        魔法石の強化
                    </button>
                    <button
                        className={`type-button ${calcType === 'deliveryReward' ? 'active' : ''}`}
                        onClick={() => setCalcType('deliveryReward')}
                    >
                        <span className="button-icon">📦</span>
                        納品報酬計算
                    </button>
                    <button
                        className={`type-button ${calcType === 'weaponPrice' ? 'active' : ''}`}
                        onClick={() => setCalcType('weaponPrice')}
                    >
                        <span className="button-icon">⚔️</span>
                        武器価格計算
                    </button>
                    <button
                        className={`type-button ${calcType === 'huntGold' ? 'active' : ''}`}
                        onClick={() => setCalcType('huntGold')}
                    >
                        <span className="button-icon">💰</span>
                        討伐Gold計算
                    </button>
                </div>

                {calcType === 'magicStone' && (
                    <div className="calc-card">
                        <h2 className="card-title">🔮 魔法石の強化</h2>
                        <div className="form-group">
                            <label className="form-label">現在のレベル</label>
                            <input
                                type="number"
                                className="form-input"
                                placeholder="例: 1"
                                value={currentLevel}
                                onChange={(e) => setCurrentLevel(e.target.value)}
                            />
                        </div>
                        <div className="form-group">
                            <label className="form-label">目標のレベル</label>
                            <input
                                type="number"
                                className="form-input"
                                placeholder="例: 50"
                                value={targetLevel}
                                onChange={(e) => setTargetLevel(e.target.value)}
                            />
                        </div>
                        <div className="form-group">
                            <label className="form-label">成功率(%)</label>
                            <input
                                type="number"
                                className="form-input"
                                placeholder="例: 80"
                                value={successRate}
                                onChange={(e) => setSuccessRate(e.target.value)}
                            />
                        </div>
                        <div className="form-group">
                            <label className="form-label">魔法石のレベル</label>
                            <input
                                type="number"
                                className="form-input"
                                placeholder="例: 1"
                                value={stoneLevel}
                                onChange={(e) => setStoneLevel(e.target.value)}
                            />
                        </div>
                        <button className="calc-button" onClick={calculateMagicStone}>計算する</button>
                        {magicStoneResult && (
                            <div className="result-card">{magicStoneResult}</div>
                        )}
                    </div>
                )}

                {calcType === 'deliveryReward' && (
                    <div className="calc-card">
                        <h2 className="card-title">📦 納品報酬計算</h2>
                        <div className="form-group">
                            <label className="form-label">納品アイテムの種類</label>
                            <select
                                className="form-select"
                                value={deliveryItemType}
                                onChange={(e) => setDeliveryItemType(e.target.value)}
                            >
                                <option value="sandstone">砂岩 (30個納品)</option>
                                <option value="sandyLeather">砂まみれの革 (30個納品)</option>
                                <option value="poisonNeedle">毒針 (30個納品)</option>
                                <option value="totem">トーテム (25個納品)</option>
                                <option value="shadowFragment">影の欠片 (5個納品)</option>
                                <option value="waterBottle">水の入った瓶 (32個納品)</option>
                            </select>
                        </div>
                        <div className="form-group">
                            <label className="form-label">アイテムの個数</label>
                            <input
                                type="number"
                                className="form-input"
                                placeholder={
                                    deliveryItemType === 'totem' ? "例: 25" :
                                    deliveryItemType === 'shadowFragment' ? "例: 5" :
                                    deliveryItemType === 'waterBottle' ? "例: 32" :
                                    "例: 30"
                                }
                                value={deliveryCount}
                                onChange={(e) => setDeliveryCount(e.target.value)}
                            />
                        </div>
                        <button className="calc-button" onClick={calculateDeliveryReward}>計算する</button>
                        {deliveryResult && (
                            <div className="result-card">{deliveryResult}</div>
                        )}
                    </div>
                )}

                {calcType === 'weaponPrice' && (
                    <div className="calc-card">
                        <h2 className="card-title">⚔️ 武器のクオリティ別価格計算</h2>
                        <div className="form-group">
                            <label className="form-label">基準クオリティ</label>
                            <select
                                className="form-select"
                                value={quality}
                                onChange={(e) => setQuality(e.target.value)}
                            >
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
                        </div>
                        <div className="form-group">
                            <label className="form-label">基準価格</label>
                            <input
                                type="number"
                                className="form-input"
                                placeholder="例: 10000"
                                value={price}
                                onChange={(e) => setPrice(e.target.value)}
                            />
                        </div>
                        <button className="calc-button" onClick={calculateWeaponPrice}>計算する</button>
                        {weaponPriceResult && (
                            <div className="result-card">{weaponPriceResult}</div>
                        )}
                    </div>
                )}

                {calcType === 'huntGold' && (
                    <div className="calc-card">
                        <h2 className="card-title">💰 討伐Gold計算</h2>

                        <div className="mode-selector">
                            <button
                                className={`mode-button ${huntCalcMode === 'targetGold' ? 'active' : ''}`}
                                onClick={() => setHuntCalcMode('targetGold')}
                            >
                                目標Goldから計算
                            </button>
                            <button
                                className={`mode-button ${huntCalcMode === 'targetTime' ? 'active' : ''}`}
                                onClick={() => setHuntCalcMode('targetTime')}
                            >
                                目標時間から計算
                            </button>
                        </div>

                        {huntCalcMode === 'targetGold' && (
                            <div className="form-group">
                                <label className="form-label">目標Gold</label>
                                <input
                                    type="number"
                                    className="form-input"
                                    placeholder="例: 10000"
                                    value={targetGold}
                                    onChange={(e) => setTargetGold(e.target.value)}
                                />
                            </div>
                        )}

                        {huntCalcMode === 'targetTime' && (
                            <div className="form-group">
                                <label className="form-label">目標時間（分）</label>
                                <input
                                    type="number"
                                    className="form-input"
                                    placeholder="例: 60"
                                    value={targetTime}
                                    onChange={(e) => setTargetTime(e.target.value)}
                                />
                            </div>
                        )}

                        <div className="form-group">
                            <label className="form-label">モブの種類</label>
                            <select
                                className="form-select"
                                value={mobType}
                                onChange={(e) => setMobType(e.target.value)}
                            >
                                <option value="fanatic">狂信者 lv100~ (420gold, 10秒)</option>
                                <option value="sandLizard">サンドリザード lv100~ (280gold, 10秒)</option>
                                <option value="sandScorpion">サンドスコーピオン lv100~ (280gold, 10秒)</option>
                                <option value="darufGazelle">ダルフガゼル lv100~ (420gold, 10秒)</option>
                            </select>
                        </div>

                        {['fanatic', 'sandLizard', 'sandScorpion', 'darufGazelle'].includes(mobType) && (
                            <div className="form-group">
                                <label className="form-label">同時湧き数</label>
                                <input
                                    type="number"
                                    className="form-input"
                                    placeholder="例: 2"
                                    value={spawnCount}
                                    onChange={(e) => setSpawnCount(e.target.value)}
                                    min="1"
                                />
                            </div>
                        )}

                        <div className="form-group checkbox-group">
                            <label className="checkbox-label">
                                <input
                                    type="checkbox"
                                    className="checkbox-input"
                                    checked={serverBoost}
                                    onChange={(e) => setServerBoost(e.target.checked)}
                                />
                                <span>サーバーブースト (+10%)</span>
                            </label>
                        </div>

                        <button className="calc-button" onClick={calculateHuntGold}>計算する</button>
                        {huntResult && (
                            <div className="result-card">{huntResult}</div>
                        )}
                    </div>
                )}
            </div>
        </div>
    );
}

export default GameItemCalculator;