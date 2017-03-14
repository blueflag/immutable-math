'use strict';

var _tape = require('tape');

var _tape2 = _interopRequireDefault(_tape);

var _immutable = require('immutable');

var _transformations = require('../transformations');

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

(0, _tape2.default)('percent', function (test) {
  test.plan(3);

  var emptyList = (0, _immutable.List)();

  test.true((0, _immutable.is)(emptyList.update((0, _transformations.percent)()), emptyList), 'percent works on no items');

  test.true((0, _immutable.is)((0, _immutable.fromJS)([2]).update((0, _transformations.percent)()), (0, _immutable.List)([1])), 'percent works on single item');

  test.true((0, _immutable.is)((0, _immutable.fromJS)([1, 1, 3]).update((0, _transformations.percent)()), (0, _immutable.List)([0.2, 0.2, 0.6])), 'percent works on lots of items');
});

(0, _tape2.default)('percentBy', function (test) {
  test.plan(4);

  test.true((0, _immutable.is)((0, _immutable.fromJS)([]).update((0, _transformations.percentBy)(function (ii) {
    return ii.get('n');
  })), (0, _immutable.List)()), 'percentBy works on no items');

  test.true((0, _immutable.is)((0, _immutable.fromJS)([{ n: 2 }]).update((0, _transformations.percentBy)(function (ii) {
    return ii.get('n');
  }, function (ii, percent) {
    return ii.set('p', percent);
  })), (0, _immutable.fromJS)([{ n: 2, p: 1 }])), 'percentBy works on single item');

  test.true((0, _immutable.is)((0, _immutable.fromJS)([{ n: 2 }, { n: 2 }, { n: 6 }]).update((0, _transformations.percentBy)(function (ii) {
    return ii.get('n');
  }, function (ii, percent) {
    return ii.set('p', percent);
  })), (0, _immutable.fromJS)([{ n: 2, p: 0.2 }, { n: 2, p: 0.2 }, { n: 6, p: 0.6 }])), 'percentBy works on lots of items');

  test.true((0, _immutable.is)((0, _immutable.fromJS)([{ n: 2 }, { n: 2 }, { n: 6 }]).update((0, _transformations.percentBy)(function (ii) {
    return ii.get('n');
  })), (0, _immutable.fromJS)([0.2, 0.2, 0.6])), 'percentBy works without have a valueSetter');
});