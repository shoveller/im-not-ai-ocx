# im-not-ai-ocx

Hono + Cloudflare Workers(+Vite) 기반의 **im-not-ai 전용 OCX registry** 입니다.

이 registry는 원 프로젝트 [`epoko77-ai/im-not-ai`](https://github.com/epoko77-ai/im-not-ai)의 아이디어와 프롬프트/레퍼런스 자산을 존중하며, 이를 OpenCode/OCX profile 형태로 패키징한 비공식 포트입니다. 원 프로젝트의 설계와 축적된 한국어 AI 티 제거 노하우가 이 profile의 기반입니다.

- Original project: <https://github.com/epoko77-ai/im-not-ai>
- Original author/maintainer: [@epoko77-ai](https://github.com/epoko77-ai)
- Original license: MIT License, Copyright (c) 2026 epoko77-ai
- Registry repo: <https://github.com/shoveller/im-not-ai-ocx>

## Attribution

`im-not-ai-ocx`는 `epoko77-ai/im-not-ai`를 대체하거나 소유권을 주장하는 프로젝트가 아닙니다. 이 저장소의 목적은 원 저작자가 만든 `im-not-ai` 작업물을 OpenCode/OCX 사용자가 설치하기 쉽게 재패키징하는 것입니다.

원 저작자의 이름, 라이선스, 출처를 보존하며, upstream의 변경과 기여 내역을 존중합니다. 기능·문서·레퍼런스의 핵심 출처는 원 프로젝트에 있으며, 이 포트에서 발생한 변경은 OpenCode/OCX 배포 형식에 맞추기 위한 어댑터 성격의 수정입니다.

## 주요 엔드포인트

- `GET /.well-known/ocx.json` : registry discovery 문서
- `GET /index.json` : **OCX v2 registry manifest** (`$schema`, `name`, `version`, `author`, `components[]`)
- `GET /components/{name}.json` : **npm-style packument** (`dist-tags.latest`, `versions[version]`)
- `GET /components/{name}/{path}` : 컴포넌트 파일 내용
- `GET /help` : **도움말** (설치 가이드 포함)
- `GET /llms.txt` : LLM/AI 에이전트용 짧은 discovery 문서
- `GET /llms-full.txt` : LLM/AI 에이전트용 상세 문서와 설치 가이드
- `GET /robots.txt` : 크롤러 정책과 AI discovery 문서 위치

현재 컴포넌트:

- `im-not-ai` (profile): `epoko77-ai/im-not-ai`의 OpenCode용 한글 AI 티 제거 프로필 포트

## OCX bootstrap 예시

```sh
ocx profile add im-not-ai --source im-not-ai-ocx/im-not-ai --from https://im-not-ai-ocx.illuwa.click --global
```

## OCX 사용법

```sh
ocx opencode -p im-not-ai
```

OpenCode의 현재/전역 모델을 상속하며, profile 자체는 특정 모델을 할당하지 않습니다.

사용 예:

```text
/humanize [윤문할 한글 텍스트 또는 파일 경로]
/humanize-redo 번역투만 다시
```

## AI/LLM discovery

이 레지스트리는 AI 에이전트가 공개 문서와 설치 절차를 더 쉽게 이해하도록 아래 파일을 제공합니다.

- https://im-not-ai-ocx.illuwa.click/llms.txt
- https://im-not-ai-ocx.illuwa.click/llms-full.txt
- https://im-not-ai-ocx.illuwa.click/robots.txt

`llms.txt`는 강제 표준이 아니라 advisory 문서입니다. 접근 권한, rate limit, `robots.txt`를 우회하는 허가로 해석하면 안 됩니다.

## 로컬 실행

```sh
corepack pnpm install
corepack pnpm dev
```

## 테스트/검증

```sh
corepack pnpm eslint
corepack pnpm validate:registry
corepack pnpm test
corepack pnpm build
```

## 로컬 스모크 테스트

터미널 A:

```sh
corepack pnpm dev
```

터미널 B:

```sh
corepack pnpm smoke:local
corepack pnpm smoke:contract
# 또는 포트가 다르면
BASE_URL=http://127.0.0.1:8787 corepack pnpm smoke:local
BASE_URL=http://127.0.0.1:8787 corepack pnpm smoke:contract
```

## 배포

기본 라우팅은 `im-not-ai-ocx.illuwa.click` Custom Domain으로 설정되어 있습니다.

```sh
corepack pnpm run deploy
```

Cloudflare 인증/권한이 설정되어 있어야 합니다. `wrangler.jsonc`에는 공개 repo에 고정 account id를 두지 않습니다. 로컬에서는 `.env.example`을 복사해 `.env`를 만들고 `CLOUDFLARE_ACCOUNT_ID`를 설정하세요.

```sh
cp .env.example .env
# .env에서 CLOUDFLARE_ACCOUNT_ID 값을 채움
wrangler login # 또는 .env의 CLOUDFLARE_API_TOKEN 사용
corepack pnpm run deploy
```
