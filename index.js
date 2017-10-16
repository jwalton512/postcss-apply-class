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
    // replace @apply declaration with matching root rule
    /*
    return function (root) {
        // look through each root rule
        root.walkRules(rule => {
            // loop through @apply declarations
            rule.walkAtRules('apply', apply => {
                // loop through all root rules
                root.walkRules(rootRule => {
                    const applyClasses = utils.stringToList(apply.params);
                    // for each @apply class, compare current root rule for a match
                    applyClasses.forEach(applyClass => {
                        // look at each selector in root rule i.e .foo, .bar
                        rootRule.selectors.forEach(selector => {
                            // determine if current selector matches @apply rule
                            if (selector === applyClass) {
                                // if we have a match, then apply all the declarations from the root rule
                                rootRule.walkDecls(decl => {
                                    rule.append({
                                        prop: decl.prop,
                                        value: decl.value
                                    });
                                });
                            }
                        });
                    });
                });

                // remove the @apply rule
                apply.remove();
            });
        });
    };
    */
});
