/**
 * @typedef {import('hast').Root} Root
 * @typedef {import('hast').Content} Content
 */

/**
 * @typedef {Root | Content} Node
 * @typedef {string | number} ConditionalPrimitive
 *   Basic class names.
 * @typedef {Record<string, boolean>} ConditionalMap
 *   Map of class names as keys, with whether they’re turned on or not as
 *   values.
 * @typedef {null | undefined | ConditionalPrimitive | ConditionalMap | Array<ConditionalPrimitive | ConditionalMap | Array<ConditionalPrimitive | ConditionalMap>>} Conditional
 *   Different ways to turn class names on or off.
 * @typedef {Record<string, boolean>} ClassMap
 *   Map of class names as keys, with whether they’re turned on or not as
 *   values.
 */

import {parse} from 'space-separated-tokens'

const own = {}.hasOwnProperty

/**
 * Merge classes.
 *
 * This function has two signatures, depending on whether a `node` was passed.
 *
 * @param node
 *   Optionally, node whose classes to append to (should be `Element`).
 * @param conditionals
 *   Class configuration to merge.
 * @returns
 *   The given node, if any, or a list of strings.
 */
export const classnames =
  /**
   * @type {(
   *   (<T extends Node>(node: T, ...conditionals: Array<Conditional>) => T) &
   *   ((...conditionals: Array<Conditional>) => Array<string>)
   * )}
   */
  (
    /**
     * @param {Node | Conditional | null | undefined} [node]
     * @param {Array<Conditional>} conditionals
     */
    function (node, ...conditionals) {
      let index = -1
      /** @type {ClassMap} */
      const map = Object.create(null)
      /** @type {Array<string>} */
      const list = []

      if (isNode(node)) {
        if (node.type !== 'element') throw new Error('Expected element node')

        if (!node.properties) node.properties = {}

        if (node.properties.className) {
          // @ts-expect-error Assume `classname` is `Array<string>`
          add(map, node.properties.className)
        }

        node.properties.className = list
      } else {
        conditionals.unshift(node)
      }

      while (++index < conditionals.length) {
        add(map, conditionals[index])
      }

      /** @type {string} */
      let key

      for (key in map) {
        if (map[key]) list.push(key)
      }

      return isNode(node) ? node : list
    }
  )

/**
 * @param {ClassMap} result
 * @param {Conditional} conditional
 */
function add(result, conditional) {
  let index = -1
  /** @type {string} */
  let key
  /** @type {Array<string>} */
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
 * @param {Node | Conditional} [value]
 * @returns {value is Node}
 */
function isNode(value) {
  return Boolean(value && typeof value === 'object' && 'type' in value)
}
