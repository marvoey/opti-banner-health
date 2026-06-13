import { contentType, displayTemplate, type ContentProps } from '@optimizely/cms-sdk';
import { OptimizelyGridSection, getPreviewUtils } from '@optimizely/cms-sdk/react/server';
import { DemoRow, DemoColumn } from './wrappers';

/**
 * A SECTION is purely a layout wrapper. The Visual Builder composition query
 * delivers a section's structural data + DISPLAY SETTINGS, but NOT its own
 * content properties — the SDK fetches `component { ..._IComponent }` only for
 * element nodes, not section (structure) nodes (see createQuery.js
 * ICompositionNode fragment). So configurable section options belong on a
 * DISPLAY TEMPLATE (delivered via `displaySettings`), never on content props.
 */
export const DemoSectionContentType = contentType({
  key: 'DemoSection',
  baseType: '_section',
  displayName: 'Demo Section',
  properties: {},
});

/**
 * Default display template for DemoSection. Because it `isDefault`, its settings
 * flow to the default DemoSection component (no variant/tag needed). Editors pick
 * Background / Padding in Visual Builder; the values are the choice keys.
 */
export const DemoSectionDisplayTemplate = displayTemplate({
  key: 'DemoSectionDefault',
  isDefault: true,
  displayName: 'Demo Section',
  contentType: 'DemoSection',
  settings: {
    background: {
      editor: 'select',
      displayName: 'Background',
      sortOrder: 0,
      choices: {
        muted: { displayName: 'Muted', sortOrder: 1 },
        white: { displayName: 'White', sortOrder: 2 },
        navy: { displayName: 'Navy', sortOrder: 3 },
      },
    },
    padding: {
      editor: 'select',
      displayName: 'Padding',
      sortOrder: 1,
      choices: {
        compact: { displayName: 'Compact', sortOrder: 1 },
        cozy: { displayName: 'Cozy', sortOrder: 2 },
        spacious: { displayName: 'Spacious', sortOrder: 3 },
      },
    },
  },
});

const BACKGROUNDS: Record<string, string> = {
  muted: 'bg-slate-100',
  white: 'bg-white border border-slate-200',
  navy: 'bg-blue-900 text-white',
};

const PADDINGS: Record<string, string> = {
  compact: 'px-4 py-6',
  cozy: 'px-6 py-10',
  spacious: 'px-8 py-16',
};

type Props = {
  content: ContentProps<typeof DemoSectionContentType>;
  displaySettings?: ContentProps<typeof DemoSectionDisplayTemplate>;
};

export default function DemoSection({ content, displaySettings }: Props) {
  const { pa } = getPreviewUtils(content);
  const bg = BACKGROUNDS[displaySettings?.background ?? 'muted'] ?? BACKGROUNDS.muted;
  const pad = PADDINGS[displaySettings?.padding ?? 'cozy'] ?? PADDINGS.cozy;

  return (
    <section {...pa(content)} className={`my-8 rounded-3xl ${bg} ${pad}`}>
      <OptimizelyGridSection nodes={content.nodes} row={DemoRow} column={DemoColumn} />
    </section>
  );
}
