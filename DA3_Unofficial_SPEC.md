# DA3_Unofficial 技術仕様書

**バージョン**: 1.0
**最終更新日**: 2025-11-16
**作成方式**: アプローチA (既存コードベース解析)

---

## 1. プロジェクト概要

### 1.1 目的
DA3（Dragon's Amulet 3）ゲームプレイヤー向けの非公式サポートツール。ゲーム内で頻繁に必要となる各種計算を自動化し、プレイヤーの効率的なゲーム進行をサポートする。

### 1.2 対象ユーザー
- DA3ゲームのプレイヤー
- 装備強化、職業レベリング、生産活動を行うユーザー

### 1.3 プロジェクト位置づけ
- 非公式ツール（公式運営とは無関係）
- コミュニティ有志による開発・運営
- GitHub Pages でホスティング

---

## 2. 技術スタック

### 2.1 フロントエンド
| 技術 | バージョン | 用途 |
|:---|:---:|:---|
| **React** | 19.0.0 | UIフレームワーク |
| **React DOM** | 19.0.0 | DOM操作 |
| **React Router DOM** | 7.4.0 | クライアントサイドルーティング |
| **React Scripts** | 5.0.1 | ビルドツール（Create React App） |

### 2.2 開発・テスト環境
| 技術 | バージョン | 用途 |
|:---|:---:|:---|
| **@testing-library/react** | 16.2.0 | Reactコンポーネントテスト |
| **@testing-library/jest-dom** | 6.6.3 | JestマッチャーDOM拡張 |
| **@testing-library/user-event** | 13.5.0 | ユーザーイベントシミュレーション |
| **@testing-library/dom** | 10.4.0 | DOM要素テスト |
| **web-vitals** | 2.1.4 | パフォーマンス計測 |

### 2.3 ビルド・デプロイ
- **Node.js** パッケージマネージャー: npm
- **ビルドツール**: Create React App (CRA)
- **ホスティング**: GitHub Pages (推測: CNAMEファイル存在)
- **カスタムドメイン**: CNAMEファイルで管理

---

## 3. プロジェクト構造

### 3.1 ディレクトリ構成

```
DA3_Unofficial/
├── public/                    # 静的ファイル
│   ├── index.html            # HTMLエントリポイント
│   ├── favicon.ico           # ファビコン
│   ├── logo128.png           # ロゴ画像
│   ├── DA3top.png            # トップページバナー画像
│   ├── bars_24.svg           # ハンバーガーメニューアイコン
│   ├── 924_x_h.svg           # メニュー閉じるアイコン
│   ├── manifest.json         # PWAマニフェスト
│   └── robots.txt            # クローラー制御
├── src/                       # ソースコード
│   ├── index.js              # Reactアプリケーションエントリポイント
│   ├── App.js                # ルートコンポーネント
│   ├── App.css               # グローバルスタイル
│   ├── components/           # 共通コンポーネント
│   │   ├── Header.js         # ヘッダーコンポーネント
│   │   ├── Header.css        # ヘッダースタイル
│   │   ├── Footer.js         # フッターコンポーネント
│   │   └── Footer.css        # フッタースタイル
│   └── pages/                # ページコンポーネント
│       ├── Home/             # ホームページ
│       │   ├── Home.js
│       │   └── Home.css
│       ├── GameItemCalculator/      # ゲームアイテム計算機
│       │   ├── GameItemCalculator.js
│       │   └── GameItemCalculator.css
│       ├── CombatJobCalculator/     # 戦闘職計算機
│       │   ├── CombatJobCalculator.js
│       │   └── CombatJobCalculator.css
│       └── ProductionCalculator/    # 生産職計算機
│           ├── ProductionCalculator.js
│           └── ProductionCalculator.css
├── package.json              # npm依存関係定義
├── package-lock.json         # 依存関係ロックファイル
├── .gitignore                # Git除外設定
├── CNAME                     # カスタムドメイン設定
└── README.md                 # プロジェクト説明
```

### 3.2 ファイル命名規則
- **コンポーネント**: PascalCase (例: `GameItemCalculator.js`)
- **スタイルシート**: コンポーネント名と同一 (例: `GameItemCalculator.css`)
- **ページ**: ディレクトリ単位で管理、同名のJSとCSSファイルをペアで配置

---

## 4. 実装済み機能一覧

### 4.1 機能概要

