import assert from 'node:assert/strict';
import { describe, it } from 'node:test';
import { fileURLToPath } from 'node:url';
import { ESLint, Linter } from 'eslint';
import config from '../index.js';
import style from '../rules/index.js';

const fixtureRoot = fileURLToPath(new URL('./fixtures/', import.meta.url));
const createLinter = () =>
    new ESLint({
        cwd: fixtureRoot,
        overrideConfigFile: true,
        overrideConfig: config.config({
            languageOptions: { parserOptions: { tsconfigRootDir: fixtureRoot } },
        }),
    });
const ruleConfig = (name) => [
    {
        languageOptions: {
            ecmaVersion: 'latest',
            sourceType: 'module',
            parserOptions: { ecmaFeatures: { jsx: true } },
        },
        plugins: { lomray: style },
        rules: { [`lomray/${name}`]: 'error' },
    },
];
const lintRule = (name, code) => new Linter().verify(code, ruleConfig(name));

describe('React configuration on ESLint 10', () => {
    it('lints a typed component without configuration errors', async () => {
        const [result] = await createLinter().lintFiles(['src/valid.tsx']);

        assert.deepEqual(result.messages, []);
    });

    it('reports button and accessibility problems', async () => {
        const [result] = await createLinter().lintFiles(['src/invalid.tsx']);

        assert.equal(result.fatalErrorCount, 0);
        assert.ok(
            result.messages.some(
                ({ ruleId }) => ruleId === '@eslint-react/dom-no-missing-button-type',
            ),
        );
        assert.ok(result.messages.some(({ ruleId }) => ruleId === 'jsx-a11y-x/alt-text'));
    });
});

const cases = [
    ['jsx-boolean-value', '<Button disabled personal={true} />', '<Button disabled={true} />'],
    ['jsx-boolean-value', '<Button disabled={false} />', '<Button personal />'],
    [
        'jsx-fragments',
        'import React from "react"; <React.Fragment key="a"><div /></React.Fragment>',
        'import React from "react"; <React.Fragment><div /></React.Fragment>',
    ],
    [
        'jsx-fragments',
        'const Fragment = props => props.children; <Fragment><div /></Fragment>',
        'import { Fragment as Group } from "react"; <Group><div /></Group>',
    ],
    [
        'jsx-fragments',
        'import React from "react"; function helper(React) { return <React.Fragment><div /></React.Fragment>; }',
        'import React from "react"; <React.Fragment><div /></React.Fragment>',
    ],
    [
        'jsx-handler-names',
        '<Button onClick={this.handleClick} />',
        '<Button onClick={this.submit} />',
    ],
    [
        'jsx-handler-names',
        '<Button onClick={() => this.submit()} />',
        '<Button click={this.handleClick} />',
    ],
    ['jsx-handler-names', '<Button onClick={submit} />', '<Button onClick={this.submit} />'],
    [
        'destructuring-assignment',
        'function Card({title}) { return <h1>{title}</h1>; }',
        'function Card(props) { return <h1>{props.title}</h1>; }',
    ],
    [
        'destructuring-assignment',
        'function helper(value) { return value.title; }',
        'class Card extends React.Component { render() { return <h1>{this.props.title}</h1>; } }',
    ],
    [
        'destructuring-assignment',
        'class Card extends React.Component { update() { this.state.count = 1; } }',
        'class Card extends React.Component { render() { return <h1>{this.state.title}</h1>; } }',
    ],
    [
        'no-multi-comp',
        'function Card() { return <div />; } function Panel() { return <div />; }',
        'class Card extends React.Component {} class Panel extends React.Component {}',
    ],
    [
        'no-redundant-should-component-update',
        'class Card extends React.Component { shouldComponentUpdate() { return true; } }',
        'class Card extends React.PureComponent { shouldComponentUpdate() { return true; } }',
    ],
];

describe('Lomray React style', () => {
    for (const [rule, valid, invalid] of cases) {
        it(`${rule}: preserves valid code and detects the violation`, () => {
            assert.deepEqual(lintRule(rule, valid), []);
            const messages = lintRule(rule, invalid);

            assert.ok(messages.length > 0);
            assert.ok(messages.every(({ ruleId }) => ruleId === `lomray/${rule}`));
        });
    }
});

describe('Safe style fixes', () => {
    const fixes = [
        [
            'jsx-boolean-value',
            '<Button disabled={true} personal />',
            '<Button disabled personal={true} />',
        ],
        [
            'jsx-fragments',
            'import { Fragment } from "react"; <Fragment><span /></Fragment>',
            'import { Fragment } from "react"; <><span /></>',
        ],
    ];

    for (const [rule, input, output] of fixes) {
        it(`${rule}: fixes once and produces valid code`, () => {
            const result = new Linter().verifyAndFix(input, ruleConfig(rule));

            assert.equal(result.output, output);
            assert.deepEqual(result.messages, []);
            assert.equal(new Linter().verifyAndFix(result.output, ruleConfig(rule)).fixed, false);
        });
    }

    it('preserves comments inside boolean expressions and fragment tags', () => {
        for (const [rule, code] of [
            ['jsx-boolean-value', '<Button disabled={/* keep reason */ true} />'],
            [
                'jsx-fragments',
                'import { Fragment } from "react"; <Fragment /* keep reason */><span /></Fragment>',
            ],
        ]) {
            const result = new Linter().verifyAndFix(code, ruleConfig(rule));

            assert.equal(result.output, code);
            assert.equal(result.fixed, false);
            assert.equal(result.messages[0].ruleId, `lomray/${rule}`);
        }
    });

    it('does not flag component parameter writes as destructuring violations', () => {
        assert.deepEqual(
            lintRule(
                'destructuring-assignment',
                'function Card(props) { props.count = 1; return <div />; }',
            ),
            [],
        );
    });
});
