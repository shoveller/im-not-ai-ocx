import { AttributionSection } from './AttributionSection'
import { CapabilitiesSection } from './CapabilitiesSection'
import { DefinitionSection } from './DefinitionSection'
import { HeroSection } from './HeroSection'
import { InstallSection } from './InstallSection'
import { QuickLinksSection } from './QuickLinksSection'

export const About = () => {
  return (
    <main class="about-page">
      <HeroSection />
      <DefinitionSection />
      <CapabilitiesSection />
      <InstallSection />
      <AttributionSection />
      <QuickLinksSection />
    </main>
  )
}
