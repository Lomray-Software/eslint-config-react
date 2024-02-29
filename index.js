import baseConfig from '@lomray/eslint-config';
import react from './configs/react';
import reactHooks from './configs/react-hooks';
import jsx from './configs/jsx-a11y';

const current = [
	react,
	reactHooks,
	jsx,
];

export default {
	recommended: [
		baseConfig,
		...current,
	],
	react: current,
};
