import { contentType, type ContentProps } from '@optimizely/cms-sdk';
import { OptimizelyComponent, getPreviewUtils } from '@optimizely/cms-sdk/react/server';

/**
 * GenUI: Page 2 — a `_page` with a single generic `Content` ContentArea (`array`
 * of `content`, no allowedTypes restriction, localized), so editors can drop any
 * registered block. Blocks are resolved through the component registry and
 * rendered in order with `OptimizelyComponent` (mirrors cms/GenUIPage.tsx).
 */
export const GenUIPage2ContentType = contentType({
  key: 'BannerGenUIPage2',
  baseType: '_page',
  displayName: 'BannerGenUI: Page 2',
  mayContainTypes: ['*'],
  properties: {
    Content: {
      type: 'array',
      displayName: 'Content',
      isLocalized: true,
      items: { type: 'content' },
    },
  },
});

type Props = { content: ContentProps<typeof GenUIPage2ContentType> };
type Block = { __typename: string };

export default function GenUIPage2({ content }: Props) {
  const { pa } = getPreviewUtils(content);
  const blocks = (content.Content ?? []) as Block[];

  return (
    <main>
      <div {...pa('Content')}>
        {blocks.map((block, i) => (
          <OptimizelyComponent key={i} content={block} />
        ))}
      </div>
    </main>
  );
}
