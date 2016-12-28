/* jslint node: true, strict:implied, esversion: 6 */

var fs = require('fs'),
    path = require('path'),
    kss = require('kss'),
    Handlebars = require('handlebars'),
    marked = require('marked'),
    placeholder = '[modifier class]',
    eachModifierHelper = require('./lib/helpers/each-modifier.js')(placeholder),
    env = process.env.NODE_ENV;

function mkKss(configPath, callback) {

    configPath = configPath || 'config/mk-kss-config.js';

    let kssConfig = require(path.resolve(configPath)),
        styleGuideDir = kssConfig[env].styleGuideDir,
        cssRootDir = kssConfig[env].cssRootDir,
        indexMd = fs.readFileSync(kssConfig[env].indexMd, 'utf8'),
        indexHbs = fs.readFileSync(path.join(__dirname, './templates/index.hbs'), 'utf8'),
        sectionHbs = fs.readFileSync(path.join(__dirname, './templates/section.hbs'), 'utf8'),
        navBarPartial = fs.readFileSync(path.join(__dirname, './templates/partials/nav-bar.hbs'), 'utf8'),
        modifierPartial = fs.readFileSync(path.join(__dirname, './templates/partials/modifier.hbs'), 'utf8'),
        kssStyles = fs.readFileSync(path.join(__dirname, './stylesheets/kss.css'), 'utf8'),
        kssScripts = fs.readFileSync(path.join(__dirname, './javascripts/kss.js'), 'utf8'),
        referenceStyles = kssConfig[env].referenceStyles;


    Handlebars.registerPartial('nav-bar', navBarPartial);
    Handlebars.registerPartial('modifier', modifierPartial);
    Handlebars.registerHelper('eachModifier', eachModifierHelper);


    let indexTemplate = Handlebars.compile(indexHbs),
        sectionTemplate = Handlebars.compile(sectionHbs);


    Handlebars.registerHelper('kssUrl', function(section, context) {

        if (section.depth() === 1) {
            return section.referenceURI() + '.html';
        } else {
            return '#' + section.referenceURI();
        }

    });

    function onTraversed(traverseResult) {

        let sections = traverseResult.sections(),
            topLevelSections = traverseResult.sections('x'),
            pageNavSections = [];
            writtenFilesCount = 0;

        function onFileWritten(err) {

            writtenFilesCount += 1;

            // check if the files written equal the number of
            // all section files plus the one index file
            // if it does fire the callback if a callback function
            // is provided

            if ((writtenFilesCount === topLevelSections.length + 1) &&
                callback) {

                callback(writtenFilesCount);
            }

            if (err) {
                console.error(err);
            }

        }

        for (let i = 0, l = sections.length; i < l; i++) {
            let section = sections[i],
                uri = 'section-' + section.referenceNumber();
            section.referenceURI(uri);
        }

        for (let i = 0, l = topLevelSections.length; i < l; i++) {

            let pageContentSections = [],
                iTopLevelSection = topLevelSections[i],
                iKey = iTopLevelSection.referenceNumber(),
                targetPagePath;

            for (let j = 0, jl = topLevelSections.length; j < jl; j++) {

                let jTopLevelSection = topLevelSections[j];
                pageNavSections.push(jTopLevelSection);
                let jKey = jTopLevelSection.referenceNumber();

                // active navigation object to mark
                if (jKey === iKey) {

                    pageContentSections.push(jTopLevelSection);

                    targetPagePath =
                        path.join(styleGuideDir,
                            jTopLevelSection.referenceURI() + '.html');

                    let sections = traverseResult.sections(jKey + '.*');

                    for (var u = 0, lu = sections.length; u < lu; u++) {

                        if(sections[u].depth() > 1) {
                            pageContentSections.push(sections[u]);
                            pageNavSections.push(sections[u]);
                        }

                    }

                }

            }

            let context = {
                cssUrls: referenceStyles,
                navSections: pageNavSections,
                contentSections: pageContentSections,
                title: kssConfig.title,
                kssStyles: kssStyles,
                kssScripts: kssScripts
            },
            html = sectionTemplate(context);

            fs.writeFile(targetPagePath, html, onFileWritten);
            pageNavSections = [];

        }

        let context = {
            cssUrls: referenceStyles,
            navSections: topLevelSections,
            kssStyles: kssStyles,
            kssScripts: kssScripts,
            title: kssConfig.title,
            text: marked(indexMd)
        },
        html = indexTemplate(context),
        indexPath = path.join(styleGuideDir, 'index.html');

        fs.writeFile(indexPath, html, onFileWritten);

    }


    var options = {
        markdown: true,
        mask: '*.css',
        referenceDelimiter: '.',
        placeholder: placeholder
    };

    kss.traverse(cssRootDir, options).
    then(onTraversed);

}

module.exports = mkKss;
