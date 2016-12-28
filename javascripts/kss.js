(function() {

    window.addEventListener('load', function() {

        for (var i = 0, l = document.styleSheets.length; i < l; i ++) {

            var styleSheet = document.styleSheets[i];

            var fileName = styleSheet.href.split('/').pop();

            if (fileName.indexOf('kss') === -1) {

                var rules = styleSheet.cssRules;

                for (var j = 0, jl = rules.length; j < jl; j++) {
                    //console.log('rule:', rules[j]);
                    if (rules[j].cssText.indexOf(':hover')) {

                        var cssText = rules[j].cssText.replace(':hover', '.pseudo-class-hover');
                        styleSheet.insertRule(cssText, rules.length);

                    }

                }

            }

        }
    });

})();