| 機能ID | 機能名 | パス | 説明 |
|:---|:---|:---|:---|
| **F-01** | ホーム | `/` | サイト概要と各計算機への誘導 |
| **F-02** | アイテム計算機 | `/game-item` | 魔法石強化、納品報酬、武器価格計算 |
| **F-03** | 戦闘職計算機 | `/combat-job` | 戦闘職レベル経験値と必要素材計算 |
| **F-04** | 生産職計算機 | `/production` | 生産職レベル経験値と必要素材計算 |

---

### 4.2 F-01: ホームページ

**ファイル**: `src/pages/Home/Home.js`

#### 実装内容
- サイトバナー画像の表示 (`/DA3top.png`)
- サイト説明セクション
- 3つの計算機へのカードリンク
- 免責事項の表示

#### 表示要素
```
- バナー画像
- 「このページについて」セクション
  - サイト概要説明
  - 使い方ガイド
- 計算機カード (3種)
  - アイテム計算機
  - 戦闘職計算機
  - 生産職計算機
- 免責事項
  - 非公式であること
  - 有志による運営
  - サービス終了の可能性
  - 責任免除
```

---

### 4.3 F-02: ゲームアイテム計算機

**ファイル**: `src/pages/GameItemCalculator/GameItemCalculator.js`

#### 4.3.1 サブ機能: 魔法石の強化計算

**入力項目**:
| 項目名 | 型 | 必須 | 説明 |
|:---|:---:|:---:|:---|
| 現在のレベル | number | Yes | 装備の現在レベル |
| 目標のレベル | number | Yes | 強化目標レベル |
| 成功率(%) | number | Yes | 強化成功率（百分率） |
| 魔法石のレベル | number | Yes | 使用する魔法石のレベル |

**処理ロジック**:
```javascript
// 必要経験値の計算
experienceNeeded = 25 * ((a + (b - 1)) / 2) * (((b - 1) - a) + 1) + 1
// 成功率を考慮
experienceNeeded *= (successRate / 100)
// 必要魔法石数
stoneCount = Math.ceil(experienceNeeded / stoneLevel)
// 魔法石(C) = stoneCount / 1728
// 魔法石(ST) = stoneCount / 64
```
**※ a = currentLevel, b = targetLevel**

**出力**:
- 必要経験値量
- 必要魔法石数（個数）
- 魔法石(C)単位での個数
- 魔法石(ST)単位での個数

**バリデーション**:
- 全入力が数値であること
- 現在レベル < 目標レベル

---

#### 4.3.2 サブ機能: 納品報酬計算

**入力項目**:
| 項目名 | 型 | 選択肢 | 説明 |
|:---|:---:|:---|:---|
| 納品アイテムの種類 | select | 砂岩/砂まみれの革/毒針/トーテム | 納品するアイテム種別 |
| 納品数 | number | - | 納品するアイテムの個数 |

**処理ロジック**:
| アイテム | 納品単位 | 魔法石Lv2 | 魔法石Lv3 | ゴールド |
|:---|:---:|:---:|:---:|:---:|
| 砂岩 | 30個 | 20 | - | 1060 |
| 砂まみれの革 | 30個 | - | 12 | 1360 |
| 毒針 | 30個 | - | 12 | 1480 |
| トーテム | 25個 | 18 | - | 2780 |

```javascript
// 納品回数 = Math.floor(count / 納品単位)
// 報酬 = 納品回数 * 単位報酬
```

**出力**:
- 魔法石Lv2の個数
- 魔法石Lv3の個数
- 獲得ゴールド

---

#### 4.3.3 サブ機能: 武器のクオリティ別価格計算

**入力項目**:
| 項目名 | 型 | 選択肢 | 説明 |
|:---|:---:|:---|:---|
| 基準クオリティ | select | SSS/SS/S/A/B/C/D/E/F | 価格基準となるクオリティ |
| 価格 | number | - | 基準クオリティの価格 |

**処理ロジック**:
```javascript
// クオリティ間の価格比率は2倍
// 基準より1ランク上 = 価格 * 2
// 基準より1ランク下 = 価格 / 2
calculatedPrice = basePrice / Math.pow(2, diff)
// diff = 対象クオリティのインデックス - 基準クオリティのインデックス
```

**出力**:
- 全クオリティ（SSS～F）の価格テーブル

---

### 4.4 F-03: 戦闘職計算機

**ファイル**: `src/pages/CombatJobCalculator/CombatJobCalculator.js`

