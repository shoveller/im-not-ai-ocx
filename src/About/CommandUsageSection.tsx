const commands = [
  '/humanize 윤문할 한국어 초안',
  '/humanize ./draft.md 장르: 칼럼 강도: 보수',
  '/humanize ./draft.md --strict',
  '/humanize-redo 2차 윤문',
  '/humanize-redo 이 문단만 강도 낮춰'
]

export const CommandUsageSection = () => {
  return (
    <section class="about-section">
      <div class="section-heading">
        <p class="eyebrow">Commands</p>
        <h2>커맨드 사용법</h2>
      </div>
      <p>
        OpenCode 안에서 설치한 profile을 연 뒤 /humanize로 초벌 윤문을 시작하고,
        /humanize-redo로 최근 결과를 다시 다듬습니다.
      </p>
      <pre class="command-examples">
        <code>{commands.join('\n')}</code>
      </pre>
    </section>
  )
}
