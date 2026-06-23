import { contentType, type ContentProps } from '@optimizely/cms-sdk';
import { getPreviewUtils } from '@optimizely/cms-sdk/react/server';
import { authoringMetadata } from './authoringMetadata';
import { AlertShell } from './AlertShell';

/**
 * Network Status Alert — a global, dismissible banner for fast-action
 * operational communications. Severity drives the styling. Properties per
 * demo-notes/052a. (GlobalPublish is delivered for downstream multi-site
 * distribution logic; this scaffold renders the banner in place.)
 */
export const NetworkStatusAlertContentType = contentType({
  key: 'NetworkStatusAlertBlock',
  baseType: '_component',
  displayName: 'Network Status Alert (v1)',
  description: 'Severity-styled operational alert banner with optional link and dismiss.',
  compositionBehaviors: ['elementEnabled'],
  properties: {
    AlertSeverity: {
      type: 'string',
      displayName: 'Alert Severity',
      description: 'Styling rules: Info (blue), Warning (yellow), Critical (red). select · controlled_values.',
      isLocalized: true,
      sortOrder: 10,
      enum: [
        { value: 'Info', displayName: 'Info' },
        { value: 'Warning', displayName: 'Warning' },
        { value: 'Critical', displayName: 'Critical' },
      ],
    },
    AlertMessage: {
      type: 'string',
      displayName: 'Alert Message',
      description: 'High-visibility message. generate · operational_approved · ≤180 chars · required.',
      maxLength: 180,
      isRequired: true,
      isLocalized: true,
      sortOrder: 20,
    },
    AlertLink: {
      type: 'link',
      displayName: 'Alert Link',
      description: 'Link to updates. select · approved_content_only · required when Warning/Critical.',
      isLocalized: true,
      sortOrder: 30,
    },
    IsDismissible: {
      type: 'boolean',
      displayName: 'Is Dismissible',
      description: 'Allow the user to close the banner. Default: on.',
      isLocalized: true,
      sortOrder: 40,
    },
    GlobalPublish: {
      type: 'boolean',
      displayName: 'Global Publish',
      description: 'Force onto every site root under the parent. suggest · approval_required. Default: off.',
      isLocalized: true,
      sortOrder: 50,
    },
    ...authoringMetadata({
      purpose: 'operational_notification',
      intents: ['notify', 'announce_outage', 'emergency_update'],
      pageTypes: ['all'],
      audiences: ['member', 'employer', 'provider', 'broker', 'medicare'],
      position: 'above_header_or_top_content',
      priority: 'conditional',
      governance: ['global_approval'],
    }),
  },
});

const SEVERITY: Record<string, string> = {
  Info: 'bg-blue-50 border-blue-200 text-blue-900',
  Warning: 'bg-amber-50 border-amber-300 text-amber-900',
  Critical: 'border-red-300 text-red-800',
};

type Props = { content: ContentProps<typeof NetworkStatusAlertContentType> };

export default function NetworkStatusAlert({ content }: Props) {
  const { pa } = getPreviewUtils(content);
  const block = (content as { __composition?: { key: string } }).__composition;
  const edit = (content as { __context?: { edit?: boolean } }).__context?.edit;

  const severity = content.AlertSeverity ?? 'Info';
  const tone = SEVERITY[severity] ?? SEVERITY.Info;
  const critical = severity === 'Critical';
  const dismissible = content.IsDismissible !== false; // default on
  const href = edit ? undefined : content.AlertLink?.url?.default ?? undefined;
  const linkLabel = content.AlertLink?.text || content.AlertLink?.title;

  return (
    <div {...pa(block)}>
      <AlertShell
        dismissible={dismissible}
        className={`mx-auto flex max-w-6xl items-start gap-3 border-l-4 px-6 py-3 text-sm ${tone}`}
      >
        <p {...pa('AlertMessage')} className="font-medium" style={critical ? { color: 'var(--color-brand-red)' } : undefined}>
          <span className="mr-2 font-bold uppercase tracking-wide">{severity}:</span>
          {content.AlertMessage}
          {href || linkLabel ? (
            <a
              {...pa('AlertLink')}
              href={href}
              target={edit ? undefined : content.AlertLink?.target ?? undefined}
              className="ml-2 font-semibold underline"
            >
              {linkLabel || 'Learn more'}
            </a>
          ) : null}
        </p>
      </AlertShell>
    </div>
  );
}