#### 入力項目
| 項目名 | 型 | 選択肢 | 説明 |
|:---|:---:|:---|:---|
| 職業タイプ | select | 特殊職/一次職/二次職/三次職 | 計算対象の職業種別 |
| 現在のレベル | number | - | 現在の職業レベル |
| 目標のレベル | number | - | 目標の職業レベル |
| 指定XP（任意） | number | - | カスタム経験値計算用（任意） |

#### 処理ロジック

**経験値計算式**（レベルxでの必要経験値y）:
```javascript
// 特殊職
y = x^2 + 4x + 1

// 一次職
y = 2x^2 + 12x + 58

// 二次職
y = 4x^2 + 64x + 2644

// 三次職
y = 4x^2 + 116x + 4576
```

**納品/討伐回数計算**:
| 項目 | 1回あたりXP | 納品単位 |
|:---|:---:|:---:|
| 砂岩 | 1030 | 30個 |
| 砂まみれの革 | 1330 | 30個 |
| 毒針 | 1480 | 30個 |
| トーテム | 3190 | 25個 |
| 番人 | 2075 | - |

```javascript
// 各レベル帯の合計経験値を計算
for (let i = currentLevel; i < targetLevel; i++) {
    y = formula(i);
    experienceNeeded += y;
    // 各納品アイテムの必要回数 = Math.ceil(y / XP単位)
}
```

#### 出力
- 必要経験値量
- 番人討伐回数
- 砂岩納品回数・個数
- 砂まみれの革納品回数・個数
- 毒針納品回数・個数
- トーテム納品回数・個数
- 指定XP回数（入力時のみ）

#### バリデーション
- 現在レベル < 目標レベル

---

### 4.5 F-04: 生産職計算機

**ファイル**: `src/pages/ProductionCalculator/ProductionCalculator.js`

#### 入力項目
| 項目名 | 型 | 選択肢 | 説明 |
|:---|:---:|:---|:---|
| カテゴリ | select | 武器/防具/道具/錬金/採掘/採取/釣り | 生産職種別 |
| 現在のレベル | number | 1～ | 現在の生産レベル |
| 目標のレベル | number | 1～ | 目標の生産レベル |

#### 処理ロジック

**経験値計算式**:
```javascript
// 武器
y = x^2 + 2x + 1

// 武器以外（防具/道具/錬金/採掘/採取/釣り）
y = x^2 + 4x + 1
```

**カテゴリ別計算**:

##### 4.5.1 武器・防具
```javascript
// 砂塵F作成回数 = Math.ceil(y / 114)
// 必要砂岩砂 = 砂塵F作成回数 * 20
```

##### 4.5.2 道具
```javascript
// 砂塵F作成回数 = Math.ceil(y / 69)
// 必要砂岩砂 = 砂塵F作成回数 * 15
```

##### 4.5.3 錬金
```javascript
// レベルごとの経験値計算
denominator = Math.round(level / 2) + Math.round(level / 2 + 3)
alchemyCount += Math.ceil(exp / denominator)

// 必要魔結晶数 = 錬金回数 * 5
// 必要金額 = 魔結晶数 * 500
```
**※ Quality:Fの初級攻撃力錬金の場合**

##### 4.5.4 採掘
| 採掘場所 | 1回あたりXP |
|:---|:---:|
| レポロ/マクルダ/ルーチェア | 5 |
| ソルソロ | 10 |
| サプネラ | 15 |

##### 4.5.5 採取
| 採取場所 | 1回あたりXP |
|:---|:---:|
| サプネラ以外 | 15 |
| サプネラ | 20 |

##### 4.5.6 釣り
```javascript
// 釣る回数 = Math.ceil(y / 5)
// 必要時間（秒） = 釣る回数 * 15
// 時間フォーマット: XX時間 XX分 XX秒
```

#### 出力
- 合計必要経験値
- カテゴリ別詳細情報
  - 武器/防具/道具: 砂塵F作成回数、必要砂岩砂数
  - 錬金: 錬金回数、必要魔結晶数、必要金額
  - 採掘: 各採掘場所の回数
  - 採取: 各採取場所の回数
  - 釣り: 釣る回数、必要時間

#### バリデーション
- 現在レベル < 目標レベル

---

## 5. アーキテクチャ

### 5.1 コンポーネント構成

```
App (ルート)
├── Header (共通)
│   └── ナビゲーションメニュー
│       - React Router Link
│       - レスポンシブハンバーガーメニュー
├── Routes (React Router)
│   ├── Home (/)
│   ├── GameItemCalculator (/game-item)
│   ├── CombatJobCalculator (/combat-job)
│   └── ProductionCalculator (/production)
└── Footer (共通)
    └── 著作権・貢献者情報
```

