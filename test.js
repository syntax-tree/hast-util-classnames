'use strict'

var test = require('tape')
var u = require('unist-builder')
var h = require('hastscript')
var classnames = require('.')

test('hast-util-classnames', function (t) {
  t.throws(
    function () {
      classnames(u('comment', '?'))
    },
    /Expected element node/,
    'should ignore a given doctype'
  )

  t.deepEqual(
    classnames(h('a'), 'alpha'),
    h('a.alpha'),
    'should support a string'
  )

  t.deepEqual(
    classnames(h('a'), 'alpha  bravo charlie'),
    h('a.alpha.bravo.charlie'),
    'should support a string (space-separated)'
  )

  t.deepEqual(classnames(h('a'), 123), h('a.123'), 'should support a number')

  t.deepEqual(
    classnames(h('a'), {alpha: true, bravo: false, charlie: 1}),
    h('a.alpha.charlie'),
    'should support an object'
  )

  t.deepEqual(
    classnames(h('a'), [
      'alpha',
      {bravo: true, charlie: false},
      ['delta', 123]
    ]),
    h('a.123.alpha.bravo.delta'),
    'should support an array'
  )

  t.deepEqual(
    classnames(h('a'), ['alpha', 'bravo', {alpha: false, charlie: true}]),
    h('a.bravo.charlie'),
    'should dedupe'
  )

  t.deepEqual(
    classnames(h('a.alpha.bravo'), ['alpha', {alpha: true}]),
    h('a.alpha.bravo'),
    'should merge w/ current classnames'
  )

  t.deepEqual(
    classnames(u('element', {tagName: 'a'}, []), ['alpha']),
    h('a.alpha'),
    'should not fail if an element is missing properties'
  )

  t.deepEqual(
    classnames(h('a'), 'alpha', {bravo: true, charlie: false}, ['delta', 123]),
    h('a.123.alpha.bravo.delta'),
    'should support multiple conditionals'
  )

  t.deepEqual(
    classnames('alpha', ['bravo', 123], {charlie: 1}),
    ['123', 'alpha', 'bravo', 'charlie'],
    'should return a list if w/o element'
  )

  t.end()
})
