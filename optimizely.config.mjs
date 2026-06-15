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
  propertyGroups: [
    // sortOrder below the built-in/system groups (which sit at 0–60) so the
    // content-type's own fields appear at the TOP of the editor, with the CMS
    // system groups (Settings, SEO, Categories, …) falling below them.
    { key: 'demo', displayName: 'Banner Content', sortOrder: -10 },
  ],
});
