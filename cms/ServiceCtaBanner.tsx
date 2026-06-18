import { contentType, type ContentProps } from '@optimizely/cms-sdk';
import { getPreviewUtils } from '@optimizely/cms-sdk/react/server';

/**
 * Service CTA Banner — the navy "Not sure which service you need?" panel with a
 * yellow CTA, from the bottom of app/services/_components/ServiceCategories.tsx.
 * Editable element block: heading + description + CTA link.
 */
export const ServiceCtaBannerContentType = contentType({
  key: 'BannerDemoServiceCtaBanner',
  baseType: '_component',
  displayName: 'Banner: Service CTA Banner',
  compositionBehaviors: ['sectionEnabled'],
  properties: {
    heading: { type: 'string', displayName: 'Heading', group: 'demo', isLocalized: true },
    description: { type: 'string', displayName: 'Description', group: 'demo', isLocalized: true },
    cta: { type: 'link', displayName: 'Call to Action', group: 'demo', isLocalized: true },
  },
});

type Props = { content: ContentProps<typeof ServiceCtaBannerContentType> };

export default function ServiceCtaBanner({ content }: Props) {
  const { pa } = getPreviewUtils(content);
  const block = (content as { __composition?: { key: string } }).__composition;
  // Suppress href in edit mode so clicking the CTA to edit it doesn't navigate.
  const edit = (content as { __context?: { edit?: boolean } }).__context?.edit;
  const href = edit ? undefined : content.cta?.url?.default ?? undefined;
  const label = content.cta?.text || content.cta?.title;

  return (
    <section {...pa(block)} className="py-12">
      <div className="container mx-auto px-4">
        <div className="bg-[#00205C] rounded-[40px] p-12 lg:p-16 text-white flex flex-col lg:flex-row justify-between items-center gap-12 overflow-hidden relative shadow-2xl">
          <div className="absolute top-0 right-0 w-64 h-64 bg-blue-900/30 rounded-full blur-3xl -mr-32 -mt-32" />
          <div className="max-w-2xl relative z-10">
            <h2
              {...pa('heading')}
              className="text-4xl font-serif font-bold mb-6 italic lowercase"
            >
              {content.heading}
            </h2>
            <p {...pa('description')} className="text-xl text-blue-100/70 font-medium">
              {content.description}
            </p>
          </div>
          {href || label ? (
            <a
              {...pa('cta')}
              href={href}
              className="bg-[#FFD100] text-[#00205C] px-12 py-5 rounded-full font-black uppercase tracking-widest text-sm whitespace-nowrap hover:bg-yellow-400 transition-all shadow-xl relative z-10"
            >
              {label || 'Learn more'}
            </a>
          ) : null}
        </div>
      </div>
    </section>
  );
}
