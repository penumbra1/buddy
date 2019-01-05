As I'm working through Brian Holt's [Intermediate React course](https://bit.ly/react-v4), I am overhauling the styles and making changes as I go.

This is essentially a fork of the [original course repo](https://github.com/btholt/complete-intro-to-react-v4) master branch. The initial code is licensed under the Apache 2.0 license.

---

## Things I've done:

Created a new logo and restyled everything, added an image placeholder.

Improved markup accessibility; added [focus-visible](https://github.com/WICG/focus-visible) to handle keyboard-only focus styles.

Used [react-autosuggest](https://www.npmjs.com/package/react-autosuggest) to create dropdowns.

Wrote more tests.

Implemented likes.

Added plugins:

- [SVGR Parcel plugin](https://www.npmjs.com/package/@svgr/parcel-plugin-svgr)
- [babel-plugin-emotion](https://github.com/emotion-js/emotion/tree/master/packages/babel-plugin-emotion) to reduce bundle size and enable sourcemaps - which also needs [babel-plugin-transform-inline-environment-variables](https://www.npmjs.com/package/babel-plugin-transform-inline-environment-variables) (see [issue](https://github.com/emotion-js/emotion/issues/1132)).
- [babel-plugin-dynamic-import-node](https://github.com/airbnb/babel-plugin-dynamic-import-node) to transpile dynamic imports in Jest

Upgraded to babel 7.

Set up SSR using [this example](https://github.com/reactivestack/parcel-react-ssr). Added a separate build step with Parcel instead of [babel-node](https://babeljs.io/docs/en/babel-node) as it's not recommended for production.

Cleaned the data received from the petfinder API.

## Notes:

Petfinder API data is a mess: responses may contain announcements that look exactly like animal profiles, with no logical way to filter them out. I'm leaving it as is for now.

Suspense doesn't support data fetching and SSR yet so I'm using [react-lazy-images](https://www.npmjs.com/package/react-lazy-images) and [react-loadable](https://github.com/jamiebuilds/react-loadable) for now.

I used [react-select](https://github.com/JedWatson/react-select) at first, but as it also relies on Emotion, I didn't manage to make it render the styles on the server (probably due to a conflict with my Emotion instance). React-select has ~1000 open issues, including recent ones with [SSR](https://github.com/JedWatson/react-select/issues/3317), so I switched to the much more flexible (and lightweight!) react-autosuggest.

There is an [issue](https://github.com/babel/babel/issues/8829) with Babel: regeneratorRuntime polyfill for async/await is not included with useBuiltIns: "usage".

Parcel tree-shaking is still experimental and [bugged](https://github.com/parcel-bundler/parcel/issues/2300):(

## Todo

- Form dropdown & input:focused styles
- Change favorites state structure to O(1) lookup (optional)
- Move Results and Pet to common, make Pet rendering more flexible via children
- Avoid FOIT
- Mobile card layout
- Clean up the media field
- Photo gallery
- Split components are built both on client and server - serve them on demand?
- Search multiple breeds (fetch all in a thunk)
- Remove no results fallback on startup
- Cache breedLists for previously searched animals
- Pagination
- Show form under header on search icon click if current route is Search, navigate to / if not (instead of the SearchParams route)
- Favorites route
- In the details page, link to search all animals of this breed in this location
- Persistence of liked pets to localStorage via redux-persist
- Manage scroll position in the search list
- I might swap Redux for Hooks. _Anyway, Redux is a complete overkill in this case and is included just for practice_.
- Shelter maps?
