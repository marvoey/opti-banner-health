import { contentType, type ContentProps } from '@optimizely/cms-sdk';
import { getPreviewUtils } from '@optimizely/cms-sdk/react/server';
import { Star } from 'lucide-react';

/**
 * GenUI: Profile — entity block for providers, facilities, and centers. A
 * photo, name, specialty/service, star rating, and a link to the full profile.
 *
 * PascalCase property keys mirror the CMS content type created via the Opal
 * MCP; keep in sync (incl. Sys* governance props) so config push reconciles.
 */
export const GenUIProfileContentType = contentType({
  key: 'BannerGenUIProfile',
  baseType: '_component',
  displayName: 'GenUI: Profile',
  description: 'Entity block for providers, facilities, and centers.',
  compositionBehaviors: ['sectionEnabled', 'elementEnabled'],
  properties: {
    EntityName: { type: 'string', displayName: 'Entity Name', description: 'Name of the person or place.', sortOrder: 10 },
    ProfileImage: {
      type: 'contentReference',
      displayName: 'Profile Image',
      description: 'Headshot or facility photo.',
      allowedTypes: ['_image'],
      sortOrder: 20,
    },
    Specialty: { type: 'string', displayName: 'Specialty / Service', description: 'Primary area of expertise or service.', sortOrder: 30 },
    RatingScore: { type: 'float', displayName: 'Rating Score', description: 'Numeric rating (0-5).', sortOrder: 40 },
    DetailsLink: { type: 'link', displayName: 'Details Link', description: 'Link to the full profile.', sortOrder: 50 },
    SysFunctionalCategory: { type: 'string', displayName: 'Functional Category', description: 'Business domain category.', sortOrder: 100 },
    SysServiceLine: { type: 'string', displayName: 'Service Line / Area (CS)', description: 'Medical area (comma-separated).', sortOrder: 110 },
    SysPrimaryIntent: { type: 'string', displayName: 'Primary Intent', description: 'Dominant user goal.', sortOrder: 120 },
    SysIntentTags: { type: 'string', displayName: 'Intent Tags (CS)', description: 'Comma-separated secondary intents.', sortOrder: 130 },
    SysAcuityLevel: { type: 'string', displayName: 'Acuity Level', description: 'Clinical severity level.', sortOrder: 140 },
    SysJourneyStage: { type: 'string', displayName: 'Journey Stage', description: 'Relevant stage of the patient journey.', sortOrder: 150 },
  },
});

type Props = { content: ContentProps<typeof GenUIProfileContentType> };

function Stars({ score }: { score: number }) {
  const rounded = Math.round(score * 2) / 2; // nearest half
  return (
    <div className="flex items-center gap-1" aria-label={`${score} out of 5`}>
      {[1, 2, 3, 4, 5].map((i) => (
        <Star
          key={i}
          size={16}
          className={i <= rounded ? 'fill-[#FFD100] text-[#FFD100]' : 'text-slate-300'}
        />
      ))}
      <span className="ml-1 text-sm font-bold text-[#00205C]">{score.toFixed(1)}</span>
    </div>
  );
}

export default function GenUIProfile({ content }: Props) {
  const { pa, src } = getPreviewUtils(content);
  const block = (content as { __composition?: { key: string } }).__composition;
  const edit = (content as { __context?: { edit?: boolean } }).__context?.edit;

  const href = edit ? undefined : content.DetailsLink?.url?.default ?? undefined;
  const label = content.DetailsLink?.text || content.DetailsLink?.title;
  const imageSrc = content.ProfileImage ? src(content.ProfileImage) : undefined;
  const hasRating = typeof content.RatingScore === 'number';

  return (
    <section {...pa(block)} className="py-8">
      <div className="container mx-auto px-4">
        <div className="flex items-center gap-6 rounded-3xl border border-slate-200 bg-white p-6 shadow-sm max-w-2xl">
          <div className="h-24 w-24 shrink-0 overflow-hidden rounded-2xl bg-slate-100">
            {imageSrc ? (
              // eslint-disable-next-line @next/next/no-img-element
              <img
                {...pa('ProfileImage')}
                src={imageSrc}
                alt={content.EntityName ?? ''}
                className="h-full w-full object-cover"
              />
            ) : null}
          </div>
          <div className="min-w-0 flex-1">
            {content.EntityName ? (
              <h3 {...pa('EntityName')} className="text-2xl font-serif font-bold text-[#00205C] truncate">
                {content.EntityName}
              </h3>
            ) : null}
            {content.Specialty ? (
              <p {...pa('Specialty')} className="text-sm font-bold uppercase tracking-widest text-gray-400 mt-1">
                {content.Specialty}
              </p>
            ) : null}
            {hasRating ? (
              <div {...pa('RatingScore')} className="mt-3">
                <Stars score={content.RatingScore as number} />
              </div>
            ) : null}
            {href || label ? (
              <a
                {...pa('DetailsLink')}
                href={href}
                className="mt-4 inline-block text-sm font-bold text-[#00205C] underline decoration-[#FFD100] decoration-2 underline-offset-4 hover:text-blue-800"
              >
                {label || 'View profile'}
              </a>
            ) : null}
          </div>
        </div>
      </div>
    </section>
  );
}
