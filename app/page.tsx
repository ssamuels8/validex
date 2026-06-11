import Nav              from '@/components/Nav';
import Preloader        from '@/components/Preloader';
import Hero             from '@/components/Hero';
import FrameworkMarquee from '@/components/FrameworkMarquee';
import Manifesto        from '@/components/Manifesto';
import WhoWeAre     from '@/components/WhoWeAre';
import TheProblem   from '@/components/TheProblem';
import SupplyChain  from '@/components/SupplyChain';
import CaseStudies  from '@/components/CaseStudies';
import System       from '@/components/System';
import Score        from '@/components/Score';
import ApplySection from '@/components/ApplySection';
import Footer       from '@/components/Footer';
import SiteScripts  from '@/components/SiteScripts';

export default function Page() {
  return (
    <>
      <Preloader />
      <Nav />
      <Hero />
      <FrameworkMarquee />
      <Manifesto />
      <WhoWeAre />
      <TheProblem />
      <SupplyChain />
      <CaseStudies />
      <System />
      <Score />
      <ApplySection />
      <Footer />
      <SiteScripts />
    </>
  );
}
