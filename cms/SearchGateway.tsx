import { contentType, type ContentProps } from '@optimizely/cms-sdk';
import { getPreviewUtils } from '@optimizely/cms-sdk/react/server';
import { Search } from 'lucide-react';
import { authoringMetadata } from './authoringMetadata';
import { blockWidth, widthClass } from './blockWidth';

/**
 * Search Gateway — a search input that triggers federated search/discovery
 * across Louisiana Blue sites via Optimizely Graph. Properties per
 * demo-notes/052a. The input here is decorative (a real search wiring submits
 * to SearchTargetPage); the block exists to place + configure the entry point.
 */
export const SearchGatewayContentType = contentType({
  key: 'SearchGatewayBlock',
  baseType: '_component',
  displayName: 'Search Gateway (v1)',
  description: 'Federated search entry point with placeholder, target page, type-ahead and index scope.',
  compositionBehaviors: ['elementEnabled'],
  properties: {
    ...blockWidth(),
    PlaceholderText: {
      type: 'string',
      displayName: 'Placeholder Text',
      description: 'Default search box text. generate · brand_guidelines · ≤80 chars.',
      maxLength: 80,
      isLocalized: true,
      sortOrder: 10,
    },
    SearchTargetPage: {
      type: 'contentReference',
      displayName: 'Search Target Page',
      description: 'Page that renders unified search results. select · approved_content_only · required.',
      allowedTypes: ['_page'],
      isRequired: true,
      isLocalized: true,
      sortOrder: 20,
    },
    EnableTypeAhead: {
      type: 'boolean',
      displayName: 'Enable Type-Ahead',
      description: 'Predictive search as the user types. select · product_rule. Default: on.',
      isLocalized: true,
      sortOrder: 30,
    },
    IndexScope: {
      type: 'string',
      displayName: 'Index Scope',
      description: 'Search scope. select · taxonomy_controlled.',
      isLocalized: true,
      sortOrder: 40,
      enum: [
        { value: 'current_site', displayName: 'Current Site Only' },
        { value: 'all_sites', displayName: 'All Louisiana Blue Sites' },
        { value: 'provider', displayName: 'Provider Content' },
        { value: 'member', displayName: 'Member Content' },
        { value: 'medicare', displayName: 'Medicare Content' },
      ],
    },
    ...authoringMetadata({
      purpose: 'discovery',
      intents: ['search', 'lookup', 'find', 'compare'],
      pageTypes: ['search', 'provider', 'policy', 'formulary', 'resource_center'],
      audiences: ['member', 'provider', 'broker', 'employer'],
      position: 'early',
      priority: 'medium_high',
    }),
  },
});

type Props = { content: ContentProps<typeof SearchGatewayContentType> };

export default function SearchGateway({ content }: Props) {
  const { pa } = getPreviewUtils(content);
  const block = (content as { __composition?: { key: string } }).__composition;
  const placeholder = content.PlaceholderText || 'Search…';

  return (
    <section {...pa(block)} className="bg-blue-50 px-6 py-12">
      <div className={`mx-auto ${widthClass(content.BlockWidth)}`}>
        <div className="flex items-center gap-2 rounded-full border border-slate-200 bg-white px-5 py-3 shadow-sm">
          <Search className="h-5 w-5 shrink-0 text-blue-800" aria-hidden />
          <input
            {...pa('PlaceholderText')}
            type="search"
            disabled
            placeholder={placeholder}
            className="w-full bg-transparent text-slate-700 outline-none placeholder:text-slate-400"
          />
          <button
            type="button"
            className="shrink-0 rounded-full bg-blue-800 px-5 py-2 text-sm font-semibold text-white hover:bg-blue-900"
          >
            Search
          </button>
        </div>
      </div>
    </section>
  );
}
