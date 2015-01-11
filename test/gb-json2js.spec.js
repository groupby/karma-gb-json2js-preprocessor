/* global angular */
describe('json2j preprocessor', function () {
    'use strict';

    beforeEach(module('foo'));

    it('should work on an empty object', function () {
        var EMPTY_MOCK;
        inject(function (_EMPTY_MOCK_) {
            EMPTY_MOCK = _EMPTY_MOCK_;
        });

        expect(EMPTY_MOCK).toEqual({});
    });

    var checkComplexObject = function (COMPLEX_MOCK) {
        expect(COMPLEX_MOCK).toEqual({
            field: 'property',
            subObject: [
                'arrayElem1',
                'arrayElem2'
            ],
            anotherSubObject: {
                subSubObject: {
                    field: 'property'
                }
            }
        });
    };

    it('should work on a complex object', function () {
        var COMPLEX_MOCK;
        inject(function (_COMPLEX_MOCK_) {
            COMPLEX_MOCK = _COMPLEX_MOCK_;
        });

        checkComplexObject(COMPLEX_MOCK);
    });

    it('should allow accessing the json during configuration phase', function () {
        var injectedDuringConfig;
        angular.module('testModule', ['foo']).config(function (_COMPLEX_MOCK_) {
            injectedDuringConfig = _COMPLEX_MOCK_;
        });

        inject(module('testModule'));

        checkComplexObject(injectedDuringConfig);
    });
});
