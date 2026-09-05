/** Keep onX props paired with handleX methods; local and inline callbacks remain allowed. */
export default {
    meta: { type: 'suggestion', schema: [] },
    create(context) {
        return {
            JSXAttribute(node) {
                const expression =
                    node.value?.type === 'JSXExpressionContainer' && node.value.expression;
                const propName = node.name.name;

                if (!expression || expression.type !== 'MemberExpression' || propName === 'ref') {
                    return;
                }

                const value = context.sourceCode
                    .getText(expression)
                    .replace(/\s+/g, '')
                    .replace(/^this\./, '');
                const isHandlerProp = /^on[A-Z]/.test(propName);
                const isHandler = /^(?:props\.on|(?:.*\.)?handle)[0-9]*[A-Z]/.test(value);

                if (isHandlerProp !== isHandler) {
                    context.report({
                        node,
                        message: isHandlerProp
                            ? 'Event handler methods must start with handle.'
                            : 'Event handler props must start with on.',
                    });
                }
            },
        };
    },
};
