# OmniWallet 연동 예제

OmniWallet 제품 팀이 공개하는 웹훅 서명 검증 실험과 읽기 전용 API 예제입니다. [자세한 영어 설명](README.md)

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
