# @lomray/eslint-config-react

Lomray's TypeScript and React rules, including accessibility and the shared code style.

## Install

Requires Node `^22.13.0 || >=24`, ESLint 10.4+, TypeScript 4.8.4–6.0 and Prettier 3.

```sh
npm install --save-dev @lomray/eslint-config-react eslint@^10.4 typescript@~6.0 prettier@^3
```

Create `eslint.config.js` in a project with a `tsconfig.json`:

```js
import lomray from '@lomray/eslint-config-react';

export default lomray.config();
```

The default scope is `src/**/*.{ts,tsx,mts,cts}`. Type-aware rules use TypeScript’s project service and the nearest `tsconfig.json`;
include your source files and enable JSX in that project. Configure Prettier separately, for example
with `@lomray/prettier-config`.

## Customize

```js
import lomray from '@lomray/eslint-config-react';

export default lomray.config({
    files: ['src/**/*.{ts,tsx}'],
    rules: {
        '@eslint-react/no-array-index-key': 'warn',
    },
});
```

Overrides are merged after the presets. `recommended` exposes every preset without a file scope;
`react` exposes only browser globals, React rules and accessibility.

## Migrate from v6

Upgrade Node and ESLint to the versions above. Rename rule overrides and disable comments:

| v6 prefix | v7 prefix |
| --- | --- |
| `import/` | `import-x/` |
| `jsx-a11y/` | `jsx-a11y-x/` |
| `react/` | See the [React rule map](MIGRATION.md) |

React checks now use ESLint React; formatting uses Prettier and ESLint Stylistic.
Lomray's component style conventions remain enabled, including explicit `personal={true}`,
destructured props and `onX` / `handleX` member handlers. Individual diagnostics can differ
from the previous React plugin. The complete recommended presets of the replacement plugins
are not enabled automatically.

Type checking uses `parserOptions.projectService`. If you set an explicit `project`, also
set `projectService: false`.

`config({ rules, languageOptions, settings })` now merges overrides instead of replacing
those sections in every preset. `.mts` and `.cts` sources are included by default.

## Develop

Run `npm ci`, `npm test`, `npm run test:packed` and `npm audit` using the Node version in `.nvmrc`.
Publish the matching base config first. To test an unpublished base config archive locally,
pass its absolute path as `LOMRAY_BASE_CONFIG_ARCHIVE` when running `test:packed`.
