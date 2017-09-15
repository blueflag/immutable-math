// @flow
import type {Iterable} from 'immutable';
/**
 * @module aggregations
 */

/**
 * Finds the minimum number in an `Iterable`. Accepts no parameters.
 *
 * @return {InputFunction} A partially applied function which accepts a single `Iterable`, and returns the result of the operation.
 */

function min(): InputFunction {
    return (input: Mappable): number => {
        return input.isEmpty()
          ? NaN
          : input.min();
    }
}

/**
 * Like `min`, but also accepts a `valueMapper` function which allows you to process child properties.
 * @param {ValueMapper} valueMapper A function that allows you to specify what value gets processed on each item in the input `Iterable`.
 * @return {InputFunction} A partially applied function which accepts a single `Iterable`, and returns the result of the operation.
 */

function minBy(valueMapper: ValueMapper): InputFunction {
    return (input: Mappable): number => min()(input.map(valueMapper));
}


/**
 * Finds the maximum number in an `Iterable`. Accepts no parameters.
 *
 * @return {InputFunction} A partially applied function which accepts a single `Iterable`, and returns the result of the operation.
 */

function max(): InputFunction {
    return (input: Mappable): number => {
        return input.isEmpty()
      ? NaN
      : input.max();
    }
}

/**
 * Like `max`, but also accepts a `valueMapper` function which allows you to process child properties.
 * @param {ValueMapper} valueMapper A function that allows you to specify what value gets processed on each item in the input `Iterable`.
 * @return {InputFunction} A partially applied function which accepts a single `Iterable`, and returns the result of the operation.
 */

function maxBy(valueMapper: ValueMapper): InputFunction {
    return (input: Mappable): number => max()(input.map(valueMapper));
}

 /**
 * Sums the elements in an `Iterable`. Accepts no parameters.
 *
 * @return {InputFunction} A partially applied function which accepts a single `Iterable`, and returns the result of the operation.
 */

function sum(): InputFunction {
    return (input: Mappable): number => input.reduce((sum: number, val: number) => sum + val, 0);
}

/**
 * Like `sum`, but also accepts a `valueMapper` function which allows you to process child properties.
 * @param {ValueMapper} valueMapper A function that allows you to specify what value gets summed on each item in the input `Iterable`.
 * @return {InputFunction} A partially applied function which accepts a single `Iterable`, and returns the result of the operation.
 */

function sumBy(valueMapper: ValueMapper): InputFunction {
    return (input: Mappable): number => sum()(input.map(valueMapper));
}


/**
 * Averages the elements in an `Iterable`. Accepts no parameters.
 *
 * @return {InputFunction} A partially applied function which accepts a single `Iterable`, and returns the result of the operation.
 */

function average(): InputFunction {
    return (input: Mappable): number => {
        return input.isEmpty()
            ? NaN
            : sum()(input) / input.count();
    }
}

/**
 * Like `average`, but also accepts a `valueMapper` function which allows you to process child properties.
 * @param {ValueMapper} valueMapper A function that allows you to specify what value gets averaged on each item in the input `Iterable`.
 * @return {InputFunction} A partially applied function which accepts a single `Iterable`, and returns the result of the operation.
 */

function averageBy(valueMapper: ValueMapper): InputFunction {
    return (input: Mappable): number => average()(input.map(valueMapper));
}



/**
 * An alias for {@link average}.
 * @return {InputFunction} A partially applied function which accepts a single `Iterable`, and returns the result of the operation.
 */

function mean(): InputFunction {
    return average();
}

/**
 * An alias for {@link averageBy}.
 *
 * @param {ValueMapper} valueMapper A function that allows you to specify what value gets averaged on each item in the input `Iterable`.
 * @return {InputFunction} A partially applied function which accepts a single `Iterable`, and returns the result of the operation.
 */

function meanBy(valueMapper: ValueMapper): InputFunction {
    return averageBy(valueMapper);
}


/**
 * Averages the elements in an `Iterable`. Accepts no parameters.
 *
 * @return {InputFunction} A partially applied function which accepts a single `Iterable`, and returns the result of the operation.
 */

function median(): InputFunction {
    return (input: Mappable): number => {
        if(input.isEmpty()) {
            return NaN;
        }
        const sorted = input.sort();
        const count = input.count();
        return count % 2 == 0
            ? (sorted.get(count / 2) + sorted.get((count / 2) - 1)) / 2
            : sorted.get(Math.floor(count / 2));
    }
}

/**
 * Like `median`, but also accepts a `valueMapper` function which allows you to process child properties.
 *
 * @param {ValueMapper} valueMapper A function that allows you to specify what value gets read from each item in the input `Iterable`.
 * @return {InputFunction} A partially applied function which accepts a single `Iterable`, and returns the result of the operation.
 */

function medianBy(valueMapper: ValueMapper): InputFunction {
    return (input: Mappable): number => median()(input.map(valueMapper));
}

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
}
