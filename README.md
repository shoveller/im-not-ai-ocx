# im-not-ai-ocx

Hono + Cloudflare Workers(+Vite) 기반의 **im-not-ai 전용 OCX registry** 입니다.

이 registry는 `epoko77-ai/im-not-ai`를 OpenCode/OCX profile로 패키징합니다.

- Original project: <https://github.com/epoko77-ai/im-not-ai>
- Original license: MIT License, Copyright (c) 2026 epoko77-ai
- Registry repo: <https://github.com/shoveller/im-not-ai-ocx>

## 주요 엔드포인트

- `GET /.well-known/ocx.json` : registry discovery 문서
- `GET /index.json` : **OCX v2 registry manifest** (`$schema`, `name`, `version`, `author`, `components[]`)
- `GET /components/{name}.json` : **npm-style packument** (`dist-tags.latest`, `versions[version]`)
- `GET /components/{name}/{path}` : 컴포넌트 파일 내용
- `GET /help` : **도움말** (설치 가이드 포함)

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

Cloudflare 인증/권한이 설정되어 있어야 합니다.
