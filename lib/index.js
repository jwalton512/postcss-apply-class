'use strict';

Object.defineProperty(exports, "__esModule", {
    value: true
});

var _postcss = require('postcss');

function ruleHasSelector(rule, selector) {
    return rule.selectors.some(ruleSelector => {
        return ruleSelector === selector;
    });
}

function getDeclarationsForSelector(selector, css) {
    const decls = [];

    css.walkRules(rule => {
        if (ruleHasSelector(rule, selector)) {
            rule.walkDecls(decl => {
                decls.push(decl);
            });
        }
    });

    return decls;
}

function applyClassToRule(selector, rule) {
    const decls = getDeclarationsForSelector(selector, rule.root());

    decls.forEach(decl => {
        rule.parent.append({
            prop: decl.prop,
            value: decl.value
        });
    });
}

function getApplyClasses(rule) {
    return rule.params.toString().replace(/\s/g, '').split(',');
}

function processApply(rule) {
    getApplyClasses(rule).forEach(selector => {
        applyClassToRule(selector, rule);
    });

    rule.remove();
}

function processLoop(css) {
    css.walkAtRules('apply', processApply);
}

exports.default = (0, _postcss.plugin)('postcss-apply-class', () => {
    return css => processLoop(css);
});