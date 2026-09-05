/** Prefer shorthand for imported React fragments that carry no props. */
export default {
    meta: { type: 'layout', fixable: 'code', schema: [] },
    create(context) {
        const namespaces = new Set();
        const fragments = new Set();

        for (const statement of context.sourceCode.ast.body) {
            if (statement.type !== 'ImportDeclaration' || statement.source.value !== 'react') {
                continue;
            }

            for (const specifier of statement.specifiers) {
                if (
                    specifier.type === 'ImportSpecifier' &&
                    specifier.imported.name === 'Fragment'
                ) {
                    fragments.add(specifier.local.name);
                } else if (specifier.type !== 'ImportSpecifier') {
                    namespaces.add(specifier.local.name);
                }
            }
        }

        return {
            JSXElement(node) {
                const { name, attributes, selfClosing } = node.openingElement;
                const isFragment =
                    name.type === 'JSXIdentifier'
                        ? fragments.has(name.name)
                        : name.type === 'JSXMemberExpression' &&
                          name.property.name === 'Fragment' &&
                          name.object.type === 'JSXIdentifier' &&
                          namespaces.has(name.object.name);

                if (!isFragment || attributes.length || selfClosing) {
                    return;
                }

                const identifier = name.type === 'JSXIdentifier' ? name : name.object;
                let scope = context.sourceCode.getScope(identifier);
                let variable;

                while (scope && !variable) {
                    variable = scope.set.get(identifier.name);
                    scope = scope.upper;
                }

                if (variable?.defs[0]?.type !== 'ImportBinding') {
                    return;
                }

                context.report({
                    node: node.openingElement,
                    message: 'Use fragment shorthand when no key or other props are needed.',
                    fix: (fixer) =>
                        context.sourceCode.getCommentsInside(node.openingElement).length ||
                        context.sourceCode.getCommentsInside(node.closingElement).length
                            ? null
                            : [
                                  fixer.replaceText(node.openingElement, '<>'),
                                  fixer.replaceText(node.closingElement, '</>'),
                              ],
                });
            },
        };
    },
};
