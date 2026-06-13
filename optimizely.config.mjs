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
    { key: 'demo', displayName: 'Demo Content', sortOrder: 100 },
  ],
});
