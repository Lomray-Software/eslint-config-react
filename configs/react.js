import pluginReact from '@eslint-react/eslint-plugin';
import stylistic from '@stylistic/eslint-plugin';
import style from '../rules/index.js';

export default {
    plugins: {
        '@eslint-react': pluginReact,
        '@stylistic': stylistic,
        lomray: style,
    },
    rules: {
        '@eslint-react/no-component-will-mount': 'warn',
        '@eslint-react/no-component-will-receive-props': 'warn',
        '@eslint-react/no-component-will-update': 'warn',
        '@eslint-react/dom-no-find-dom-node': 'warn',
        '@eslint-react/dom-no-hydrate': 'warn',
        '@eslint-react/dom-no-render': 'warn',
        '@eslint-react/no-set-state-in-component-did-mount': 'warn',
        '@eslint-react/no-set-state-in-component-did-update': 'warn',
        '@eslint-react/no-unused-props': 'warn',
        '@eslint-react/no-unused-state': 'warn',
        '@eslint-react/dom-no-missing-button-type': 'error',
        '@eslint-react/no-missing-key': 'error',
        '@eslint-react/no-duplicate-key': 'error',
        '@eslint-react/no-unstable-context-value': 'error',
        '@eslint-react/no-direct-mutation-state': 'error',
        '@eslint-react/jsx-no-useless-fragment': 'error',
        '@eslint-react/no-access-state-in-setstate': 'error',
        '@eslint-react/no-array-index-key': 'error',
        '@stylistic/jsx-closing-tag-location': 'error',
        '@stylistic/jsx-curly-newline': 'error',
        'lomray/jsx-boolean-value': 'error',
        'lomray/jsx-fragments': 'error',
        'lomray/jsx-handler-names': 'error',
        'lomray/destructuring-assignment': 'error',
        'lomray/no-multi-comp': 'error',
        'lomray/no-redundant-should-component-update': 'warn',
    },
};
