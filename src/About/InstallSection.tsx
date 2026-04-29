import { OsInstallCard } from './OsInstallCard'

const sharedCommands = [
  'node --version # Node.js 20+ 권장',
  'npm i -g opencode-ai',
  'npm i -g ocx',
  'ocx profile add im-not-ai --source im-not-ai-ocx/im-not-ai --from https://im-not-ai-ocx.illuwa.click --global',
  'ocx opencode -p im-not-ai'
]

const llmInstallMarkdown = `# im-not-ai-ocx 설치 지원 지침

당신은 OpenCode/OCX 설치를 도와주는 LLM입니다. 사용자의 운영체제가 WSL2 Ubuntu 또는 macOS라고 가정하고, 아래 순서로 짧고 안전하게 안내하세요.

## 목표

OpenCode에서 한국어 AI 초안을 자연스럽게 윤문하는 im-not-ai OCX profile을 설치하고 실행합니다.

## 설치 순서

1. Node.js 20 이상인지 확인합니다.

\`\`\`bash
node --version
\`\`\`

2. OpenCode CLI와 OCX CLI를 설치합니다.

\`\`\`bash
npm i -g opencode-ai
npm i -g ocx
\`\`\`

3. im-not-ai profile을 OCX registry에서 설치합니다.

\`\`\`bash
ocx profile add im-not-ai --source im-not-ai-ocx/im-not-ai --from https://im-not-ai-ocx.illuwa.click --global
\`\`\`

4. 설치가 끝나면 \`ocx opencode -p im-not-ai\`로 실행을 확인하세요.

\`\`\`bash
ocx opencode -p im-not-ai
\`\`\`

## 사용 예시

OpenCode가 열린 뒤 아래처럼 요청합니다.

\`\`\`text
/humanize 윤문할 한국어 초안
/humanize ./draft.md 장르: 칼럼 강도: 보수
/humanize ./draft.md --strict
\`\`\`

## 주의

- 원문 의미, 수치, 고유명사, 직접 인용은 바꾸지 않는 도구라고 설명하세요.
- 설치 실패 시 에러 전문, OS, Node.js 버전, npm 전역 설치 권한을 먼저 확인하세요.
`

const copyScript = `document.querySelectorAll('[data-copy-target]').forEach((button) => {
  button.addEventListener('click', async () => {
    const targetId = button.getAttribute('data-copy-target')
    const target = targetId ? document.getElementById(targetId) : null
    const text = target instanceof HTMLTextAreaElement ? target.value : target?.textContent ?? ''
    await navigator.clipboard.writeText(text)
    button.textContent = '복사 완료'
  })
})`

export const InstallSection = () => {
  return (
    <section class="about-section">
      <div class="section-heading">
        <p class="eyebrow">Install</p>
        <h2>WSL2와 macOS에서 같은 흐름으로 설치합니다</h2>
      </div>
      <OsInstallCard
        commands={sharedCommands}
        description="WSL2 Ubuntu와 macOS 터미널 모두 Node.js 준비 후 OpenCode, OCX, im-not-ai profile 순서로 설치합니다."
        title="WSL2 · macOS"
      />
      <div class="llm-install-copy">
        <div>
          <h3>LLM에게 설치를 맡길 때</h3>
          <p>
            아래 버튼으로 설치 지원용 마크다운을 복사한 뒤, 사용 중인 LLM에게
            그대로 붙여넣으세요.
          </p>
        </div>
        <button
          class="copy-markdown-button"
          data-copy-target="llm-install-markdown"
          type="button"
        >
          LLM용 설치 지침 복사
        </button>
      </div>
      <textarea class="sr-only" id="llm-install-markdown" readonly>
        {llmInstallMarkdown}
      </textarea>
      <script>{copyScript}</script>
    </section>
  )
}
