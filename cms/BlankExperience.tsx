import { BlankExperienceContentType, type ContentProps } from '@optimizely/cms-sdk';
import { OptimizelyComposition } from '@optimizely/cms-sdk/react/server';
import { ComponentWrapper } from './wrappers';

type Props = { content: ContentProps<typeof BlankExperienceContentType> };

/**
 * Renders a Visual Builder experience: a flat composition of sections / elements.
 *
 * The shell is full-width on purpose. Each section / component owns its own
 * width constraint (e.g. an inner `container mx-auto`), which lets full-bleed
 * blocks like the Hero span edge to edge while content sections self-center.
 */
export default function BlankExperience({ content }: Props) {
  return (
    <main>
      <OptimizelyComposition
        nodes={content.composition?.nodes ?? []}
        ComponentWrapper={ComponentWrapper}
      />
    </main>
  );
}
