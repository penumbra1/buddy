As I'm working through Brian Holt's [Intermediate React course](https://bit.ly/react-v4), I am overhauling the styles and making changes as I go.

This is essentially a fork of the [original course repo](https://github.com/btholt/complete-intro-to-react-v4) master branch. The initial code is licensed under the Apache 2.0 license.

---

## Things I've done:

Created a new logo and restyled everything, added a lazy-loading image placeholder.

Improved markup accessibility; added [focus-visible](https://github.com/WICG/focus-visible) to handle keyboard-only focus styles.

Added more tests and an SVG mock.

Added plugins:

- [SVGR Parcel plugin](https://www.npmjs.com/package/@svgr/parcel-plugin-svgr)
- [babel-plugin-emotion](https://github.com/emotion-js/emotion/tree/master/packages/babel-plugin-emotion) to reduce bundle size and enable sourcemaps - _can't use it until [this issue](https://github.com/parcel-bundler/parcel/issues/2237) is resolved_
- [babel-plugin-transform-object-rest-spread](https://babeljs.io/docs/en/babel-plugin-transform-object-rest-spread.html).
- [babel-plugin-dynamic-import-node](https://github.com/airbnb/babel-plugin-dynamic-import-node) to transpile dynamic imports in Jest

Upgraded to babel 7.

## Notes:

I'm avoiding emotion's [css prop](https://emotion.sh/docs/css-prop) syntax until the [babel preset for JSX pragma](https://github.com/emotion-js/emotion/pull/1049) is merged.

Petfinder API data is not very clean: responses may contain announcements instead of animal profiles and there is no way to filter them out (announcements look exactly like animal entries with a name, a type/breed, a picture and a description). I'm leaving it as is for now.

## Todo

- Bug: breeds overflow and hide div content
- Likes
- Persistence of liked pets to localStorage via redux-persist
- I might swap Redux for Hooks. _Anyway, Redux is a complete overkill in this case and is included just for practice_.
