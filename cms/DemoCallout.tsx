import { contentType, type ContentProps } from '@optimizely/cms-sdk';
import { getPreviewUtils } from '@optimizely/cms-sdk/react/server';

/** Element component covering link + dateTime field types. */
export const DemoCalloutContentType = contentType({
  key: 'DemoCallout',
  baseType: '_component',
  displayName: 'Demo Callout',
  compositionBehaviors: ['elementEnabled'],
  properties: {
    title: { type: 'string', displayName: 'Title', group: 'demo' },
    cta: { type: 'link', displayName: 'Call to Action', group: 'demo' },
    publishedDate: { type: 'dateTime', displayName: 'Published Date', group: 'demo' },
  },
});

type Props = { content: ContentProps<typeof DemoCalloutContentType> };

export default function DemoCallout({ content }: Props) {
  const { pa } = getPreviewUtils(content);

  const href = content.cta?.url?.default ?? undefined;
  const label = content.cta?.text || content.cta?.title || 'Learn more';
  const date = content.publishedDate ? new Date(content.publishedDate) : null;

  return (
    <section className="rounded-2xl bg-blue-900 p-8 text-white">
      <h3 {...pa('title')} className="text-2xl font-bold">
        {content.title}
      </h3>
      {date ? (
        <p {...pa('publishedDate')} className="mt-1 text-sm text-blue-100/70">
          {date.toLocaleDateString()}
        </p>
      ) : null}
      {href ? (
        <a
          {...pa('cta')}
          href={href}
          target={content.cta?.target ?? undefined}
          className="mt-4 inline-block rounded-full bg-[#FFD100] px-6 py-3 font-bold text-blue-900"
        >
          {label}
        </a>
      ) : null}
    </section>
  );
}
