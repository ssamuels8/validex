import Nav          from '@/components/Nav';
import Hero         from '@/components/Hero';
import WhoWeAre     from '@/components/WhoWeAre';
import Marquee      from '@/components/Marquee';
import CaseStudies  from '@/components/CaseStudies';
import System       from '@/components/System';
import Score        from '@/components/Score';
import CtaSection   from '@/components/CtaSection';
import Footer       from '@/components/Footer';
import SiteScripts  from '@/components/SiteScripts';

export default function Page() {
  return (
    <>
      <Nav />
      <Hero />
      <WhoWeAre />
      <Marquee />
      <CaseStudies />
      <System />
      <Score />
      <CtaSection />
      <Footer />
      <SiteScripts />
    </>
  );
}
