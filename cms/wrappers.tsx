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
 * Rows and columns MUST spread pa(node) — it emits `data-epi-block-id` (only in
 * edit/preview mode; a no-op on the published site). The CMS uses that attribute
 * to register the column as a droppable container and draw the blue drop-zone
 * frame on hover. Without it, Visual Builder has nowhere to drop blocks. This
 * mirrors the SDK's own FallbackRow / FallbackColumn, which both tag the node.
 */
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
  // The column div carries BOTH editing attributes (each from a separate pa call —
  // pa returns block-id XOR property-name, so they don't collide when spread):
  //   - pa(node)    → data-epi-block-id: identifies WHICH column block this is.
  //   - pa('nodes') → data-epi-property-name="nodes": marks this div as the visual
  //                   representation of the column's `nodes` child collection, i.e.
  //                   the drop target VB uses for child blocks. ("nodes" matches the
  //                   CompositionStructureNode.nodes field in the composition query.)
  // Both are emitted only when __context.edit is true (no-op on the published site).
  //
  // The min-height + dashed outline (edit mode only) give an otherwise-empty column
  // a visible, hoverable drop area; it would collapse to 0px when the row stacks.
  const edit = (node as { __context?: { edit?: boolean } } | undefined)?.__context?.edit;
  return (
    <div
      {...pa(node)}
      {...pa('nodes')}
      className={
        edit
          ? 'flex-1 min-h-16 rounded-lg outline-1 outline-dashed outline-slate-300/50'
          : 'flex-1'
      }
    >
      {children}
    </div>
  );
}
