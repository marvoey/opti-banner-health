import {
  getPreviewUtils,
  type ComponentContainerProps,
  type StructureContainerProps,
} from '@optimizely/cms-sdk/react/server';

/**
 * Wrapper for component nodes placed directly in an experience outline. Applies
 * the editable block boundary via pa(node).
 */
export function ComponentWrapper({ children, node }: ComponentContainerProps) {
  const { pa } = getPreviewUtils(node);
  return <div {...pa(node)}>{children}</div>;
}

/**
 * Rows and columns are PURE LAYOUT — no data-epi-block-id. This matches
 * Optimizely's Visual Builder reference, where only the section/grid and the
 * leaf elements are editable blocks; tagging rows/columns adds overlapping
 * block regions that interfere with element hover/selection.
 */
export function DemoRow({ children }: StructureContainerProps) {
  return <div className="flex flex-col gap-6 md:flex-row md:items-stretch">{children}</div>;
}

export function DemoColumn({ children }: StructureContainerProps) {
  return <div className="flex-1">{children}</div>;
}
