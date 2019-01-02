As I'm working through Brian Holt's [Intermediate React course](https://bit.ly/react-v4), I am overhauling the styles and making changes as I go.

This is essentially a fork of the [original course repo](https://github.com/btholt/complete-intro-to-react-v4) master branch. The initial code is licensed under the Apache 2.0 license.

---

## Things I've done:

Created a new logo and restyled everything, added an image placeholder.

Improved markup accessibility; added [focus-visible](https://github.com/WICG/focus-visible) to handle keyboard-only focus styles.

Used powerful dropdowns from [react-select](https://github.com/JedWatson/react-select).

Wrote more tests.

Implemented likes.

Added plugins:

- [SVGR Parcel plugin](https://www.npmjs.com/package/@svgr/parcel-plugin-svgr)
- [babel-plugin-emotion](https://github.com/emotion-js/emotion/tree/master/packages/babel-plugin-emotion) to reduce bundle size and enable sourcemaps - which also needs [babel-plugin-transform-inline-environment-variables](https://www.npmjs.com/package/babel-plugin-transform-inline-environment-variables) (see [issue](https://github.com/emotion-js/emotion/issues/1132)).
- [babel-plugin-dynamic-import-node](https://github.com/airbnb/babel-plugin-dynamic-import-node) to transpile dynamic imports in Jest

Upgraded to babel 7.

Set up SSR using [this example](https://github.com/reactivestack/parcel-react-ssr). Added a separate build step with Parcel instead of [babel-node](https://babeljs.io/docs/en/babel-node) as it's not recommended for production.

## Notes:

Petfinder API data is not very clean: responses may contain announcements instead of animal profiles and there is no way to filter them out (announcements look exactly like animal entries with a name, a type/breed, a picture and a description). I'm leaving it as is for now.

Suspense doesn't support data fetching and SSR yet so I'm using [react-lazy-images](https://www.npmjs.com/package/react-lazy-images) and [react-loadable](https://github.com/jamiebuilds/react-loadable) for now.

Emotion injects my styles correctly on the server, but fails to inject the default styles from react-select, which causes FOUC on the form. I'll keep investigating.

## Todo

- Override form field focus color
- Adjust loader size in react-select
- Avoid FOIT
- SSR for react-select (or https://www.npmjs.com/package/react-no-ssr)
- Mobile card layout
- Find a way to debounce algolia calls (currently \_.debounce breaks react-select cache)
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
