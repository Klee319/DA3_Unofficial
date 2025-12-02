import React from 'react';
import { Link } from 'react-router-dom';
import config from '../../config';
import './Home.css';

function Home() {
    return (
        <div className="home container">
            <img
                className="banner"
                src="/DA3top.png"
                alt="DA3 Support Tool Banner"
            />
            
            <div className="home-content">
                <section className="about-section">
                    <h2>このページについて</h2>
                    <p>DA3を遊んでいれば一度は欲しくなるようなサポート機能を掲載しています。現在は計算機だけですが随時追加予定です。</p>
                    <p className="usage-guide"><strong>使い方：</strong>使い方は簡単。メニューから利用したい計算機を選び指定された項目を入力します。最後に「計算をする」ボタンを押すだけです！</p>
                </section>

                <div className="calculator-cards">
                    <div className="card">
                        <h3>🧮 アイテム計算機</h3>
                        <p>武器合成を考慮した任意のランクまでの所要金額、成功率を考慮した強化に必要な魔法石の個数、砂岩納品で手に入る魔法石の個数の計算ができます。</p>
                        <Link to="/game-item" className="card-link">使ってみる →</Link>
                    </div>

                    <div className="card">
                        <h3>⚔️ 戦闘職計算機</h3>
                        <p>各段階ごとに任意のレベルを上げるのに必要な経験値及びそれを満たすための目安（砂岩/番人換算）が計算できます。</p>
                        <Link to="/combat-job" className="card-link">使ってみる →</Link>
                    </div>

                    <div className="card">
                        <h3>🛠 生産職計算機</h3>
                        <p>ギャザリング及びクラフトの任意のレベルを上げるのに必要な経験値や目安回数（採掘数や消費する砂塵Fツールの数）が計算できます。           </p>
                        <Link to="/production" className="card-link">使ってみる →</Link>
                    </div>

                    <div className="card card-external">
                        <div className="external-badge">外部サイト</div>
                        <h3>📊 DAビルド計算機</h3>
                        <p>役職とSP振り分けを設定し、実際にDAの装備を装着した際の火力やステータスの計算ができます。</p>
                        <a
                            href={config.externalLinks.buildCalculator}
                            target="_blank"
                            rel="noopener noreferrer"
                            className="card-link card-link-external"
                        >
                            外部サイトへ →
                        </a>
                    </div>
                </div>

                <div className="disclaimer">
                    <h4>免責事項</h4>
                    <ul>
                        <li>当サイトは非公式です。DA3公式運営とは一切関係がありません。</li>
                        <li>当サイトは鯖民の有志により成り立っています。</li>
                        <li>当サイトのサービスは予告なく終了する場合があります。</li>
                        <li>当サイトに関して生じたトラブル、ページの保守・更新等に関して作成者および貢献者は一切の責任を負いません。</li>
                    </ul>
                </div>
            </div>
        </div>
    );
}

export default Home;
