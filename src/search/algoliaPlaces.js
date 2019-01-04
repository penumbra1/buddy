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

const getCities = prefix => {
  if (!prefix) return Promise.resolve([]);
  return searchByPrefix(prefix).then(hits => {
    const cities = hits.map(
      ({ administrative: [state], locale_names: [name] }) => `${name}, ${state}`
    );
    return cities;
  });
};

export default getCities;
