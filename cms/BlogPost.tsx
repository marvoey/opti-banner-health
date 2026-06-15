import { contentType, type ContentProps } from '@optimizely/cms-sdk';
import { RichText } from '@optimizely/cms-sdk/react/richText';
import { OptimizelyComponent, getPreviewUtils } from '@optimizely/cms-sdk/react/server';
import { DemoTextContentType } from './DemoText';
import { DemoMediaContentType } from './DemoMedia';
import { DemoCardContentType } from './DemoCard';
import { DemoCalloutContentType } from './DemoCallout';
import { TestimonialContentType } from './Testimonial';
import { ServiceCtaBannerContentType } from './ServiceCtaBanner';
import { ServicesGridAutoContentType } from './ServicesGridAuto';
import { ConditionGridContentType } from './ConditionGrid';
import { FeaturedDoctorsContentType } from './FeaturedDoctors';
import { QuickCareCardsContentType } from './QuickCareCards';

/**
 * Blog Post — the translation-demo centerpiece. A `_page` (a regular content page
 * with its own URL — simpler and clearer than an Experience). Its FLAT properties
 * (category, title, author, body, …) are the "easy" Opal translation target, and
 * the `blocks` content area lets editors add EXISTING library blocks (Featured
 * Doctors, Conditions Grid, Testimonial, …) below the article to show scale.
 *
 * `blocks` is a ContentArea (`array` of `content`) over concrete block types, so
 * Graph fetches each block's full properties inline; we render them by resolving
 * each block's type through the component registry with `OptimizelyComponent`.
 */
export const BlogPostContentType = contentType({
  key: 'BannerDemoBlogPost',
  baseType: '_page',
  displayName: 'Banner: Blog Post',
  properties: {
    category: {
      type: 'string',
      displayName: 'Category',
      group: 'demo',
      isLocalized: true,
      enum: [
        { value: 'betterMe', displayName: 'Better Me' },
        { value: 'teachMe', displayName: 'Teach Me' },
        { value: 'adviseMe', displayName: 'Advise Me' },
        { value: 'inspireMe', displayName: 'Inspire Me' },
      ],
    },
    title: { type: 'string', displayName: 'Title', group: 'demo', isRequired: true, isLocalized: true },
    author: { type: 'string', displayName: 'Author', group: 'demo', isLocalized: true },
    authorTitle: { type: 'string', displayName: 'Author Title', group: 'demo', isLocalized: true },
    publishDate: { type: 'string', displayName: 'Publish Date', group: 'demo', isLocalized: true },
    readTime: { type: 'string', displayName: 'Read Time', group: 'demo', isLocalized: true },
    heroImageUrl: {
      type: 'string',
      displayName: 'Hero Image URL',
      description: 'A full image URL for the article hero.',
      group: 'demo',
      isLocalized: true,
    },
    heroImageAlt: { type: 'string', displayName: 'Hero Image Alt Text', group: 'demo', isLocalized: true },
    excerpt: { type: 'string', displayName: 'Excerpt', group: 'demo', isLocalized: true },
    body: { type: 'richText', displayName: 'Body', group: 'demo', isLocalized: true },
    blocks: {
      type: 'array',
      displayName: 'Blocks',
      description: 'Add reusable content blocks below the article.',
      group: 'demo',
      isLocalized: true,
      items: {
        type: 'content',
        allowedTypes: [
          DemoTextContentType,
          DemoMediaContentType,
          DemoCardContentType,
          DemoCalloutContentType,
          TestimonialContentType,
          ServiceCtaBannerContentType,
          ServicesGridAutoContentType,
          ConditionGridContentType,
          FeaturedDoctorsContentType,
          QuickCareCardsContentType,
        ],
      },
    },
  },
});

/** Category key → display label. Falls back to the raw key for unknown values. */
const CATEGORY_LABELS: Record<string, string> = {
  betterMe: 'Better Me',
  teachMe: 'Teach Me',
  adviseMe: 'Advise Me',
  inspireMe: 'Inspire Me',
};

type Props = { content: ContentProps<typeof BlogPostContentType> };
type Block = { __typename: string };

export default function BlogPost({ content }: Props) {
  const { pa } = getPreviewUtils(content);
  const categoryLabel = content.category ? CATEGORY_LABELS[content.category] ?? content.category : null;
  // Compact byline: "Author • Date • Read time" with only the parts that are set.
  const meta = [content.author, content.publishDate, content.readTime].filter(Boolean);
  const blocks = (content.blocks ?? []) as Block[];

  return (
    <main>
      <article>
        {/* Hero band */}
        <header className="bg-[#00205C] text-white">
          <div className="container mx-auto max-w-4xl px-4 py-16">
            {categoryLabel ? (
              <span
                {...pa('category')}
                className="inline-block rounded bg-[#FFD100] px-3 py-1 text-xs font-black uppercase tracking-widest text-[#00205C]"
              >
                {categoryLabel}
              </span>
            ) : null}
            <h1
              {...pa('title')}
              className="mt-6 font-serif text-4xl font-bold leading-tight md:text-5xl"
            >
              {content.title}
            </h1>
            {meta.length ? (
              <p className="mt-6 flex flex-wrap items-center gap-x-3 gap-y-1 text-sm font-medium text-blue-100/80">
                {content.author ? (
                  <span {...pa('author')}>
                    {content.author}
                    {content.authorTitle ? (
                      <span {...pa('authorTitle')} className="text-blue-200/70">
                        {' '}
                        — {content.authorTitle}
                      </span>
                    ) : null}
                  </span>
                ) : null}
                {content.author && content.publishDate ? <span aria-hidden>•</span> : null}
                {content.publishDate ? <span {...pa('publishDate')}>{content.publishDate}</span> : null}
                {(content.author || content.publishDate) && content.readTime ? (
                  <span aria-hidden>•</span>
                ) : null}
                {content.readTime ? <span {...pa('readTime')}>{content.readTime}</span> : null}
              </p>
            ) : null}
          </div>
        </header>

        {content.heroImageUrl ? (
          <div className="container mx-auto max-w-4xl px-4">
            {/* eslint-disable-next-line @next/next/no-img-element */}
            <img
              {...pa('heroImageUrl')}
              src={content.heroImageUrl}
              alt={content.heroImageAlt ?? ''}
              className="-mt-8 aspect-video w-full rounded-3xl border-4 border-white object-cover shadow-2xl"
            />
          </div>
        ) : null}

        {/* Article body */}
        <div className="container mx-auto max-w-3xl px-4 py-12">
          {content.excerpt ? (
            <p {...pa('excerpt')} className="mb-8 text-xl font-medium leading-relaxed text-slate-600">
              {content.excerpt}
            </p>
          ) : null}
          <div
            {...pa('body')}
            className="prose prose-slate max-w-none text-slate-800 prose-headings:text-[#00205C] prose-a:text-blue-800"
          >
            <RichText content={content.body?.json} />
          </div>
        </div>
      </article>

      {/* Reusable library blocks added on the page (scale). Each block's type is
          resolved through the component registry and rendered in place. */}
      {blocks.length ? (
        <div {...pa('blocks')}>
          {blocks.map((block, i) => (
            <OptimizelyComponent key={i} content={block} />
          ))}
        </div>
      ) : null}
    </main>
  );
}