### 5.2 データフロー

#### 5.2.1 状態管理
- **React useState フック**を使用したローカル状態管理
- グローバル状態管理ライブラリは不使用
- 各ページコンポーネントが独立して状態を管理

#### 5.2.2 データの流れ
```
ユーザー入力
  ↓
React useState (状態更新)
  ↓
計算関数実行
  ↓
結果状態更新
  ↓
UI再レンダリング
```

#### 5.2.3 ルーティング
- **React Router DOM v7** を使用
- クライアントサイドルーティング (SPA)
- `<BrowserRouter>` による履歴管理

### 5.3 スタイリング戦略

#### 5.3.1 スタイル適用方法
- **CSS Modules**は不使用
- 通常のCSSファイルをインポート
- コンポーネント単位でCSSファイルを分離

#### 5.3.2 グローバルスタイル
**ファイル**: `src/App.css`

- ダークテーマ (`background-color: #121212`, `color: #f0f0f0`)
- フォント: `'Helvetica Neue', Arial, sans-serif`
- レスポンシブデザイン
  - 768px以下: `font-size: 14px`
  - 480px以下: `font-size: 12px`
  - タブレット横向き: `padding: 15px`
  - タブレット縦向き: `padding: 10px`

#### 5.3.3 レイアウト
- Flexbox レイアウト
- モバイルファースト設計
- 横スクロール防止 (`overflow-x: hidden`)
- フッター固定 (`padding-bottom: 80px`)

---

## 6. 環境構築

### 6.1 前提条件
- Node.js (推奨: LTS版)
- npm (Node.jsに同梱)
- Git (バージョン管理)

### 6.2 セットアップ手順

```bash
# 1. リポジトリクローン
git clone <リポジトリURL>
cd DA3_Unofficial

# 2. 依存関係インストール
npm install

# 3. 開発サーバー起動
npm start
# → http://localhost:3000 でアクセス可能
```

### 6.3 ビルド手順

```bash
# プロダクションビルド
npm run build
# → /build ディレクトリに静的ファイル生成
```

### 6.4 テスト実行

```bash
# テストランナー起動
npm test
```

### 6.5 デプロイ

**GitHub Pages デプロイ**:
1. `npm run build` でビルド
2. `/build` ディレクトリの内容をGitHub Pagesにプッシュ
3. CNAMEファイルでカスタムドメイン設定

---

## 7. コーディング規約

### 7.1 React コンポーネント

#### 7.1.1 コンポーネント定義
```javascript
// 関数コンポーネントを使用
function ComponentName() {
    // useState フックで状態管理
    const [state, setState] = useState(initialValue);

    // イベントハンドラー定義
    const handleEvent = () => {
        // 処理
    };

    return (
        <div className="component-name">
            {/* JSX */}
        </div>
    );
}

export default ComponentName;
```

#### 7.1.2 命名規則
- **コンポーネント名**: PascalCase
- **関数名**: camelCase
- **状態変数**: camelCase
- **CSS クラス名**: kebab-case

#### 7.1.3 状態管理パターン
```javascript
// 入力フォーム用の状態
const [inputValue, setInputValue] = useState('');

// 結果表示用の状態
const [result, setResult] = useState(null);

// セレクトボックス用の状態
const [selectValue, setSelectValue] = useState('defaultOption');
```

### 7.2 計算ロジック

#### 7.2.1 バリデーション
```javascript
// 必ず入力値を数値に変換
const numValue = parseInt(inputValue);

// NaN チェック
if (isNaN(numValue)) {
    alert("⚠️ 正しい数値を入力してください！");
    return;
}

// 範囲チェック
if (currentLevel >= targetLevel) {
    alert("⚠️ 正しい数値を入力してください！");
    return;
}
```

#### 7.2.2 計算結果の出力
```javascript
// JSX.Elementとして結果を設定
setResult(
    <>
        項目1: <strong>{value1}</strong><br />
        項目2: <strong>{value2}</strong>
    </>
);
```

### 7.3 CSS規約

#### 7.3.1 クラス命名
- コンポーネント名をベースにしたクラス名
- 例: `.game-item-calculator`, `.combat-job-calculator`

#### 7.3.2 レスポンシブデザイン
```css
/* モバイルファースト */
@media (max-width: 768px) {
    /* タブレット以下 */
}

@media (max-width: 480px) {
    /* スマートフォン */
}
```

---

