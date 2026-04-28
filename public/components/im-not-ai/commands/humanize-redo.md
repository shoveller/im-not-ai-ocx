---
description: 가장 최근 윤문 결과를 2차로 다시 다듬기
agent: humanize-orchestrator
---

# /humanize-redo — 2차 윤문 / 부분 재실행

가장 최근 cwd 기준 `_workspace/{run_id}/`를 찾아 이전 윤문 결과를 다시 다듬는다.

## 사용자 지시

$ARGUMENTS

## 동작

1. cwd 기준 `_workspace/`에서 가장 최신 run 디렉토리를 찾는다.
2. 이전 실행이 없으면 “이전 실행이 없습니다. `/humanize`로 시작하세요”라고 안내한다.
3. 사용자 지시를 해석한다.
   - “번역투만”, “관용구만”, “이모지만” 등: 해당 카테고리만 재처리한다.
   - “이 문단만”, “두 번째 문단만” 등: 지정 범위만 재처리한다.
   - “강도 낮춰”, “보수적으로”: S1 중심으로 낮춘다.
   - “강도 높여”: S1+S2+S3까지 넓힌다.
   - “되돌려줘”: 의미 훼손 가능성이 있는 edit을 롤백한다.
   - 지시가 없거나 “2차 윤문”: 잔존 finding 전체 대상으로 round 2를 수행한다.
4. strict 모드로 `korean-style-rewriter`, `content-fidelity-auditor`, `naturalness-reviewer`를 사용한다.
5. 산출물은 기존 파일을 덮어쓰지 않고 `03_rewrite_v2.md`, `final_v2.md`처럼 버전 분리한다.
6. 최대 round 3까지만 반복하고, 이후에도 품질 문제가 남으면 사람 검토를 권한다.

## 원칙

- 원문의 의미와 수치, 고유명사, 직접 인용은 보존한다.
- 특정 모델을 지정하지 않는다. OpenCode의 현재/전역 모델을 상속한다.
