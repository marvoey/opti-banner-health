import { BlankExperienceContentType, type ContentProps } from '@optimizely/cms-sdk';
import { OptimizelyComposition } from '@optimizely/cms-sdk/react/server';
import { ComponentWrapper } from './wrappers';

type Props = { content: ContentProps<typeof BlankExperienceContentType> };

/** Renders a Visual Builder experience: a flat composition of sections / elements. */
export default function BlankExperience({ content }: Props) {
  return (
    <main className="mx-auto max-w-5xl px-6 py-12">
      <OptimizelyComposition
        nodes={content.composition?.nodes ?? []}
        ComponentWrapper={ComponentWrapper}
      />
    </main>
  );
}
