import { contentType, type ContentProps } from '@optimizely/cms-sdk';
import { getPreviewUtils } from '@optimizely/cms-sdk/react/server';
import { Puzzle } from 'lucide-react';

/**
 * GenUI: Embed — container for 3rd-party widgets and tools (maps, schedulers).
 * The actual widget is mounted client-side by provider id + config; on the
 * server we render a labelled placeholder frame so the slot is visible in
 * Visual Builder and on first paint.
 *
 * PascalCase property keys mirror the CMS content type created via the Opal MCP.
 */
export const GenUIEmbedContentType = contentType({
  key: 'BannerGenUIEmbed',
  baseType: '_component',
  displayName: 'GenUI: Embed',
  description: 'Container for 3rd party widgets and tools (Maps, Schedulers).',
  compositionBehaviors: ['sectionEnabled', 'elementEnabled'],
  properties: {
    ServiceTitle: { type: 'string', displayName: 'Service Title', description: 'The name of the embedded tool.', sortOrder: 10 },
    ServiceProviderID: { type: 'string', displayName: 'Service Provider ID', description: 'ID or Key for the service provider (e.g. GoogleMaps).', sortOrder: 20 },
    ConfigurationJSON: { type: 'string', displayName: 'Configuration JSON', description: 'Technical configuration for the service.', sortOrder: 30 },
    PlaceholderText: { type: 'string', displayName: 'Placeholder Text', description: 'Text shown while loading or as a prompt.', sortOrder: 40 },
    SysFunctionalCategory: { type: 'string', displayName: 'Functional Category', description: 'Business domain category.', sortOrder: 100 },
    SysServiceLine: { type: 'string', displayName: 'Service Line / Area (CS)', description: 'Medical area (comma-separated).', sortOrder: 110 },
    SysPrimaryIntent: { type: 'string', displayName: 'Primary Intent', description: 'Dominant user goal.', sortOrder: 120 },
    SysIntentTags: { type: 'string', displayName: 'Intent Tags (CS)', description: 'Comma-separated secondary intents.', sortOrder: 130 },
    SysAcuityLevel: { type: 'string', displayName: 'Acuity Level', description: 'Clinical severity level.', sortOrder: 140 },
    SysJourneyStage: { type: 'string', displayName: 'Journey Stage', description: 'Relevant stage of the patient journey.', sortOrder: 150 },
  },
});

type Props = { content: ContentProps<typeof GenUIEmbedContentType> };

export default function GenUIEmbed({ content }: Props) {
  const { pa } = getPreviewUtils(content);
  const block = (content as { __composition?: { key: string } }).__composition;

  return (
    <section {...pa(block)} className="py-8">
      <div className="container mx-auto px-4">
        <div
          data-provider-id={content.ServiceProviderID || undefined}
          data-config={content.ConfigurationJSON || undefined}
          className="flex min-h-56 flex-col items-center justify-center rounded-3xl border-2 border-dashed border-slate-300 bg-slate-50 p-10 text-center"
        >
          <Puzzle size={32} className="mb-4 text-[#00205C]/40" />
          {content.ServiceTitle ? (
            <h3 {...pa('ServiceTitle')} className="text-xl font-serif font-bold text-[#00205C]">
              {content.ServiceTitle}
            </h3>
          ) : null}
          {content.ServiceProviderID ? (
            <p {...pa('ServiceProviderID')} className="mt-1 text-xs font-bold uppercase tracking-widest text-gray-400">
              {content.ServiceProviderID}
            </p>
          ) : null}
          {content.PlaceholderText ? (
            <p {...pa('PlaceholderText')} className="mt-4 max-w-md text-sm text-[#4A4A4A] font-medium">
              {content.PlaceholderText}
            </p>
          ) : null}
        </div>
      </div>
    </section>
  );
}
