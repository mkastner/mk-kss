/* jslint node: true, strict:implied, esversion: 6 */

let co = require('co'),
    tape = require('tape'),
    fs = require('fs'),
    path = require('path'),
    MkKss = require('mk-kss'),
    testResultsPath = path.join(path.resolve('./'), 'test/results');

function removeFile(filePath) {

    return new Promise(function(resolve, reject) {

        fs.unlink(filePath, function(err) {

            //console.log('unlinked', filePath);

            if (err) {
                console.error(err);
            }

            resolve(filePath);

        });

    }).catch(function(err) {
        console.error(err);
    });

}

tape('cleanup results', function(t) {

    function onReaddir(err, files) {

        co(function*() {

            if (err) {
                throw(err);
            }

            for (let i = 0, l = files.length; i < l; i++) {

                if (files[i].indexOf('.html') !== -1) {
                    var filePath = path.join(testResultsPath, files[i]);
                    var removedFile = yield removeFile(filePath);
                }

            }

            t.end();

        }).catch(function(err) {
            console.error(err);
        });

    };

    fs.readdir(testResultsPath, onReaddir);

});

tape('templates test', function(t) {

    function done(writtenFilesCount) {
        t.equal(3, writtenFilesCount);
        t.end();
    }

    MkKss('test/assets/mk-kss-config.js', done);

});
