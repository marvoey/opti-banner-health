"use client";

import { contentType, type ContentProps } from '@optimizely/cms-sdk';
import { getPreviewUtils } from '@optimizely/cms-sdk/react/server';

/**
 * GenUI: Action — transactional block for decisions and conversions (bills,
 * CTAs). Surfaces a prominent value (e.g. "$142.00"), a label, supporting
 * context, and a primary action button. VisualIntent tunes the accent color.
 *
 * PascalCase property keys mirror the CMS content type created via the Opal
 * MCP; keep in sync (incl. Sys* governance props) so config push reconciles.
 */
export const GenUIActionContentType = contentType({
  key: 'BannerGenUIAction',
  baseType: '_component',
  displayName: 'GenUI: Action',
  description: 'Transactional block for decisions and conversions (Bills, CTAs).',
  compositionBehaviors: ['sectionEnabled'],
  properties: {
    PrimaryValue: { type: 'string', displayName: 'Primary Value', description: 'The headline value (e.g. $142.00).', sortOrder: 10 },
    ValueLabel: { type: 'string', displayName: 'Value Label', description: 'Label for the value (e.g. Amount Due).', sortOrder: 20 },
    SupportingText: { type: 'string', displayName: 'Supporting Text', description: 'Context for the value (e.g. Due: June 30).', sortOrder: 30 },
    PrimaryCTA: { type: 'link', displayName: 'Primary CTA', description: 'The primary action link.', sortOrder: 40 },
    VisualIntent: { type: 'string', displayName: 'Visual Intent', description: 'Visual styling intent.', sortOrder: 50 },
    SysFunctionalCategory: { type: 'string', displayName: 'Functional Category', description: 'Business domain category.', sortOrder: 100 },
    SysServiceLine: { type: 'string', displayName: 'Service Line / Area (CS)', description: 'Medical area (comma-separated).', sortOrder: 110 },
    SysPrimaryIntent: { type: 'string', displayName: 'Primary Intent', description: 'Dominant user goal.', sortOrder: 120 },
    SysIntentTags: { type: 'string', displayName: 'Intent Tags (CS)', description: 'Comma-separated secondary intents.', sortOrder: 130 },
    SysAcuityLevel: { type: 'string', displayName: 'Acuity Level', description: 'Clinical severity level.', sortOrder: 140 },
    SysJourneyStage: { type: 'string', displayName: 'Journey Stage', description: 'Relevant stage of the patient journey.', sortOrder: 150 },
  },
});

type Props = { content: ContentProps<typeof GenUIActionContentType> };

// Map a free-text intent onto an accent treatment. Falls back to the brand navy.
function intentTheme(intent?: string | null) {
  switch ((intent || '').trim().toLowerCase()) {
    case 'urgent':
    case 'danger':
    case 'overdue':
      return { accent: 'text-red-600', ring: 'border-red-200', cta: 'bg-red-600 text-white hover:bg-red-700' };
    case 'success':
    case 'paid':
      return { accent: 'text-emerald-600', ring: 'border-emerald-200', cta: 'bg-emerald-600 text-white hover:bg-emerald-700' };
    default:
      return { accent: 'text-[#00205C]', ring: 'border-slate-200', cta: 'bg-[#FFD100] text-[#00205C] hover:bg-yellow-400' };
  }
}

export default function GenUIAction({ content }: Props) {
  const { pa } = getPreviewUtils(content);
  const block = (content as { __composition?: { key: string } }).__composition;
  const edit = (content as { __context?: { edit?: boolean } }).__context?.edit;

  const href = edit ? undefined : content.PrimaryCTA?.url?.default ?? undefined;
  const label = content.PrimaryCTA?.text || content.PrimaryCTA?.title;
  const theme = intentTheme(content.VisualIntent);

  return (
    <section {...pa(block)} className="py-10">
      <div className="container mx-auto px-4">
        <div className={`rounded-3xl border bg-white p-8 lg:p-10 shadow-sm flex flex-col lg:flex-row lg:items-center lg:justify-between gap-8 ${theme.ring}`}>
          <div>
            {content.ValueLabel ? (
              <p {...pa('ValueLabel')} className="text-xs font-bold uppercase tracking-widest text-gray-400 mb-2">
                {content.ValueLabel}
              </p>
            ) : null}
            {content.PrimaryValue ? (
              <p {...pa('PrimaryValue')} className={`text-5xl font-serif font-bold tracking-tight ${theme.accent}`}>
                {content.PrimaryValue}
              </p>
            ) : null}
            {content.SupportingText ? (
              <p {...pa('SupportingText')} className="mt-3 text-base text-[#4A4A4A] font-medium">
                {content.SupportingText}
              </p>
            ) : null}
          </div>
          {href || label ? (
            <a
              {...pa('PrimaryCTA')}
              href={href}
              className={`inline-block whitespace-nowrap rounded-full px-10 py-5 font-black uppercase tracking-widest text-sm transition-all shadow-lg ${theme.cta}`}
            >
              {label || 'Continue'}
            </a>
          ) : null}
        </div>
      </div>
    </section>
  );
}
