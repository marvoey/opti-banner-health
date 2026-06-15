import { contentType, type ContentProps } from '@optimizely/cms-sdk';
import { getPreviewUtils } from '@optimizely/cms-sdk/react/server';
import Service, { ServiceContentType, type ServiceVariant } from './Service';
import { expandReferences, previewContextOf } from './expandRefs';

/**
 * Self-contained Services Grid — structured header + a curated list of Service
 * references. Demonstrates content REUSE: the same Service object can appear
 * here and anywhere else, edited once in the library.
 */
export const ServicesGridAutoContentType = contentType({
  key: 'BannerDemoServicesGridAuto',
  baseType: '_component',
  displayName: 'Services Grid (Auto)',
  compositionBehaviors: ['elementEnabled'],
  properties: {
    title: { type: 'string', displayName: 'Title', group: 'demo', isLocalized: true },
    description: { type: 'string', displayName: 'Description', group: 'demo', isLocalized: true },
    cta: { type: 'link', displayName: 'View-All CTA', group: 'demo', isLocalized: true },
    services: {
      type: 'array',
      displayName: 'Services',
      group: 'demo',
      isLocalized: true,
      items: { type: 'contentReference', allowedTypes: [ServiceContentType] },
    },
    cardStyle: {
      type: 'string',
      displayName: 'Card Style',
      description: 'How the referenced Service cards render — the same content, two presentations.',
      group: 'demo',
      isLocalized: true,
      enum: [
        { value: 'rich', displayName: 'Rich (icon + description)' },
        { value: 'simple', displayName: 'Simple (compact row)' },
      ],
    },
    columns: {
      type: 'string',
      displayName: 'Columns',
      description: 'Grid density at desktop width.',
      group: 'demo',
      isLocalized: true,
      enum: [
        { value: 'two', displayName: '2 columns' },
        { value: 'three', displayName: '3 columns' },
        { value: 'four', displayName: '4 columns' },
      ],
    },
  },
});

// Static class strings (Tailwind can't see interpolated names, so map to literals).
const GRID_COLS: Record<string, string> = {
  two: 'grid-cols-1 sm:grid-cols-2',
  three: 'grid-cols-1 sm:grid-cols-2 lg:grid-cols-3',
  four: 'grid-cols-2 md:grid-cols-3 lg:grid-cols-4',
};

type ServiceContent = Parameters<typeof Service>[0]['content'];
type Props = { content: ContentProps<typeof ServicesGridAutoContentType> };

export default async function ServicesGridAuto({ content }: Props) {
  const { pa } = getPreviewUtils(content);
  const block = (content as { __composition?: { key: string } }).__composition;
  const edit = (content as { __context?: { edit?: boolean } }).__context?.edit;
  const href = edit ? undefined : content.cta?.url?.default ?? undefined;
  const label = content.cta?.text || content.cta?.title;

  // `services` arrives as content references ({ key, url }); fetch each by key to
  // render the full Service card. See cms/expandRefs.ts.
  const services = await expandReferences<ServiceContent>(
    content.services as unknown as { key?: string | null }[],
    previewContextOf(content),
  );
  const variant: ServiceVariant = content.cardStyle === 'simple' ? 'simple' : 'rich';
  const cols = GRID_COLS[content.columns ?? 'four'] ?? GRID_COLS.four;

  return (
    <section {...pa(block)} className="bg-white py-20">
      <div className="container mx-auto px-4">
        <div className="mb-12 flex items-end justify-between">
          <div className="max-w-xl">
            {content.title ? (
              <h2 {...pa('title')} className="mb-4 font-serif text-3xl font-bold text-slate-900">
                {content.title}
              </h2>
            ) : null}
            {content.description ? (
              <p {...pa('description')} className="text-slate-600">{content.description}</p>
            ) : null}
          </div>
          {href || label ? (
            <a {...pa('cta')} href={href} className="hidden font-bold text-blue-800 hover:underline sm:block">
              {label || 'View All Services'}
            </a>
          ) : null}
        </div>

        <div {...pa('services')} className={`grid gap-4 ${cols}`}>
          {services.map((svc, i) => (
            <Service key={i} content={svc} variant={variant} />
          ))}
        </div>
      </div>
    </section>
  );
}
