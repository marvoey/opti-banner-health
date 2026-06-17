import { contentType, type ContentProps } from '@optimizely/cms-sdk';
import { getPreviewUtils } from '@optimizely/cms-sdk/react/server';
import { Check, Circle } from 'lucide-react';

/**
 * GenUI: Milestone Item — a single milestone within a care journey or wellness
 * plan: a label, a status/date, a completed flag, and a description. Designed
 * as an element block (stacked inside a journey/timeline container).
 *
 * PascalCase property keys mirror the CMS content type created via the Opal MCP.
 */
export const GenUIMilestoneContentType = contentType({
  key: 'BannerGenUIMilestone',
  baseType: '_component',
  displayName: 'GenUI: Milestone Item',
  description: 'A single milestone within a care journey or wellness plan.',
  compositionBehaviors: ['elementEnabled'],
  properties: {
    Label: { type: 'string', displayName: 'Label', description: 'The name of the milestone.', sortOrder: 10 },
    StatusDate: { type: 'string', displayName: 'Status/Date', description: "Date or current status (e.g. 'June 20' or 'In Progress').", sortOrder: 20 },
    IsCompleted: { type: 'boolean', displayName: 'Is Completed', description: 'Whether the milestone has been reached.', sortOrder: 30 },
    Description: { type: 'string', displayName: 'Description', description: 'Details about the milestone.', sortOrder: 40 },
  },
});

type Props = { content: ContentProps<typeof GenUIMilestoneContentType> };

export default function GenUIMilestone({ content }: Props) {
  const { pa } = getPreviewUtils(content);
  const block = (content as { __composition?: { key: string } }).__composition;
  const done = !!content.IsCompleted;

  return (
    <div {...pa(block)} className="flex gap-4 py-4">
      <div className="flex flex-col items-center">
        <span
          className={
            done
              ? 'flex h-8 w-8 items-center justify-center rounded-full bg-emerald-500 text-white'
              : 'flex h-8 w-8 items-center justify-center rounded-full border-2 border-slate-300 text-slate-400'
          }
        >
          {done ? <Check size={16} /> : <Circle size={10} className="fill-current" />}
        </span>
      </div>
      <div className="flex-1 pt-0.5">
        <div className="flex flex-wrap items-baseline justify-between gap-x-4">
          {content.Label ? (
            <h4
              {...pa('Label')}
              className={`text-lg font-bold ${done ? 'text-[#00205C]' : 'text-[#4A4A4A]'}`}
            >
              {content.Label}
            </h4>
          ) : null}
          {content.StatusDate ? (
            <span
              {...pa('StatusDate')}
              className={`text-xs font-bold uppercase tracking-widest ${done ? 'text-emerald-600' : 'text-gray-400'}`}
            >
              {content.StatusDate}
            </span>
          ) : null}
        </div>
        {content.Description ? (
          <p {...pa('Description')} className="mt-1 text-sm text-[#4A4A4A] font-medium">
            {content.Description}
          </p>
        ) : null}
      </div>
    </div>
  );
}
