//@flow
import type {KeyedIterable, IndexedIterable, SetIterable} from 'immutable';

export type Mappable = KeyedIterable<*, *>|IndexedIterable<*>|SetIterable<*>;
export type InputFunction = (input: Mappable) => *;
export type ValueMapper = (value: *, key: *, iter: Mappable) => *;
export type ValueSetter = (item: *, value: *, key: *, iter: Mappable) => *;
