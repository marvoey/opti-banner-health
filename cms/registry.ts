import {
  config,
  initContentTypeRegistry,
  initDisplayTemplateRegistry,
  BlankExperienceContentType,
  BlankSectionContentType,
} from '@optimizely/cms-sdk';
import { initReactComponentRegistry } from '@optimizely/cms-sdk/react/server';

import BlankExperience from './BlankExperience';
import BlankSection, { BlankSectionDisplayTemplate } from './BlankSection';
import DemoSection, { DemoSectionContentType, DemoSectionDisplayTemplate } from './DemoSection';
import Hero, { HeroContentType } from './Hero';
import Service, { ServiceContentType } from './Service';
import DemoText, { DemoTextContentType } from './DemoText';
import DemoCard, { DemoCardContentType } from './DemoCard';
import DemoMedia, { DemoMediaContentType } from './DemoMedia';
import DemoCallout, { DemoCalloutContentType } from './DemoCallout';
import ServicesGrid, {
  ServicesGridContentType,
  ServicesGridDisplayTemplate,
} from './ServicesGrid';
import ServicesHeader, { ServicesHeaderContentType } from './ServicesHeader';
import ServicesGridAuto, { ServicesGridAutoContentType } from './ServicesGridAuto';
import QuickCareCards, {
  QuickCareCard,
  QuickCareCardContentType,
  QuickCareCardsContentType,
} from './QuickCareCards';
import Testimonial, { TestimonialContentType } from './Testimonial';
import ServicesHero, { ServicesHeroContentType } from './ServicesHero';
import ServiceCtaBanner, { ServiceCtaBannerContentType } from './ServiceCtaBanner';
import DetailHero, { DetailHeroContentType } from './DetailHero';
import ConditionGrid, {
  Condition,
  ConditionContentType,
  ConditionGridContentType,
} from './ConditionGrid';
import LocationSearchHero, { LocationSearchHeroContentType } from './LocationSearchHero';
import LocationResults, {
  Location,
  LocationContentType,
  LocationResultsContentType,
} from './LocationResults';

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
  HeroContentType,
  ServiceContentType,
  DemoTextContentType,
  DemoCardContentType,
  DemoMediaContentType,
  DemoCalloutContentType,
  ServicesGridContentType,
  ServicesHeaderContentType,
  ServicesGridAutoContentType,
  QuickCareCardContentType,
  QuickCareCardsContentType,
  TestimonialContentType,
  ServicesHeroContentType,
  ServiceCtaBannerContentType,
  DetailHeroContentType,
  ConditionContentType,
  ConditionGridContentType,
  LocationSearchHeroContentType,
  LocationContentType,
  LocationResultsContentType,
]);

initDisplayTemplateRegistry([
  DemoSectionDisplayTemplate,
  ServicesGridDisplayTemplate,
  BlankSectionDisplayTemplate,
]);

initReactComponentRegistry({
  resolver: {
    BlankExperience,
    BlankSection,
    DemoSection,
    BannerDemoHero: Hero,
    BannerDemoService: Service,
    DemoText,
    DemoCard,
    DemoMedia,
    DemoCallout,
    BannerDemoServicesGrid: ServicesGrid,
    BannerDemoServicesHeader: ServicesHeader,
    BannerDemoServicesGridAuto: ServicesGridAuto,
    BannerDemoQuickCareCard: QuickCareCard,
    BannerDemoQuickCareCards: QuickCareCards,
    BannerDemoTestimonial: Testimonial,
    BannerDemoServicesHero: ServicesHero,
    BannerDemoServiceCtaBanner: ServiceCtaBanner,
    BannerDemoDetailHero: DetailHero,
    BannerDemoCondition: Condition,
    BannerDemoConditionGrid: ConditionGrid,
    BannerDemoLocationSearchHero: LocationSearchHero,
    BannerDemoLocation: Location,
    BannerDemoLocationResults: LocationResults,
  },
});
