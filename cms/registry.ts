import {
  config,
  initContentTypeRegistry,
  initDisplayTemplateRegistry,
  BlankExperienceContentType,
  BlankSectionContentType,
} from '@optimizely/cms-sdk';
import { initReactComponentRegistry } from '@optimizely/cms-sdk/react/server';

import BlankExperience from './BlankExperience';
import BlankSection from './BlankSection';
import DemoSection, { DemoSectionContentType, DemoSectionDisplayTemplate } from './DemoSection';
import DemoText, { DemoTextContentType } from './DemoText';
import DemoCard, { DemoCardContentType } from './DemoCard';
import DemoMedia, { DemoMediaContentType } from './DemoMedia';
import DemoCallout, { DemoCalloutContentType } from './DemoCallout';

/**
 * Single configuration + registration point for the Optimizely SDK.
 * Imported for side effects by app/layout.tsx.
 *
 * Named registry.ts (not .tsx) so the optimizely.config.mjs `./cms/**\/*.tsx`
 * glob does not pick it up during `opti-cli config push` — only the files that
 * define content types should be scanned.
 */
config({
  apiKey: process.env.OPTIMIZELY_GRAPH_SINGLE_KEY!,
  graphUrl: process.env.OPTIMIZELY_GRAPH_GATEWAY,
});

initContentTypeRegistry([
  BlankExperienceContentType,
  BlankSectionContentType,
  DemoSectionContentType,
  DemoTextContentType,
  DemoCardContentType,
  DemoMediaContentType,
  DemoCalloutContentType,
]);

initDisplayTemplateRegistry([DemoSectionDisplayTemplate]);

initReactComponentRegistry({
  resolver: {
    BlankExperience,
    BlankSection,
    DemoSection,
    DemoText,
    DemoCard,
    DemoMedia,
    DemoCallout,
  },
});
