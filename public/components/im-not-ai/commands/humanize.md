---
description: AI가 쓴 한글 텍스트를 자연스럽게 윤문
agent: humanize-orchestrator
---

# /humanize — 한글 AI 티 제거 파이프라인

`skills/humanize-korean/SKILL.md`와 이 프로필의 OpenCode agents를 사용해 인자로 전달된 한글 텍스트 또는 파일을 윤문한다.

## 입력

$ARGUMENTS

## 동작

1. 인자가 비었으면 “윤문할 텍스트를 붙여넣어 주세요”라고 안내하고 종료한다.
2. 인자가 `.txt` 또는 `.md` 파일 경로로 보이면 해당 파일을 읽어 원문으로 사용한다.
3. 인자가 텍스트면 그대로 원문으로 사용한다.
4. 현재 cwd 기준 `_workspace/{YYYY-MM-DD-NNN}/`를 만들고 `01_input.txt`에 원문을 저장한다.
5. 모드를 결정한다.
   - 기본: fast 모드 — `humanize-monolith`가 탐지, 윤문, 자체검증을 한 번에 수행한다.
   - `--strict`, “정밀 모드”, 8,000자 초과, 부분 재실행 요구: strict 모드 — `ai-tell-detector` → `korean-style-rewriter` → `content-fidelity-auditor` + `naturalness-reviewer` 순서로 수행한다.
6. 결과 파일을 작성한다.
   - `final.md`
   - `summary.md`
7. 사용자에게 윤문본, 변경률, 품질 등급, 주요 변경 요약을 간결히 반환한다.

## 옵션

- `장르: 칼럼|리포트|블로그|공적`
- `강도: 보수|기본|적극`
- `최소심각도: S1|S2|S3`
- `--strict`

## 원칙

- 사실, 주장, 수치, 날짜, 고유명사, 직접 인용은 보존한다.
- 탐지 근거 없는 구간은 임의로 고치지 않는다.
- 특정 모델을 지정하지 않는다. OpenCode의 현재/전역 모델을 상속한다.

## 참고

- 분류 체계: `skills/humanize-korean/references/ai-tell-taxonomy.md`
- 빠른 룰북: `skills/humanize-korean/references/quick-rules.md`
- 윤문 처방: `skills/humanize-korean/references/rewriting-playbook.md`
