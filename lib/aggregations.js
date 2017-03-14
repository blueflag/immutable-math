'use strict';

Object.defineProperty(exports, "__esModule", {
    value: true
});

/**
 * @module aggregations
 */

/**
 * Finds the minimum number in an `Iterable`. Accepts no parameters.
 *
 * @return {InputFunction} A partially applied function which accepts a single `Iterable`, and returns the result of the operation.
 */

function min() {
    return function (input) {
        return input.isEmpty() ? NaN : input.min();
    };
}

/**
 * Like `min`, but also accepts a `valueMapper` function which allows you to process child properties.
 * @param {ValueMapper} valueMapper A function that allows you to specify what value gets processed on each item in the input `Iterable`.
 * @return {InputFunction} A partially applied function which accepts a single `Iterable`, and returns the result of the operation.
 */

function minBy(valueMapper) {
    return function (input) {
        return min()(input.map(valueMapper));
    };
}

/**
 * Finds the maximum number in an `Iterable`. Accepts no parameters.
 *
 * @return {InputFunction} A partially applied function which accepts a single `Iterable`, and returns the result of the operation.
 */

function max() {
    return function (input) {
        return input.isEmpty() ? NaN : input.max();
    };
}

/**
 * Like `max`, but also accepts a `valueMapper` function which allows you to process child properties.
 * @param {ValueMapper} valueMapper A function that allows you to specify what value gets processed on each item in the input `Iterable`.
 * @return {InputFunction} A partially applied function which accepts a single `Iterable`, and returns the result of the operation.
 */

function maxBy(valueMapper) {
    return function (input) {
        return max()(input.map(valueMapper));
    };
}

/**
* Sums the elements in an `Iterable`. Accepts no parameters.
*
* @return {InputFunction} A partially applied function which accepts a single `Iterable`, and returns the result of the operation.
*/

function sum() {
    return function (input) {
        return input.reduce(function (sum, val) {
            return sum + val;
        }, 0);
    };
}

/**
 * Like `sum`, but also accepts a `valueMapper` function which allows you to process child properties.
 * @param {ValueMapper} valueMapper A function that allows you to specify what value gets summed on each item in the input `Iterable`.
 * @return {InputFunction} A partially applied function which accepts a single `Iterable`, and returns the result of the operation.
 */

function sumBy(valueMapper) {
    return function (input) {
        return sum()(input.map(valueMapper));
    };
}

/**
 * Averages the elements in an `Iterable`. Accepts no parameters.
 *
 * @return {InputFunction} A partially applied function which accepts a single `Iterable`, and returns the result of the operation.
 */

function average() {
    return function (input) {
        return input.isEmpty() ? NaN : sum()(input) / input.count();
    };
}

/**
 * Like `average`, but also accepts a `valueMapper` function which allows you to process child properties.
 * @param {ValueMapper} valueMapper A function that allows you to specify what value gets averaged on each item in the input `Iterable`.
 * @return {InputFunction} A partially applied function which accepts a single `Iterable`, and returns the result of the operation.
 */

function averageBy(valueMapper) {
    return function (input) {
        return average()(input.map(valueMapper));
    };
}

/**
 * An alias for {@link average}.
 * @return {InputFunction} A partially applied function which accepts a single `Iterable`, and returns the result of the operation.
 */

function mean() {
    return average();
}

/**
 * An alias for {@link averageBy}.
 *
 * @param {ValueMapper} valueMapper A function that allows you to specify what value gets averaged on each item in the input `Iterable`.
 * @return {InputFunction} A partially applied function which accepts a single `Iterable`, and returns the result of the operation.
 */

function meanBy(valueMapper) {
    return averageBy(valueMapper);
}

/**
 * Averages the elements in an `Iterable`. Accepts no parameters.
 *
 * @return {InputFunction} A partially applied function which accepts a single `Iterable`, and returns the result of the operation.
 */

function median() {
    return function (input) {
        if (input.isEmpty()) {
            return NaN;
        }
        var sorted = input.sort();
        var count = input.count();
        return count % 2 == 0 ? (sorted.get(count / 2) + sorted.get(count / 2 - 1)) / 2 : sorted.get(Math.floor(count / 2));
    };
}

/**
 * Like `median`, but also accepts a `valueMapper` function which allows you to process child properties.
 *
 * @param {ValueMapper} valueMapper A function that allows you to specify what value gets read from each item in the input `Iterable`.
 * @return {InputFunction} A partially applied function which accepts a single `Iterable`, and returns the result of the operation.
 */

function medianBy(valueMapper) {
    return function (input) {
        return median()(input.map(valueMapper));
    };
}

exports.min = min;
exports.minBy = minBy;
exports.max = max;
exports.maxBy = maxBy;
exports.sum = sum;
exports.sumBy = sumBy;
exports.average = average;
exports.averageBy = averageBy;
exports.mean = mean;
exports.meanBy = meanBy;
exports.median = median;
exports.medianBy = medianBy;