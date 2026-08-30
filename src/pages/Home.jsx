import CaveBackground from '../components/CaveBackground'
import Header from '../components/Header'
import Hero from '../components/Hero'
import Features from '../components/Features'
import About from '../components/About'
import Servers from '../components/Servers'
import PremiumSection from '../components/PremiumSection'
import Footer from '../components/Footer'

export default function Home() {
  return (
    <>
      <CaveBackground />
      <div className="relative overflow-x-hidden z-1">
        <Header />
        <Hero />
        <Features />
        <About />
        <Servers />
        <PremiumSection />
        <Footer />
      </div>
    </>
  )
}
