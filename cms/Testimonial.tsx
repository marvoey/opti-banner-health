import { contentType, type ContentProps } from '@optimizely/cms-sdk';
import { getPreviewUtils } from '@optimizely/cms-sdk/react/server';
import { Heart } from 'lucide-react';

/**
 * Testimonial — a single highlighted quote + attribution. Reproduces the static
 * `app/_components/Testimonial.tsx` mock as an editable element block.
 */
export const TestimonialContentType = contentType({
  key: 'BannerDemoTestimonial',
  baseType: '_component',
  displayName: 'Testimonial',
  compositionBehaviors: ['elementEnabled'],
  properties: {
    quote: { type: 'string', displayName: 'Quote', group: 'demo', isLocalized: true },
    attribution: { type: 'string', displayName: 'Attribution', group: 'demo', isLocalized: true },
  },
});

type Props = { content: ContentProps<typeof TestimonialContentType> };

export default function Testimonial({ content }: Props) {
  const { pa } = getPreviewUtils(content);
  // Grid elements aren't wrapped by OptimizelyGridSection, so mark our own
  // editable block boundary from the composition node (no-op outside the grid).
  const block = (content as { __composition?: { key: string } }).__composition;

  return (
    <section {...pa(block)} className="py-20 bg-blue-50 border-y border-blue-100">
      <div className="container mx-auto px-4 text-center max-w-3xl">
        <Heart className="mx-auto text-blue-800 mb-6" size={40} />
        <h2 {...pa('quote')} className="text-3xl font-serif font-bold italic mb-6">
          {content.quote ? `“${content.quote}”` : ''}
        </h2>
        <p
          {...pa('attribution')}
          className="text-slate-600 font-bold uppercase tracking-widest text-sm"
        >
          {content.attribution}
        </p>
      </div>
    </section>
  );
}
