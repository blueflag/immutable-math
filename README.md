# immutable-math

[![MIT licensed](https://img.shields.io/badge/license-MIT-blue.svg)](http://opensource.org/licenses/MIT)
[![github-issues](https://img.shields.io/github/issues/blueflag/immutable-math.svg)](https://github.com/blueflag/immutable-math/issues)

Some mathematatics for Immutable.js for aggregations and stuff. Super not-release ready. [Crummy docs](http://blueflag.github.io/immutable-math/).

# Usage

Most functions in this library use partially applied functions.
For example, one way to use `average` is to call it, passing in any parameters required (`average` requires no extra params), then call the returned function passing in your data.

```js
const numbers = fromJS([1,1,1,5]);
return average()(numbers); // returns 2
```

This design of using a partially applied function allows immutable-math's functions to be chained easily with Immutable,
by using them inside of an `update()` method, if your input `Iterable` has an update function.
This is the preferred usage pattern as it retains chainability.

```js
return fromJS([1,1,1,5])
    .update(average()) // using average in a chain
```

You can also define a function to perform a specific operation, and use it multiple times by passing in different input data.

```js
const numbersA = fromJS([
	{num: 1},
	{num: 1},
	{num: 1},
	{num: 5}
]);

const numbersB = fromJS([
	{num: 3},
	{num: 5}
]);

const averageByNum = averageBy(ii => ii.get('num'));
const averageA = numbersA.update(averageByNum); // averageA is 2
const averageB = numbersB.update(averageByNum); // averageB is 4
```