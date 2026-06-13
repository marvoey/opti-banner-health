import { contentType, type ContentProps } from '@optimizely/cms-sdk';
import { RichText } from '@optimizely/cms-sdk/react/richText';
import { getPreviewUtils } from '@optimizely/cms-sdk/react/server';

/**
 * Granular, single-property element (the Optimizely Visual Builder idiom). One
 * block = one editable property, so selecting the block in VB auto-focuses that
 * property in the settings panel — no data-epi-property-name needed. Mirrors the
 * reference site's `component-text` elements.
 */
export const DemoTextContentType = contentType({
  key: 'DemoText',
  baseType: '_component',
  displayName: 'Demo Text',
  compositionBehaviors: ['elementEnabled'],
  properties: {
    text: { type: 'richText', displayName: 'Text', group: 'demo' },
  },
});

type Props = { content: ContentProps<typeof DemoTextContentType> };

export default function DemoText({ content }: Props) {
  const { pa } = getPreviewUtils(content);
  // Block boundary from the composition node (grid elements aren't wrapped).
  const block = (content as { __composition?: { key: string } }).__composition;

  return (
    <div {...pa(block)} className="prose max-w-none text-slate-800">
      <RichText content={content.text?.json} />
    </div>
  );
}
