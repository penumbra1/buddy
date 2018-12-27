export const updateSearchData = data => {
  return {
    type: "UPDATE_SEARCH_DATA",
    data
  };
};

export const updateResults = data => {
  return {
    type: "UPDATE_RESULTS",
    data
  };
};

const defaultState = {
  location: "Seattle, Washington",
  animal: "cat",
  breed: "",
  breedList: [],
  results: []
};

export default (state = defaultState, action) => {
  const { type, data } = action;

  switch (type) {
    case "UPDATE_SEARCH_DATA":
      return { ...state, ...data };
    case "UPDATE_RESULTS":
      return { ...state, results: data };
    default:
      return state;
  }
};
