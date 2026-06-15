import { contentType, type ContentProps } from '@optimizely/cms-sdk';
import { getPreviewUtils } from '@optimizely/cms-sdk/react/server';

/** Element component demonstrating a DAM / CMS asset reference (contentReference → _image). */
export const DemoMediaContentType = contentType({
  key: 'DemoMedia',
  baseType: '_component',
  displayName: 'Demo Media',
  compositionBehaviors: ['elementEnabled'],
  properties: {
    image: {
      type: 'contentReference',
      displayName: 'Image',
      allowedTypes: ['_image'],
      group: 'demo',
      isLocalized: true,
    },
    altText: { type: 'string', displayName: 'Alt Text', group: 'demo', isLocalized: true },
    caption: { type: 'string', displayName: 'Caption', group: 'demo', isLocalized: true },
  },
});

type Props = { content: ContentProps<typeof DemoMediaContentType> };

export default function DemoMedia({ content }: Props) {
  const { pa, src } = getPreviewUtils(content);
  // Grid elements aren't wrapped by OptimizelyGridSection, so mark our own
  // editable block boundary from the composition node (no-op outside the grid).
  const block = (content as { __composition?: { key: string } }).__composition;

  return (
    <figure {...pa(block)} className="overflow-hidden rounded-2xl border border-slate-200 bg-white">
      {content.image ? (
        // eslint-disable-next-line @next/next/no-img-element
        <img
          {...pa('image')}
          src={src(content.image)}
          alt={content.altText ?? ''}
          className="h-64 w-full object-cover"
        />
      ) : null}
      {content.caption ? (
        <figcaption {...pa('caption')} className="p-4 text-sm text-slate-500">
          {content.caption}
        </figcaption>
      ) : null}
    </figure>
  );
}
