import { getClassComponentCollector } from '@eslint-react/core';

/** Keep one class component per file; function components are unrestricted. */
export default {
    meta: { type: 'suggestion', schema: [] },
    create(context) {
        const { api, visitor } = getClassComponentCollector(context);

        return {
            ...visitor,
            'Program:exit'(node) {
                visitor['Program:exit']?.(node);

                for (const component of api.getAllComponents(node).slice(1)) {
                    context.report({
                        node: component.node,
                        message: 'Define only one class component per file.',
                    });
                }
            },
        };
    },
};
