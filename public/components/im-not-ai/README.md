# im-not-ai OpenCode profile

OpenCode/OCX profile port of [`epoko77-ai/im-not-ai`](https://github.com/epoko77-ai/im-not-ai), a Korean AI-style humanizer.

## Policy

- No agent or command in this profile assigns a specific model.
- Agents inherit the active OpenCode/global model.
- The profile preserves the upstream fast/strict design:
  - fast: `humanize-monolith`
  - strict: detector → rewriter → fidelity auditor + naturalness reviewer

## Commands

```text
/humanize [윤문할 한글 텍스트 또는 파일 경로]
/humanize-redo [번역투만 다시 | 이 문단만 | 강도 낮춰 | 2차 윤문]
```

## Agents

- `humanize-orchestrator`
- `humanize-monolith`
- `ai-tell-detector`
- `korean-style-rewriter`
- `content-fidelity-auditor`
- `naturalness-reviewer`
- `korean-ai-tell-taxonomist`
- `humanize-web-architect`

## Attribution

This profile vendors and adapts prompts/references from `epoko77-ai/im-not-ai` at commit `f6f2082`.
