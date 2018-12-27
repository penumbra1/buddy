// import debounce from "lodash.debounce";
import algolia from "algoliasearch/lite";

const client = algolia.initPlaces(
  process.env.ALGOLIA_ID,
  process.env.ALGOLIA_KEY
);

const searchByPrefix = prefix => {
  const params = {
    query: prefix,
    type: "city",
    countries: ["us"],
    language: "en"
  };
  return client
    .search(params)
    .then(res => res.hits)
    .catch(e => {
      console.error(e);
      return [];
    });
};

// const searchByPrefixDeb = debounce(searchByPrefix, 500);

const getCities = prefix => {
  if (prefix && prefix.length > 3) {
    return searchByPrefix(prefix).then(hits => {
      return hits.map(({ administrative: [state], locale_names: [name] }) => ({
        value: `${name}, ${state}`,
        label: `${name}, ${state}`
      }));
    });
  } else return Promise.resolve([]);
};

export default getCities;
