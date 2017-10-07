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
.foo {
    @apply .bold
}
```

you will get:
```css
.bold {
    font-weight: bold;
}
.foo {
    font-weight: bold;
}
```

## Usage

```js
postcss([ require('postcss-apply-class') ])
```

See [PostCSS] docs for examples for your environment.
