import { contentType, type ContentProps } from '@optimizely/cms-sdk';
import { getPreviewUtils } from '@optimizely/cms-sdk/react/server';
import { User, Activity, MapPin, Calendar, ChevronRight } from 'lucide-react';
import { expandReferences, previewContextOf } from './expandRefs';

/**
 * Quick Care Card — a reusable library block (title, description, icon, link).
 * A plain `_component` so it can be authored once in the content library and
 * referenced from many places (edit-once-update-everywhere). Rendered by its
 * parent (QuickCareCards), so it needs no resolver entry of its own.
 */
export const QuickCareCardContentType = contentType({
  key: 'BannerDemoQuickCareCard',
  baseType: '_component',
  displayName: 'Banner: Quick Care Card',
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
        { value: 'doctor', displayName: 'Find a Doctor' },
        { value: 'urgent', displayName: 'Urgent Care' },
        { value: 'location', displayName: 'Find a Location' },
        { value: 'events', displayName: 'Classes & Events' },
      ],
    },
    link: { type: 'link', displayName: 'Link', group: 'demo', isLocalized: true },
  },
});

/**
 * Quick Care Cards — the row of action cards that overlaps the bottom of the
 * Hero (`-mt-16`). A droppable element holding a curated, reusable list of
 * Quick Care Card references (decision: reference model, for scale + reuse).
 * Element-enabled blocks can't hold inline sub-blocks, so the cards are
 * references and expanded at render time (see cms/expandRefs.ts).
 */
export const QuickCareCardsContentType = contentType({
  key: 'BannerDemoQuickCareCards',
  baseType: '_component',
  displayName: 'Banner: Quick Care Cards',
  compositionBehaviors: ['sectionEnabled'],
  properties: {
    cards: {
      type: 'array',
      displayName: 'Cards',
      group: 'demo',
      isLocalized: true,
      items: { type: 'contentReference', allowedTypes: [QuickCareCardContentType] },
    },
  },
});

/** Icon key → lucide component. Falls back to User for unset / unknown keys. */
const ICONS: Record<string, typeof User> = {
  doctor: User,
  urgent: Activity,
  location: MapPin,
  events: Calendar,
};

type CardContent = ContentProps<typeof QuickCareCardContentType>;
type CardProps = { content: CardContent };
type Props = { content: ContentProps<typeof QuickCareCardsContentType> };

/**
 * A single Quick Care Card. Registered (resolver key `BannerDemoQuickCareCard`)
 * so it renders both when referenced by QuickCareCards AND if dropped directly
 * on the canvas — mirrors how Service is reused by ServicesGridAuto.
 */
export function QuickCareCard({ content }: CardProps) {
  const { pa } = getPreviewUtils(content);
  // No-op when rendered from an expanded reference (no composition node).
  const block = (content as { __composition?: { key: string } }).__composition;
  const edit = (content as { __context?: { edit?: boolean } }).__context?.edit;
  const Icon = ICONS[content.icon ?? ''] ?? User;
  // In edit mode render a <div> (an <a> root fights click-to-select); only emit
  // the real anchor + href on the published site.
  const href = edit ? undefined : content.link?.url?.default ?? undefined;
  const Root = (edit ? 'div' : 'a') as 'a';

  return (
    <Root
      {...pa(block)}
      href={href}
      className="bg-white p-6 rounded-2xl shadow-xl border border-slate-100 group hover:border-blue-300 transition-all cursor-pointer"
    >
      <div className="w-12 h-12 bg-blue-50 rounded-xl flex items-center justify-center mb-4 group-hover:scale-110 transition-transform">
        <Icon className="text-blue-800" />
      </div>
      <h3 className="text-xl font-bold text-slate-800 mb-2">{content.title}</h3>
      <p className="text-slate-600 mb-4 text-sm">{content.description}</p>
      <div className="flex items-center text-blue-800 font-bold text-sm">
        <span>{content.link?.text || 'Get Started'}</span>
        <ChevronRight size={16} className="ml-1 group-hover:translate-x-1 transition-transform" />
      </div>
    </Root>
  );
}

export default async function QuickCareCards({ content }: Props) {
  const { pa } = getPreviewUtils(content);
  // Grid elements aren't wrapped by OptimizelyGridSection, so mark our own
  // editable block boundary from the composition node (no-op outside the grid).
  const block = (content as { __composition?: { key: string } }).__composition;

  // `cards` arrives as content references ({ key, url }); fetch each by key.
  const cards = await expandReferences<CardContent>(
    content.cards as unknown as { key?: string | null }[],
    previewContextOf(content),
  );

  return (
    <section
      {...pa(block)}
      className="container mx-auto px-4 relative z-10 grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6"
    >
      {cards.map((card, i) => (
        <QuickCareCard key={i} content={card} />
      ))}
    </section>
  );
}
