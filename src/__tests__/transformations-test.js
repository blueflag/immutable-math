
import tape from 'tape';
import {
  fromJS,
  List,
  is
} from 'immutable';

import {
  percent,
  percentBy
} from '../transformations';

tape('percent', test => {
    test.plan(3);

    const emptyList = List();

    test.true(
      is(
        emptyList.update(percent()),
        emptyList
      ),
      'percent works on no items'
    );

    test.true(
      is(
        fromJS([2]).update(percent()),
        List([1])
      ),
      'percent works on single item'
    );

    test.true(
      is(
        fromJS([1,1,3]).update(percent()),
        List([0.2, 0.2, 0.6])
      ),
      'percent works on lots of items'
    );

});

tape('percentBy', test => {
    test.plan(4);

    test.true(
      is(
        fromJS([]).update(percentBy(ii => ii.get('n'))),
        List()
      ),
      'percentBy works on no items'
    );

    test.true(
      is(
        fromJS([
          {n: 2}
        ])
          .update(
            percentBy(
              (ii) => ii.get('n'),
              (ii, percent) => ii.set('p', percent)
            )
          ),
        fromJS([
          {n: 2, p: 1}
        ])
      ),
      'percentBy works on single item'
    );

    test.true(
      is(
        fromJS([
          {n: 2},
          {n: 2},
          {n: 6}
        ]).update(
          percentBy(
            (ii) => ii.get('n'),
            (ii, percent) => ii.set('p', percent)
          )
        ),
        fromJS([
          {n: 2, p: 0.2},
          {n: 2, p: 0.2},
          {n: 6, p: 0.6}
        ])
      ),
      'percentBy works on lots of items'
    );

    test.true(
      is(
        fromJS([
          {n: 2},
          {n: 2},
          {n: 6}
        ]).update(
          percentBy(
            (ii) => ii.get('n')
          )
        ),
        fromJS([0.2, 0.2, 0.6])
      ),
      'percentBy works without have a valueSetter'
    );
});