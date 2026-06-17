import { contentType, type ContentProps } from '@optimizely/cms-sdk';
import { getPreviewUtils } from '@optimizely/cms-sdk/react/server';
import { RichText } from '@optimizely/cms-sdk/react/richText';

/**
 * GenUI: Narrative — long-form storytelling block (patient stories, editorial
 * narratives): title, subtitle, rich-text body, featured image, and category
 * tags (comma-separated).
 *
 * PascalCase property keys + Sys* governance block at the bottom mirror the CMS
 * content type, so `opti-cli config push` reconciles instead of dropping fields.
 */
export const GenUINarrativeContentType = contentType({
  key: 'BannerGenUINarrative',
  baseType: '_component',
  displayName: 'BannerGenUI:Narrative',
  compositionBehaviors: ['sectionEnabled', 'elementEnabled'],
  properties: {
    Title: { type: 'string', displayName: 'Title', description: 'The main heading.', sortOrder: 10 },
    Subtitle: { type: 'string', displayName: 'Subtitle', description: 'Secondary heading.', sortOrder: 20 },
    BodyContent: { type: 'richText', displayName: 'Body Content', description: 'The main article or narrative content.', sortOrder: 30 },
    PrimaryImage: {
      type: 'contentReference',
      displayName: 'Primary Image',
      description: 'Featured image for the narrative block.',
      allowedTypes: ['_image'],
      sortOrder: 40,
    },
    CategoryTags: { type: 'string', displayName: 'Category Tags (CS)', description: 'Keywords for categorization (comma-separated).', sortOrder: 50 },
    SysFunctionalCategory: { type: 'string', displayName: 'Functional Category', description: 'Maps to the 9 business domains.', sortOrder: 100 },
    SysServiceLine: { type: 'string', displayName: 'Service Line / Area (CS)', description: 'e.g., Cardiology, Maternity, Oncology (comma-separated).', sortOrder: 110 },
    SysPrimaryIntent: { type: 'string', displayName: 'Primary Intent', description: 'The dominant user goal for this block.', sortOrder: 120 },
    SysIntentTags: { type: 'string', displayName: 'Intent Tags (CS)', description: 'Secondary or supporting intents (comma-separated).', sortOrder: 130 },
    SysAcuityLevel: { type: 'string', displayName: 'Acuity Level', description: 'Maps to clinical severity.', sortOrder: 140 },
    SysJourneyStage: { type: 'string', displayName: 'Journey Stage', description: 'Contextual relevance for the user journey.', sortOrder: 150 },
  },
});

type Props = { content: ContentProps<typeof GenUINarrativeContentType> };

export default function GenUINarrative({ content }: Props) {
  const { pa, src } = getPreviewUtils(content);
  const block = (content as { __composition?: { key: string } }).__composition;

  const imageSrc = content.PrimaryImage ? src(content.PrimaryImage) : undefined;
  const tags = (content.CategoryTags ?? '')
    .split(',')
    .map((t) => t.trim())
    .filter(Boolean);

  return (
    <section {...pa(block)} className="py-16">
      <article className="container mx-auto max-w-3xl px-4">
        {tags.length ? (
          <div {...pa('CategoryTags')} className="mb-6 flex flex-wrap gap-2">
            {tags.map((tag, i) => (
              <span
                key={i}
                className="rounded-full bg-blue-50 px-3 py-1 text-[11px] font-black uppercase tracking-widest text-blue-600"
              >
                {tag}
              </span>
            ))}
          </div>
        ) : null}

        {content.Title ? (
          <h1 {...pa('Title')} className="text-4xl lg:text-5xl font-serif font-bold text-[#00205C] leading-tight">
            {content.Title}
          </h1>
        ) : null}
        {content.Subtitle ? (
          <p {...pa('Subtitle')} className="mt-4 text-xl text-[#4A4A4A] font-medium">
            {content.Subtitle}
          </p>
        ) : null}

        {imageSrc ? (
          <div className="mt-10 overflow-hidden rounded-3xl shadow-xl">
            {/* eslint-disable-next-line @next/next/no-img-element */}
            <img
              {...pa('PrimaryImage')}
              src={imageSrc}
              alt={content.Title ?? ''}
              className="w-full object-cover"
            />
          </div>
        ) : null}

        {content.BodyContent ? (
          <div
            {...pa('BodyContent')}
            className="prose prose-lg mt-10 max-w-none prose-headings:font-serif prose-headings:text-[#00205C] prose-a:text-blue-600"
          >
            <RichText content={content.BodyContent?.json} />
          </div>
        ) : null}
      </article>
    </section>
  );
}
