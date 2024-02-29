import pluginJSX from 'eslint-plugin-jsx-a11y';

export default {
    plugins: {
        'jsx-a11y': pluginJSX,
    },
    languageOptions: {
        parserOptions: {
            ecmaFeatures: {
                jsx: true
            },
        },
    },
    rules: {
       ...pluginJSX.configs.recommended.rules,
    },
}
