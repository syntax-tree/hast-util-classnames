'use strict'

var spaceSeparatedTokens = require('space-separated-tokens')

module.exports = classnames

// A bit inspired by <https://github.com/JedWatson/classnames>, but for hast.
function classnames(node) {
  var map = Object.create(null)
  var list = []
  var mutate = node && typeof node === 'object' && 'type' in node
  var index = -1
  var key

  if (mutate) {
    if (node.type !== 'element') throw new Error('Expected element node')

    if (!node.properties) node.properties = {}

    if (node.properties.className) add(map, node.properties.className)

    node.properties.className = list

    index++
  }

  while (++index < arguments.length) {
    add(map, arguments[index])
  }

  for (key in map) {
    if (map[key]) list.push(key)
  }

  return mutate ? node : list
}

function add(result, conditional) {
  var index = -1
  var key

  if (typeof conditional === 'number') {
    result[conditional] = true
  } else if (typeof conditional === 'string') {
    conditional = spaceSeparatedTokens.parse(conditional)

    while (++index < conditional.length) {
      result[conditional[index]] = true
    }
  } else if (conditional && typeof conditional === 'object') {
    if ('length' in conditional) {
      while (++index < conditional.length) {
        add(result, conditional[index])
      }
    } else {
      for (key in conditional) {
        result[key] = conditional[key]
      }
    }
  }
}
