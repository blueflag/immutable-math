// @flow
import type {List} from 'immutable';
import {sum} from './aggregations';

/**
 * @module transformations
 */

/**
 * Calculates the percentage of each `number` in a `Iterable` compared to the sum of all `number`s in the `Iterable`.
 *
 * @return {InputFunction} A partially applied function which accepts a single `Iterable`, and returns the result of the operation.
 */

function percent(): InputFunction {
    return (input: Mappable): Mappable => {
        if(input.isEmpty()) {
            return input;
        }
        const summed: number = input.update(sum());
        return input.map(ii => ii / summed);
    }
}

/**
 * Like `percent`, but also accepts a `valueMapper` function which allows you to process child properties.
 * @param {ValueMapper} valueMapper
 * @param {ValueSetter} valueSetter
 * @return {InputFunction}
 */

function percentBy(valueMapper: ValueMapper, valueSetter: ValueSetter): InputFunction {
    return (input: Mappable): Mappable => {
        if(input.isEmpty()) {
            return input;
        }
        const percents: List<number> = input
            .map(valueMapper)
            .update(percent());

        if(!valueSetter) {
            return percents;
        }

        return input
            .map((item: *, kk: *, iter: Mappable): * => {
                const value: number = percents.get(kk);
                return valueSetter(item, value, kk, iter);
            });
    };
}

export {
  percent,
  percentBy
}
