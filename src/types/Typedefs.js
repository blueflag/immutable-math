// @flow

/**
 * InputFunction is a partially applied function returned from most operations in immutable-math.
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
 * This design of using a partially applied function allows immutable-math's functions to be chained easily with Immutable,
 * by using them inside of an `update()` method, if your input `Iterable` has an update function.
 * This is the preferred usage pattern as it retains chainability.
 *
 * ```js
 * return fromJS([1,1,1,5])
 *     .update(average()) // using average in a chain
 * ```
 *
 * You can also define a function to perform a specific operation, and use it multiple times by passing in different input data.
 * 
 * 
 *  ```js
 * const numbersA = fromJS([
 * 	{num: 1},
 * 	{num: 1},
 * 	{num: 1},
 * 	{num: 5}
 * ]);
 * 
 * const numbersB = fromJS([
 * 	{num: 3},
 * 	{num: 5}
 * ]);
 * 
 * const averageByNum = averageBy(ii => ii.get('num'));
 * const averageA = numbersA.update(averageByNum); // averageA is 2
 * const averageB = numbersB.update(averageByNum); // averageB is 4
 * ```
 *
 * @callback InputFunction
 * @param {Iterable} input The input Iterable to be processed by one of the functions.
 * @return {*} The result of the function
 */

 type InputFunction = (input: Iterable<*,*>) => *;

/**
 * A function required by some operations that allows you to specify what value gets pulled from each item in the input `Iterable` when performing a calculation.
 *
 * @callback ValueMapper
 * @param {*} value The value of the current item in the input `Iterable`.
 * @param {*} key The key of the current item in the input `Iterable`.
 * @param {Iterable} iter The original `input` `Iterable`.
 * @return {*} The replacement value.
 */

 type ValueMapper = (value: *, key: *, iter: Iterable<*,*>) => *;