import { buildConfig } from '@optimizely/cms-sdk';

/**
 * Optimizely CMS CLI config. Push content types with:
 *   npx @optimizely/cms-cli config push optimizely.config.mjs
 *
 * `components` globs the files that export `contentType()` definitions.
 * `propertyGroups` declares custom groups referenced by property `group` keys.
 */
export default buildConfig({
  components: ['./cms/**/*.tsx'],
  // Declare custom property groups here as content types are added back.
  // Use a negative sortOrder to float a group above the built-in/system groups
  // (Settings, SEO, Categories, …), which sit at 0–60.
  propertyGroups: [
    // BlogPost editorial groups (demo-notes/052 "Optimized Content Framework").
    // Negative sortOrder floats them above the built-in/system groups (0–60).
    { key: 'blog_information', displayName: 'Information', sortOrder: -50 },
    { key: 'blog_classification', displayName: 'Classification', sortOrder: -40 },
    { key: 'blog_author', displayName: 'Author Details', sortOrder: -30 },
    { key: 'blog_media', displayName: 'Media', sortOrder: -20 },
    { key: 'blog_body', displayName: 'Body Content', sortOrder: -10 },
    // Sys* authoring-metadata fields (purpose, intents, governance, …) live here.
    // Positive sortOrder → sits below content and system groups in the editor.
    { key: 'authoring', displayName: 'Authoring Metadata', sortOrder: 100 },
  ],
});
