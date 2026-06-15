import { contentType, displayTemplate, type ContentProps } from '@optimizely/cms-sdk';
import { OptimizelyGridSection, getPreviewUtils } from '@optimizely/cms-sdk/react/server';
import type { StructureContainerProps } from '@optimizely/cms-sdk/react/server';

/**
 * Services grid SECTION — the CMS equivalent of the static `ServicesGrid` mock.
 * Layout only (no content props — see DemoSection.tsx for why section content
 * props aren't delivered). The card density lives on the display template.
 */
export const ServicesGridContentType = contentType({
  key: 'BannerDemoServicesGrid',
  baseType: '_section',
  displayName: 'Banner: Services Grid',
  properties: {},
});

export const ServicesGridDisplayTemplate = displayTemplate({
  key: 'ServicesGridDefault',
  isDefault: true,
  displayName: 'Banner: Services Grid',
  contentType: 'BannerDemoServicesGrid',
  settings: {
    columns: {
      editor: 'select',
      displayName: 'Columns',
      sortOrder: 0,
      choices: {
        two: { displayName: '2 columns', sortOrder: 1 },
        three: { displayName: '3 columns', sortOrder: 2 },
        four: { displayName: '4 columns', sortOrder: 3 },
      },
    },
  },
});

// Static class strings (Tailwind can't see interpolated names, so map to literals).
const GRID_COLS: Record<string, string> = {
  two: 'grid-cols-1 sm:grid-cols-2',
  three: 'grid-cols-2 md:grid-cols-3',
  four: 'grid-cols-2 md:grid-cols-3 lg:grid-cols-4',
};

/**
 * Build a row container bound to the chosen column count. OptimizelyGridSection
 * renders one row per VB row; we turn that row into the responsive CSS grid and
 * let each column be a plain grid cell. Closure captures `cols` from displaySettings.
 */
function makeGridRow(cols: string) {
  return function ServicesGridRow({ children, node }: StructureContainerProps) {
    const { pa } = getPreviewUtils(node);
    return (
      <div {...pa(node)} className={`grid gap-4 ${cols}`}>
        {children}
      </div>
    );
  };
}

function ServicesGridColumn({ children, node }: StructureContainerProps) {
  const { pa } = getPreviewUtils(node);
  return (
    <div {...pa(node)} {...pa('nodes')}>
      {children}
    </div>
  );
}

type Props = {
  content: ContentProps<typeof ServicesGridContentType>;
  displaySettings?: ContentProps<typeof ServicesGridDisplayTemplate>;
};

export default function ServicesGrid({ content, displaySettings }: Props) {
  const { pa } = getPreviewUtils(content);
  const cols = GRID_COLS[displaySettings?.columns ?? 'four'] ?? GRID_COLS.four;

  return (
    <section {...pa(content)} className="bg-white py-20">
      <div className="container mx-auto px-4">
        <OptimizelyGridSection
          nodes={content.nodes}
          row={makeGridRow(cols)}
          column={ServicesGridColumn}
        />
      </div>
    </section>
  );
}
