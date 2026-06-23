import { contentType, type ContentProps } from '@optimizely/cms-sdk';
import { OptimizelyComponent, getPreviewUtils } from '@optimizely/cms-sdk/react/server';

/**
 * Page — a fixed-layout Page (`_page`). The body is a `Content` area: an ordered
 * list of content items the editor adds, each rendered via OptimizelyComponent.
 */
export const PageContentType = contentType({
  key: 'Page',
  baseType: '_page',
  displayName: 'Page (v1)',
  description: 'A page built from an ordered list of content blocks.',
  mayContainTypes: ['ExperiencePage', 'Page'],
  properties: {
    Content: {
      type: 'array',
      displayName: 'Content',
      items: {
        type: 'content',
        allowedTypes: [],
        restrictedTypes: [],
      },
    },
  },
});

type Props = {
  content: ContentProps<typeof PageContentType>;
};

export default function Page({ content }: Props) {
  const { pa } = getPreviewUtils(content);
  const items = content.Content ?? [];

  return (
    <main {...pa('Content')} className="mx-auto max-w-3xl px-6 py-12">
      {items.map((item, i) => (
        <OptimizelyComponent key={i} content={item} />
      ))}
    </main>
  );
}
