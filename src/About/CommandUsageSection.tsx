const commands = [
  '/humanize 윤문할 한국어 초안',
  '/humanize ./draft.md 장르: 칼럼 강도: 보수',
  '/humanize ./draft.md --strict',
  '/humanize-redo 2차 윤문',
  '/humanize-redo 이 문단만 강도 낮춰'
]

export const CommandUsageSection = () => {
  return (
    <section class="about-section rounded-[2rem] border border-white/10 bg-white/[0.07] p-6 shadow-2xl shadow-black/25 backdrop-blur-xl sm:p-8">
      <div class="section-heading space-y-3">
        <p class="eyebrow font-mono text-[0.68rem] font-bold uppercase tracking-[0.32em] text-violet-200">
          Commands
        </p>
        <h2 class="font-serif text-3xl font-black tracking-[-0.05em] text-[#fff7df] sm:text-4xl">
          커맨드 사용법
        </h2>
      </div>
      <p class="mt-4 text-base leading-8 text-[#d8ceb8]">
        /humanize 커맨드로 문장을 다듬습니다.
      </p>
      <pre class="command-examples mt-5 max-w-full overflow-x-auto whitespace-pre-wrap rounded-[1.5rem] border border-violet-200/20 bg-black/45 p-5 text-sm leading-7 text-violet-100 shadow-inner shadow-black/40">
        <code class="font-mono whitespace-pre-wrap break-words text-[0.82rem] leading-7 text-violet-100 sm:text-sm">
          {commands.join('\n')}
        </code>
      </pre>
    </section>
  )
}
