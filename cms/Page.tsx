import { contentType, type ContentProps } from '@optimizely/cms-sdk';
import { OptimizelyComponent, getPreviewUtils } from '@optimizely/cms-sdk/react/server';

// The element-enabled Block content types this page may contain. (Nested helper
// types — CardBlock, FormFieldBlock — are excluded; they're only used inside
// their parent block's reference list, not dropped directly into a page.)
import { DynamicHeroContentType } from './DynamicHero';
import { SearchGatewayContentType } from './SearchGateway';
import { RegulatoryDisclaimerContentType } from './RegulatoryDisclaimer';
import { GridCardSelectorContentType } from './GridCardSelector';
import { LeadCaptureFormContentType } from './LeadCaptureForm';
import { NetworkStatusAlertContentType } from './NetworkStatusAlert';

/**
 * Page — a fixed-layout Page (`_page`). The body is a `Content` area: an ordered
 * list of content items the editor adds, each rendered via OptimizelyComponent.
 */
export const PageContentType = contentType({
  key: 'Page',
  baseType: '_page',
  displayName: 'Page (v1)',
  description: 'A page built from an ordered list of content blocks.',
  mayContainTypes: ['ExperiencePage', 'Page', 'BlogPost'],
  properties: {
    Content: {
      type: 'array',
      displayName: 'Content',
      isLocalized: true,
      items: {
        type: 'content',
        allowedTypes: [
          DynamicHeroContentType,
          SearchGatewayContentType,
          RegulatoryDisclaimerContentType,
          GridCardSelectorContentType,
          LeadCaptureFormContentType,
          NetworkStatusAlertContentType,
        ],
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
    <main {...pa('Content')} className="w-full">
      {items.map((item, i) => (
        <OptimizelyComponent key={i} content={item} />
      ))}
    </main>
  );
}
