var postcss = require('postcss');

module.exports = postcss.plugin('postcss-apply-class', function () {
    return function (root) {
        root.walkAtRules('apply', rule => {
            processApplyRule(rule, root);
        });

        function processApplyRule(rule) {
            splitApplyRules(rule.params).forEach(applyClass => {
                applyClassToRule(applyClass, rule);
            });

            rule.remove();
        }

        function applyClassToRule(applyClass, rule) {
            root.walkRules(rootRule => {
                rootRule.selectors.forEach(rootRuleSelector => {
                    if (rootRuleSelector === applyClass) {
                        rootRule.walkDecls(decl => {
                            rule.parent.append({
                                prop: decl.prop,
                                value: decl.value
                            });
                        });
                    }
                });
            });
        }

        function splitApplyRules(rule) {
            return rule.toString().replace(/\s/g, '').split(',');
        }
    };
});
