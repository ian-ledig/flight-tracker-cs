<div align="center">
  <img src="public/images/logo/logo.svg" alt="Flight Tracker Logo" width="150" />
  <h1>Flight Tracker (Frontend)</h1>
</div>

<p align="center">
  <a href="#english"><kbd>English</kbd></a>
  <a href="#japanese"><kbd>日本語</kbd></a>
</p>

## Demo <a id="demo"></a>
<div align="center">
  <video width="600" autoplay loop muted playsinline>
    <source src="public/demo/flight-tracker-demo.mp4" type="video/mp4">
    Your browser does not support the video tag. Please view the demo at <a href="public/demo/flight-tracker-demo.mp4">this link</a>.
  </video>
</div>

## Overview <a id="english"></a>
Flight Tracker is a modern, user-friendly web application built with Next.js, designed to help users search and track upcoming flights. Integrated with the `flight-tracker-ss` Spring Boot server ([GitHub](https://github.com/ian-ledig/flight-tracker-ss)), it provides real-time flight data, interactive KPI charts, detailed flight information, and flight path visualization on a map. Whether you're a frequent traveler, an airline professional, or planning your next trip, Flight Tracker offers a seamless experience to explore flight details efficiently.

## Features
- **Flight Search**: Search for upcoming flights using a two-letter IATA airline code (e.g., `AF` for Air France, `BA` for British Airways), with optional filters for flight number and long-haul flights.
- **KPI Charts**: View key performance indicators (KPIs) related to your flight search through interactive charts.
- **Flight Details**: Access detailed information about individual flights.
- **Flight Path Visualization**: Visualize flight routes on an interactive map.
- **Backend Integration**: Connects to the `flight-tracker-ss` Spring Boot server for reliable flight data ([GitHub](https://github.com/ian-ledig/flight-tracker-ss)).

## Prerequisites
- **Node.js**: Version 18.17 or higher (LTS recommended).
- **npm**: Version 9 or higher (comes with Node.js).
- **Git**: For cloning the repository.
- A modern web browser (e.g., Chrome, Firefox, Safari, Edge).
- Access to the `flight-tracker-ss` backend server ([GitHub](https://github.com/ian-ledig/flight-tracker-ss)).

## Installation
1. **Clone the Repository**:
   ```bash
   git clone https://github.com/ian-ledig/flight-tracker-cs.git
   cd flight-tracker-cs
   ```

2. **Install Dependencies**:
   ```bash
   npm install
   ```

3. **Configure the Backend**:
   Ensure the `flight-tracker-ss` backend server is running and properly configured (see [flight-tracker-ss README](https://github.com/ian-ledig/flight-tracker-ss)).

4. **Run the Application**:
   ```bash
   npm run dev
   ```
   Open `http://localhost:3000` in your browser to access the application.

## Usage
1. **Search for Flights**:
   - Enter a two-letter IATA airline code (e.g., `AF` for Air France).
   - Optionally, specify a flight number (e.g., `AF1234`) to narrow your search.
   - Use the long-haul filter to display only long-haul flights (typically over 6 hours).

2. **View Results**:
   - Explore KPIs through interactive charts generated from your search.
   - Click on a flight to view detailed information.
   - Visualize the flight path on an interactive map.

## Contributing
Contributions are welcome! Please fork the repository, create a feature branch, and submit a pull request with your changes. Ensure your code follows the project's coding standards and includes appropriate tests.

## License
This project is licensed under the MIT License. See the `LICENSE` file for details.

## Contact
For questions or feedback, please contact the project maintainer at [ian.ledigjp@gmail.com](mailto:ian.ledigjp@gmail.com).

---

<div align="center">
  <img src="public/images/logo/logo.svg" alt="フライトトラッカーロゴ" width="150" />
  <h1>フライトトラッカー（フロントエンド）</h1>
</div>

<p align="center">
  <a href="#english"><kbd>English</kbd></a>
  <a href="#japanese"><kbd>日本語</kbd></a>
</p>

## デモ <a id="japanese"></a>
<div align="center">
  <video width="600" autoplay loop muted playsinline>
    <source src="public/demo/flight-tracker-demo.mp4" type="video/mp4">
    ブラウザがビデオタグをサポートしていません。デモは<a href="public/demo/flight-tracker-demo.mp4">こちら</a>でご覧ください。
  </video>
</div>

## 概要
フライトトラッカーは、Next.jsで構築されたモダンで使いやすいウェブアプリケーションで、近日中のフライトを検索および追跡するために設計されています。Spring Bootサーバー（`flight-tracker-ss`）と統合されており（[GitHub](https://github.com/ian-ledig/flight-tracker-ss)）、リアルタイムのフライトデータ、インタラクティブなKPIチャート、フライトの詳細情報、インタラクティブなマップ上でのフライト経路の可視化を提供します。頻繁に旅行する方、航空業界のプロフェッショナル、または次の旅行を計画している方に最適なツールです。

## 機能
- **フライト検索**：2文字のIATA航空会社コード（例：エアフランスの`AF`、ブリティッシュエアウェイズの`BA`）を使用して近日中のフライトを検索。フライト番号や長距離フライトフィルターをオプションで使用可能。
- **KPIチャート**：検索に基づいた主要業績評価指標（KPI）をインタラクティブなチャートで確認。
- **フライト詳細**：個々のフライトの詳細情報を閲覧。
- **フライト経路の可視化**：インタラクティブなマップ上でフライトの経路を可視化。
- **バックエンド統合**：信頼性の高いフライトデータを提供するSpring Bootサーバー（`flight-tracker-ss`）と連携（[GitHub](https://github.com/ian-ledig/flight-tracker-ss)）。

## 前提条件
- **Node.js**：バージョン18.17以上（LTS推奨）。
- **npm**：バージョン9以上（Node.jsに付属）。
- **Git**：リポジトリのクローンに必要。
- モダンなウェブブラウザ（例：Chrome、Firefox、Safari、Edge）。
- `flight-tracker-ss`バックエンドサーバーへのアクセス（[GitHub](https://github.com/ian-ledig/flight-tracker-ss)）。

## インストール
1. **リポジトリをクローン**：
   ```bash
   git clone https://github.com/ian-ledig/flight-tracker-cs.git
   cd flight-tracker-cs
   ```

2. **依存関係をインストール**：
   ```bash
   npm install
   ```

3. **バックエンドの設定**：
   `flight-tracker-ss`バックエンドサーバーが動作し、適切に設定されていることを確認（[flight-tracker-ss README](https://github.com/ian-ledig/flight-tracker-ss)を参照）。

4. **アプリケーションの実行**：
   ```bash
   npm run dev
   ```
   ブラウザで`http://localhost:3000`を開いてアプリケーションにアクセス。

## 使用方法
1. **フライトの検索**：
   - 2文字のIATA航空会社コード（例：エアフランスの`AF`）を入力。
   - 必要に応じて、特定のフライト番号（例：`AF1234`）を指定して検索を絞り込み。
   - 長距離フライト（通常6時間以上）の表示に絞る長距離フィルターを使用。

2. **結果の確認**：
   - 検索に基づいたKPIをインタラクティブなチャートで確認。
   - フライトをクリックして詳細情報を閲覧。
   - インタラクティブなマップ上でフライト経路を可視化。

## 貢献
貢献を歓迎します！リポジトリをフォークし、機能ブランチを作成し、変更をプルリクエストとして提出してください。コードがプロジェクトのコーディング規範に従い、適切なテストを含んでいることを確認してください。

## ライセンス
このプロジェクトはMITライセンスの下でライセンスされています。詳細は`LICENSE`ファイルを参照してください。

## 連絡先
ご質問やフィードバックは、プロジェクトメンテナー（[ian.ledigjp@gmail.com](mailto:ian.ledigjp@gmail.com)）までご連絡ください。