import { contentType, type ContentProps } from '@optimizely/cms-sdk';
import { RichText } from '@optimizely/cms-sdk/react/richText';
import { getPreviewUtils } from '@optimizely/cms-sdk/react/server';

/** Element component covering string / richText / boolean / integer field types. */
export const DemoCardContentType = contentType({
  key: 'DemoCard',
  baseType: '_component',
  displayName: 'Demo Card',
  compositionBehaviors: ['elementEnabled'],
  properties: {
    heading: { type: 'string', displayName: 'Heading', group: 'demo' },
    body: { type: 'richText', displayName: 'Body', group: 'demo' },
    featured: { type: 'boolean', displayName: 'Featured', group: 'demo' },
    sortIndex: { type: 'integer', displayName: 'Sort Index', group: 'demo' },
  },
});

type Props = { content: ContentProps<typeof DemoCardContentType> };

export default function DemoCard({ content }: Props) {
  const { pa } = getPreviewUtils(content);

  return (
    <article
      className={`rounded-2xl border p-6 ${
        content.featured ? 'border-blue-800 bg-blue-50' : 'border-slate-200 bg-white'
      }`}
    >
      <div className="mb-2 flex items-center justify-between gap-3">
        <h3 {...pa('heading')} className="text-xl font-bold text-blue-900">
          {content.heading}
        </h3>
        {content.featured ? (
          <span
            {...pa('featured')}
            className="rounded-full bg-blue-800 px-2 py-0.5 text-xs font-bold uppercase text-white"
          >
            Featured
          </span>
        ) : null}
      </div>
      <div {...pa('body')} className="text-slate-700">
        <RichText content={content.body?.json} />
      </div>
      <p
        {...pa('sortIndex')}
        className="mt-4 text-xs font-semibold uppercase tracking-widest text-slate-400"
      >
        Sort #{content.sortIndex}
      </p>
    </article>
  );
}
