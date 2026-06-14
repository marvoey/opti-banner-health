import {
  BlankSectionContentType,
  displayTemplate,
  type ContentProps,
} from '@optimizely/cms-sdk';
import { OptimizelyGridSection, getPreviewUtils } from '@optimizely/cms-sdk/react/server';
import { DemoRow, DemoColumn } from './wrappers';

/**
 * Default display template for Blank Section. The `overlap` setting applies a
 * vertical top margin so a section can be pulled UP over the previous one
 * (negative steps — e.g. the Quick Care Cards strip overlapping the Hero) or
 * pushed DOWN (positive steps). Editors pick the step in Visual Builder.
 */
export const BlankSectionDisplayTemplate = displayTemplate({
  key: 'BlankSectionDefault',
  isDefault: true,
  displayName: 'Blank Section',
  contentType: 'BlankSection',
  settings: {
    overlap: {
      editor: 'select',
      displayName: 'Vertical Overlap',
      sortOrder: 0,
      choices: {
        pullLg: { displayName: 'Pull up — large', sortOrder: 1 },
        pullMd: { displayName: 'Pull up — medium', sortOrder: 2 },
        pullSm: { displayName: 'Pull up — small', sortOrder: 3 },
        none: { displayName: 'None', sortOrder: 4 },
        pushSm: { displayName: 'Push down — small', sortOrder: 5 },
        pushMd: { displayName: 'Push down — medium', sortOrder: 6 },
        pushLg: { displayName: 'Push down — large', sortOrder: 7 },
      },
    },
    width: {
      editor: 'select',
      displayName: 'Content Width',
      sortOrder: 1,
      choices: {
        full: { displayName: 'Full width', sortOrder: 1 },
        contained: { displayName: 'Contained (centered)', sortOrder: 2 },
      },
    },
  },
});

// Static class strings (Tailwind can't see interpolated names, so map to literals).
const OVERLAPS: Record<string, string> = {
  pullLg: '-mt-24',
  pullMd: '-mt-16',
  pullSm: '-mt-8',
  none: 'mt-0',
  pushSm: 'mt-8',
  pushMd: 'mt-16',
  pushLg: 'mt-24',
};

const WIDTHS: Record<string, string> = {
  full: '',
  contained: 'container mx-auto px-4',
};

type Props = {
  content: ContentProps<typeof BlankSectionContentType>;
  displaySettings?: ContentProps<typeof BlankSectionDisplayTemplate>;
};

/** Renders a section's grid (rows → columns → elements) with custom containers. */
export default function BlankSection({ content, displaySettings }: Props) {
  const { pa } = getPreviewUtils(content);
  const overlap = OVERLAPS[displaySettings?.overlap ?? 'none'] ?? OVERLAPS.none;
  const width = WIDTHS[displaySettings?.width ?? 'full'] ?? WIDTHS.full;
  return (
    <section {...pa(content)} className={`relative ${overlap} py-8`}>
      <div className={width}>
        <OptimizelyGridSection nodes={content.nodes} row={DemoRow} column={DemoColumn} />
      </div>
    </section>
  );
}
