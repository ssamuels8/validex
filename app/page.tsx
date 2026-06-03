import Nav          from '@/components/Nav';
import Preloader    from '@/components/Preloader';
import Hero         from '@/components/Hero';
import Manifesto    from '@/components/Manifesto';
import WhoWeAre     from '@/components/WhoWeAre';
import TheProblem   from '@/components/TheProblem';
import CaseStudies  from '@/components/CaseStudies';
import System       from '@/components/System';
import Score        from '@/components/Score';
import CtaSection   from '@/components/CtaSection';
import Footer       from '@/components/Footer';
import SiteScripts  from '@/components/SiteScripts';

export default function Page() {
  return (
    <>
      <Preloader />
      <Nav />
      <Hero />
      <Manifesto />
      <WhoWeAre />
      <TheProblem />
      <CaseStudies />
      <System />
      <Score />
      <CtaSection />
      <Footer />
      <SiteScripts />
    </>
  );
}
