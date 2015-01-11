module.exports = (function () {
    'use strict';

    var toUnderscore = function (str) {
        return str.trim().replace(/([a-z\d])([A-Z]+)/g, '$1_$2').replace(/[-\s]+/g, '_').toUpperCase();
    };

    var util = require('util'),
        DEFINE_MODULE_TEMPLATE = 'try { angular.module(\'%s\'); } catch(err) { angular.module(\'%s\', []); }\n',
        DEFINE_CONSTANT_TEMPLATE = 'angular.module(\'%s\').constant(\'%s\', %s);\n';

    function createGbJson2jsPreprocessor(logger, basePath, config) {
        config = config || {};

        var moduleName = config.moduleName || 'mocks';
        var log = logger.create('preprocessor.gb-json2js');

        return function (content, file, done) {

            var fileName = file.originalPath.slice(file.originalPath.lastIndexOf('/') + 1);
            var constantName = toUnderscore(fileName.slice(0, fileName.lastIndexOf('.')));

            log.debug('Processing "%s".', fileName);
            log.debug('Creating "%s".', constantName);

            file.path = file.path + '.js';

            log.debug('Output: ', util.format(DEFINE_MODULE_TEMPLATE, moduleName, moduleName)
            + util.format(DEFINE_CONSTANT_TEMPLATE, moduleName, constantName, content));

            done(util.format(DEFINE_MODULE_TEMPLATE, moduleName, moduleName)
            + util.format(DEFINE_CONSTANT_TEMPLATE, moduleName, constantName, content));
        };
    }

    createGbJson2jsPreprocessor.$inject = ['logger', 'config.basePath', 'config.gbJson2JsPreprocessor'];

    return createGbJson2jsPreprocessor;
})();
