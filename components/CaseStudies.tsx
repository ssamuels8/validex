import Image from 'next/image';

interface GalleryItem {
  id: string;
  title: string;
  description: string;
  href: string;
  image: string;
  tag: string;
}

const ITEMS: GalleryItem[] = [
  {
    id: 'dws',
    title: 'DWS and the Elastic ESG Label',
    description:
      'DWS marketed €900bn as ESG-integrated while the SEC found it lacked adequate policies to support those claims. $19M penalty. The definition of sustainable was set by the seller.',
    href: '#',
    image: 'https://images.unsplash.com/photo-1486406146926-c627a92ad1ab?w=800',
    tag: 'Asset Management · 2021',
  },
  {
    id: 'sfdr',
    title: 'SFDR Article 9: The Downgrade Wave',
    description:
      '350+ funds reclassified in a single quarter after regulators clarified that "sustainable" meant something specific. Billions had flowed in on a label no one had verified.',
    href: '#',
    image: 'https://images.unsplash.com/photo-1611974789855-9c2a0a7236a3?w=800',
    tag: 'Regulation · 2022',
  },
  {
    id: 'ratings',
    title: 'Aggregate Confusion: Ratings Divergence',
    description:
      'MIT Sloan, 2022: pairwise correlation between major ESG raters averages 0.5. The same company, rated wildly differently. No agreed standard exists.',
    href: '#',
    image: 'https://images.unsplash.com/photo-1551288049-bebda4e38f71?w=800',
    tag: 'Research · 2022',
  },
  {
    id: 'msci',
    title: "MSCI's ESG Mirage",
    description:
      'Bloomberg, 2021: MSCI upgrades driven by reduced risk to the company, not reduced harm to the world. The system measures the wrong variable and markets it as sustainability leadership.',
    href: '#',
    image: 'https://images.unsplash.com/photo-1464938050520-ef2270bb8ce8?w=800',
    tag: 'Ratings · 2021',
  },
  {
    id: 'verra',
    title: 'Verra Rainforest Offsets: Phantom Credits',
    description:
      'Guardian / Zeit investigation, 2023: 90%+ of Verra REDD+ credits represented no real avoided emissions. Companies met net-zero pledges with accounting constructs.',
    href: '#',
    image: 'https://images.unsplash.com/photo-1448375240586-882707db888b?w=800',
    tag: 'Offsets · 2023',
  },
  {
    id: 'vw',
    title: 'Volkswagen and the DJSI: Leadership Exposed',
    description:
      'September 2015: VW ranked #1 among global automakers in the Dow Jones Sustainability Index. Weeks later: 11 million defeat devices. The rating rewarded what was reported, not what was real.',
    href: '#',
    image: 'https://images.unsplash.com/photo-1605559424843-9e4c228bf1c2?w=800',
    tag: 'Automotive · 2015',
  },
];

export default function CaseStudies() {
  return (
    <section className="case-studies" id="case-studies">
      <div className="case-studies-header">
        <span className="section-label">§ 03b — The Pattern</span>
        <h2 className="case-studies-title display">
          Six Failures. One Missing Instrument.
        </h2>
        <p className="case-studies-desc">
          The same pattern, documented across regulators, academics, and investigative
          journalists. The market accepted declaration as proof. It was not.
        </p>
      </div>

      <div className="gallery4-grid">
        {ITEMS.map((item) => (
          <a
            key={item.id}
            href={item.href}
            className="gallery4-card"
            aria-label={item.title}
          >
            <Image
              src={item.image}
              alt={item.title}
              fill
              sizes="(max-width: 480px) 100vw, (max-width: 900px) 50vw, 33vw"
              className="gallery4-img"
              style={{ objectFit: 'cover' }}
            />
            <div className="gallery4-overlay" />
            <div className="gallery4-content">
              <span className="gallery4-tag mono">{item.tag}</span>
              <div className="gallery4-title display">{item.title}</div>
              <p className="gallery4-desc">{item.description}</p>
            </div>
          </a>
        ))}
      </div>
    </section>
  );
}
