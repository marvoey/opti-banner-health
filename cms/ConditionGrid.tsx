import { contentType, type ContentProps } from '@optimizely/cms-sdk';
import { getPreviewUtils } from '@optimizely/cms-sdk/react/server';
import { Heart, Activity, Brain, Bone, Baby, Stethoscope, ChevronRight } from 'lucide-react';
import { expandReferences, previewContextOf } from './expandRefs';

/**
 * Condition — a reusable "Conditions We Treat" card (title, description, icon,
 * CTA). A library block referenced by Condition Grid, rendered by its parent;
 * also registered so it renders if dropped directly (mirrors QuickCareCard).
 */
export const ConditionContentType = contentType({
  key: 'BannerDemoCondition',
  baseType: '_component',
  displayName: 'Banner: Condition',
  compositionBehaviors: ['sectionEnabled'],
  properties: {
    title: { type: 'string', displayName: 'Title', group: 'demo', isLocalized: true },
    description: { type: 'string', displayName: 'Description', group: 'demo', isLocalized: true },
    icon: {
      type: 'string',
      displayName: 'Icon',
      group: 'demo',
      isLocalized: true,
      enum: [
        { value: 'heart', displayName: 'Heart' },
        { value: 'activity', displayName: 'Activity' },
        { value: 'brain', displayName: 'Brain' },
        { value: 'bone', displayName: 'Bone' },
        { value: 'baby', displayName: 'Baby' },
        { value: 'stethoscope', displayName: 'Stethoscope' },
      ],
    },
    cta: { type: 'link', displayName: 'CTA', group: 'demo', isLocalized: true },
  },
});

/**
 * Condition Grid — the "Conditions We Treat" section: heading + description + an
 * "intent tracking" badge, over a 3-column grid of referenced Condition cards.
 */
export const ConditionGridContentType = contentType({
  key: 'BannerDemoConditionGrid',
  baseType: '_component',
  displayName: 'Banner: Condition Grid',
  compositionBehaviors: ['sectionEnabled'],
  properties: {
    heading: { type: 'string', displayName: 'Heading', group: 'demo', isLocalized: true },
    description: { type: 'string', displayName: 'Description', group: 'demo', isLocalized: true },
    trackingLabel: {
      type: 'string',
      displayName: 'Tracking Badge',
      description: 'Text for the pinging "intent tracking" badge. Leave empty to hide it.',
      group: 'demo',
      isLocalized: true,
    },
    conditions: {
      type: 'array',
      displayName: 'Conditions',
      group: 'demo',
      isLocalized: true,
      items: { type: 'contentReference', allowedTypes: [ConditionContentType] },
    },
  },
});

/** Icon key → lucide component. Falls back to Heart for unset / unknown keys. */
const ICONS: Record<string, typeof Heart> = {
  heart: Heart,
  activity: Activity,
  brain: Brain,
  bone: Bone,
  baby: Baby,
  stethoscope: Stethoscope,
};

type ConditionContent = ContentProps<typeof ConditionContentType>;
type CardProps = { content: ConditionContent };
type Props = { content: ContentProps<typeof ConditionGridContentType> };

/** A single Condition card. Registered as `BannerDemoCondition`. */
export function Condition({ content }: CardProps) {
  const { pa } = getPreviewUtils(content);
  // No-op when rendered from an expanded reference (no composition node).
  const block = (content as { __composition?: { key: string } }).__composition;
  const edit = (content as { __context?: { edit?: boolean } }).__context?.edit;
  const Icon = ICONS[content.icon ?? ''] ?? Heart;
  const href = edit ? undefined : content.cta?.url?.default ?? undefined;
  const label = content.cta?.text || content.cta?.title;
  const Root = (edit ? 'div' : 'a') as 'a';

  return (
    <Root
      {...pa(block)}
      href={href}
      className="group relative overflow-hidden rounded-3xl border border-gray-100 p-10 shadow-sm transition-all hover:border-[#FFD100] hover:bg-[#f8fafc] hover:shadow-2xl cursor-pointer"
    >
      <div className="absolute top-0 right-0 -mr-12 -mt-12 h-24 w-24 rounded-bl-[100px] bg-[#FFD100]/10 transition-transform duration-500 group-hover:scale-150" />
      <div className="relative z-10 mb-8 flex h-14 w-14 items-center justify-center rounded-2xl bg-blue-50 text-[#00205C] transition-colors group-hover:bg-[#FFD100]">
        <Icon size={24} />
      </div>
      <h3 {...pa('title')} className="relative z-10 mb-4 text-2xl font-bold text-[#00205C]">
        {content.title}
      </h3>
      <p {...pa('description')} className="mb-8 font-medium leading-relaxed text-gray-500 lowercase italic">
        {content.description}
      </p>
      <div className="flex items-center text-xs font-bold uppercase tracking-widest text-[#00205C] group-hover:underline">
        {label || 'Explore Care'} <ChevronRight size={14} className="ml-2" />
      </div>
    </Root>
  );
}

export default async function ConditionGrid({ content }: Props) {
  const { pa } = getPreviewUtils(content);
  const block = (content as { __composition?: { key: string } }).__composition;

  const conditions = await expandReferences<ConditionContent>(
    content.conditions as unknown as { key?: string | null }[],
    previewContextOf(content),
  );

  return (
    <section {...pa(block)} className="bg-white py-24">
      <div className="container mx-auto px-4">
        <div className="mb-16 flex flex-col items-end justify-between border-b-2 border-gray-100 pb-8 uppercase italic md:flex-row">
          <div className="max-w-2xl">
            {content.heading ? (
              <h2 {...pa('heading')} className="mb-4 font-serif text-4xl font-bold text-[#00205C] lowercase">
                {content.heading}
              </h2>
            ) : null}
            {content.description ? (
              <p {...pa('description')} className="text-lg font-medium text-gray-500 lowercase">
                {content.description}
              </p>
            ) : null}
          </div>
          {content.trackingLabel ? (
            <div className="mt-8 flex items-center gap-4 rounded-full border border-blue-100 bg-blue-50 px-6 py-3 lowercase italic md:mt-0">
              <div className="h-2 w-2 animate-ping rounded-full bg-blue-600" />
              <span {...pa('trackingLabel')} className="text-[11px] font-black uppercase tracking-widest text-blue-600">
                {content.trackingLabel}
              </span>
            </div>
          ) : null}
        </div>

        <div {...pa('conditions')} className="grid grid-cols-1 gap-8 md:grid-cols-2 lg:grid-cols-3">
          {conditions.map((c, i) => (
            <Condition key={i} content={c} />
          ))}
        </div>
      </div>
    </section>
  );
}
