/**
 * Authoring metadata helper (Louisiana Blue "Generative Authoring" model).
 *
 * The Optimizely SDK's contentType() has no native slot for arbitrary block
 * metadata, so — following the precedent of the old GenUI blocks — we encode the
 * block-level authoring metadata from demo-notes/052 as `Sys*` content
 * properties. They live in the dedicated `authoring` property group (declared in
 * optimizely.config.mjs), are `queryable` so an AI page-planner can filter on
 * them via Optimizely Graph, and carry the block's canonical value in each
 * `description`. They are metadata only — the React components never render them.
 *
 * Spread the result into a content type's `properties`:
 *   properties: { MainTitle: {...}, ...authoringMetadata({ purpose: '...', ... }) }
 */

const GROUP = 'authoring';

export type GenerationPriority =
  | 'required'
  | 'high'
  | 'medium_high'
  | 'medium'
  | 'conditional';

export interface AuthoringMeta {
  /** Business purpose, e.g. 'page_introduction'. */
  purpose: string;
  /** Supported author intents, e.g. ['educate', 'convert']. */
  intents: string[];
  /** Page types this block suits, e.g. ['landing', 'campaign']. */
  pageTypes: string[];
  /** Audiences, e.g. ['member', 'provider']. */
  audiences: string[];
  /** Recommended composition position, e.g. 'first_content'. */
  position: string;
  /** Generation priority. */
  priority: GenerationPriority;
  /** Governance tags, e.g. ['legal_review', 'pii_review']. */
  governance?: string[];
}

function sysString(displayName: string, canonical: string, sortOrder: number) {
  return {
    type: 'string' as const,
    displayName,
    description: `Authoring metadata (queryable via Graph). Canonical: ${canonical || 'none'}`,
    group: GROUP,
    indexingType: 'queryable' as const,
    // Locale-invariant: block-level authoring metadata is a single canonical
    // value across all locales (not translated content).
    isLocalized: false,
    sortOrder,
  };
}

export function authoringMetadata(meta: AuthoringMeta) {
  return {
    SysPurpose: sysString('Sys: Purpose', meta.purpose, 900),
    SysSupportedIntents: sysString('Sys: Supported Intents', meta.intents.join(', '), 910),
    SysSupportedPageTypes: sysString('Sys: Supported Page Types', meta.pageTypes.join(', '), 920),
    SysSupportedAudiences: sysString('Sys: Supported Audiences', meta.audiences.join(', '), 930),
    SysRecommendedPosition: sysString('Sys: Recommended Position', meta.position, 940),
    SysGenerationPriority: {
      type: 'string' as const,
      displayName: 'Sys: Generation Priority',
      description: `Authoring metadata (queryable via Graph). Canonical: ${meta.priority}`,
      group: GROUP,
      indexingType: 'queryable' as const,
      isLocalized: false,
      sortOrder: 950,
      enum: [
        { value: 'required', displayName: 'Required' },
        { value: 'high', displayName: 'High' },
        { value: 'medium_high', displayName: 'Medium-High' },
        { value: 'medium', displayName: 'Medium' },
        { value: 'conditional', displayName: 'Conditional' },
      ],
    },
    SysGovernance: sysString('Sys: Governance', (meta.governance ?? []).join(', '), 960),
  };
}
