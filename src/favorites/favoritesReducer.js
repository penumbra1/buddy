export const toggleFavorite = pet => ({ type: "TOGGLE_FAVORITE", pet });

export default (state = [], action) => {
  const { type, pet = {} } = action;
  if (type === "TOGGLE_FAVORITE") {
    if (state.find(fav => fav.id === pet.id))
      return state.filter(fav => fav.id !== pet.id);
    else return [...state, pet];
  } else return state;
};
