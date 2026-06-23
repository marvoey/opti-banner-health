import { contentType, type ContentProps } from '@optimizely/cms-sdk';
import { OptimizelyComponent, getPreviewUtils } from '@optimizely/cms-sdk/react/server';
import { RichText } from '@optimizely/cms-sdk/react/richText';

// Specialized blocks an editor may drop into the trailing ContentBlocks area.
// (Nested helper types — CardBlock, FormFieldBlock — are excluded; they're only
// used inside their parent block's reference list, not dropped on a page.)
import { DynamicHeroContentType } from './DynamicHero';
import { SearchGatewayContentType } from './SearchGateway';
import { RegulatoryDisclaimerContentType } from './RegulatoryDisclaimer';
import { GridCardSelectorContentType } from './GridCardSelector';
import { LeadCaptureFormContentType } from './LeadCaptureForm';
import { NetworkStatusAlertContentType } from './NetworkStatusAlert';

/**
 * Blog Post — a versatile editorial Page (`_page`) for Louisiana Blue's news,
 * blog and foundation properties (demo-notes/052 "Optimized Content Framework").
 *
 * One content type serves three legacy migrations:
 *   • Straight Talk Blog        (WordPress → /news/straight-talk-blog)
 *   • Foundation Community Grants (WordPress → /news/foundation-grants)
 *   • PR & Media Press Kits      (Sitecore  → /news/press-kits)
 *
 * Metadata properties (Category, Tags, AuthorName, PublishDate) are primitive
 * and `queryable`, so Optimizely Graph can filter/sort feeds across the whole
 * site in one request. BodyContent holds the core article; ContentBlocks is a
 * trailing Content area for interactive blocks (forms, card grids, alerts).
 */
export const BlogPostContentType = contentType({
  key: 'BlogPost',
  baseType: '_page',
  displayName: 'Blog Post (v1)',
  description:
    'An editorial article/post for news, blog and foundation properties, with author metadata, a rich body and a trailing block area.',
  properties: {
    // ── Information ──────────────────────────────────────────────────────────
    PageTitle: {
      type: 'string',
      displayName: 'Page Title',
      description: 'H1 title of the article. Maps from WP post_title / Sitecore displayName.',
      group: 'blog_information',
      maxLength: 160,
      isRequired: true,
      isLocalized: true,
      indexingType: 'searchable',
      sortOrder: 10,
    },
    Kicker: {
      type: 'string',
      displayName: 'Kicker / Subtitle',
      description: 'Short punchy sentence shown above or below the main title.',
      group: 'blog_information',
      maxLength: 160,
      isLocalized: true,
      sortOrder: 20,
    },
    Excerpt: {
      // SDK has no `longString`; a string with a generous maxLength renders as
      // the multi-line summary used in card listings and the SEO description.
      type: 'string',
      displayName: 'Excerpt',
      description: '2–3 sentence summary for blog card listing views and SEO description.',
      group: 'blog_information',
      maxLength: 320,
      isLocalized: true,
      indexingType: 'searchable',
      sortOrder: 30,
    },
    PublishDate: {
      type: 'dateTime',
      displayName: 'Publish Date',
      description: 'Date published. Controls chronological ordering of feeds.',
      group: 'blog_information',
      isLocalized: true,
      indexingType: 'queryable',
      sortOrder: 40,
    },
    ReadTime: {
      type: 'integer',
      displayName: 'Read Time',
      description: 'Estimated read time in minutes, shown to readers.',
      group: 'blog_information',
      minimum: 1,
      isLocalized: true,
      sortOrder: 50,
    },
    // ── Classification ───────────────────────────────────────────────────────
    Category: {
      type: 'string',
      displayName: 'Category',
      description: 'Primary category used for feed filtering. select.',
      group: 'blog_classification',
      isLocalized: true,
      indexingType: 'queryable',
      sortOrder: 60,
      enum: [
        { value: 'health_economics', displayName: 'Health Economics' },
        { value: 'community_grants', displayName: 'Community Grants' },
        { value: 'corporate_news', displayName: 'Corporate News' },
        { value: 'brand_resources', displayName: 'Brand Resources' },
      ],
    },
    Tags: {
      type: 'array',
      displayName: 'Tags',
      description: 'Free-form tags (e.g. Michael Bertaut, Angel Awards, 2026 Rebranding).',
      group: 'blog_classification',
      isLocalized: true,
      indexingType: 'queryable',
      sortOrder: 70,
      items: { type: 'string' },
    },
    // ── Author Details ───────────────────────────────────────────────────────
    AuthorName: {
      type: 'string',
      displayName: 'Author Name',
      description: 'Name of the writer (e.g. "Michael Bertaut").',
      group: 'blog_author',
      maxLength: 120,
      isLocalized: true,
      indexingType: 'queryable',
      sortOrder: 80,
    },
    AuthorTitle: {
      type: 'string',
      displayName: 'Author Title',
      description: 'Professional title of the writer (e.g. "Chief Health Economist").',
      group: 'blog_author',
      maxLength: 120,
      isLocalized: true,
      sortOrder: 90,
    },
    AuthorImage: {
      type: 'contentReference',
      displayName: 'Author Image',
      description: 'Headshot of the author. Restricted to image assets.',
      group: 'blog_author',
      allowedTypes: ['_image'],
      isLocalized: true,
      sortOrder: 100,
    },
    // ── Media ────────────────────────────────────────────────────────────────
    HeroImage: {
      type: 'contentReference',
      displayName: 'Hero Image',
      description: 'Large image featured at the top of the article. Restricted to image assets.',
      group: 'blog_media',
      allowedTypes: ['_image'],
      isLocalized: true,
      sortOrder: 110,
    },
    // ── Body Content ─────────────────────────────────────────────────────────
    BodyContent: {
      type: 'richText',
      displayName: 'Body Content',
      description: 'Core rich text of the article (HTML, lists, inline tables, styled text).',
      group: 'blog_body',
      isLocalized: true,
      indexingType: 'searchable',
      sortOrder: 120,
    },
    // ── Layout Components ────────────────────────────────────────────────────
    ContentBlocks: {
      type: 'array',
      displayName: 'Content Blocks',
      description: 'Trailing area for specialized blocks (forms, card grids, alerts, disclaimers).',
      isLocalized: true,
      sortOrder: 130,
      items: {
        type: 'content',
        allowedTypes: [
          DynamicHeroContentType,
          SearchGatewayContentType,
          GridCardSelectorContentType,
          LeadCaptureFormContentType,
          NetworkStatusAlertContentType,
          RegulatoryDisclaimerContentType,
        ],
        restrictedTypes: [],
      },
    },
  },
});

