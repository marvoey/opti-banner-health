import {
  getPreviewUtils,
  type ComponentContainerProps,
  type StructureContainerProps,
} from '@optimizely/cms-sdk/react/server';

/**
 * Reusable composition wrappers. Each spreads `pa(node)` so the CMS overlay can
 * focus the element / row / column in preview mode. This is the single place the
 * section / row / column overlay wiring lives.
 */

export function ComponentWrapper({ children, node }: ComponentContainerProps) {
  const { pa } = getPreviewUtils(node);
  return <div {...pa(node)}>{children}</div>;
}

export function DemoRow({ children, node }: StructureContainerProps) {
  const { pa } = getPreviewUtils(node);
  return (
    <div {...pa(node)} className="flex flex-col gap-6 md:flex-row md:items-stretch">
      {children}
    </div>
  );
}

export function DemoColumn({ children, node }: StructureContainerProps) {
  const { pa } = getPreviewUtils(node);
  return (
    <div {...pa(node)} className="flex-1">
      {children}
    </div>
  );
}
