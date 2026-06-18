import { contentType, type ContentProps } from '@optimizely/cms-sdk';
import { getPreviewUtils } from '@optimizely/cms-sdk/react/server';

/**
 * GenUI: Impact — high-impact hero block / urgent global alert. Full-bleed
 * media background with a darkening overlay, headline + subtext, optional CTA.
 *
 * Property keys are PascalCase to mirror the content type as it already exists
 * in the CMS (created via the Opal MCP). Keep this definition in sync with the
 * CMS schema — including the Sys* governance props — so `opti-cli config push`
 * reconciles instead of dropping fields.
 */
export const GenUIImpactContentType = contentType({
  key: 'BannerGenUIImpact',
  baseType: '_component',
  displayName: 'GenUI: Impact',
  description: 'High-impact hero blocks or urgent global alerts.',
  compositionBehaviors: ['sectionEnabled'],
  properties: {
    Headline: { type: 'string', displayName: 'Headline', description: 'Main high-impact heading.', sortOrder: 10 },
    Subtext: { type: 'string', displayName: 'Subtext', description: 'Supporting description.', sortOrder: 20 },
    MediaBackground: {
      type: 'contentReference',
      displayName: 'Media Background',
      description: 'Background image or video.',
      allowedTypes: ['_image', '_video'],
      sortOrder: 30,
    },
    OverlayIntensity: {
      type: 'integer',
      displayName: 'Overlay Intensity',
      description: 'Darkness of the overlay (0-100).',
      sortOrder: 40,
    },
    ImpactCTA: { type: 'link', displayName: 'Impact CTA', description: 'Optional primary action.', sortOrder: 50 },
    SysFunctionalCategory: { type: 'string', displayName: 'Functional Category', description: 'Business domain category.', sortOrder: 100 },
    SysServiceLine: { type: 'string', displayName: 'Service Line / Area (CS)', description: 'Medical area (comma-separated).', sortOrder: 110 },
    SysPrimaryIntent: { type: 'string', displayName: 'Primary Intent', description: 'Dominant user goal.', sortOrder: 120 },
    SysIntentTags: { type: 'string', displayName: 'Intent Tags (CS)', description: 'Comma-separated secondary intents.', sortOrder: 130 },
    SysAcuityLevel: { type: 'string', displayName: 'Acuity Level', description: 'Clinical severity level.', sortOrder: 140 },
    SysJourneyStage: { type: 'string', displayName: 'Journey Stage', description: 'Relevant stage of the patient journey.', sortOrder: 150 },
  },
});

type Props = { content: ContentProps<typeof GenUIImpactContentType> };

export default function GenUIImpact({ content }: Props) {
  const { pa, src } = getPreviewUtils(content);
  const block = (content as { __composition?: { key: string } }).__composition;
  const edit = (content as { __context?: { edit?: boolean } }).__context?.edit;

  const href = edit ? undefined : content.ImpactCTA?.url?.default ?? undefined;
  const label = content.ImpactCTA?.text || content.ImpactCTA?.title;

  const bgSrc = content.MediaBackground ? src(content.MediaBackground) : undefined;
  // Clamp 0-100, default to a readable 45% scrim when unset.
  const intensity = Math.min(100, Math.max(0, content.OverlayIntensity ?? 45));

  return (
    <section
      {...pa(block)}
      className="relative overflow-hidden bg-[#00205C] text-white"
    >
      {bgSrc ? (
        // eslint-disable-next-line @next/next/no-img-element
        <img
          {...pa('MediaBackground')}
          src={bgSrc}
          alt=""
          className="absolute inset-0 h-full w-full object-cover"
        />
      ) : null}
      <div
        className="absolute inset-0 bg-black"
        style={{ opacity: intensity / 100 }}
      />
      <div className="container relative z-10 mx-auto px-4 py-28 lg:py-40">
        <div className="max-w-3xl">
          {content.Headline ? (
            <h1
              {...pa('Headline')}
              className="text-5xl lg:text-7xl font-serif font-bold leading-tight mb-6"
            >
              {content.Headline}
            </h1>
          ) : null}
          {content.Subtext ? (
            <p {...pa('Subtext')} className="text-xl lg:text-2xl text-blue-100/80 font-medium mb-10 max-w-2xl">
              {content.Subtext}
            </p>
          ) : null}
          {href || label ? (
            <a
              {...pa('ImpactCTA')}
              href={href}
              className="inline-block bg-[#FFD100] text-[#00205C] px-12 py-5 rounded-full font-black uppercase tracking-widest text-sm hover:bg-yellow-400 transition-all shadow-xl"
            >
              {label || 'Learn more'}
            </a>
          ) : null}
        </div>
      </div>
    </section>
  );
}
