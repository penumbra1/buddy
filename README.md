As I'm working through Brian Holt's [Intermediate React course](https://bit.ly/react-v4), I am overhauling the styles and making changes as I go.

This is essentially a fork of the [original course repo](https://github.com/btholt/complete-intro-to-react-v4) master branch. The initial code is licensed under the Apache 2.0 license.

---

## Things I've done:

Created a new logo and restyled everything, added a lazy-loading image placeholder.

Improved markup accessibility; added [focus-visible](https://github.com/WICG/focus-visible) to handle keyboard-only focus styles.

Used powerful dropdowns from [react-select](https://github.com/JedWatson/react-select).

Added more tests and an SVG mock.

Implemented adding to favorites.

Added plugins:

- [SVGR Parcel plugin](https://www.npmjs.com/package/@svgr/parcel-plugin-svgr)
- [babel-plugin-emotion](https://github.com/emotion-js/emotion/tree/master/packages/babel-plugin-emotion) to reduce bundle size and enable sourcemaps - _can't use it until [this issue](https://github.com/parcel-bundler/parcel/issues/2237) is resolved_
- [babel-plugin-transform-object-rest-spread](https://babeljs.io/docs/en/babel-plugin-transform-object-rest-spread.html).
- [babel-plugin-dynamic-import-node](https://github.com/airbnb/babel-plugin-dynamic-import-node) to transpile dynamic imports in Jest

Upgraded to babel 7.

## Notes:

Petfinder API data is not very clean: responses may contain announcements instead of animal profiles and there is no way to filter them out (announcements look exactly like animal entries with a name, a type/breed, a picture and a description). I'm leaving it as is for now.

Suspense doesn't support data fetching and SSR yet so I'm using [react-lazy-load-image-component](https://www.npmjs.com/package/react-lazy-load-image-component) and [react-loadable](https://github.com/jamiebuilds/react-loadable) for now.

## Todo

- Search multiple breeds (fetch all in a thunk)
- No results fallback
- Cache breedLists for previously searched animals
- City search dropdown
- Pagination
- Show form under header on search icon click if current route is Search, navigate to / if not (instead of the SearchParams route)
- Likes
- Form theme: add neutral shades instead of rgba(0,0,0,...)
- In the details page, link to search all animals of this breed in this location
- Persistence of liked pets to localStorage via redux-persist
- Manage scroll position in the search list
- I might swap Redux for Hooks. _Anyway, Redux is a complete overkill in this case and is included just for practice_.
- Shelter maps?
