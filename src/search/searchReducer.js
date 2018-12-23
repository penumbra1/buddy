export const updateSearch = changes => {
  return {
    type: "UPDATE_SEARCH",
    changes
  };
};

const defaultState = {
  location: "Seattle, WA",
  animal: "cat",
  breed: ""
};

export default (state = defaultState, action) => {
  const { type, changes } = action;
  if (type === "UPDATE_SEARCH") {
    if (changes.animal) changes.breed = "";
    return { ...state, ...changes };
  } else return state;
};
