import { AttributionSection } from './AttributionSection'
import { HeroSection } from './HeroSection'
import { InstallSection } from './InstallSection'
import { QuickLinksSection } from './QuickLinksSection'

export const About = () => {
  return (
    <main class="about-page">
      <HeroSection />
      <InstallSection />
      <AttributionSection />
      <QuickLinksSection />
    </main>
  )
}
