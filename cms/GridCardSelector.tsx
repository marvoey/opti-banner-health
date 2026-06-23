import { contentType, type ContentProps } from '@optimizely/cms-sdk';
import { getPreviewUtils } from '@optimizely/cms-sdk/react/server';
import { authoringMetadata } from './authoringMetadata';
import { blockWidth, widthClass } from './blockWidth';
import { expandReferences, previewContextOf } from './expandRefs';

/**
 * Card — a single selectable pathway/program card, nested inside a Grid / Card
 * Selector's CardsArea. A plain `_component` (no composition behavior): it's
 * added through the CardsArea block picker, not dropped on the canvas. Icon is a
 * CMS image reference plus a `Url` override (the override wins when set).
 * Properties per demo-notes/052a.
 */
export const CardBlockContentType = contentType({
  key: 'CardBlock',
  baseType: '_component',
  displayName: 'Card (v1)',
  description: 'A pathway/program card: icon, title, body and an action link.',
  properties: {
    CardIcon: {
      type: 'contentReference',
      displayName: 'Card Icon',
      description: 'Icon asset (SVG / high-contrast PNG). suggest · approved_content_only.',
      allowedTypes: ['_image'],
      isLocalized: true,
      sortOrder: 10,
    },
    CardIconUrl: {
      type: 'url',
      displayName: 'Card Icon URL',
      description: 'Optional. Full icon URL — overrides the Card Icon asset when set.',
      isLocalized: true,
      sortOrder: 20,
    },
    CardTitle: {
      type: 'string',
      displayName: 'Card Title',
      description: 'H3 card heading. generate · brand_guidelines · ≤60 chars · required.',
      maxLength: 60,
      isRequired: true,
      isLocalized: true,
      sortOrder: 30,
    },
    CardBody: {
      type: 'string',
      displayName: 'Card Body',
      description: 'Brief summary. generate · brand_guidelines · ≤160 chars.',
      maxLength: 160,
      isLocalized: true,
      sortOrder: 40,
    },
    CardLink: {
      type: 'link',
      displayName: 'Card Link',
      description: 'Card action / hit link. suggest · approved_content_only · required.',
      isRequired: true,
      isLocalized: true,
      sortOrder: 50,
    },
  },
});

/**
 * Grid / Card Selector — a container featuring distinct pathways side-by-side.
 * CardsArea is a ContentArea (array of `content`) holding Card blocks (or
 * images); GridColumns chooses the layout. Properties per demo-notes/052a.
 */
export const GridCardSelectorContentType = contentType({
  key: 'GridCardSelectorBlock',
  baseType: '_component',
  displayName: 'Grid / Card Selector (v1)',
  description: 'A titled grid of selectable Card blocks with a configurable column count.',
  compositionBehaviors: ['elementEnabled'],
  properties: {
    ...blockWidth(),
    GridTitle: {
      type: 'string',
      displayName: 'Grid Title',
      description: 'Section heading above the grid. generate · brand_guidelines · ≤80 chars (h2).',
      maxLength: 80,
      isLocalized: true,
      sortOrder: 10,
    },
    // Modeled as a string enum (not integer): the CLI applies format 'selectOne'
    // to enum properties, which it rejects on integer types. Parsed to a number
    // in the component.
    GridColumns: {
      type: 'string',
      displayName: 'Grid Columns',
      description: 'Column count. select · design_system. 2=comparison, 3=standard, 4=broad sets.',
      isLocalized: true,
      sortOrder: 20,
      enum: [
        { value: '2', displayName: '2 columns' },
        { value: '3', displayName: '3 columns' },
        { value: '4', displayName: '4 columns' },
      ],
    },
    // Reference grid (not an inline ContentArea): element-enabled blocks may not
    // hold a `content` area, so Cards are references to library Card blocks,
    // expanded at render via expandReferences.
    CardsArea: {
      type: 'array',
      displayName: 'Cards',
      description: 'Card blocks shown in the grid. generate · author_generated · 2–4 items.',
      isLocalized: true,
      minItems: 2,
      maxItems: 4,
      items: {
        type: 'contentReference',
        allowedTypes: [CardBlockContentType],
      },
    },
    ...authoringMetadata({
      purpose: 'decision_support',
      intents: ['compare', 'evaluate', 'navigate', 'choose', 'explain_options'],
      pageTypes: ['landing', 'campaign', 'resource_center', 'plan_comparison', 'provider_workspace'],
      audiences: ['member', 'medicare', 'employer', 'broker', 'provider'],
      position: 'middle',
      priority: 'high',
    }),
  },
});

