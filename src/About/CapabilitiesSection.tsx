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
    <section class="about-section">
      <div class="section-heading">
        <p class="eyebrow">Use cases</p>
        <h2>이 registry로 한국어 AI 초안을 윤문할 수 있습니다</h2>
      </div>
      <div class="capability-grid">
        {capabilities.map(([title, description]) => (
          <article class="capability-card" key={title}>
            <h3>{title}</h3>
            <p>{description}</p>
          </article>
        ))}
      </div>
    </section>
  )
}
