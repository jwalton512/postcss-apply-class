# PostCSS Apply Class [![Build Status][ci-img]][ci]

[PostCSS] plugin to apply CSS classes in a similar fashion to LESS.

[PostCSS]: https://github.com/postcss/postcss
[ci-img]:  https://travis-ci.org/jwalton512/postcss-apply-class.svg
[ci]:      https://travis-ci.org/jwalton512/postcss-apply-class

Using this input.css:
```css
.bold {
    font-weight: bold;
}
.text-small {
    font-size: .75rem;
}
.foo {
    @apply .bold, .text-small;
}
```

you will get:
```css
.bold {
    font-weight: bold;
}
.text-small {
    font-size: .75rem;
}
.foo {
    font-weight: bold;
    font-size: .75rem;
}
```

## Usage

```js
postcss([ require('postcss-apply-class') ])
```

See [PostCSS] docs for examples for your environment.
