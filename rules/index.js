import booleanValue from './jsx-boolean-value.js';
import fragments from './jsx-fragments.js';
import handlers from './jsx-handler-names.js';
import destructuring from './destructuring-assignment.js';
import multiComp from './no-multi-comp.js';
import pureComponent from './no-redundant-should-component-update.js';

export default {
    meta: { name: '@lomray/eslint-config-react/style' },
    rules: {
        'jsx-boolean-value': booleanValue,
        'jsx-fragments': fragments,
        'jsx-handler-names': handlers,
        'destructuring-assignment': destructuring,
        'no-multi-comp': multiComp,
        'no-redundant-should-component-update': pureComponent,
    },
};
