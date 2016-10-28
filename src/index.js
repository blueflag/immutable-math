// @flow

/**
 * @module aggregations
 */

 /**
 * Sums the elements in an `Iterable`. Accepts no parameters.
 *
 * @return {InputFunction} A partially applied function which accepts a single `Iterable`, and returns the result of the operation.
 */

function sum(): InputFunction {
  return (input: Iterable<*,*>): number => input.reduce((sum: number, val: number) => sum + val, 0);
}

/**
 * Like `sum`, but also accepts a `valueMapper` function which allows for summing by more sophisticated means.
 *
 * @param {ValueMapper} A function that allows you to specify what value gets summed on each item in the input `Iterable`.
 * @return {InputFunction} A partially applied function which accepts a single `Iterable`, and returns the result of the operation.
 */

function sumBy(valueMapper: ValueMapper): InputFunction {
  return (input: Iterable<*,*>): number => input.reduce((sum: number, val: *, key: *) => sum + valueMapper(val, key, input), 0);
}

/**
 * Averages the elements in an `Iterable`. Accepts no parameters.
 *
 * @return {InputFunction} A partially applied function which accepts a single `Iterable`, and returns the result of the operation.
 */

function average(): InputFunction {
  return (input: Iterable<*,*>): number => sum()(input) / input.count();
}

/**
 * Like `average`, but also accepts a `valueMapper` function which allows for averaging by more sophisticated means.
 *
 * @param {ValueMapper} A function that allows you to specify what value gets averaged on each item in the input `Iterable`.
 * @return {InputFunction} A partially applied function which accepts a single `Iterable`, and returns the result of the operation.
 */

function averageBy(valueMapper: ValueMapper): InputFunction {
  return (input: Iterable<*,*>): number => sumBy(valueMapper)(input) / input.count();
}

export {
  sum,
  sumBy,
  average,
  averageBy
}