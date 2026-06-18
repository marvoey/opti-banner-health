import { contentType, type ContentProps } from '@optimizely/cms-sdk';
import { getPreviewUtils } from '@optimizely/cms-sdk/react/server';
import { Check, Circle } from 'lucide-react';

/**
 * GenUI: Journey — a care journey / wellness plan roadmap: a title, an overall
 * progress indicator, and a list of milestones. Milestones is a comma-separated
 * string (matching the CMS schema); completion is derived from progress.
 *
 * PascalCase property keys + Sys* governance block at the bottom mirror the CMS
 * content type, so `opti-cli config push` reconciles instead of dropping fields.
 */
export const GenUIJourneyContentType = contentType({
  key: 'BannerGenUIJourney',
  baseType: '_component',
  displayName: 'BannerGenUI: Journey',
  compositionBehaviors: ['sectionEnabled'],
  properties: {
    JourneyTitle: { type: 'string', displayName: 'Journey Title', description: 'The name of the roadmap.', sortOrder: 10 },
    ProgressPercentage: { type: 'integer', displayName: 'Progress Percentage', description: 'Overall progress (0-100).', sortOrder: 20 },
    Milestones: { type: 'string', displayName: 'Milestones (CS)', description: 'List of milestone items.', sortOrder: 30 },
    SysFunctionalCategory: { type: 'string', displayName: 'Functional Category', description: 'Business domain category.', sortOrder: 100 },
    SysServiceLine: { type: 'string', displayName: 'Service Line / Area (CS)', description: 'Medical area (comma-separated).', sortOrder: 110 },
    SysPrimaryIntent: { type: 'string', displayName: 'Primary Intent', description: 'Dominant user goal.', sortOrder: 120 },
    SysIntentTags: { type: 'string', displayName: 'Intent Tags (CS)', description: 'Comma-separated secondary intents.', sortOrder: 130 },
    SysAcuityLevel: { type: 'string', displayName: 'Acuity Level', description: 'Clinical severity level.', sortOrder: 140 },
    SysJourneyStage: { type: 'string', displayName: 'Journey Stage', description: 'Relevant stage of the patient journey.', sortOrder: 150 },
  },
});

type Props = { content: ContentProps<typeof GenUIJourneyContentType> };

export default function GenUIJourney({ content }: Props) {
  const { pa } = getPreviewUtils(content);
  const block = (content as { __composition?: { key: string } }).__composition;

  const progress = Math.min(100, Math.max(0, content.ProgressPercentage ?? 0));
  const milestones = (content.Milestones ?? '')
    .split(',')
    .map((m) => m.trim())
    .filter(Boolean);
  // Tie completion to progress: the first N milestones are "done".
  const completedCount = Math.round((progress / 100) * milestones.length);

  return (
    <div {...pa(block)} className="rounded-3xl border border-slate-200 bg-white p-8 shadow-sm">
      {content.JourneyTitle ? (
        <h3 {...pa('JourneyTitle')} className="text-2xl font-serif font-bold text-[#00205C]">
          {content.JourneyTitle}
        </h3>
      ) : null}

      <div {...pa('ProgressPercentage')} className="mt-4">
        <div className="flex items-center justify-between text-xs font-bold uppercase tracking-widest text-gray-400">
          <span>Progress</span>
          <span className="text-[#00205C]">{progress}%</span>
        </div>
        <div className="mt-2 h-2 w-full overflow-hidden rounded-full bg-slate-100">
          <div className="h-full rounded-full bg-[#FFD100] transition-all" style={{ width: `${progress}%` }} />
        </div>
      </div>

      {milestones.length ? (
        <ol {...pa('Milestones')} className="mt-6 space-y-3">
          {milestones.map((label, i) => {
            const done = i < completedCount;
            return (
              <li key={i} className="flex items-center gap-3">
                <span
                  className={
                    done
                      ? 'flex h-6 w-6 items-center justify-center rounded-full bg-emerald-500 text-white'
                      : 'flex h-6 w-6 items-center justify-center rounded-full border-2 border-slate-300 text-slate-400'
                  }
                >
                  {done ? <Check size={12} /> : <Circle size={8} className="fill-current" />}
                </span>
                <span className={`text-sm font-medium ${done ? 'text-[#00205C]' : 'text-[#4A4A4A]'}`}>
                  {label}
                </span>
              </li>
            );
          })}
        </ol>
      ) : null}
    </div>
  );
}
