import { contentType, type ContentProps } from '@optimizely/cms-sdk';
import { getPreviewUtils } from '@optimizely/cms-sdk/react/server';
import { Heart, Stethoscope, Activity, Baby, Brain, Bone, ChevronRight } from 'lucide-react';

/**
 * Stage 2 — "Structured Content Architecture". A Service is NOT a card on a
 * page; it is a reusable DATA OBJECT that lives once in the content library and
 * is referenced everywhere. The clinical name + description are content; the
 * `category` and `tags` are the structured METADATA that feeds search,
 * navigation, and (Stage 3) ODP personalization — deliberately invisible in the
 * UI, because the intelligence is in the data, not the look.
 */
export const ServiceContentType = contentType({
  key: 'BannerDemoService',
  baseType: '_component',
  displayName: 'Service',
  compositionBehaviors: ['elementEnabled'],
  properties: {
    name: { type: 'string', displayName: 'Service Name', group: 'demo', isRequired: true },
    description: { type: 'string', displayName: 'Clinical Description', group: 'demo' },
    category: {
      type: 'string',
      displayName: 'Category',
      group: 'demo',
      enum: [
        { value: 'everyday', displayName: 'Everyday Medicine' },
        { value: 'specialty', displayName: 'Specialty Care' },
        { value: 'rehab', displayName: 'Rehab & Support' },
      ],
    },
    tags: {
      type: 'array',
      displayName: 'Taxonomy Tags',
      group: 'demo',
      items: { type: 'string' },
    },
    icon: {
      type: 'string',
      displayName: 'Icon',
      group: 'demo',
      enum: [
        { value: 'heart', displayName: 'Heart / Cardiology' },
        { value: 'stethoscope', displayName: 'Primary Care' },
        { value: 'activity', displayName: 'Urgent / Emergency' },
        { value: 'baby', displayName: 'Pediatrics' },
        { value: 'brain', displayName: 'Neurosciences' },
        { value: 'bone', displayName: 'Orthopedics' },
      ],
    },
    link: { type: 'link', displayName: 'Detail Page Link', group: 'demo' },
    featured: { type: 'boolean', displayName: 'Featured', group: 'demo' },
  },
});

/** Icon key → lucide component. Falls back to Heart for unset / unknown keys. */
const ICONS: Record<string, typeof Heart> = {
  heart: Heart,
  stethoscope: Stethoscope,
  activity: Activity,
  baby: Baby,
  brain: Brain,
  bone: Bone,
};

/** Card presentation. The SAME Service content renders either way — a reuse demo. */
export type ServiceVariant = 'rich' | 'simple';

type Props = { content: ContentProps<typeof ServiceContentType>; variant?: ServiceVariant };

export default function Service({ content, variant = 'rich' }: Props) {
  const { pa } = getPreviewUtils(content);
  // Grid elements aren't wrapped by OptimizelyGridSection, so mark our own
  // editable block boundary from the composition node (no-op outside the grid).
  const block = (content as { __composition?: { key: string } }).__composition;

  const Icon = ICONS[content.icon ?? ''] ?? Heart;
  const href = content.link?.url?.default ?? '#';
  const featured = content.featured;

  // In Visual Builder, an <a> as the block root captures pointer/drag events and
  // fights click-to-select and dropping. Render a plain <div> in edit mode and
  // only emit the real anchor (with href) on the published site. Cast to 'a' so
  // the conditional href typechecks; at runtime the element is 'div' when editing.
  const edit = (content as { __context?: { edit?: boolean } }).__context?.edit;
  const Root = (edit ? 'div' : 'a') as 'a';
  const linkProps = edit ? {} : { href };

  // SIMPLE — compact row: small icon + name + chevron, no description. Same data,
  // lighter presentation (mirrors the flat service items in the mock).
  if (variant === 'simple') {
    return (
      <Root
        {...pa(block)}
        {...linkProps}
        className={`group/card flex items-center justify-between rounded-xl border p-5 font-semibold transition-all ${
          featured
            ? 'border-[#FFD100] bg-blue-50/50 shadow-md'
            : 'border-gray-100 bg-slate-50 text-slate-700 hover:border-blue-200 hover:bg-blue-50'
        }`}
      >
        <div className="flex items-center gap-3">
          <div
            className={`flex h-8 w-8 items-center justify-center rounded-lg transition-colors ${
              featured ? 'bg-[#FFD100] text-[#00205C]' : 'bg-white text-gray-400'
            }`}
          >
            <Icon size={16} />
          </div>
          <span {...pa('name')} className="text-[#00205C]">
            {content.name}
          </span>
        </div>
        <ChevronRight
          size={16}
          className="text-gray-300 transition-all group-hover/card:translate-x-1 group-hover/card:text-[#00205C]"
        />
      </Root>
    );
  }

  // RICH (default) — full card: icon + name + description + featured emphasis.
  return (
    <Root
      {...pa(block)}
      {...linkProps}
      className={`group/card flex items-center justify-between rounded-3xl border p-8 transition-all duration-300 ${
        featured
          ? 'border-[#FFD100] bg-blue-50/50 shadow-md'
          : 'border-gray-100 hover:border-gray-200 hover:bg-slate-50'
      }`}
    >
      <div className="flex items-center gap-4">
        <div
          className={`flex h-10 w-10 items-center justify-center rounded-xl transition-colors ${
            featured
              ? 'bg-[#FFD100] text-[#00205C]'
              : 'bg-gray-50 text-gray-400 group-hover/card:bg-[#00205C] group-hover/card:text-white'
          }`}
        >
          <Icon size={20} />
        </div>
        <div>
          <span {...pa('name')} className="block text-lg font-bold text-[#00205C]">
            {content.name}
          </span>
          {content.description ? (
            <span {...pa('description')} className="block text-sm text-gray-500">
              {content.description}
            </span>
          ) : null}
        </div>
      </div>
      <ChevronRight
        size={18}
        className="text-gray-300 transition-all group-hover/card:translate-x-1 group-hover/card:text-[#00205C]"
      />
    </Root>
  );
}
