# OmniWallet 連携サンプル

OmniWalletの製品チームが公開する、署名付きWebhookのローカル実験と読み取り専用APIリクエストです。[詳しい英語版](README.md)

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
