import assert from 'node:assert/strict'
import test from 'node:test'
import {u} from 'unist-builder'
import {h} from 'hastscript'
import {classnames} from './index.js'
import * as mod from './index.js'

test('classnames', () => {
  assert.deepEqual(
    Object.keys(mod).sort(),
    ['classnames'],
    'should expose the public api'
  )

  assert.throws(
    () => {
      classnames(u('comment', '?'))
    },
    /Expected element node/,
    'should ignore a given doctype'
  )

  assert.deepEqual(
    classnames(h('a'), 'alpha'),
    h('a.alpha'),
    'should support a string'
  )

  assert.deepEqual(
    classnames(h('a'), 'alpha  bravo charlie'),
    h('a.alpha.bravo.charlie'),
    'should support a string (space-separated)'
  )

  assert.deepEqual(
    classnames(h('a'), 123),
    h('a.123'),
    'should support a number'
  )

  assert.deepEqual(
    classnames(h('a'), null, undefined, 2),
    h('a.2'),
    'should support (ignore) nullish values'
  )

  assert.deepEqual(
    classnames(h('a'), {alpha: true, bravo: false, charlie: true}),
    h('a.alpha.charlie'),
    'should support an object'
  )

  assert.deepEqual(
    classnames(h('a'), [
      'alpha',
      {bravo: true, charlie: false},
      ['delta', 123]
    ]),
    h('a.123.alpha.bravo.delta'),
    'should support an array'
  )

  assert.deepEqual(
    classnames(h('a'), ['alpha', 'bravo', {alpha: false, charlie: true}]),
    h('a.bravo.charlie'),
    'should dedupe'
  )

  assert.deepEqual(
    classnames(h('a.alpha.bravo'), ['alpha', {alpha: true}]),
    h('a.alpha.bravo'),
    'should merge w/ current classnames'
  )

  assert.deepEqual(
    classnames(h('a'), 'alpha', {bravo: true, charlie: false}, ['delta', 123]),
    h('a.123.alpha.bravo.delta'),
    'should support multiple conditionals'
  )

  assert.deepEqual(
    classnames('alpha', ['bravo', 123], {charlie: true}),
    ['123', 'alpha', 'bravo', 'charlie'],
    'should return a list if w/o element'
  )
})
