import { getFunctionComponentCollector, isClassComponent } from '@eslint-react/core';

/** Prefer destructuring when reading component props, state or context. */
export default {
    meta: { type: 'suggestion', schema: [] },
    create(context) {
        const { api, visitor } = getFunctionComponentCollector(context);
        const isWrite = (node) =>
            (node.parent.type === 'AssignmentExpression' && node.parent.left === node) ||
            node.parent.type === 'UpdateExpression' ||
            (node.parent.type === 'UnaryExpression' && node.parent.operator === 'delete');
        const report = (node) =>
            context.report({
                node,
                message: 'Destructure component props, state or context before reading properties.',
            });

        return {
            ...visitor,
            MemberExpression(node) {
                visitor.MemberExpression?.(node);

                if (
                    node.computed ||
                    node.object.type !== 'MemberExpression' ||
                    node.object.object.type !== 'ThisExpression' ||
                    !['props', 'state', 'context'].includes(node.object.property.name)
                ) {
                    return;
                }

                const ancestors = context.sourceCode.getAncestors(node);
                const parentClass = ancestors.findLast(
                    (ancestor) =>
                        ancestor.type === 'ClassDeclaration' || ancestor.type === 'ClassExpression',
                );

                if (!isWrite(node) && parentClass && isClassComponent(parentClass)) {
                    report(node);
                }
            },
            'Program:exit'(node) {
                visitor['Program:exit']?.(node);

                for (const component of api.getAllComponents(node)) {
                    const [props] = component.node.params;
                    const parameter = props?.type === 'AssignmentPattern' ? props.left : props;

                    if (parameter?.type !== 'Identifier') {
                        continue;
                    }

                    const variable = context.sourceCode
                        .getDeclaredVariables(component.node)
                        .find((item) => item.name === parameter.name);

                    for (const reference of variable?.references ?? []) {
                        const parent = reference.identifier.parent;

                        if (
                            parent.type === 'MemberExpression' &&
                            parent.object === reference.identifier &&
                            !parent.computed &&
                            !isWrite(parent)
                        ) {
                            report(parent);
                        }
                    }
                }
            },
        };
    },
};
