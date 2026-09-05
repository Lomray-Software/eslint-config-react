/** Prefer boolean shorthand, keeping the existing explicit `personal` convention. */
export default {
    meta: { type: 'layout', fixable: 'code', schema: [] },
    create(context) {
        return {
            JSXAttribute(node) {
                const shouldBeExplicit = node.name.name === 'personal';
                const isExplicitTrue =
                    node.value?.type === 'JSXExpressionContainer' &&
                    node.value.expression.type === 'Literal' &&
                    node.value.expression.value === true;

                if (shouldBeExplicit && !node.value) {
                    context.report({
                        node,
                        message: 'Write personal={true} explicitly.',
                        fix: (fixer) => fixer.insertTextAfter(node.name, '={true}'),
                    });
                } else if (!shouldBeExplicit && isExplicitTrue) {
                    context.report({
                        node,
                        message: 'Use shorthand for a true boolean prop.',
                        fix: (fixer) =>
                            context.sourceCode.getCommentsInside(node.value).length
                                ? null
                                : fixer.removeRange([node.name.range[1], node.value.range[1]]),
                    });
                }
            },
        };
    },
};
