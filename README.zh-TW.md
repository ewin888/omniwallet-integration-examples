# OmniWallet 串接範例

由 OmniWallet 產品團隊發布，提供可在本機重現的 webhook 署名驗證實驗與唯讀 API 範例。[完整英文說明](README.md)

## 本機執行

使用 Node.js 22.18 以上版本；本次驗證使用 26.1.0。不需註冊、API 金鑰、安裝套件或真實付款。

```sh
npm test
```

九個案例涵蓋原始 UTF-8 內容、重送、金額竄改、JSON 重新排版、無效署名、有效的金額更新、損壞 JSON，以及程式重啟後失去記憶體去重紀錄。執行結果應有 `passed: 9` 與 `productionReady: false`。

## Postman 範例

匯入 `postman/omniwallet-sandbox.collection.json`。預設為獨立測試環境，僅含三個 GET 請求。狀態查詢免金鑰；幣種查詢須在本機 Postman Vault 設定自己的測試金鑰，名稱為 `omniwallet_sandbox_api_key`，限制允許網域為 `omniwallet-dev.ewin888.com`。不要把真實金鑰寫入公開檔案、共享變數或 issue。測試指令不會呼叫 API；需金鑰的請求尚未使用商戶憑證實測。

這是教學實驗，不是正式收款處理器。有效署名不等於付款完成；記憶體去重也不能取代持久化紀錄與業務冪等性。沒有代為收款、出款或修改帳戶的功能。

[官網完整實驗](https://omniwallet.ewin888.com/en/guides/verify-payment-webhooks-nodejs/) · [API 文件](https://omniwallet.ewin888.com/docs/api/)

本專案檔案採 MIT 授權；不含主產品服務原始碼。範例及文件由 AI 輔助整理，已進行離線執行與文件核對。支援的網路、幣種與可用地區仍以產品實際條件為準。
