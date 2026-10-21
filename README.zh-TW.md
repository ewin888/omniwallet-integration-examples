# OmniWallet 串接範例

**[直接試玩 webhook 驗簽實驗 →](https://ewin888.github.io/omniwallet-integration-examples/)**

免安裝、免帳號，以四個模擬案例看懂 JSON 原始位元組如何影響簽章。互動頁目前為英文。

[![一個地址同時支援多條 EVM 鏈；僅限支援網路與幣種，圖片為概念示意。](assets/one-address-multiple-chains.png)](https://omniwallet.ewin888.com/zh-tw/coins/?lang=zh-tw&utm_source=github&utm_medium=organic_content&utm_campaign=multichain_image_github_20261021#lookup)

[查詢支援的幣種與網路](https://omniwallet.ewin888.com/zh-tw/coins/?lang=zh-tw&utm_source=github&utm_medium=organic_content&utm_campaign=multichain_image_github_20261021#lookup)

由 OmniWallet 產品團隊發布，提供可在本機重現的 webhook 署名驗證實驗與唯讀 API 範例。[完整英文說明](README.md)

## OmniWallet 是什麼？

**OmniWallet 是提供給商戶與開發者的加密貨幣收款平台。** 透過付款連結、託管收款頁、API 或 POS，商家可以接受 USDT、USDC 等支援的加密貨幣付款。

**一個地址同時支援多條鏈。** 支援的 EVM 相容鏈使用同一個收款地址，系統辨識實際入金網路；適用範圍依支援的網路與幣種而定。

- **接案者與工作室：** 直接傳送專案付款連結，不必先開發結帳網站。
- **電商與 SaaS 團隊：** 串接收款 API、託管結帳頁與署名付款通知，將付款資訊接回自己的系統。
- **實體商店：** 使用 POS 顯示付款 QR Code，並在商戶後台確認付款。

[認識 OmniWallet](https://omniwallet.ewin888.com/zh-tw/?utm_source=github&utm_medium=organic_content&utm_campaign=integration_examples) · [費率](https://omniwallet.ewin888.com/zh-tw/pricing/) · [支援幣種與網路](https://omniwallet.ewin888.com/zh-tw/coins/) · [API 文件](https://omniwallet.ewin888.com/docs/api/)

## 這個專案可以幫你做什麼？

選擇 API 幣種代碼前，可以先用免費的[幣種與網路查詢工具](https://omniwallet.ewin888.com/zh-tw/coins/?utm_source=github&utm_medium=organic_content&utm_campaign=asset_lookup_20261020#lookup)：搜尋 `USDT`、選擇網路，再比對顯示的代幣合約。不需要帳號、API 金鑰或連接錢包；工具查詢的是 OmniWallet 支援清單，不查詢餘額或轉帳。

準備把網站或應用程式接上 OmniWallet 時，可先用 webhook 實驗理解付款通知的驗證與重送，再用 Postman 範例查看測試 API、幣種、網路與代幣合約資料。離線實驗不需要 OmniWallet 帳號；查詢實際商戶 API 時，才需要獨立測試環境的帳號與金鑰。

如果你只想建立免寫程式的付款連結，可先看[商戶入門教學（英文）](https://omniwallet.ewin888.com/en/guides/accept-usdt-payments/)。

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
