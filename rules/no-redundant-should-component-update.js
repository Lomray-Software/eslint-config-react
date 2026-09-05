import { isPureComponent } from '@eslint-react/core';

/** PureComponent already provides shouldComponentUpdate. */
export default {
    meta: { type: 'suggestion', schema: [] },
    create(context) {
        return {
            'MethodDefinition, PropertyDefinition'(node) {
                if (
                    node.key.name === 'shouldComponentUpdate' &&
                    isPureComponent(node.parent.parent)
                ) {
                    context.report({
                        node,
                        message: 'Do not override shouldComponentUpdate in PureComponent.',
                    });
                }
            },
        };
    },
};
