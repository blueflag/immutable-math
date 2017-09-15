// @flow

export {
  min,
  minBy,
  max,
  maxBy,
  sum,
  sumBy,
  average,
  averageBy,
  mean,
  meanBy,
  median,
  medianBy
} from './aggregations';

export {
  percent,
  percentBy
} from './transformations';


/**
 * InputFunction is a partially applied function returned from aggregations in immutable-math.
 * It accepts an `Iterable` of the data you wish to operate on,
 * and returns the result of the function you're calling.
 *
 * For example, one way to use `average` is to call it, passing in any parameters required (`average requires no extra params`), then call the returned function passing in your data.
 *
 * ```js
 * const numbers = fromJS([1,1,1,5]);
 * return average()(numbers); // returns 2
 * ```
 *
 * For any immutable-math functions that return an `Iterable`, this design of using a partially applied function allows for easy chaining by using them inside of an `update()` method, if your input `Iterable` has an update function.
 * 
 * ```js
 * return fromJS([1,1,1,5])
 *     .update(exampleFunction()) // using an exampleFunction from immutable-math in a chain
 *     .sort()
 *     .toJS();
 * ```
 * 
 *
 * You can also define a function to perform a specific operation, and use it multiple times by passing in different input data.
 * 
 * 
 *  ```js
 * const numbersA = fromJS([
 *  {num: 1},
 *  {num: 1},
 *  {num: 1},
 *  {num: 5}
 * ]);
 * 
 * const numbersB = fromJS([
 *  {num: 3},
 *  {num: 5}
 * ]);
 * 
 * const averageByNum = averageBy(ii => ii.get('num'));
 * const averageA = numbersA.update(averageByNum); // averageA is 2
 * const averageB = numbersB.update(averageByNum); // averageB is 4
 * ```
 *
 * @callback InputFunction
 * @param {Iterable} input The input Iterable to be processed by one of the functions.
 * @return {Number} The result of the function
 */

type InputFunction = (input: Mappable) => *;

/**
 * A function required by some operations that allows you to specify what value gets pulled from each item in the input `Iterable` when performing a calculation.
 *
 * @callback ValueMapper
 * @param {*} value The value of the current item in the input `Iterable`.
 * @param {*} key The key of the current item in the input `Iterable`.
 * @param {Iterable} iter The original `input` `Iterable`.
 * @return {Number} The number to use in the operation.
 */

type ValueMapper = (value: *, key: *, iter: Mappable) => *;