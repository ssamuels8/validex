import Image from 'next/image';

interface GalleryItem {
  slug: string;
  title: string;
  description: string;
  image: string;
  tag: string;
}

const ITEMS: GalleryItem[] = [
  {
    slug: 'dws',
    title: 'DWS and the Elastic ESG Label',
    description:
      'DWS marketed €900bn as ESG-integrated while the SEC found it lacked adequate policies to support those claims. $19M penalty. The definition of sustainable was set by the seller.',
    image: 'https://images.unsplash.com/photo-1486406146926-c627a92ad1ab?w=800',
    tag: 'Asset Management · 2021',
  },
  {
    slug: 'sfdr',
    title: 'SFDR Article 9: The Downgrade Wave',
    description:
      '350+ funds reclassified in a single quarter after regulators clarified that "sustainable" meant something specific. Billions had flowed in on a label no one had verified.',
    image: 'https://images.unsplash.com/photo-1611974789855-9c2a0a7236a3?w=800',
    tag: 'Regulation · 2022',
  },
  {
    slug: 'aggregate-confusion',
    title: 'Aggregate Confusion: Ratings Divergence',
    description:
      'MIT Sloan, 2022: pairwise correlation between major ESG raters averages 0.5. The same company, rated wildly differently. No agreed standard exists.',
    image: 'https://images.unsplash.com/photo-1551288049-bebda4e38f71?w=800',
    tag: 'Research · 2022',
  },
  {
    slug: 'msci-mirage',
    title: "MSCI's ESG Mirage",
    description:
      'Bloomberg, 2021: MSCI upgrades driven by reduced risk to the company, not reduced harm to the world. The system measures the wrong variable and markets it as sustainability leadership.',
    image: 'https://images.unsplash.com/photo-1464938050520-ef2270bb8ce8?w=800',
    tag: 'Ratings · 2021',
  },
  {
    slug: 'verra',
    title: 'Verra Rainforest Offsets: Phantom Credits',
    description:
      'Guardian / Zeit investigation, 2023: 90%+ of Verra REDD+ credits represented no real avoided emissions. Companies met net-zero pledges with accounting constructs.',
    image: 'https://images.unsplash.com/photo-1448375240586-882707db888b?w=800',
    tag: 'Offsets · 2023',
  },
  {
    slug: 'volkswagen',
    title: 'Volkswagen and the DJSI: Leadership Exposed',
    description:
      'September 2015: VW ranked #1 among global automakers in the Dow Jones Sustainability Index. Weeks later: 11 million defeat devices. The rating rewarded what was reported, not what was real.',
    image: 'https://images.unsplash.com/photo-1605559424843-9e4c228bf1c2?w=800',
    tag: 'Automotive · 2015',
  },
];

export default function CaseStudies() {
  return (
    <section className="case-studies" id="case-studies">
      <div className="case-studies-header">
        <span className="section-label condensed">§ 03 — The Pattern</span>
        <h2 className="case-studies-title display">
          Six Failures. One Missing Instrument.
        </h2>
        <p className="case-studies-desc">
          The same pattern, documented across regulators, academics, and
          investigative journalists. The market accepted declaration as proof.
          It was not.
        </p>
      </div>

      <div className="gallery4-grid">
        {ITEMS.map((item) => (
          <a
            key={item.slug}
            href={`/case-studies/${item.slug}`}
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
              <span className="gallery4-tag condensed">{item.tag}</span>
              <div className="gallery4-title display">{item.title}</div>
              <p className="gallery4-desc">{item.description}</p>
            </div>
          </a>
        ))}
      </div>
    </section>
  );
}
