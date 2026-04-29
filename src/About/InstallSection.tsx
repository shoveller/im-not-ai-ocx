import { OsInstallCard } from './OsInstallCard'

const sharedCommands = [
  'node --version # Node.js 20+ 권장',
  'npm i -g opencode-ai',
  'npm i -g ocx',
  'ocx profile add im-not-ai --source im-not-ai-ocx/im-not-ai --from https://im-not-ai-ocx.illuwa.click --global',
  'ocx opencode -p im-not-ai'
]

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
    </section>
  )
}
