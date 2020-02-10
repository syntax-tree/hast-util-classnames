'use strict'

var parse = require('space-separated-tokens').parse

module.exports = classnames

// A bit inspired by <https://github.com/JedWatson/classnames>, but for hast.
function classnames(node) {
  var mutate = node && typeof node === 'object' && 'type' in node
  var length
  var index
  var conditional
  var props
  var list
  var key
  var map

  if (mutate && node.type !== 'element') {
    throw new Error('Expected element node')
  }

  length = arguments.length
  index = mutate ? 0 : -1
  props = mutate ? node.properties || (node.properties = {}) : {}
  conditional = props.className
  map = Object.create(null)

  do {
    add(map, conditional)
    conditional = arguments[++index]
  } while (index < length)

  list = []

  for (key in map) {
    if (map[key]) {
      list.push(key)
    }
  }

  if (mutate) {
    props.className = list
    return node
  }

  return list
}

function add(result, conditional) {
  var kind = typeof conditional
  var index
  var length
  var key

  if (kind === 'number') {
    result[conditional] = true
  } else if (kind === 'string') {
    conditional = parse(conditional)
    index = -1
    length = conditional.length

    while (++index < length) {
      result[conditional[index]] = true
    }
  } else if (kind === 'object') {
    if ('length' in conditional) {
      index = -1
      length = conditional.length

      while (++index < length) {
        add(result, conditional[index])
      }
    } else {
      for (key in conditional) {
        result[key] = Boolean(conditional[key])
      }
    }
  }
}
