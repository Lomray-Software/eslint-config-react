import baseConfig from '@lomray/eslint-config';
import react from './configs/react.js';
import jsx from './configs/jsx-a11y.js';
import base from './configs/base.js';

const reactConfig = [
	base,
	react,
	jsx,
];

const recommended = [
	...baseConfig.recommended,
	...reactConfig,
];

export default {
	recommended,
	react: reactConfig,
	config: (extendConfig = baseConfig.filesIgnores) =>
		recommended.map((original) => ({ ...original, ...extendConfig })),
};
