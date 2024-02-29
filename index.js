import baseConfig from '@lomray/eslint-config';
import react from './configs/react.js';
import reactHooks from './configs/react-hooks.js';
import jsx from './configs/jsx-a11y.js';

const reactConfig = [
	react,
	reactHooks,
	jsx,
];

const recommended = [
	...baseConfig.recommended,
	...reactConfig,
]

export default {
	recommended,
	react: reactConfig,
	config: (extendConfig = baseConfig.filesIgnores) =>
		recommended.map((original) => ({ ...original, ...extendConfig })),
};
