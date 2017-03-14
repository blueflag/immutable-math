'use strict';

Object.defineProperty(exports, "__esModule", {
    value: true
});
exports.percentBy = exports.percent = undefined;

var _aggregations = require('./aggregations');

/**
 * @module transformations
 */

/**
 * Calculates the percentage of each `number` in a `Iterable` compared to the sum of all `number`s in the `Iterable`.
 *
 * @return {InputFunction} A partially applied function which accepts a single `Iterable`, and returns the result of the operation.
 */

function percent() {
    return function (input) {
        if (input.isEmpty()) {
            return input;
        }
        var summed = input.update((0, _aggregations.sum)());
        return input.map(function (ii) {
            return ii / summed;
        });
    };
}

/**
 * Like `percent`, but also accepts a `valueMapper` function which allows you to process child properties.
 * @param {ValueMapper} valueMapper
 * @param {ValueSetter} valueSetter
 * @return {InputFunction}
 */

function percentBy(valueMapper) {
    var valueSetter = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : null;

    return function (input) {
        if (input.isEmpty()) {
            return input;
        }
        var percents = input.map(valueMapper).update(percent());

        if (!valueSetter) {
            return percents;
        }
        return input.map(function (item, kk, iter) {
            var value = percents.get(kk);
            return valueSetter(item, value, kk, iter);
        });
    };
}

exports.percent = percent;
exports.percentBy = percentBy;