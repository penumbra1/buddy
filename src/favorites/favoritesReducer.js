export const toggleFavorite = id => ({ type: "TOGGLE_FAVORITE", id });

export default (state = [], action) => {
  const { type, id } = action;
  if (type === "TOGGLE_FAVORITE" && id) {
    if (state.includes(id)) return state.filter(fav => fav !== id);
    else return [...state, id];
  } else return state;
};
