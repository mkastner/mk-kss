/*jslint node: true, strict:implied, esversion: 6 */

/**
 * formatting modifiers
 * @param  {object} section a kss stylguide section object
 * @return {[type]}         [description]
 */

function eachModifierWrapper(modifierPlacholder) {

    function eachModifier(section, options) {

        //console.log(section)

        //console.log('section.markup()', section.markup());

        //console.log('section.modifiers().length', section.modifiers().length);

        var result = '';

        for (var i = 0, l = section.modifiers().length; i < l; i++) {
            var modifier = section.modifiers()[i];

            //console.log('*** modifier', modifier);

            //console.log('modifier.className()', modifier.className());

            var className = modifier.data.name.replace('.', '');
            var pseudoClassName = modifier.className();


            var markup = section.data.markup.replace(modifierPlacholder, className);
            var pseudoMarkup = section.data.markup.replace(modifierPlacholder, pseudoClassName);

            //console.log('pseudoMarkup', pseudoMarkup);

            //console.log(markup);
            result += options.fn({
                name: modifier.data.name,
                markup: markup,
                pseudoMarkup: pseudoMarkup,
                description: modifier.data.description
            });
        }

        return result;

    }

    return eachModifier;

}



module.exports = eachModifierWrapper;
