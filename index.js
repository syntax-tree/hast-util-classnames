/**
 * @typedef {import('hast').Element} HastElement
 *
 * @typedef {string|number} ConditionalPrimitive
 * @typedef {Object.<string, boolean>} ConditionalMap
 * @typedef {ConditionalPrimitive|ConditionalMap|Array.<ConditionalPrimitive|ConditionalMap|Array.<ConditionalPrimitive|ConditionalMap>>} Conditional
 *
 * @typedef {Object.<string, boolean>} ClassMap
 */

import {parse} from 'space-separated-tokens'

const own = {}.hasOwnProperty

/**
 * A bit inspired by <https://github.com/JedWatson/classnames>, but for hast.
 *
 * @param {HastElement|Conditional} [node]
 * @param {Array.<Conditional>} [conditionals]
 */
export function classnames(node, ...conditionals) {
  let index = -1
  /** @type {ClassMap} */
  const map = Object.create(null)
  /** @type {Array.<string>} */
  const list = []
  /** @type {string} */
  let key

  if (isNode(node)) {
    if (node.type !== 'element') throw new Error('Expected element node')

    if (!node.properties) node.properties = {}

    if (node.properties.className) {
      // @ts-ignore Assume `classname` is `Array.<string>`
      add(map, node.properties.className)
    }

    node.properties.className = list
  } else {
    conditionals.unshift(node)
  }

  while (++index < conditionals.length) {
    add(map, conditionals[index])
  }

  for (key in map) {
    if (map[key]) list.push(key)
  }

  return isNode(node) ? node : list
}

/**
 * @param {ClassMap} result
 * @param {Conditional} conditional
 */
function add(result, conditional) {
  let index = -1
  /** @type {string} */
  let key
  /** @type {Array.<string>} */
  let list

  if (typeof conditional === 'number') {
    result[conditional] = true
  } else if (typeof conditional === 'string') {
    list = parse(conditional)

    while (++index < list.length) {
      result[list[index]] = true
    }
  } else if (conditional && typeof conditional === 'object') {
    if (Array.isArray(conditional)) {
      while (++index < conditional.length) {
        add(result, conditional[index])
      }
    } else {
      for (key in conditional) {
        if (own.call(conditional, key)) {
          result[key] = conditional[key]
        }
      }
    }
  }
}

/**
 * @param {HastElement|Conditional} [value]
 * @returns {value is HastElement}
 */
function isNode(value) {
  return value && typeof value === 'object' && 'type' in value
}
