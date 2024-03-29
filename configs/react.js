import pluginReact from 'eslint-plugin-react';

export default {
    plugins: {
        react: pluginReact,
    },
    settings: {
        react: {
            version: 'detect',
        },
    },
    rules: {
        'react/no-deprecated': ['warn'],
        'react/no-did-mount-set-state': ['warn'],
        'react/no-did-update-set-state': ['warn'],
        'react/no-unused-prop-types': ['warn'],
        'react/no-unused-state': ['warn'],
        'react/no-redundant-should-component-update': ['warn'],
        'react/button-has-type': ['error'],
        'react/jsx-boolean-value': ['error', 'never', { always: ['personal'] }],
        'react/destructuring-assignment': ['error'],
        'react/jsx-closing-tag-location': ['error'],
        'react/jsx-curly-newline': ['error'],
        'react/jsx-fragments': ['error'],
        'react/jsx-handler-names': ['error'],
        'react/jsx-key': ['error'],
        'react/jsx-no-constructed-context-values': ['error'],
        'react/no-direct-mutation-state': ['error'],
        'react/jsx-no-useless-fragment': ['error'],
        'react/jsx-uses-react': ['error'],
        'react/no-multi-comp': ['error', { ignoreStateless: true }],
        'react/no-access-state-in-setstate': ['error'],
        'react/no-array-index-key': ['error'],
    },
}
