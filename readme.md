# hast-util-classnames

[![Build][build-badge]][build]
[![Coverage][coverage-badge]][coverage]
[![Downloads][downloads-badge]][downloads]
[![Size][size-badge]][size]
[![Sponsors][sponsors-badge]][collective]
[![Backers][backers-badge]][collective]
[![Chat][chat-badge]][chat]

[**hast**][hast] utility to merge class names together.

## Install

[npm][]:

```sh
npm install hast-util-classnames
```

## Use

```js
var h = require('hastscript')
var classnames = require('hast-util-classnames')

console.log(classnames('alpha bravo', {bravo: false}, [123, 'charlie']))

var node = h('p.alpha', 'Hi!')
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

### `classnames(node, …conditionals)`

Utility to merge classes.

If the first argument is a node it should be an [element][].
All [conditionals][conditional] are merged with the current class names and with
each other, and then set on the element.
Finally, `node` is returned.

### `classnames(…conditionals)`

If the first argument is not a node, all [conditionals][conditional] are merged
with each other, and then the resulting array is returned.

### `Conditional`

A value that is either:

*   `string` — One or more space-separated tokens (example: `alpha bravo`)
*   `number` — Single token that is cast to string  (example: `123`)
*   `Object.<boolean>` — Map where each field is a token, and each value turns
    it either on or off
*   `Conditional[]` — List of more conditionals
*   Other values are ignored

## Security

Classes are typically not harmful, however, if someone were able to inject
classes, it could mean that user-provided content looks like official content,
which may cause security problems due to impersonation.
Either do not use user input in `classnames` or use
[`hast-util-sanitize`][sanitize] to clean the tree.

## Related

*   [`hastscript`](https://github.com/syntax-tree/hastscript)
    — Create hast trees
*   [`hast-util-from-selector`](https://github.com/syntax-tree/hast-util-from-selector)
    — Parse CSS selectors to hast nodes
*   [`hast-util-has-property`](https://github.com/syntax-tree/hast-util-has-property)
    — Check if a node has a property
*   [`hast-util-is-element`](https://github.com/syntax-tree/hast-util-is-element)
    — Check if a node is a (certain) element

## Contribute

See [`contributing.md` in `syntax-tree/.github`][contributing] for ways to get
started.
See [`support.md`][support] for ways to get help.

This project has a [code of conduct][coc].
By interacting with this repository, organization, or community you agree to
abide by its terms.

## License

[MIT][license] © [Titus Wormer][author]

<!-- Definitions -->

[build-badge]: https://img.shields.io/travis/syntax-tree/hast-util-classnames.svg

[build]: https://travis-ci.org/syntax-tree/hast-util-classnames

[coverage-badge]: https://img.shields.io/codecov/c/github/syntax-tree/hast-util-classnames.svg

[coverage]: https://codecov.io/github/syntax-tree/hast-util-classnames

[downloads-badge]: https://img.shields.io/npm/dm/hast-util-classnames.svg

[downloads]: https://www.npmjs.com/package/hast-util-classnames

[size-badge]: https://img.shields.io/bundlephobia/minzip/hast-util-classnames.svg

[size]: https://bundlephobia.com/result?p=hast-util-classnames

[sponsors-badge]: https://opencollective.com/unified/sponsors/badge.svg

[backers-badge]: https://opencollective.com/unified/backers/badge.svg

[collective]: https://opencollective.com/unified

[chat-badge]: https://img.shields.io/badge/chat-spectrum-7b16ff.svg

[chat]: https://spectrum.chat/unified/rehype

[npm]: https://docs.npmjs.com/cli/install

[license]: license

[author]: https://wooorm.com

[contributing]: https://github.com/syntax-tree/.github/blob/HEAD/contributing.md

[support]: https://github.com/syntax-tree/.github/blob/HEAD/support.md

[coc]: https://github.com/syntax-tree/.github/blob/HEAD/code-of-conduct.md

[hast]: https://github.com/syntax-tree/hast

[element]: https://github.com/syntax-tree/hast#element

[sanitize]: https://github.com/syntax-tree/hast-util-sanitize

[conditional]: #conditional
