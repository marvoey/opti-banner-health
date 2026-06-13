import { BlankSectionContentType, type ContentProps } from '@optimizely/cms-sdk';
import { OptimizelyGridSection, getPreviewUtils } from '@optimizely/cms-sdk/react/server';
import { DemoRow, DemoColumn } from './wrappers';

type Props = { content: ContentProps<typeof BlankSectionContentType> };

/** Renders a section's grid (rows → columns → elements) with custom containers. */
export default function BlankSection({ content }: Props) {
  const { pa } = getPreviewUtils(content);
  return (
    <section {...pa(content)} className="py-8">
      <OptimizelyGridSection nodes={content.nodes} row={DemoRow} column={DemoColumn} />
    </section>
  );
}
