import { contentType, type ContentProps } from '@optimizely/cms-sdk';
import { getPreviewUtils } from '@optimizely/cms-sdk/react/server';
import { RichText } from '@optimizely/cms-sdk/react/richText';
import { authoringMetadata } from './authoringMetadata';
import { blockWidth, widthClass } from './blockWidth';

/**
 * Regulatory Disclaimer — audited legal / licensing copy. The body is locked
 * legal content (edited by compliance, not AI). Properties per demo-notes/052a.
 */
export const RegulatoryDisclaimerContentType = contentType({
  key: 'RegulatoryDisclaimerBlock',
  baseType: '_component',
  displayName: 'Regulatory Disclaimer (v1)',
  description: 'Audited legal disclaimer with tracking ID and optional BCBSA licensing badge.',
  compositionBehaviors: ['elementEnabled'],
  properties: {
    ...blockWidth(),
    DisclosuresID: {
      type: 'string',
      displayName: 'Disclosures ID',
      description: 'Compliance tracking code. retrieve · legal_approved · required · pattern LA-BLUE-DISC-####.',
      pattern: '^LA-BLUE-DISC-[0-9]{4}$',
      isRequired: true,
      isLocalized: true,
      sortOrder: 10,
    },
    DisclaimerBody: {
      type: 'richText',
      displayName: 'Disclaimer Body',
      description: 'Legal copy. locked · legal_approved · ai_editing_allowed=false.',
      isLocalized: true,
      sortOrder: 20,
    },
    ShowLicensingLogo: {
      type: 'boolean',
      displayName: 'Show Licensing Logo',
      description: 'Append the BCBSA licensing badge. select · legal_approved. Default: on.',
      isLocalized: true,
      sortOrder: 30,
    },
    ...authoringMetadata({
      purpose: 'compliance',
      intents: ['publish_regulated_content'],
      pageTypes: ['medicare', 'provider', 'campaign', 'form'],
      audiences: ['member', 'employer', 'provider', 'broker', 'medicare'],
      position: 'footer_content',
      priority: 'required',
      governance: ['legal_review', 'no_ai_edit'],
    }),
  },
});

type Props = { content: ContentProps<typeof RegulatoryDisclaimerContentType> };

export default function RegulatoryDisclaimer({ content }: Props) {
  const { pa } = getPreviewUtils(content);
  const block = (content as { __composition?: { key: string } }).__composition;
  // No explicit default support in the schema — treat unset as "on".
  const showLogo = content.ShowLicensingLogo !== false;

  return (
    <section {...pa(block)} className="border-t border-slate-200 bg-slate-50 px-6 py-8">
      <div className={`mx-auto flex items-start gap-4 ${widthClass(content.BlockWidth)}`}>
        {showLogo ? (
          <span className="shrink-0 rounded border border-blue-800 px-2 py-1 text-[10px] font-bold uppercase leading-tight text-blue-800">
            BCBSA
            <br />
            Licensed
          </span>
        ) : null}
        <div className="text-xs leading-relaxed text-slate-600">
          <div {...pa('DisclaimerBody')} className="prose prose-sm max-w-none text-slate-600">
            <RichText content={content.DisclaimerBody?.json} />
          </div>
          {content.DisclosuresID ? (
            <p {...pa('DisclosuresID')} className="mt-2 text-[11px] uppercase tracking-wide text-slate-400">
              {content.DisclosuresID}
            </p>
          ) : null}
        </div>
      </div>
    </section>
  );
}
