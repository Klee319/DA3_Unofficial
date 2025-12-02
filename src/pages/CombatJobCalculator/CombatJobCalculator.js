import React, { useState, useMemo } from 'react';
import './CombatJobCalculator.css';
import CustomSelect from '../../components/CustomSelect/CustomSelect';

function CombatJobCalculator() {
    // タブの状態管理
    const [activeTab, setActiveTab] = useState('combat'); // 'combat' or 'delivery'
    
    // 共通の状態
    const [jobType, setJobType] = useState('special');
    const [currentJobLevel, setCurrentJobLevel] = useState('');
    const [targetJobLevel, setTargetJobLevel] = useState('');
    
    // 討伐系の状態
    const [serverBoost, setServerBoost] = useState(false);
    const [simultaneousSpawn, setSimultaneousSpawn] = useState(1);
    
    // 納品系の状態
    const [specifiedXP, setSpecifiedXP] = useState('');
    const [jobLevelResult, setJobLevelResult] = useState(null);
    const [combatResult, setCombatResult] = useState(null);

    // 討伐系のモブデータ（昇順）
    const combatMobs = useMemo(() => [
        {
            name: 'ストーンゴーレム',
            level: 'lv53~',
            baseExp: 127,
            questExp: 3000,
            questCount: 10,
            respawnTime: 60,
            hasQuest: true
        },
        {
            name: 'サンドマン',
            level: 'lv67~',
            baseExp: 85,
            respawnTime: null,
            hasQuest: false
        },
        {
            name: 'イグニス',
            level: 'lv70~',
            baseExp: 1890,
            gold: 100,
            respawnTime: { min: 13, max: 17 },
            hasQuest: false
        },
        {
            name: '番人',
            level: 'lv75~',
            baseExp: 2075,
            respawnTime: { min: 15, max: 20 },
            hasQuest: false
        },
        {
            name: 'ダルフガゼル',
            level: 'lv100~',
            baseExp: 440,
            respawnTime: 10,
            hasQuest: false
        },
        {
            name: '狂信者',
            level: 'lv100~',
            baseExp: 490,
            respawnTime: 10,
            hasQuest: false
        },
        {
            name: 'サンドリザード',
            level: 'lv100~',
            baseExp: 360,
            respawnTime: 10,
            hasQuest: false
        },
        {
            name: 'サンドスコーピオン',
            level: 'lv100~',
            baseExp: 360,
            respawnTime: 10,
            hasQuest: false
        }
    ], []);

    // 納品系のアイテムデータ
    const deliveryItems = useMemo(() => [
        { name: '砂岩納品', exp: 1030, gold: 2010, required: 30 },
        { name: '砂まみれの革納品', exp: 1330, gold: 2010, required: 30 },
        { name: '毒針納品', exp: 1480, gold: 3550, required: 30 },
        { name: 'トーテム納品', exp: 3190, gold: 3520, required: 25 },
        { name: '影の欠片納品', exp: 4290, gold: 4560, required: 5 },
        { name: '水の入った瓶納品', exp: 3870, gold: 3200, required: 32 }
    ], []);

    // 時間フォーマット関数（秒を時間・分・秒に変換）
    const formatTime = (totalSeconds) => {
        const hours = Math.floor(totalSeconds / 3600);
        const minutes = Math.floor((totalSeconds % 3600) / 60);
        const seconds = Math.floor(totalSeconds % 60);
        
        const parts = [];
        if (hours > 0) parts.push(`${hours} 時間`);
        if (minutes > 0) parts.push(`${minutes} 分`);
        if (seconds > 0 || parts.length === 0) parts.push(`${seconds} 秒`);
        
        return parts.join(' ');
    };

    // 経験値計算式
    const calculateFormula = (level, jobType) => {
        switch (jobType) {
            case "special":
                return level ** 2 + 4 * level + 1;
            case "first":
                return 2 * level ** 2 + 12 * level + 58;
            case "second":
                return 4 * level ** 2 + 64 * level + 2644;
            case "third":
                return 4 * level ** 2 + 116 * level + 4576;
            default:
                return 0;
        }
    };

    // 討伐系の計算
    const calculateCombat = () => {
        const x1 = parseInt(currentJobLevel);
        const x2 = parseInt(targetJobLevel);

        if (isNaN(x1) || isNaN(x2) || x1 >= x2) {
            alert("⚠️ 正しい数値を入力してください！");
            return;
        }

        let experienceNeeded = 0;
        const levelExps = []; // 各レベルの必要経験値を保存
        for (let i = x1; i < x2; i++) {
            const exp = calculateFormula(i, jobType);
            experienceNeeded += exp;
            levelExps.push(exp);
        }

        // サーバーブーストの適用
        const boostMultiplier = serverBoost ? 1.1 : 1;

        const results = combatMobs.map(mob => {
            const effectiveExp = mob.baseExp * boostMultiplier;
            // 各レベルごとに必要回数をceilしてsum（レベルアップ時に余剰経験値は切り捨てられるため）
            let killCount = levelExps.reduce((sum, exp) => sum + Math.ceil(exp / effectiveExp), 0);
            let questCount = 0;
            
            // ストーンゴーレムの特別処理（各レベルごとに計算）
            if (mob.hasQuest && mob.questCount) {
                // クエスト経験値にはブーストが乗らない
                const totalQuestExp = mob.questExp;
                let totalKills = 0;

                // 各レベルごとに必要な討伐数を計算
                for (const levelExp of levelExps) {
                    let levelTotalExp = 0;
                    while (levelTotalExp < levelExp) {
                        totalKills++;
                        levelTotalExp += effectiveExp;
                        if (totalKills % mob.questCount === 0) {
                            levelTotalExp += totalQuestExp;
                            questCount++;
                        }
                    }
                    // レベルアップ時に余剰経験値は切り捨て（次のレベルは0から）
                }
                killCount = totalKills;
            }
            
            // 効率時間の計算
            let efficiencyTime = 'データなし';
            if (mob.respawnTime) {
                if (typeof mob.respawnTime === 'number') {
                    if (mob.respawnTime === 10) {
                        // 10秒リスポーンのモブ
                        const spawnCount = parseInt(simultaneousSpawn) || 1;
                        const totalSeconds = Math.ceil(killCount / spawnCount) * mob.respawnTime;
                        const formatted = formatTime(totalSeconds);
                        efficiencyTime = spawnCount > 1
                            ? `${formatted}
(${spawnCount} 湧き同時)`
                            : `${formatted}
(1 湧き当たり)`;
                    } else if (mob.respawnTime === 60 && mob.hasQuest) {
                        // ストーンゴーレム: 10体で60秒
                        const cycles = Math.ceil(killCount / 10);
                        const totalSeconds = cycles * 60;
                        efficiencyTime = formatTime(totalSeconds);
                    } else {
                        efficiencyTime = formatTime(mob.respawnTime);
                    }
                } else if (mob.respawnTime.min && mob.respawnTime.max) {
                    // 範囲表記
                    const minTime = formatTime(killCount * mob.respawnTime.min);
                    const maxTime = formatTime(killCount * mob.respawnTime.max);
                    efficiencyTime = `${minTime} ~ ${maxTime}`;
                }
            }
            
            return {
                ...mob,
                killCount,
                questCount,
                efficiencyTime
            };
        });
        
        setCombatResult({ experienceNeeded, results });
    };

    // 納品系の計算
    const calculateDelivery = () => {
        const x1 = parseInt(currentJobLevel);
        const x2 = parseInt(targetJobLevel);
        const xp = parseInt(specifiedXP);

        if (isNaN(x1) || isNaN(x2) || x1 >= x2) {
            alert("⚠️ 正しい数値を入力してください！");
            return;
        }

        let experienceNeeded = 0;
        const levelExps = []; // 各レベルの必要経験値を保存
        for (let i = x1; i < x2; i++) {
            const exp = calculateFormula(i, jobType);
            experienceNeeded += exp;
            levelExps.push(exp);
        }

        const results = {};
        deliveryItems.forEach(item => {
            // 各レベルごとに必要回数をceilしてsum（レベルアップ時に余剰経験値は切り捨てられるため）
            const count = levelExps.reduce((sum, exp) => sum + Math.ceil(exp / item.exp), 0);
            results[item.name] = {
                count,
                required: item.required ? count * item.required : null,
                gold: count * item.gold
            };
        });

        // 指定XPの計算
        let specifiedXPTotal = 0;
        if (!isNaN(xp) && xp > 0) {
            // 各レベルごとに必要回数をceilしてsum
            specifiedXPTotal = levelExps.reduce((sum, exp) => sum + Math.ceil(exp / xp), 0);
        }
        
        setJobLevelResult({
            experienceNeeded,
            results,
            specifiedXPTotal
        });
    };

    // 計算実行
    const handleCalculate = () => {
        if (activeTab === 'combat') {
            calculateCombat();
        } else {
            calculateDelivery();
        }
    };

    return (
        <div className="combat-job-calculator">
            <div className="calculator-container">
                <h1 className="main-title">戦闘職レベル計算</h1>
                
                {/* タブ */}
                <div className="tab-navigation">
                    <button 
                        className={`tab-button ${activeTab === 'combat' ? 'active' : ''}`}
                        onClick={() => setActiveTab('combat')}
                    >
                        討伐系
                    </button>
                    <button 
                        className={`tab-button ${activeTab === 'delivery' ? 'active' : ''}`}
                        onClick={() => setActiveTab('delivery')}
                    >
                        納品系
                    </button>
                </div>
                
                {/* 共通入力エリア */}
                <div className="input-card">
                    <CustomSelect
                        id="jobType"
                        label="職業タイプ"
                        value={jobType}
                        onChange={(e) => setJobType(e.target.value)}
                        options={[
                            { value: 'special', label: '特殊職' },
                            { value: 'first', label: '一次職' },
                            { value: 'second', label: '二次職' },
                            { value: 'third', label: '三次職' }
                        ]}
                    />
                    
                    <div className="form-row">
                        <div className="form-group">
                            <label htmlFor="currentLevel">現在のレベル</label>
                            <input
                                id="currentLevel"
                                type="number"
                                className="form-input"
                                placeholder="1"
                                value={currentJobLevel}
                                onChange={(e) => setCurrentJobLevel(e.target.value)}
                            />
                        </div>
                        <div className="form-group">
                            <label htmlFor="targetLevel">目標レベル</label>
                            <input
                                id="targetLevel"
                                type="number"
                                className="form-input"
                                placeholder="100"
                                value={targetJobLevel}
                                onChange={(e) => setTargetJobLevel(e.target.value)}
                            />
                        </div>
                    </div>
                    
                    {/* タブ別オプション */}
                    {activeTab === 'combat' ? (
                        <div className="tab-options">
                            <div className="checkbox-group">
                                <label className="checkbox-label">
                                    <input
                                        type="checkbox"
                                        className="form-checkbox"
                                        checked={serverBoost}
                                        onChange={(e) => setServerBoost(e.target.checked)}
                                    />
                                    <span className="checkbox-text">サーバーブースト (+10%)</span>
                                </label>
                            </div>
                            <div className="form-group">
                                <label htmlFor="simultaneousSpawn">同時湧き数 (10秒リスポーンのモブ用)</label>
                                <input
                                    id="simultaneousSpawn"
                                    type="number"
                                    className="form-input"
                                    min="1"
                                    max="10"
                                    value={simultaneousSpawn}
                                    onChange={(e) => setSimultaneousSpawn(e.target.value)}
                                />
                            </div>
                        </div>
                    ) : (
                        <div className="tab-options">
                            <div className="form-group">
                                <label htmlFor="specifiedXP">指定XP (任意)</label>
                                <input
                                    id="specifiedXP"
                                    type="number"
                                    className="form-input"
                                    placeholder="カスタム経験値"
                                    value={specifiedXP}
                                    onChange={(e) => setSpecifiedXP(e.target.value)}
                                />
                            </div>
                        </div>
                    )}
                    
                    <button className="calculate-button" onClick={handleCalculate}>
                        計算する
                    </button>
                </div>
                
                {/* 結果表示 */}
                {activeTab === 'combat' && combatResult && (
                    <div className="results-container">
                        <div className="result-header">
                            <h2>計算結果</h2>
                            <p className="exp-needed">必要経験値: <strong>{combatResult.experienceNeeded.toLocaleString()}</strong></p>
                        </div>
                        <div className="mob-grid">
                            {combatResult.results.map((mob, index) => (
                                <div key={index} className="mob-card">
                                    <h3 className="mob-name">{mob.name} {mob.level}</h3>
                                    <div className="mob-details">
                                        <div className="detail-row">
                                            <span className="detail-label">討伐:</span>
                                            <span className="detail-value">{mob.killCount.toLocaleString()} 回</span>
                                        </div>
                                        {mob.hasQuest && mob.questCount > 0 && (
                                            <div className="detail-row">
                                                <span className="detail-label">クエスト受注:</span>
                                                <span className="detail-value">{mob.questCount} 回</span>
                                            </div>
                                        )}
                                        <div className="detail-row efficiency" style={{ flexDirection: 'column', alignItems: 'flex-start' }}>
                                            <span className="detail-label">最高効率目安時間:</span>
                                            <span className="detail-value">{mob.efficiencyTime}</span>
                                        </div>
                                    </div>
                                </div>
                            ))}
                        </div>
                    </div>
                )}
                
                {activeTab === 'delivery' && jobLevelResult && (
                    <div className="results-container">
                        <div className="result-header">
                            <h2>計算結果</h2>
                            <p className="exp-needed">必要経験値: <strong>{jobLevelResult.experienceNeeded.toLocaleString()}</strong></p>
                        </div>
                        
                        <div className="delivery-grid">
                            {/* 納品アイテム */}
                            {deliveryItems.map((item, index) => (
                                <div key={index} className="delivery-card">
                                    <h3 className="delivery-name">{item.name}</h3>
                                    <div className="delivery-details">
                                        <div className="detail-row">
                                            <span className="detail-label">回数:</span>
                                            <span className="detail-value">{jobLevelResult.results[item.name].count.toLocaleString()} 回</span>
                                        </div>
                                        {jobLevelResult.results[item.name].required && (
                                            <div className="detail-row">
                                                <span className="detail-label">必要個数:</span>
                                                <span className="detail-value">{jobLevelResult.results[item.name].required.toLocaleString()} 個</span>
                                            </div>
                                        )}
                                        <div className="detail-row gold">
                                            <span className="detail-label">獲得Gold:</span>
                                            <span className="detail-value">{jobLevelResult.results[item.name].gold.toLocaleString()} G</span>
                                        </div>
                                    </div>
                                </div>
                            ))}
                            
                            {/* 指定XP */}
                            {jobLevelResult.specifiedXPTotal > 0 && (
                                <div className="delivery-card custom">
                                    <h3 className="delivery-name">指定XP ({specifiedXP} exp)</h3>
                                    <div className="delivery-details">
                                        <div className="detail-row">
                                            <span className="detail-label">回数:</span>
                                            <span className="detail-value">{jobLevelResult.specifiedXPTotal.toLocaleString()} 回</span>
                                        </div>
                                    </div>
                                </div>
                            )}
                        </div>
                    </div>
                )}
            </div>
        </div>
    );
}

export default CombatJobCalculator;