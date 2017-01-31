# karma-gb-json2js-preprocessor

[![Greenkeeper badge](https://badges.greenkeeper.io/groupby/karma-gb-json2js-preprocessor.svg)](https://greenkeeper.io/)

> Preprocessor for converting JSON files to [AngularJS](http://angularjs.org/) constants.

## Installation

The easiest way is to keep `karma-gb-json2js-preprocessor` as a devDependency in your `package.json`. You can simple do it by:
```bash
npm install karma-gb-json2js-preprocessor --save-dev
```

## Configuration
```js
// karma.conf.js
module.exports = function(config) {
  config.set({
    preprocessors: {
      '**/*.html': ['ng-html2js'],
      '**/*.json': ['gb-json2js']
    },

    plugins: [
      'karma-gb-json2js-preprocessor'
    ],

    files: [
      'test/fixture/*.js',
      '*.html'
    ],

    gbJson2JsPreprocessor: {
      // The module the json will be loaded into, defaults to "mocks"
      //moduleName: 'foo'
    }
  });
};
```

## How does it work ?

This preprocessor converts JSON files into Angular constants and puts them in separate Angular modules; each named the same as the source JSON file and generates Angular modules.

For instance this `test/fixture/loginService-mocks.json`  ...
```json
{
    prop: val
}
```
... with the configuration given above will be converted into:
```js
angular.module('mocks', []).constant('LOGIN_SERVICE_MOCKS', {
    prop: 'val'
});
```
Inject json fixture into your test case:
```js
describe('me', function(){
    beforeEach(module('mocks'));

    it('should not fail', function() {
        var LOGIN_SERVICE_MOCKS;
        inject(function (_LOGIN_SERVICE_MOCKS_) {
            LOGIN_SERVICE_MOCKS = _LOGIN_SERVICE_MOCKS_;
        });

        expect(LOGIN_SERVICE_MOCKS).toEqual({
            prop: 'val'
        });
    });

});
```

----

## Contributing

Before sending a pull request, run `grunt` in terminal to make sure all tests pass. To continuously run tests during development, run `karma start`.


For more information on Karma see the [homepage].


[homepage]: http://karma-runner.github.com