const COL_CLASS: Record<number, string> = {
  2: 'sm:grid-cols-2',
  3: 'sm:grid-cols-2 lg:grid-cols-3',
  4: 'sm:grid-cols-2 lg:grid-cols-4',
};

type CardProps = { content: ContentProps<typeof CardBlockContentType> };

/** A single Card. Registered (key `CardBlock`) so it renders inside a CardsArea. */
export function CardBlock({ content }: CardProps) {
  const { pa, src } = getPreviewUtils(content);
  const block = (content as { __composition?: { key: string } }).__composition;
  const edit = (content as { __context?: { edit?: boolean } }).__context?.edit;

  const iconUrl = content.CardIconUrl?.default ?? undefined;
  const usingIconUrl = !!iconUrl;
  const iconSrc = usingIconUrl
    ? iconUrl
    : content.CardIcon
      ? src(content.CardIcon)
      : undefined;
  const href = edit ? undefined : content.CardLink?.url?.default ?? undefined;
  const label = content.CardLink?.text || content.CardLink?.title || 'Learn more';

  return (
    <div
      {...pa(block)}
      className="flex flex-col rounded-2xl border border-slate-200 bg-white p-6 shadow-sm transition-shadow hover:shadow-md"
    >
      {iconSrc ? (
        // eslint-disable-next-line @next/next/no-img-element
        <img
          {...pa(usingIconUrl ? 'CardIconUrl' : 'CardIcon')}
          src={iconSrc}
          alt=""
          className="mb-4 h-12 w-12 object-contain"
        />
      ) : null}
      <h3 {...pa('CardTitle')} className="text-lg font-bold text-slate-900">
        {content.CardTitle}
      </h3>
      {content.CardBody ? (
        <p {...pa('CardBody')} className="mt-2 flex-1 text-sm leading-relaxed text-slate-600">
          {content.CardBody}
        </p>
      ) : null}
      <a
        {...pa('CardLink')}
        href={href}
        target={edit ? undefined : content.CardLink?.target ?? undefined}
        className="mt-4 inline-flex font-semibold text-blue-800 hover:text-blue-900"
      >
        {label}
      </a>
    </div>
  );
}

type Props = { content: ContentProps<typeof GridCardSelectorContentType> };

export default async function GridCardSelector({ content }: Props) {
  const { pa } = getPreviewUtils(content);
  const block = (content as { __composition?: { key: string } }).__composition;
  // CardsArea is a contentReference[] (delivered as { key, url }); fetch the full
  // Card items so they render (preview-aware).
  const cards = await expandReferences<ContentProps<typeof CardBlockContentType>>(
    content.CardsArea as unknown as { key?: string | null }[],
    previewContextOf(content),
  );
  const cols = COL_CLASS[Number(content.GridColumns) || 3] ?? COL_CLASS[3];

  return (
    <section {...pa(block)} className="bg-white px-6 py-16">
      <div className={`mx-auto ${widthClass(content.BlockWidth)}`}>
        {content.GridTitle ? (
          <h2 {...pa('GridTitle')} className="mb-8 text-center text-3xl font-bold text-slate-900">
            {content.GridTitle}
          </h2>
        ) : null}
        <div {...pa('CardsArea')} className={`grid grid-cols-1 gap-6 ${cols}`}>
          {cards.map((card, i) => (
            <CardBlock key={i} content={card} />
          ))}
        </div>
      </div>
    </section>
  );
}
