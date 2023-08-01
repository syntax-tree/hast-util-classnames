import assert from 'node:assert/strict'
import test from 'node:test'
import {h} from 'hastscript'
import {u} from 'unist-builder'
import {classnames} from './index.js'

test('classnames', async function (t) {
  await t.test('should expose the public api', async function () {
    assert.deepEqual(Object.keys(await import('./index.js')).sort(), [
      'classnames'
    ])
  })

  await t.test('should ignore a given doctype', async function () {
    assert.throws(function () {
      classnames(u('comment', '?'))
    }, /Expected element node/)
  })

  await t.test('should support a string', async function () {
    assert.deepEqual(classnames(h('a'), 'alpha'), h('a.alpha'))
  })

  await t.test('should support a string (space-separated)', async function () {
    assert.deepEqual(
      classnames(h('a'), 'alpha  bravo charlie'),
      h('a.alpha.bravo.charlie')
    )
  })

  await t.test('should support a number', async function () {
    assert.deepEqual(classnames(h('a'), 123), h('a.123'))
  })

  await t.test('should support (ignore) nullish values', async function () {
    assert.deepEqual(classnames(h('a'), null, undefined, 2), h('a.2'))
  })

  await t.test('should support an object', async function () {
    assert.deepEqual(
      classnames(h('a'), {alpha: true, bravo: false, charlie: true}),
      h('a.alpha.charlie')
    )
  })

  await t.test('should support an array', async function () {
    assert.deepEqual(
      classnames(h('a'), [
        'alpha',
        {bravo: true, charlie: false},
        ['delta', 123]
      ]),
      h('a.alpha.bravo.delta.123')
    )
  })

  await t.test('should dedupe', async function () {
    assert.deepEqual(
      classnames(h('a'), ['alpha', 'bravo', {alpha: false, charlie: true}]),
      h('a.bravo.charlie')
    )
  })

  await t.test('should merge w/ current classnames', async function () {
    assert.deepEqual(
      classnames(h('a.alpha.bravo'), ['alpha', {alpha: true}]),
      h('a.alpha.bravo')
    )
  })

  await t.test('should support multiple conditionals', async function () {
    assert.deepEqual(
      classnames(h('a'), 'alpha', {bravo: true, charlie: false}, [
        'delta',
        123
      ]),
      h('a.alpha.bravo.delta.123')
    )
  })

  await t.test('should return a list if w/o element', async function () {
    assert.deepEqual(classnames('alpha', ['bravo', 123], {charlie: true}), [
      'alpha',
      'bravo',
      '123',
      'charlie'
    ])
  })
})
