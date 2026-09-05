# React rule migration

Update explicit rule overrides and `eslint-disable` comments when moving from v6 to v7.
The `import-x` and `jsx-a11y-x` plugins retain their corresponding rule names.

| Previous React rule | Current rule |
| --- | --- |
| `react/no-did-mount-set-state` | `@eslint-react/no-set-state-in-component-did-mount` |
| `react/no-did-update-set-state` | `@eslint-react/no-set-state-in-component-did-update` |
| `react/no-unused-prop-types` | `@eslint-react/no-unused-props` (type-aware) |
| `react/no-unused-state` | `@eslint-react/no-unused-state` |
| `react/button-has-type` | `@eslint-react/dom-no-missing-button-type` |
| `react/jsx-key` | `@eslint-react/no-missing-key`, `@eslint-react/no-duplicate-key` |
| `react/jsx-no-constructed-context-values` | `@eslint-react/no-unstable-context-value` |
| `react/jsx-no-useless-fragment` | `@eslint-react/jsx-no-useless-fragment` |
| `react/no-direct-mutation-state` | `@eslint-react/no-direct-mutation-state` |
| `react/no-access-state-in-setstate` | `@eslint-react/no-access-state-in-setstate` |
| `react/no-array-index-key` | `@eslint-react/no-array-index-key` |
| `react/jsx-closing-tag-location` | `@stylistic/jsx-closing-tag-location` |
| `react/jsx-curly-newline` | `@stylistic/jsx-curly-newline` |
| `react/jsx-boolean-value` | `lomray/jsx-boolean-value` |
| `react/jsx-fragments` | `lomray/jsx-fragments` |
| `react/jsx-handler-names` | `lomray/jsx-handler-names` |
| `react/destructuring-assignment` | `lomray/destructuring-assignment` |
| `react/no-multi-comp` | `lomray/no-multi-comp` |
| `react/no-redundant-should-component-update` | `lomray/no-redundant-should-component-update` |

`react/no-deprecated` is replaced by specific checks for deprecated lifecycle methods and
React DOM APIs (`no-component-will-*`, `dom-no-find-dom-node`, `dom-no-hydrate`, `dom-no-render`).
Remove `react/jsx-uses-react`: the current ESLint and TypeScript parser track JSX references.

The `lomray/*` rules implement the shared defaults and accept severity overrides, without the
old plugin's alternate style options. They allow local and inline callbacks, enforce `onX` / `handleX`
for member handlers, allow keyed fragments and multiple function components, and restrict files
to one class component. Boolean props use shorthand except `personal`, which remains explicit.
