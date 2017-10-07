var postcss = require('postcss');
var utils = require('./utils');

module.exports = postcss.plugin('postcss-apply-class', function () {
    return function (root) {
        root.walkRules(rule => {
            rule.walkAtRules('apply', apply => {
                root.walkRules(rootRule => {
                    const applyClasses = utils.stringToList(apply.params);
                    applyClasses.forEach(applyClass => {
                        if (rootRule.selectors.includes(applyClass)) {
                            rootRule.walkDecls(decl => {
                                rule.append({
                                    prop: decl.prop,
                                    value: decl.value
                                });
                            });
                        }
                    });
                });

                apply.remove();
            });
        });
    };
});
