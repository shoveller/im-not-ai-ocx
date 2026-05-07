const capabilities = [
  [
    '저렴한 모델로 초벌 윤문',
    'OpenCode의 현재 모델을 상속하므로 가벼운 모델로 먼저 빠르게 시도할 수 있습니다.'
  ],
  [
    '필요할 때만 강한 모델 사용',
    '중요한 글은 더 강한 모델이나 사람 검토로 마무리하는 비용 절감 흐름을 만들 수 있습니다.'
  ],
  [
    '원작의 수술적 접근 유지',
    '탐지된 AI 티 패턴에 근거해 필요한 부분만 다듬고 원문의 장르와 톤을 보존합니다.'
  ]
]

export const CapabilitiesSection = () => {
  return (
    <section
      class="about-section rounded-[2rem] border border-white/10 bg-white/[0.07]
        p-6 shadow-2xl shadow-black/25 backdrop-blur-xl sm:p-8"
    >
      <div class="section-heading space-y-3">
        <p
          class="eyebrow font-mono text-[0.68rem] font-bold uppercase
            tracking-[0.32em] text-teal-200"
        >
          Use cases
        </p>
        <h2
          class="font-serif text-3xl font-black tracking-[-0.05em]
            text-[#fff7df] sm:text-4xl"
        >
          이 registry로 한국어 AI 초안을 윤문할 수 있습니다
        </h2>
      </div>
      <div class="capability-grid mt-6 grid gap-4 md:grid-cols-3">
        {capabilities.map(([title, description]) => (
          <article
            class="capability-card rounded-[1.5rem] border border-teal-200/15
              bg-teal-200/[0.07] p-5 shadow-inner shadow-white/5"
            key={title}
          >
            <h3
              class="font-serif text-xl font-bold tracking-[-0.03em]
                text-teal-50"
            >
              {title}
            </h3>
            <p class="mt-3 text-sm leading-7 text-[#c7d7d1]">{description}</p>
          </article>
        ))}
      </div>
    </section>
  )
}
