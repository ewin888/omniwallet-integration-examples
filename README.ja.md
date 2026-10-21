# OmniWallet 連携サンプル

**[ブラウザーで webhook 署名を試す →](https://ewin888.github.io/omniwallet-integration-examples/)**

インストール・アカウント不要。4つのサンプルで JSON のバイト列と署名の関係を確認できます。実験ページは英語です。

[![対応する複数の EVM ネットワークで同じ受取アドレスを使用。概念図です。](assets/one-address-multiple-chains.png)](https://omniwallet.ewin888.com/ja/coins/?lang=ja&utm_source=github&utm_medium=organic_content&utm_campaign=multichain_image_github_20261021#lookup)

[対応する通貨とネットワークを確認](https://omniwallet.ewin888.com/ja/coins/?lang=ja&utm_source=github&utm_medium=organic_content&utm_campaign=multichain_image_github_20261021#lookup)

OmniWalletの製品チームが公開する、署名付きWebhookのローカル実験と読み取り専用APIリクエストです。[詳しい英語版](README.md)

## OmniWalletとは？

**OmniWalletは、加盟店と開発者向けの暗号資産決済プラットフォームです。** 決済リンク、ホスト型の決済ページ、API、POSを通じて、USDTやUSDCなどの対応する暗号資産で支払いを受け付けられます。

**1つの受取アドレスで、複数のチェーンに対応。** 対応するEVM互換チェーンで同じ受取アドレスを使い、実際に入金されたネットワークを識別します。対応範囲はネットワークと資産によって異なります。

- **フリーランスや制作会社：** 決済サイトを開発せずに、案件の決済リンクを送れます。
- **オンラインショップやSaaSチーム：** 決済APIやホスト型ページを導入し、署名付きの決済通知を自社のシステムで受信できます。
- **実店舗：** POSで支払い用QRコードを提示し、加盟店管理画面で入金を確認できます。

[OmniWalletの製品紹介](https://omniwallet.ewin888.com/ja/?utm_source=github&utm_medium=organic_content&utm_campaign=integration_examples) · [料金](https://omniwallet.ewin888.com/ja/pricing/) · [対応資産とネットワーク](https://omniwallet.ewin888.com/ja/coins/) · [API仕様](https://omniwallet.ewin888.com/docs/api/)

## このリポジトリの使いどころ

APIの通貨コードを選ぶ前に、無料の[対応通貨・ネットワーク検索](https://omniwallet.ewin888.com/ja/coins/?utm_source=github&utm_medium=organic_content&utm_campaign=asset_lookup_20261020#lookup)も利用できます。`USDT` を検索し、ネットワークを選んで、表示されたトークンコントラクトを照合してください。アカウント、APIキー、ウォレット接続は不要です。OmniWalletの対応一覧を検索するもので、残高や送金状況は確認できません。

自社サイトやアプリをOmniWalletに連携する前に、Webhook実験で署名検証と再送の扱いを確認できます。Postmanサンプルでは、テスト環境のAPIと通貨・ネットワーク・トークンコントラクトの取得方法を確認できます。ローカル実験にアカウントは不要です。実際の加盟店APIの確認には、独立したテスト環境のアカウントとキーを使います。

コードを書かずに決済リンクを作成したい場合は、[加盟店向けの導入ガイド（英語）](https://omniwallet.ewin888.com/en/guides/accept-usdt-payments/)から始めてください。

## ローカル実験

Node.js 22.18以降を使用します。実行確認は26.1.0で行いました。アカウント、APIキー、追加パッケージ、実際の決済は不要です。

```sh
npm test
```

UTF-8本文、同一本文の再送、金額の改変、JSONの再整形、不正な署名、正しい署名の付いた金額更新、壊れたJSON、再起動による重複検出の消失を9ケースで確認します。`passed: 9` と `productionReady: false` が出力されます。

## Postman

`postman/omniwallet-sandbox.collection.json` をインポートしてください。既定の接続先は独立したテスト環境で、GETリクエストは3件です。ステータス確認はキー不要です。通貨情報の取得には、自分のテスト用キーをローカルのPostman Vaultに `omniwallet_sandbox_api_key` として保存し、許可ドメインを `omniwallet-dev.ewin888.com` に限定します。実際のキーを共有変数や公開ファイルに保存しないでください。テストコマンドは外部通信を行いません。キーが必要なリクエストは加盟店の認証情報を使った検証を行っていません。

これは本番の受信サーバーではありません。正しい署名だけで決済完了や商品の提供を判断しないでください。メモリ上の重複検出は永続的な受信記録や業務処理の冪等性の代わりにはなりません。

[公式の実験解説](https://omniwallet.ewin888.com/en/guides/verify-payment-webhooks-nodejs/) · [API仕様](https://omniwallet.ewin888.com/docs/api/)

このリポジトリ内のファイルはMITライセンスです。主製品のソースコードは含みません。サンプルと文書はAIの補助を受け、ローカル実行と公開仕様の照合を行いました。対応ネットワーク、資産、利用地域には実際の提供条件が適用されます。
