import baseConfig from '@lomray/eslint-config';
import react from './configs/react.js';
import jsx from './configs/jsx-a11y.js';
import base from './configs/base.js';

const reactConfig = [base, react, jsx];
const recommended = [...baseConfig.recommended, ...reactConfig];

/** Apply file scope to each preset and merge consumer overrides last. */
const config = ({
    files = baseConfig.filesIgnores.files,
    ignores = baseConfig.filesIgnores.ignores,
    ...overrides
} = {}) => [
    ...recommended.map((original) => ({ ...original, files, ignores })),
    { ...overrides, files, ignores },
];

export default {
    recommended,
    react: reactConfig,
    config,
};
