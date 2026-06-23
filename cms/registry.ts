import {
  config,
  initContentTypeRegistry,
  initDisplayTemplateRegistry,
} from '@optimizely/cms-sdk';
import { initReactComponentRegistry } from '@optimizely/cms-sdk/react/server';

import ExperiencePage, { ExperiencePageContentType } from './ExperiencePage';
import Page, { PageContentType } from './Page';
import BlogPost, { BlogPostContentType } from './BlogPost';

// Louisiana Blue generative-authoring blocks (demo-notes/052 + 052a).
import DynamicHero, { DynamicHeroContentType } from './DynamicHero';
import SearchGateway, { SearchGatewayContentType } from './SearchGateway';
import RegulatoryDisclaimer, { RegulatoryDisclaimerContentType } from './RegulatoryDisclaimer';
import GridCardSelector, {
  CardBlock,
  CardBlockContentType,
  GridCardSelectorContentType,
} from './GridCardSelector';
import LeadCaptureForm, {
  FormField,
  FormFieldContentType,
  LeadCaptureFormContentType,
} from './LeadCaptureForm';
import NetworkStatusAlert, { NetworkStatusAlertContentType } from './NetworkStatusAlert';

/**
 * Single configuration + registration point for the Optimizely SDK.
 * Imported for side effects by app/layout.tsx.
 *
 * Named registry.ts (not .tsx) so the optimizely.config.mjs `./cms/**\/*.tsx`
 * glob does not pick it up during `opti-cli config push` — only the files that
 * define content types should be scanned.
 *
 * All content types were de-registered for a fresh start. To add a new one:
 *   1. Define it in a cms/<Name>.tsx file (export the contentType() + a default
 *      React component, plus any display template).
 *   2. Import it here and register it in the three calls below:
 *        - initContentTypeRegistry      → the contentType() definition
 *        - initDisplayTemplateRegistry  → any display template(s)
 *        - initReactComponentRegistry   → map the content type key → component
 *   3. Run `npm run config:push` to push the type(s) to the CMS.
 */
config({
  apiKey: process.env.OPTIMIZELY_GRAPH_SINGLE_KEY!,
  graphUrl: process.env.OPTIMIZELY_GRAPH_GATEWAY,
});

initContentTypeRegistry([
  ExperiencePageContentType,
  PageContentType,
  BlogPostContentType,
  // Blocks
  DynamicHeroContentType,
  SearchGatewayContentType,
  RegulatoryDisclaimerContentType,
  GridCardSelectorContentType,
  LeadCaptureFormContentType,
  NetworkStatusAlertContentType,
  // Nested helper types (referenced inside ContentAreas, not dropped on canvas)
  CardBlockContentType,
  FormFieldContentType,
]);

initDisplayTemplateRegistry([]);

initReactComponentRegistry({
  resolver: {
    ExperiencePage,
    Page,
    BlogPost,
    // Blocks (resolver key === content-type key)
    DynamicHeroBlock: DynamicHero,
    SearchGatewayBlock: SearchGateway,
    RegulatoryDisclaimerBlock: RegulatoryDisclaimer,
    GridCardSelectorBlock: GridCardSelector,
    LeadCaptureFormBlock: LeadCaptureForm,
    NetworkStatusAlertBlock: NetworkStatusAlert,
    // Nested helper components, so they render inside their parent's ContentArea
    CardBlock,
    FormFieldBlock: FormField,
  },
});
