import SmoothScroll  from '@/components/SmoothScroll';
import Preloader     from '@/components/Preloader';
import Cursor        from '@/components/Cursor';
import Nav           from '@/components/Nav';
import Hero          from '@/components/Hero';
import Marquee       from '@/components/Marquee';
import Problem       from '@/components/Problem';
import Evidence      from '@/components/Evidence';
import CaseStudies   from '@/components/CaseStudies';
import System        from '@/components/System';
import Score         from '@/components/Score';
import Momentum      from '@/components/Momentum';
import Team          from '@/components/Team';
import Access        from '@/components/Access';
import Footer        from '@/components/Footer';
import SiteScripts   from '@/components/SiteScripts';

export default function Page() {
  return (
    <SmoothScroll>
      <Preloader />
      <Cursor />
      <Nav />
      <Hero />
      <Marquee />
      <Problem />
      <Evidence />
      <CaseStudies />
      <System />
      <Score />
      <Momentum />
      <Team />
      <Access />
      <Footer />
      <SiteScripts />
    </SmoothScroll>
  );
}