## 8. 開発引継ぎ時の注意点

### 8.1 依存関係

#### 8.1.1 重要な依存関係
- **React 19.0.0**: 最新メジャーバージョン
  - React 19の新機能・破壊的変更に注意
- **React Router DOM 7.4.0**: ルーティングライブラリ
  - v6→v7のマイグレーションポイント確認必要
- **React Scripts 5.0.1**: CRA標準ビルドツール

#### 8.1.2 package.json の重要設定
```json
{
  "private": true,  // npmに公開しない
  "scripts": {
    "start": "react-scripts start",
    "build": "react-scripts build",
    "test": "react-scripts test",
    "eject": "react-scripts eject"  // ⚠️ 不可逆操作
  }
}
```

### 8.2 ビルドプロセス

#### 8.2.1 Create React App の制約
- Webpack/Babel設定はeject前は隠蔽されている
- カスタマイズが必要な場合は `npm run eject` 実行（不可逆）
- eject前は `react-scripts` の設定に従う

#### 8.2.2 ビルド出力
- `/build` ディレクトリ（.gitignoreで除外）
- 静的HTML/CSS/JSファイルとして出力
- GitHub Pagesに直接デプロイ可能

### 8.3 重要ファイル

#### 8.3.1 設定ファイル
| ファイル | 用途 | 重要度 |
|:---|:---|:---:|
| `package.json` | 依存関係・スクリプト定義 | ★★★ |
| `public/index.html` | HTMLエントリポイント | ★★★ |
| `src/index.js` | Reactエントリポイント | ★★★ |
| `src/App.js` | ルートコンポーネント | ★★★ |
| `.gitignore` | Git除外設定 | ★★ |
| `CNAME` | カスタムドメイン設定 | ★★ |

#### 8.3.2 静的リソース
- `/public` 配下のファイルはビルド時にそのままコピー
- JSX内での参照: `/filename.ext` （publicディレクトリからの相対パス）
- 例: `<img src="/DA3top.png" />`

### 8.4 計算ロジックの変更

#### 8.4.1 経験値計算式の変更
- 各計算機コンポーネント内に直接実装
- ゲームバランス変更時は該当コンポーネントを修正
- 変更箇所:
  - `GameItemCalculator.js`: 魔法石強化式
  - `CombatJobCalculator.js`: 職業別経験値式
  - `ProductionCalculator.js`: 生産別経験値式

#### 8.4.2 納品報酬・XP値の変更
- ハードコードされた定数を修正
- 例: `sandstoneDeliveries * 20` → 報酬個数
- 例: `Math.ceil(y / 1030)` → 納品XP値

### 8.5 Git履歴

#### 8.5.1 主要コミット
```
5f60570 錬金及び納品アイテムの追加
507546f 採取の出力結果ミスを修正
87b7d8b 経験値計算式を修正
9a8c051 計算機及びトップ画面の完成
```
※ 経験値計算式は過去に修正履歴あり（コミット87b7d8b）

### 8.6 ブラウザ対応

#### 8.6.1 対応ブラウザ（package.json browserslist）
**本番環境**:
- シェア0.2%以上
- メンテナンスされていないブラウザ除外
- Opera Mini除外

**開発環境**:
- Chrome最新版
- Firefox最新版
- Safari最新版

### 8.7 テスト

#### 8.7.1 テスト環境
- Jest + React Testing Library
- `npm test` で起動（watch mode）
- テストファイルの配置規則:
  - `*.test.js`
  - `*.spec.js`
  - `__tests__/` ディレクトリ

#### 8.7.2 現状のテスト実装
- 現状、明示的なテストコードは確認されていない
- テストライブラリは導入済み
- 新機能追加時はテストコード作成推奨

### 8.8 デバッグ・開発ツール

#### 8.8.1 開発モード
```bash
npm start
```
- ホットリロード有効
- ソースマップ有効
- エラーオーバーレイ表示

#### 8.8.2 ビルド最適化確認
```bash
npm run build
```
- 最小化・難読化
- ソースマップ削除
- ハッシュ付きファイル名

---

## 9. 既知の実装パターン

### 9.1 入力フォームパターン

```javascript
// セレクトボックス
<select value={state} onChange={(e) => setState(e.target.value)}>
    <option value="option1">Option 1</option>
</select>

// 数値入力
<input
    type="number"
    placeholder="プレースホルダー"
    value={state}
    onChange={(e) => setState(e.target.value)}
/>

// 計算ボタン
<button onClick={calculateFunction}>計算する</button>
```

