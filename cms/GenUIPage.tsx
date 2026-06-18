import { contentType, type ContentProps } from '@optimizely/cms-sdk';
import { OptimizelyComponent, getPreviewUtils } from '@optimizely/cms-sdk/react/server';
import { GenUIJourneyContentType } from './GenUIJourney';
import { GenUINarrativeContentType } from './GenUINarrative';
import { GenUIActionContentType } from './GenUIAction';
import { GenUIEmbedContentType } from './GenUIEmbed';
import { GenUIImpactContentType } from './GenUIImpact';
import { GenUIMilestoneContentType } from './GenUIMilestone';
import { GenUIProfileContentType } from './GenUIProfile';

/**
 * GenUI: Page — a `_page` that composes the BannerGenUI block family. Its single
 * `Components` property is a ContentArea (`array` of `content`) restricted to the
 * GenUI block types, so Graph fetches each block's full properties inline; we
 * render them by resolving each block's type through the component registry with
 * `OptimizelyComponent` (mirrors cms/BlogPost.tsx).
 */
export const GenUIPageContentType = contentType({
  key: 'BannerGenUIPage',
  baseType: '_page',
  displayName: 'BannerGenUI: Page',
  mayContainTypes: ['*'],
  properties: {
    Components: {
      type: 'array',
      displayName: 'Components',
      items: {
        type: 'content',
        allowedTypes: [
          GenUIJourneyContentType,
          GenUINarrativeContentType,
          GenUIActionContentType,
          GenUIEmbedContentType,
          GenUIImpactContentType,
          GenUIMilestoneContentType,
          GenUIProfileContentType,
        ],
      },
    },
    ContentReference: {
      type: 'array',
      displayName: 'ContentReference',
      items: {
        type: 'contentReference',
        allowedTypes: [
          GenUIJourneyContentType,
          GenUINarrativeContentType,
          GenUIActionContentType,
          GenUIEmbedContentType,
          GenUIImpactContentType,
          GenUIMilestoneContentType,
          GenUIProfileContentType,
        ],
      },
    },
  },
});

type Props = { content: ContentProps<typeof GenUIPageContentType> };
type Block = { __typename: string };

export default function GenUIPage({ content }: Props) {
  const { pa } = getPreviewUtils(content);
  const components = (content.Components ?? []) as Block[];

  return (
    <main>
      <div {...pa('Components')}>
        {components.map((block, i) => (
          <OptimizelyComponent key={i} content={block} />
        ))}
      </div>
    </main>
  );
}
