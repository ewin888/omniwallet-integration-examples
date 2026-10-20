# OmniWallet integration examples

Reproduce payment-webhook signature mistakes locally, then inspect read-only sandbox API requests. Published by the OmniWallet product team.

[繁體中文](README.zh-TW.md) · [日本語](README.ja.md) · [한국어](README.ko.md)

## Try the offline lab

Use Node.js 22.18 or later. The published experiment was checked with Node.js 26.1.0. No account, API key, dependencies, network calls or funds are needed. You can inspect the source before running it; no package installation is required.

```sh
git clone https://github.com/ewin888/omniwallet-integration-examples.git
cd omniwallet-integration-examples
npm test
```

Or run only the experiment: `node examples/ipn-raw-body-lab.mjs`.

The lab prints `passed: 9` and `productionReady: false`. It demonstrates these distinct cases:

| Case | Expected lab result |
| --- | --- |
| Original UTF-8 body | Record for business validation |
| Identical bytes redelivered | Recognize exact redelivery |
| Amount changed, old signature | Reject signature |
| JSON reformatted, old signature | Reject signature |
| Short signature | Reject signature |
| Non-hex signature | Reject signature |
| Amount updated, same payment/status, new valid signature | Record for business validation |
| Valid signature, malformed JSON | Reject JSON |
| Receiver restarted, same body | Record again: memory deduplication was lost |

These labels belong to the lab, not the payment API. The signature format is OmniWallet HMAC-SHA512 with the `x-omni-sig` header; other providers may use different formats. Fixtures, identifiers and the sample secret are synthetic and intentionally public.

## Inspect the Postman collection

Import `postman/omniwallet-sandbox.collection.json`. Its default URL is the separate test environment. It contains only:

- `GET /v1/status` — public availability check.
- `GET /v1/currencies` — currency codes; requires your own sandbox key.
- `GET /v1/full-currencies` — network/contract details; requires your own sandbox key.

For the last two requests, create `omniwallet_sandbox_api_key` in your **local Postman Vault** and limit its allowed domain to `omniwallet-dev.ewin888.com`. Keep its real value out of collections, shared variables, screenshots and issues. Do not replace the sandbox URL with production while using a sandbox key.

`npm test` checks this collection offline and sends no requests. The public sandbox status was verified separately; the keyed examples have not been exercised with merchant credentials. This repository has not been published to Postman's API Network.

## What this example does not implement

The lab is not an HTTP receiver, payment SDK or production fulfilment service. A valid signature alone is not proof that an order is paid or may be fulfilled. The in-memory set does not provide durable deduplication, freshness or replay protection after restart. Plan durable receipt storage and transactional business idempotency; independently validate the order, currency, network, amount and authoritative payment state. No live payment, payout, custody or account-mutation operations are included.

## Further reading

- [Full experiment and explanation](https://omniwallet.ewin888.com/en/guides/verify-payment-webhooks-nodejs/?utm_source=github&utm_medium=organic_content&utm_campaign=integration_examples#run)
- [Official API reference](https://omniwallet.ewin888.com/docs/api/)
- [Merchant setup guide](https://omniwallet.ewin888.com/en/guides/accept-usdt-payments/)
- [Node.js timingSafeEqual documentation](https://nodejs.org/api/crypto.html#cryptotimingsafeequala-b)
- [Postman Local Vault documentation](https://learning.postman.com/docs/use/postman-vault/use-vault-secrets)

Product availability depends on the supported asset, network, account and market. This repository makes no promise of availability in every country. Questions about these examples can be filed as issues; omit keys and customer data. Product enquiries: service@ewin888.com.

## License and attribution

MIT license for the files in this repository. The main OmniWallet service and its source are not included or licensed by this repository. Examples and documentation were prepared with AI assistance and checked against the published product documentation and executable offline checks.
