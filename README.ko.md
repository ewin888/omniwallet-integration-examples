# OmniWallet 연동 예제

**[브라우저에서 webhook 서명 실험하기 →](https://ewin888.github.io/omniwallet-integration-examples/)**

설치나 계정 없이 네 가지 모의 사례로 JSON 원시 바이트와 서명의 관계를 확인하세요. 실험 페이지는 영어입니다.

[![지원되는 여러 EVM 네트워크에서 하나의 수신 주소를 사용합니다. 개념 이미지입니다.](assets/one-address-multiple-chains.png)](https://omniwallet.ewin888.com/ko/coins/?lang=ko&utm_source=github&utm_medium=organic_content&utm_campaign=multichain_image_github_20261021#lookup)

[지원 코인과 네트워크 확인](https://omniwallet.ewin888.com/ko/coins/?lang=ko&utm_source=github&utm_medium=organic_content&utm_campaign=multichain_image_github_20261021#lookup)

OmniWallet 제품 팀이 공개하는 웹훅 서명 검증 실험과 읽기 전용 API 예제입니다. [자세한 영어 설명](README.md)

## OmniWallet이란?

**OmniWallet은 판매자와 개발자를 위한 암호화폐 결제 플랫폼입니다.** 결제 링크, 호스팅 결제 페이지, API 또는 POS를 통해 USDT와 USDC 등 지원하는 암호화폐로 대금을 받을 수 있습니다.

**하나의 입금 주소로 여러 체인을 지원합니다.** 지원되는 EVM 호환 체인에서 동일한 입금 주소를 사용하며, 실제 입금 네트워크를 식별합니다. 지원 범위는 네트워크와 자산에 따라 다릅니다.

- **프리랜서와 제작 업체:** 별도 결제 사이트를 개발하지 않고 프로젝트 결제 링크를 보낼 수 있습니다.
- **온라인 쇼핑몰과 SaaS 팀:** 결제 API나 호스팅 결제 페이지를 연동하고, 자체 시스템에서 서명된 결제 상태 알림을 받을 수 있습니다.
- **오프라인 매장:** POS로 결제 QR 코드를 표시하고 판매자 관리 화면에서 결제를 확인할 수 있습니다.

[OmniWallet 제품 소개](https://omniwallet.ewin888.com/ko/?utm_source=github&utm_medium=organic_content&utm_campaign=integration_examples) · [수수료](https://omniwallet.ewin888.com/ko/pricing/) · [지원 자산과 네트워크](https://omniwallet.ewin888.com/ko/coins/) · [API 문서](https://omniwallet.ewin888.com/docs/api/)

## 이 저장소는 언제 사용하나요?

API 통화 코드를 선택하기 전에 무료 [지원 코인 및 네트워크 검색 도구](https://omniwallet.ewin888.com/ko/coins/?utm_source=github&utm_medium=organic_content&utm_campaign=asset_lookup_20261020#lookup)를 사용할 수 있습니다. `USDT`를 검색하고 네트워크를 선택한 뒤 표시된 토큰 컨트랙트를 비교하세요. 계정, API 키 또는 지갑 연결은 필요하지 않습니다. OmniWallet 지원 목록을 검색하며 잔액이나 송금 내역을 조회하지는 않습니다.

웹사이트나 앱을 OmniWallet에 연동하기 전에 웹훅 실험으로 서명 검증과 재전송 처리를 이해할 수 있습니다. Postman 예제에서는 테스트 API와 통화, 네트워크, 토큰 계약 정보를 조회하는 방법을 살펴볼 수 있습니다. 로컬 실험에는 계정이 필요하지 않습니다. 실제 판매자 API 응답을 확인하려면 별도의 테스트 환경 계정과 키를 사용하세요.

코드 없이 결제 링크를 만들려면 [판매자 시작 가이드(영어)](https://omniwallet.ewin888.com/en/guides/accept-usdt-payments/)를 참고하세요.

## 로컬에서 실행하기

Node.js 22.18 이상을 사용하세요. 실행 확인에는 26.1.0을 사용했습니다. 계정, API 키, 추가 패키지 또는 실제 결제가 필요하지 않습니다.

```sh
npm test
```

UTF-8 원문, 동일 본문 재전송, 금액 변조, JSON 재정렬, 잘못된 서명, 유효한 서명이 있는 금액 갱신, 손상된 JSON, 재시작으로 사라지는 중복 감지 기록을 포함한 9개 사례를 확인합니다. 결과는 `passed: 9`와 `productionReady: false`입니다.

## Postman 예제

`postman/omniwallet-sandbox.collection.json`을 가져오세요. 기본 주소는 별도의 테스트 환경이며 GET 요청 3개만 포함합니다. 상태 확인에는 키가 필요하지 않습니다. 통화 정보 조회에는 본인의 테스트 API 키를 로컬 Postman Vault에 `omniwallet_sandbox_api_key`라는 이름으로 저장하고 허용 도메인을 `omniwallet-dev.ewin888.com`으로 제한하세요. 실제 키를 공유 변수, 공개 파일 또는 이슈에 넣지 마세요. 테스트 명령은 외부 요청을 보내지 않습니다. 키가 필요한 요청은 판매자 인증 정보로 실행하지 않았습니다.

이 예제는 운영용 웹훅 서버가 아닙니다. 유효한 서명만으로 결제 완료나 상품 제공을 결정해서는 안 됩니다. 메모리 중복 감지는 영구 수신 기록과 업무 처리의 멱등성을 대신할 수 없습니다.

[공식 실험 설명](https://omniwallet.ewin888.com/en/guides/verify-payment-webhooks-nodejs/) · [API 문서](https://omniwallet.ewin888.com/docs/api/)

이 저장소의 파일에는 MIT 라이선스가 적용됩니다. 주요 제품의 소스 코드는 포함하지 않습니다. 예제와 문서는 AI의 도움을 받아 작성한 뒤 로컬 실행 및 공개 문서 대조를 거쳤습니다. 지원 네트워크, 자산, 이용 지역은 실제 서비스 조건을 확인하세요.
