# hast-util-classnames

[![Build][build-badge]][build]
[![Coverage][coverage-badge]][coverage]
[![Downloads][downloads-badge]][downloads]
[![Size][size-badge]][size]
[![Sponsors][sponsors-badge]][collective]
[![Backers][backers-badge]][collective]
[![Chat][chat-badge]][chat]

[hast][] utility to set classes.

## Contents

*   [What is this?](#what-is-this)
*   [When should I use this?](#when-should-i-use-this)
*   [Install](#install)
*   [Use](#use)
*   [API](#api)
    *   [`classnames([node, ]…conditionals)`](#classnamesnode-conditionals)
    *   [`ConditionalPrimitive`](#conditionalprimitive)
    *   [`ConditionalMap`](#conditionalmap)
    *   [`Conditional`](#conditional)
*   [Types](#types)
*   [Compatibility](#compatibility)
*   [Security](#security)
*   [Related](#related)
*   [Contribute](#contribute)
*   [License](#license)

## What is this?

This package is a utility that takes lets you more easily set class names on
elements.

## When should I use this?

You can use this package when you find that that you’re repeating yourself
a lot when working with classes in the syntax tree.

## Install

This package is [ESM only][esm].
In Node.js (version 14.14+ and 16.0+), install with [npm][]:

```sh
npm install hast-util-classnames
```

In Deno with [`esm.sh`][esmsh]:

```js
import {classnames} from 'https://esm.sh/hast-util-classnames@2'
```

In browsers with [`esm.sh`][esmsh]:

```html
<script type="module">
  import {classnames} from 'https://esm.sh/hast-util-classnames@2?bundle'
</script>
```

## Use

```js
import {h} from 'hastscript'
import {classnames} from 'hast-util-classnames'

console.log(classnames('alpha bravo', {bravo: false}, [123, 'charlie']))

const node = h('p.alpha', 'Hi!')
console.log(classnames(node, 'bravo', ['charlie', {delta: false, echo: 1}]))
```

Yields:

```js
['123', 'alpha', 'charlie']
{
  type: 'element',
  tagName: 'p',
  properties: {className: ['alpha', 'bravo', 'charlie', 'echo']},
  children: [{type: 'text', value: 'Hi!'}]
}
```

## API

This package exports the identifier [`classnames`][classnames].
There is no default export.

### `classnames([node, ]…conditionals)`

Merge classes.

This function has two signatures, depending on whether a `node` was passed.

###### Signatures

*   `(node: Node, ...conditionals: Array<Conditional>) => Node`
*   `(...conditionals: Array<Conditional>) => Array<string>`

###### Parameters

*   `node` ([`Node`][node])
    — optionally, node whose classes to append to (should be
    [`Element`][element])
*   `conditionals` ([`Array<Conditional>`][conditional])
    — class configuration to merge

###### Returns

The given node ([`Node`][node]), if any, or a list of strings (`Array<string>`).

### `ConditionalPrimitive`

Basic class names (TypeScript type).

###### Type

```ts
type ConditionalPrimitive = string | number
```

### `ConditionalMap`

Map of class names as keys, with whether they’re turned on or not as values.

###### Type

```ts
type ConditionalMap = Record<string, boolean>
```

### `Conditional`

Different ways to turn class names on or off (TypeScript type).

###### Type

```ts
type Conditional =
  | null
  | undefined
  | ConditionalPrimitive
  | ConditionalMap
  | Array<
      | ConditionalPrimitive
      | ConditionalMap
      | Array<ConditionalPrimitive | ConditionalMap>
    >
```

## Types

This package is fully typed with [TypeScript][].
It exports the additional types [`Conditional`][conditional],
[`ConditionalMap`][conditionalmap], and
[`ConditionalPrimitive`][conditionalprimitive].

## Compatibility

Projects maintained by the unified collective are compatible with all maintained
versions of Node.js.
As of now, that is Node.js 14.14+ and 16.0+.
Our projects sometimes work with older versions, but this is not guaranteed.

## Security

Classes are typically not harmful, however, if someone were able to inject
classes, it could mean that user-provided content looks like official content,
which may cause security problems due to impersonation.
Either do not use user input in `classnames` or use
[`hast-util-sanitize`][hast-util-sanitize] to clean the tree.

## Related

*   [`hastscript`](https://github.com/syntax-tree/hastscript)
    — create hast trees
*   [`hast-util-from-selector`](https://github.com/syntax-tree/hast-util-from-selector)
    — parse CSS selectors to hast nodes
*   [`hast-util-has-property`](https://github.com/syntax-tree/hast-util-has-property)
    — check if a node has a property
*   [`hast-util-is-element`](https://github.com/syntax-tree/hast-util-is-element)
    — check if a node is a (certain) element

## Contribute

See [`contributing.md`][contributing] in [`syntax-tree/.github`][health] for
ways to get started.
See [`support.md`][support] for ways to get help.

This project has a [code of conduct][coc].
By interacting with this repository, organization, or community you agree to
abide by its terms.

## License

[MIT][license] © [Titus Wormer][author]

<!-- Definitions -->

[build-badge]: https://github.com/syntax-tree/hast-util-classnames/workflows/main/badge.svg

[build]: https://github.com/syntax-tree/hast-util-classnames/actions

[coverage-badge]: https://img.shields.io/codecov/c/github/syntax-tree/hast-util-classnames.svg

[coverage]: https://codecov.io/github/syntax-tree/hast-util-classnames

[downloads-badge]: https://img.shields.io/npm/dm/hast-util-classnames.svg

[downloads]: https://www.npmjs.com/package/hast-util-classnames

[size-badge]: https://img.shields.io/bundlephobia/minzip/hast-util-classnames.svg

[size]: https://bundlephobia.com/result?p=hast-util-classnames

[sponsors-badge]: https://opencollective.com/unified/sponsors/badge.svg

[backers-badge]: https://opencollective.com/unified/backers/badge.svg

[collective]: https://opencollective.com/unified

[chat-badge]: https://img.shields.io/badge/chat-discussions-success.svg

[chat]: https://github.com/syntax-tree/unist/discussions

[npm]: https://docs.npmjs.com/cli/install

[esm]: https://gist.github.com/sindresorhus/a39789f98801d908bbc7ff3ecc99d99c

[esmsh]: https://esm.sh

[typescript]: https://www.typescriptlang.org

[license]: license

[author]: https://wooorm.com

[health]: https://github.com/syntax-tree/.github

[contributing]: https://github.com/syntax-tree/.github/blob/main/contributing.md

[support]: https://github.com/syntax-tree/.github/blob/main/support.md

[coc]: https://github.com/syntax-tree/.github/blob/main/code-of-conduct.md

[hast]: https://github.com/syntax-tree/hast

[node]: https://github.com/syntax-tree/hast#nodes

[element]: https://github.com/syntax-tree/hast#element

[hast-util-sanitize]: https://github.com/syntax-tree/hast-util-sanitize

[classnames]: #classnamesnode-conditionals

[conditional]: #conditional

[conditionalmap]: #conditionalmap

[conditionalprimitive]: #conditionalprimitive