const CATEGORY_LABEL: Record<string, string> = {
  health_economics: 'Health Economics',
  community_grants: 'Community Grants',
  corporate_news: 'Corporate News',
  brand_resources: 'Brand Resources',
};

/** Format an ISO date to a readable byline date; pass through anything unparseable. */
function formatDate(iso?: string | null): string | undefined {
  if (!iso) return undefined;
  const d = new Date(iso);
  if (Number.isNaN(d.getTime())) return iso;
  return d.toLocaleDateString('en-US', { year: 'numeric', month: 'long', day: 'numeric' });
}

type Props = { content: ContentProps<typeof BlogPostContentType> };

export default function BlogPost({ content }: Props) {
  const { pa, src } = getPreviewUtils(content);

  const heroSrc = content.HeroImage ? src(content.HeroImage) : undefined;
  const authorSrc = content.AuthorImage ? src(content.AuthorImage) : undefined;
  const publishDate = formatDate(content.PublishDate);
  const category = content.Category ? CATEGORY_LABEL[content.Category] ?? content.Category : undefined;
  const tags = (content.Tags ?? []) as string[];
  const blocks = content.ContentBlocks ?? [];

  return (
    <article className="mx-auto max-w-3xl px-6 py-12">
      <header className="mb-8">
        {category ? (
          <span
            {...pa('Category')}
            className="inline-block rounded bg-blue-100 px-3 py-1 text-xs font-bold uppercase tracking-widest text-blue-800"
          >
            {category}
          </span>
        ) : null}
        <h1 {...pa('PageTitle')} className="mt-4 text-4xl font-bold leading-tight text-slate-900">
          {content.PageTitle}
        </h1>
        {content.Kicker ? (
          <p {...pa('Kicker')} className="mt-3 text-xl leading-relaxed text-slate-600">
            {content.Kicker}
          </p>
        ) : null}

        {/* Byline: author, date, read time */}
        <div className="mt-6 flex items-center gap-3 border-y border-slate-200 py-4">
          {authorSrc ? (
            // eslint-disable-next-line @next/next/no-img-element
            <img
              {...pa('AuthorImage')}
              src={authorSrc}
              alt={content.AuthorName ?? ''}
              className="h-12 w-12 rounded-full object-cover"
            />
          ) : null}
          <div className="text-sm">
            {content.AuthorName ? (
              <p {...pa('AuthorName')} className="font-semibold text-slate-900">
                {content.AuthorName}
              </p>
            ) : null}
            {content.AuthorTitle ? (
              <p {...pa('AuthorTitle')} className="text-slate-500">
                {content.AuthorTitle}
              </p>
            ) : null}
          </div>
          <div className="ml-auto text-right text-sm text-slate-500">
            {publishDate ? <p {...pa('PublishDate')}>{publishDate}</p> : null}
            {content.ReadTime ? (
              <p {...pa('ReadTime')}>{content.ReadTime} min read</p>
            ) : null}
          </div>
        </div>
      </header>

      {heroSrc ? (
        // eslint-disable-next-line @next/next/no-img-element
        <img
          {...pa('HeroImage')}
          src={heroSrc}
          alt=""
          className="mb-10 w-full rounded-2xl object-cover"
        />
      ) : null}

      {content.Excerpt ? (
        <p {...pa('Excerpt')} className="mb-8 text-lg font-medium leading-relaxed text-slate-700">
          {content.Excerpt}
        </p>
      ) : null}

      <div {...pa('BodyContent')} className="prose prose-slate max-w-none">
        <RichText content={content.BodyContent?.json} />
      </div>

      {tags.length ? (
        <div {...pa('Tags')} className="mt-10 flex flex-wrap gap-2">
          {tags.map((tag, i) => (
            <span
              key={i}
              className="rounded-full bg-slate-100 px-3 py-1 text-xs font-medium text-slate-600"
            >
              #{tag}
            </span>
          ))}
        </div>
      ) : null}

      {/* Trailing block area: forms, card grids, alerts, disclaimers. */}
      {blocks.length ? (
        <div {...pa('ContentBlocks')} className="mt-12 space-y-12">
          {blocks.map((item, i) => (
            <OptimizelyComponent key={i} content={item} />
          ))}
        </div>
      ) : null}
    </article>
  );
}
