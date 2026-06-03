import { InfiniteSlider } from '@/components/ui/infinite-slider';
import { ProgressiveBlur } from '@/components/ui/progressive-blur';

const FRAMEWORKS = [
  'ESRS',
  'CSRD',
  'EU TAXONOMY',
  'GRI',
  'ISSB',
  'SASB',
  'TCFD',
  'TNFD',
  'GHG PROTOCOL',
  'SBTi',
];

export default function FrameworkMarquee() {
  return (
    <div className="framework-strip">
      <div className="framework-label-col">
        <span className="framework-label">
          Built on the standards that matter
        </span>
      </div>
      <div className="framework-slider-col">
        <ProgressiveBlur direction="left" width="80px" />
        <InfiniteSlider speed={40} speedOnHover={20} gap={64}>
          {FRAMEWORKS.map((fw) => (
            <span key={fw} className="framework-item">
              {fw}
            </span>
          ))}
        </InfiniteSlider>
        <ProgressiveBlur direction="right" width="80px" />
      </div>
    </div>
  );
}
