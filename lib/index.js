"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});


/**
 * @module aggregations
 */

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
 * Like `sum`, but also accepts a `valueMapper` function which allows for summing by more sophisticated means.
 *
 * @param {ValueMapper} A function that allows you to specify what value gets summed on each item in the input `Iterable`.
 * @return {InputFunction} A partially applied function which accepts a single `Iterable`, and returns the result of the operation.
 */

function sumBy(valueMapper) {
  return function (input) {
    return input.reduce(function (sum, val, key) {
      return sum + valueMapper(val, key, input);
    }, 0);
  };
}

/**
 * Averages the elements in an `Iterable`. Accepts no parameters.
 *
 * @return {InputFunction} A partially applied function which accepts a single `Iterable`, and returns the result of the operation.
 */

function average() {
  return function (input) {
    return sum()(input) / input.count();
  };
}

/**
 * Like `average`, but also accepts a `valueMapper` function which allows for averaging by more sophisticated means.
 *
 * @param {ValueMapper} A function that allows you to specify what value gets averaged on each item in the input `Iterable`.
 * @return {InputFunction} A partially applied function which accepts a single `Iterable`, and returns the result of the operation.
 */

function averageBy(valueMapper) {
  return function (input) {
    return sumBy(valueMapper)(input) / input.count();
  };
}

exports.sum = sum;
exports.sumBy = sumBy;
exports.average = average;
exports.averageBy = averageBy;