### 9.2 結果表示パターン

```javascript
// 結果の状態
const [result, setResult] = useState(null);

// 結果設定
setResult(
    <>
        ラベル: <strong>{value}</strong><br />
    </>
);

// 結果表示
<div className="result">{result}</div>
```

### 9.3 ナビゲーションパターン

```javascript
// React Router Link
<Link to="/path" onClick={() => setMenuOpen(false)} className="nav-link">
    リンクテキスト
</Link>
```

### 9.4 レスポンシブメニューパターン

```javascript
// ハンバーガーメニュー状態
const [menuOpen, setMenuOpen] = useState(false);
const toggleMenu = () => setMenuOpen(!menuOpen);

// 条件付きクラス
<nav className={`nav ${menuOpen ? 'open' : ''}`}>

// メニューアイコン切り替え
{menuOpen ? (
    <img src="/924_x_h.svg" alt="Close Menu" />
) : (
    <img src="/bars_24.svg" alt="Open Menu" />
)}
```

---

## 10. パフォーマンス・セキュリティ

### 10.1 パフォーマンス

#### 10.1.1 実装済み最適化
- React StrictMode 有効（`src/index.js`）
- CSS最小化（ビルド時自動）
- 画像リソース最適化推奨（現状はPNG/SVG）

#### 10.1.2 改善検討事項
- 画像の遅延読み込み（lazy loading）
- コード分割（React.lazy / Suspense）
- バンドルサイズ分析

### 10.2 セキュリティ

#### 10.2.1 現状の実装
- クライアントサイドのみ（サーバーサイド処理なし）
- 外部APIとの通信なし
- ユーザーデータの保存なし

#### 10.2.2 注意点
- XSS対策: ReactのJSX自動エスケープに依存
- 入力値は全て計算のみに使用（外部送信なし）

---

## 11. ライセンス・貢献者

### 11.1 ライセンス
- **Creative Commons** (Footerに記載)

### 11.2 貢献者
- **Author**: Klee319 (Discord: klee.com)
- **Contributer**: ねきまり (Discord: nekimari)

### 11.3 免責事項
- DA3公式運営とは無関係
- 有志による運営
- サービス終了の可能性あり
- トラブル・保守に関する責任免除

---

## 12. トラブルシューティング

### 12.1 よくある問題

#### 12.1.1 `npm install` が失敗する
**原因**: Node.jsバージョン不一致、ネットワークエラー
**対処**:
```bash
# キャッシュクリア
npm cache clean --force

# node_modules削除して再インストール
rm -rf node_modules package-lock.json
npm install
```

#### 12.1.2 ビルドが失敗する
**原因**: メモリ不足、設定エラー
**対処**:
```bash
# メモリ制限を増やす
export NODE_OPTIONS="--max-old-space-size=4096"
npm run build
```

#### 12.1.3 ルーティングが404になる
**原因**: GitHub Pagesでのクライアントサイドルーティング
**対処**:
- `BrowserRouter` の `basename` プロパティ設定
- または `HashRouter` への変更検討

---

## 13. 今後の拡張検討事項

### 13.1 機能追加候補
- 計算履歴の保存機能（LocalStorage）
- 計算結果のエクスポート機能（CSV/JSON）
- ダークモード/ライトモード切り替え
- 複数言語対応（i18n）

### 13.2 技術的改善候補
- TypeScript導入
- 状態管理ライブラリ導入（Redux/Zustand）
- ユニットテスト充実
- E2Eテスト導入（Playwright/Cypress）
- PWA対応強化（オフライン動作）

### 13.3 UI/UX改善候補
- 入力値のバリデーション強化
- エラーメッセージの詳細化
- 計算結果のグラフ表示
- モバイルUX最適化

---

## 14. 参考リンク

### 14.1 公式ドキュメント
- [React 公式ドキュメント](https://react.dev/)
- [React Router 公式ドキュメント](https://reactrouter.com/)
- [Create React App 公式ドキュメント](https://create-react-app.dev/)

### 14.2 プロジェクト関連
- GitHub Pages デプロイガイド: [CRA Deployment](https://create-react-app.dev/docs/deployment/)
- ブラウザリスト設定: [Browserslist](https://github.com/browserslist/browserslist)

---

## 15. 改訂履歴

| 版 | 日付 | 変更内容 | 担当者 |
|:---|:---|:---|:---|
| 1.0 | 2025-11-16 | 初版作成（既存コードベース解析） | Claude Code |

---

**以上**
