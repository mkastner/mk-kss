/* jslint node: true, strict:implied, esversion: 6 */

var path = require('path');

let appRoot = path.resolve('./'),
    cssRootDir = path.join(appRoot, 'test/assets/css'),
    styleGuideDir = path.join(appRoot, 'test/playground'),
    indexMd = path.join(appRoot, 'test/assets/index.md'),
    kssConfig = {
        version: '0.0.1',
        title: 'Test Styleguide',
        production: {
            cssRootDir: cssRootDir,
            styleGuideDir: styleGuideDir,
            indexMd: indexMd,
            referenceStyles: [
                'https://www.galt.de/css/not_galt.css'
            ]
        },
        test: {
            cssRootDir: cssRootDir,
            styleGuideDir: styleGuideDir,
            indexMd: indexMd,
            referenceStyles: [
                'https://www.galt.de/css/not_galt.css'
            ]
        },
        development: {
            cssRootDir: cssRootDir,
            styleGuideDir: styleGuideDir,
            indexMd: indexMd,
            referenceStyles: [
                'https://www.galt.de/css/not_galt.css'
            ]
        }
    };

module.exports = kssConfig;
