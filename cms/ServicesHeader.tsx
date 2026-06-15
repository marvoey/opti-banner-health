import { contentType, type ContentProps } from '@optimizely/cms-sdk';
import { getPreviewUtils } from '@optimizely/cms-sdk/react/server';

/**
 * Structured header for a Services Grid — the mock's left-aligned title +
 * description with a right-aligned "View All" CTA. An element block (dropped at
 * the top of a ServicesGrid section) so the header text is first-class,
 * inline-editable content rather than a loose rich-text block.
 */
export const ServicesHeaderContentType = contentType({
  key: 'BannerDemoServicesHeader',
  baseType: '_component',
  displayName: 'Services Header',
  compositionBehaviors: ['elementEnabled'],
  properties: {
    title: { type: 'string', displayName: 'Title', group: 'demo', isLocalized: true },
    description: { type: 'string', displayName: 'Description', group: 'demo', isLocalized: true },
    cta: { type: 'link', displayName: 'View-All CTA', group: 'demo', isLocalized: true },
  },
});

type Props = { content: ContentProps<typeof ServicesHeaderContentType> };

export default function ServicesHeader({ content }: Props) {
  const { pa } = getPreviewUtils(content);
  const block = (content as { __composition?: { key: string } }).__composition;
  const edit = (content as { __context?: { edit?: boolean } }).__context?.edit;
  const href = edit ? undefined : content.cta?.url?.default ?? undefined;
  const label = content.cta?.text || content.cta?.title;

  return (
    <div {...pa(block)} className="mb-12 flex items-end justify-between">
      <div className="max-w-xl">
        {content.title ? (
          <h2 {...pa('title')} className="mb-4 font-serif text-3xl font-bold text-slate-900">
            {content.title}
          </h2>
        ) : null}
        {content.description ? (
          <p {...pa('description')} className="text-slate-600">
            {content.description}
          </p>
        ) : null}
      </div>
      {href || label ? (
        <a {...pa('cta')} href={href} className="hidden font-bold text-blue-800 hover:underline sm:block">
          {label || 'View All Services'}
        </a>
      ) : null}
    </div>
  );
}
